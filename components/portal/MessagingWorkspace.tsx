"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import ChatThreadPanel from "@/components/portal/ChatThreadPanel";
import ListEmptyState from "@/components/portal/ListEmptyState";
import PaginationControls from "@/components/portal/PaginationControls";
import StartConversationDialog from "@/components/portal/StartConversationDialog";
import type { ConversationListRow } from "@/lib/portalData";
import { getRealtimeClient } from "@/lib/realtimeClient";
import { PaginationMeta, SearchParamRecord } from "@/lib/portalPagination";

function sortConversations(list: ConversationListRow[]) {
    return [...list].sort((a, b) => {
        const ta = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : new Date(a.updatedAt).getTime();
        const tb = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : new Date(b.updatedAt).getTime();
        return tb - ta;
    });
}

function rowTitle(row: ConversationListRow, myId: string) {
    const others = row.participants.filter((p) => p.userId !== myId);
    if (others.length === 1) {
        const u = others[0].user;
        return `${u.firstName} ${u.lastName}`;
    }
    return row.subject;
}

function previewSnippet(row: ConversationListRow) {
    const m = row.messages[0];
    if (!m) {
        return "No messages yet";
    }
    const prefix =
        m.sender.firstName && m.sender.lastName ? `${m.sender.firstName}: ` : "";
    const text = `${prefix}${m.body}`;
    return text.length > 100 ? `${text.slice(0, 97)}…` : text;
}

function initials(first: string, last: string) {
    return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";
}

interface ThreadBundle {
    conversation: {
        id: string;
        subject: string;
        participants: Array<{
            user: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                role: string;
                profileImage?: string | null;
            };
        }>;
    };
    messages: Array<{
        id: string;
        body: string;
        createdAt: string | Date;
        sender: { id: string; firstName: string; lastName: string; role: string };
    }>;
    pagination: PaginationMeta;
}

export default function MessagingWorkspace({
    title,
    subtitle,
    basePath,
    currentUser,
    initialConversations,
    listPagination,
    searchParams,
    selectedConversationId,
    threadInitial,
    canStartConversation,
}: {
    title: string;
    subtitle: string;
    basePath: string;
    currentUser: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
        profileImage?: string | null;
    };
    initialConversations: ConversationListRow[];
    listPagination: PaginationMeta;
    searchParams: SearchParamRecord;
    selectedConversationId: string | null;
    threadInitial: ThreadBundle | null;
    canStartConversation: boolean;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [conversations, setConversations] = useState(() => sortConversations(initialConversations));
    const [newDialogVisible, setNewDialogVisible] = useState(false);

    useEffect(() => {
        setConversations(sortConversations(initialConversations));
    }, [initialConversations]);

    useEffect(() => {
        const client = getRealtimeClient();
        if (!client) {
            return undefined;
        }

        const channel = client.subscribe(`user-${currentUser.id}`);
        const onInbox = (data: { conversation?: ConversationListRow }) => {
            if (!data.conversation) {
                return;
            }
            const row = data.conversation;
            setConversations((prev) => {
                const idx = prev.findIndex((c) => c.id === row.id);
                const next = idx >= 0 ? [...prev] : [row, ...prev];
                if (idx >= 0) {
                    next[idx] = row;
                }
                return sortConversations(next);
            });
        };

        channel.bind("inbox.updated", onInbox);

        return () => {
            channel.unbind("inbox.updated", onInbox);
            client.unsubscribe(`user-${currentUser.id}`);
        };
    }, [currentUser.id]);

    const q = typeof searchParams.q === "string" ? searchParams.q : "";
    const hasSearch = Boolean(q.trim());

    const listEmpty = useMemo(
        () =>
            conversations.length === 0 ? (
                <ListEmptyState
                    iconClass="pi pi-comments"
                    title={hasSearch ? "No chats match your search" : "No conversations yet"}
                    body={
                        hasSearch
                            ? "Try another keyword. Search looks at subjects, participant names, emails, and message text."
                            : canStartConversation
                              ? "Start a new conversation with the button above, or wait for someone to message you."
                              : "When an admin or partner adds you to a thread, it will appear here in real time."
                    }
                    secondary={
                        hasSearch
                            ? "Clear the search field and press Search to see the full list."
                            : undefined
                    }
                />
            ) : null,
        [conversations.length, hasSearch, canStartConversation]
    );

    return (
        <div>
            <div className="surface-card border-round border-1 surface-border p-4 mb-3">
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-start gap-3">
                    <div>
                        <h1 className="mt-0 mb-2">{title}</h1>
                        <p className="text-600 m-0 line-height-3">{subtitle}</p>
                    </div>
                    <div className="flex flex-column sm:flex-row gap-2 align-items-stretch sm:align-items-center">
                        {canStartConversation ? (
                            <Button
                                type="button"
                                label="New conversation"
                                icon="pi pi-plus"
                                onClick={() => setNewDialogVisible(true)}
                            />
                        ) : null}
                    </div>
                </div>
            </div>

            <StartConversationDialog
                visible={newDialogVisible}
                onHide={() => setNewDialogVisible(false)}
                onCreated={(id) => router.push(`${basePath}/${id}`)}
            />

            <div
                className="flex flex-column lg:flex-row gap-3 lg:align-items-stretch"
                style={{ minHeight: "calc(100vh - 14rem)" }}
            >
                <aside
                    className="w-full lg:w-24rem xl:w-28rem flex-shrink-0 surface-card border-round border-1 surface-border flex flex-column overflow-hidden shadow-1"
                    style={{ minHeight: "min(40vh, 22rem)", maxHeight: "calc(100vh - 14rem)" }}
                >
                    <div className="p-3 border-bottom-1 surface-border flex-shrink-0">
                        <form action={basePath} method="get" className="flex gap-2">
                            <input type="hidden" name="page" value="1" />
                            <input
                                name="q"
                                className="p-inputtext p-component flex-1 w-full"
                                placeholder="Search chats, people, messages…"
                                defaultValue={q}
                            />
                            <Button type="submit" label="Search" />
                        </form>
                    </div>
                    <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
                        {listEmpty}
                        {conversations.map((row) => {
                            const active =
                                selectedConversationId === row.id ||
                                pathname === `${basePath}/${row.id}`;
                            const other = row.participants.find((p) => p.userId !== currentUser.id)?.user;
                            return (
                                <Link
                                    key={row.id}
                                    href={`${basePath}/${row.id}`}
                                    className={`block no-underline text-color border-bottom-1 surface-border ${
                                        active ? "surface-100" : ""
                                    }`}
                                >
                                    <div className="p-3 flex gap-3 align-items-start">
                                        {other?.profileImage ? (
                                            <img
                                                src={other.profileImage}
                                                alt=""
                                                className="w-3rem h-3rem border-circle flex-shrink-0"
                                                style={{ objectFit: "cover" }}
                                            />
                                        ) : (
                                            <Avatar
                                                label={
                                                    other
                                                        ? initials(other.firstName, other.lastName)
                                                        : `${row.participants.length}`
                                                }
                                                shape="circle"
                                                size="large"
                                                className="bg-primary text-white flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-900 line-height-3">
                                                {rowTitle(row, currentUser.id)}
                                            </div>
                                            <div className="text-600 text-sm line-height-3 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                                {previewSnippet(row)}
                                            </div>
                                            <div className="text-500 text-xs mt-1">
                                                {row.lastMessageAt
                                                    ? new Date(row.lastMessageAt).toLocaleString()
                                                    : ""}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="p-2 border-top-1 surface-border flex-shrink-0">
                        <PaginationControls
                            pathname={basePath}
                            searchParams={searchParams}
                            pagination={listPagination}
                        />
                    </div>
                </aside>

                <main
                    className="flex-1 min-w-0 flex flex-column surface-card border-round border-1 surface-border overflow-hidden shadow-1"
                    style={{ minHeight: "min(50vh, 24rem)", maxHeight: "calc(100vh - 14rem)" }}
                >
                    {threadInitial && selectedConversationId ? (
                        <ChatThreadPanel
                            conversation={threadInitial.conversation}
                            initialMessages={threadInitial.messages}
                            currentUserId={currentUser.id}
                            pathname={`${basePath}/${selectedConversationId}`}
                            searchParams={searchParams}
                            pagination={threadInitial.pagination}
                        />
                    ) : (
                        <div className="flex flex-column align-items-center justify-content-center p-6 text-center flex-1 surface-ground">
                            <i className="pi pi-comments text-5xl text-400 mb-3" aria-hidden />
                            <h3 className="mt-0 mb-2">Select a conversation</h3>
                            <p className="text-600 m-0 max-w-24rem line-height-3">
                                Choose a thread on the left to read and reply in real time. New messages appear
                                instantly for everyone in the channel.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
