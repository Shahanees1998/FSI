"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

interface TicketDetailViewProps {
  ticket: {
    id: string;
    subject: string;
    description: string;
    category: string;
    status: string;
    priority: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    requester: {
      firstName: string;
      lastName: string;
      email: string;
    };
    assignedTo?: {
      firstName: string;
      lastName: string;
      email: string;
    } | null;
    messages: Array<{
      id: string;
      body: string;
      internal: boolean;
      createdAt: string | Date;
      author: {
        firstName: string;
        lastName: string;
        role: string;
      };
    }>;
  };
  isAdmin: boolean;
}

export default function TicketDetailView({ ticket, isAdmin }: TicketDetailViewProps) {
  const [status, setStatus] = useState(ticket.status);
  const [message, setMessage] = useState("");
  const [internal, setInternal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submitUpdate = async () => {
    setSubmitting(true);
    setFeedback(null);

    const response = await fetch(`/api/tickets/${ticket.id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        message: message || undefined,
        internal,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setFeedback(payload.error || "Unable to update ticket.");
      setSubmitting(false);
      return;
    }

    setFeedback("Ticket updated successfully.");
    setMessage("");
    window.location.reload();
  };

  return (
    <div className="grid">
      <div className="col-12 lg:col-4">
        <div className="surface-card border-round border-1 surface-border p-4 h-full">
          <h3 className="mt-0">Ticket summary</h3>
          <div className="mb-3">
            <div className="text-600 text-sm">Subject</div>
            <div className="font-semibold">{ticket.subject}</div>
          </div>
          <div className="mb-3">
            <div className="text-600 text-sm">Requester</div>
            <div>{ticket.requester.firstName} {ticket.requester.lastName}</div>
            <div className="text-600 text-sm">{ticket.requester.email}</div>
          </div>
          <div className="mb-3">
            <div className="text-600 text-sm">Category</div>
            <div>{ticket.category}</div>
          </div>
          <div className="mb-3">
            <div className="text-600 text-sm">Priority</div>
            <div>{ticket.priority}</div>
          </div>
          <div className="mb-3">
            <div className="text-600 text-sm">Assigned to</div>
            <div>
              {ticket.assignedTo
                ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`
                : "Unassigned"}
            </div>
          </div>
          <div className="mb-3">
            <div className="text-600 text-sm">Description</div>
            <p className="mb-0 mt-2">{ticket.description}</p>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-8">
        <div className="surface-card border-round border-1 surface-border p-4">
          <div className="flex justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h3 className="mt-0 mb-2">Ticket conversation</h3>
              <p className="text-600 m-0">Review the history and add updates without leaving the page.</p>
            </div>
            <div className="min-w-12rem">
              <label className="block mb-2">Status</label>
              <Dropdown
                className="w-full"
                value={status}
                options={[
                  { label: "Open", value: "OPEN" },
                  { label: "In progress", value: "IN_PROGRESS" },
                  { label: "Waiting on agent", value: "WAITING_ON_AGENT" },
                  { label: "Waiting on carrier", value: "WAITING_ON_CARRIER" },
                  { label: "Resolved", value: "RESOLVED" },
                  { label: "Closed", value: "CLOSED" },
                ]}
                onChange={(event) => setStatus(event.value)}
              />
            </div>
          </div>
          <div className="grid">
            {ticket.messages.map((entry) => (
              <div key={entry.id} className="col-12">
                <div className={`border-round border-1 surface-border p-3 ${entry.internal ? "surface-100" : ""}`}>
                  <div className="font-semibold">
                    {entry.author.firstName} {entry.author.lastName} ({entry.author.role})
                  </div>
                  <div className="text-600 text-sm mt-1">
                    {new Date(entry.createdAt).toLocaleString()}
                    {entry.internal ? " | Internal note" : ""}
                  </div>
                  <p className="mb-0 mt-3">{entry.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block mb-2">Add update</label>
            <InputTextarea
              rows={5}
              className="w-full"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            {isAdmin && (
              <label className="flex align-items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={internal}
                  onChange={(event) => setInternal(event.target.checked)}
                />
                <span>Mark as internal note</span>
              </label>
            )}
            <Button
              label={submitting ? "Saving..." : "Save update"}
              className="mt-3"
              onClick={submitUpdate}
              disabled={submitting}
            />
            {feedback && <p className="mt-3 mb-0 font-medium">{feedback}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
