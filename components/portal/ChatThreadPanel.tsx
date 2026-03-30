"use client";

import { useEffect, useMemo, useState } from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import PaginationControls from "@/components/portal/PaginationControls";
import { getRealtimeClient } from "@/lib/realtimeClient";
import { PaginationMeta, SearchParamRecord } from "@/lib/portalPagination";

export interface ChatThreadParticipant {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        profileImage?: string | null;
    };
}

export interface ChatThreadMessage {
    id: string;
    body: string;
    createdAt: string | Date;
    sender: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
    };
}

interface ChatThreadPanelProps {
    conversation: {
        id: string;
        subject: string;
        participants: ChatThreadParticipant[];
    };
    initialMessages: ChatThreadMessage[];
    currentUserId: string;
    pathname: string;
    searchParams: SearchParamRecord;
    pagination: PaginationMeta;
}

function initials(first: string, last: string) {
    return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";
}

export default function ChatThreadPanel({
    conversation,
    initialMessages,
    currentUserId,
    pathname,
    searchParams,
    pagination,
}: ChatThreadPanelProps) {
    const [messages, setMessages] = useState(initialMessages);
    const [body, setBody] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages, conversation.id]);

    useEffect(() => {
        const client = getRealtimeClient();
        if (!client) {
            return undefined;
        }

        const channel = client.subscribe(`conversation-${conversation.id}`);
        const handler = (payload: { message?: ChatThreadMessage }) => {
            const incomingMessage = payload.message;
            if (!incomingMessage) {
                return;
            }

            setMessages((current) => {
                if (current.some((message) => message.id === incomingMessage.id)) {
                    return current;
                }

                return [...current, incomingMessage];
            });
        };

        channel.bind("message.created", handler);

        return () => {
            channel.unbind("message.created", handler);
            client.unsubscribe(`conversation-${conversation.id}`);
        };
    }, [conversation.id]);

    const participantSummary = useMemo(
        () =>
            conversation.participants.map((participant) => ({
                ...participant.user,
                label: `${participant.user.firstName} ${participant.user.lastName}`,
            })),
        [conversation.participants]
    );

    const sendMessage = async () => {
        if (!body.trim()) {
            return;
        }

        setSending(true);
        setFeedback(null);

        const response = await fetch(`/api/conversations/${conversation.id}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body }),
        });

        const payload = await response.json();
        if (!response.ok) {
            setFeedback(payload.error || "Unable to send message.");
            setSending(false);
            return;
        }

        setMessages((current) => [...current, payload.message]);
        setBody("");
        setSending(false);
    };

    return (
        <div className="flex flex-column h-full" style={{ minHeight: 0 }}>
            <header className="border-bottom-1 surface-border px-4 py-3 flex flex-column gap-2 flex-shrink-0 surface-card">
                <h2 className="text-lg font-semibold m-0 text-900">{conversation.subject}</h2>
                <div className="flex flex-wrap align-items-center gap-2">
                    {participantSummary.map((user) => (
                        <div
                            key={user.id}
                            className="flex align-items-center gap-2 border-1 surface-border border-round-lg px-2 py-1 surface-ground"
                        >
                            {user.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt=""
                                    className="border-circle w-2rem h-2rem"
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <Avatar
                                    label={initials(user.firstName, user.lastName)}
                                    shape="circle"
                                    size="normal"
                                    className="bg-primary text-white"
                                />
                            )}
                            <div className="text-sm">
                                <span className="font-medium">{user.label}</span>
                                <span className="text-600 ml-2">{user.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </header>

            <div
                className="flex-1 overflow-y-auto px-4 py-3 flex flex-column gap-3 surface-ground"
                style={{ minHeight: "12rem" }}
            >
                {messages.length === 0 ? (
                    <div className="text-600 text-center my-auto py-6">No messages yet. Say hello below.</div>
                ) : (
                    messages.map((message) => {
                        const isOwn = message.sender.id === currentUserId;
                        return (
                            <div
                                key={message.id}
                                className={`flex w-full ${isOwn ? "justify-content-end" : "justify-content-start"}`}
                            >
                                <div
                                    className={`max-w-full md:max-w-30rem border-round-lg p-3 ${
                                        isOwn ? "bg-primary text-white" : "surface-card border-1 surface-border"
                                    }`}
                                    style={{ maxWidth: "min(32rem, 100%)" }}
                                >
                                    {!isOwn && (
                                        <div className="font-semibold text-sm opacity-90 mb-1">
                                            {message.sender.firstName} {message.sender.lastName}
                                            <span className="font-normal opacity-80 ml-2">{message.sender.role}</span>
                                        </div>
                                    )}
                                    <p className="m-0 line-height-3 white-space-pre-wrap">{message.body}</p>
                                    <div
                                        className={`text-xs mt-2 ${isOwn ? "opacity-80" : "text-600"}`}
                                    >
                                        {new Date(message.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <footer className="border-top-1 surface-border px-4 py-3 flex-shrink-0 surface-card">
                <label className="block mb-2 text-sm text-600 font-medium">Write a message</label>
                <div className="flex align-items-center gap-2 messaging-composer-row">
                    <textarea
                        className="p-inputtext p-component w-full border-round messaging-composer-input m-0"
                        rows={1}
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                void sendMessage();
                            }
                        }}
                        placeholder="Type a message…"
                        aria-label="Message"
                    />
                    <Button
                        label={sending ? "Sending…" : "Send"}
                        type="button"
                        size="small"
                        className="flex-shrink-0 messaging-composer-send"
                        onClick={() => void sendMessage()}
                        disabled={sending}
                    />
                </div>
                <p className="text-500 text-xs mt-2 mb-0">Enter to send · Shift+Enter for a new line</p>
                {feedback && <p className="mt-2 mb-0 text-red-500">{feedback}</p>}
                <div className="mt-3 pt-2 border-top-1 surface-border">
                    <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
                </div>
            </footer>
        </div>
    );
}
