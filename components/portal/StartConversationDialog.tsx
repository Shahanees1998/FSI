"use client";

import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

type EligibleUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profileImage?: string | null;
    jobTitle?: string | null;
    carrierProfile?: { carrierName: string; carrierCode: string } | null;
    agentProfile?: { agentCode: string } | null;
};

function subtitle(u: EligibleUser) {
    if (u.role === "CARRIER" && u.carrierProfile) {
        return `${u.carrierProfile.carrierName} (${u.carrierProfile.carrierCode})`;
    }
    if (u.role === "AGENT" && u.agentProfile) {
        return `Agent ${u.agentProfile.agentCode}`;
    }
    if (u.jobTitle) {
        return u.jobTitle;
    }
    return u.email;
}

export default function StartConversationDialog({
    visible,
    onHide,
    onCreated,
}: {
    visible: boolean;
    onHide: () => void;
    onCreated: (conversationId: string) => void;
}) {
    const [q, setQ] = useState("");
    const [debouncedQ, setDebouncedQ] = useState("");
    const [users, setUsers] = useState<EligibleUser[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [selected, setSelected] = useState<EligibleUser | null>(null);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedQ(q), 300);
        return () => clearTimeout(t);
    }, [q]);

    useEffect(() => {
        if (!visible) {
            setQ("");
            setDebouncedQ("");
            setUsers([]);
            setSelected(null);
            setSubject("");
            setMessage("");
            setError(null);
        }
    }, [visible]);

    useEffect(() => {
        if (!visible) {
            return;
        }

        let cancelled = false;
        (async () => {
            setLoadingUsers(true);
            try {
                const response = await fetch(
                    `/api/conversations/eligible-users?q=${encodeURIComponent(debouncedQ)}`,
                    { credentials: "include" }
                );
                const data = await response.json();
                if (!cancelled && response.ok) {
                    setUsers(data.users ?? []);
                }
            } finally {
                if (!cancelled) {
                    setLoadingUsers(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [visible, debouncedQ]);

    const submit = async () => {
        setError(null);
        if (!selected) {
            setError("Choose someone to message.");
            return;
        }
        if (!subject.trim()) {
            setError("Add a subject for this conversation.");
            return;
        }

        setCreating(true);
        const response = await fetch("/api/conversations", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                subject: subject.trim(),
                participantIds: [selected.id],
                message: message.trim() || undefined,
            }),
        });
        const payload = await response.json();
        setCreating(false);

        if (!response.ok) {
            setError(payload.error || "Unable to start the conversation.");
            return;
        }

        const id = payload.conversation?.id as string | undefined;
        if (!id) {
            setError("Conversation created but response was incomplete.");
            return;
        }

        onCreated(id);
        onHide();
    };

    return (
        <Dialog
            header="New conversation"
            visible={visible}
            onHide={onHide}
            style={{ width: "min(32rem, 95vw)" }}
            dismissableMask
        >
            <p className="text-600 mt-0 line-height-3">
                Search people you are allowed to message. Admins can reach anyone; agents see FSI admins and
                carriers in their preferred list; carriers see admins and contracted agents.
            </p>
            <label className="block mb-2 font-medium">Find people</label>
            <InputText
                className="w-full mb-3"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, email, or title…"
            />
            <div
                className="border-1 surface-border border-round mb-3 overflow-y-auto surface-ground"
                style={{ maxHeight: "14rem" }}
            >
                {loadingUsers ? (
                    <div className="p-3 text-600">Loading…</div>
                ) : users.length === 0 ? (
                    <div className="p-3 text-600">No matches. Try another search.</div>
                ) : (
                    users.map((user) => {
                        const active = selected?.id === user.id;
                        return (
                            <button
                                key={user.id}
                                type="button"
                                className={`w-full text-left p-3 border-none cursor-pointer ${
                                    active ? "bg-primary text-white" : "surface-card"
                                }`}
                                style={{ borderBottom: "1px solid var(--surface-border)" }}
                                onClick={() => setSelected(user)}
                            >
                                <div className="font-semibold">
                                    {user.firstName} {user.lastName}
                                </div>
                                <div className={`text-sm ${active ? "opacity-90" : "text-600"}`}>
                                    {user.role} · {subtitle(user)}
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
            <label className="block mb-2 font-medium">Subject</label>
            <InputText
                className="w-full mb-3"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Question about March commissions"
            />
            <label className="block mb-2 font-medium">First message (optional)</label>
            <InputTextarea
                rows={4}
                className="w-full mb-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex gap-2 justify-content-end">
                <Button type="button" label="Cancel" outlined onClick={onHide} />
                <Button
                    type="button"
                    label={creating ? "Starting…" : "Start conversation"}
                    onClick={() => void submit()}
                    disabled={creating}
                />
            </div>
        </Dialog>
    );
}
