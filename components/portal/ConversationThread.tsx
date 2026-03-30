"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import PaginationControls from "@/components/portal/PaginationControls";
import { getRealtimeClient } from "@/lib/realtimeClient";
import { PaginationMeta, SearchParamRecord } from "@/lib/portalPagination";

interface ConversationThreadProps {
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
      };
    }>;
  };
  initialMessages: Array<{
    id: string;
    body: string;
    createdAt: string | Date;
    sender: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
    };
  }>;
  currentUserId: string;
  pathname: string;
  searchParams: SearchParamRecord;
  pagination: PaginationMeta;
}

export default function ConversationThread({
  conversation,
  initialMessages,
  currentUserId,
  pathname,
  searchParams,
  pagination,
}: ConversationThreadProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [body, setBody] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    const client = getRealtimeClient();
    if (!client) {
      return undefined;
    }

    const channel = client.subscribe(`conversation-${conversation.id}`);
    const handler = (payload: { message?: ConversationThreadProps["initialMessages"][number] }) => {
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
      conversation.participants
        .map(
          (participant) =>
            `${participant.user.firstName} ${participant.user.lastName} (${participant.user.role})`
        )
        .join(", "),
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
    <div className="grid">
      <div className="col-12 lg:col-4">
        <div className="surface-card border-round border-1 surface-border p-4 h-full">
          <h3 className="mt-0">Conversation details</h3>
          <div className="mb-3">
            <div className="text-600 text-sm">Subject</div>
            <div className="font-semibold">{conversation.subject}</div>
          </div>
          <div className="mb-0">
            <div className="text-600 text-sm">Participants</div>
            <p className="mb-0 mt-2">{participantSummary}</p>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-8">
        <div className="surface-card border-round border-1 surface-border p-4">
          <h3 className="mt-0">Message thread</h3>
          <div className="grid">
            {messages.map((message) => {
              const isOwn = message.sender.id === currentUserId;

              return (
                <div key={message.id} className="col-12">
                  <div
                    className={`border-round border-1 surface-border p-3 ${
                      isOwn ? "surface-100" : ""
                    }`}
                  >
                    <div className="font-semibold">
                      {message.sender.firstName} {message.sender.lastName} ({message.sender.role})
                    </div>
                    <div className="text-600 text-sm mt-1">
                      {new Date(message.createdAt).toLocaleString()}
                    </div>
                    <p className="mb-0 mt-3">{message.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {messages.length === 0 && <p className="text-600 mb-0">No messages yet.</p>}
          <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
          <div className="mt-4">
            <label className="block mb-2">Reply</label>
            <InputTextarea
              rows={4}
              className="w-full"
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
            <Button
              label={sending ? "Sending..." : "Send message"}
              className="mt-3"
              onClick={sendMessage}
              disabled={sending}
            />
            {feedback && <p className="mt-3 mb-0 font-medium">{feedback}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
