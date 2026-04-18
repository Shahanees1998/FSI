"use client";

import { Button } from "primereact/button";
import { useMemo, useState } from "react";
import { DEMO_TICKETS } from "@/lib/agentTicketsDemoData";

const PAGE_SIZE = 4;

export default function AgentTicketsDemoSection() {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(DEMO_TICKETS.length / PAGE_SIZE));

  const slice = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return DEMO_TICKETS.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold m-0 text-900">Sample tickets (demo)</h2>
        <p className="text-600 m-0 mt-2 text-sm">
          Illustrative queue rows — not stored as real tickets. Use pagination to browse samples.
        </p>
      </div>

      <div className="grid">
        {slice.map((ticket) => (
          <div key={ticket.id} className="col-12">
            <div className="border-1 surface-border border-round p-3 surface-50">
              <div className="flex justify-content-between align-items-start gap-3 flex-wrap">
                <div>
                  <div className="font-semibold">{ticket.subject}</div>
                  <div className="text-600 text-sm mt-1">
                    {ticket.category} | {ticket.priority} | {ticket.status}
                  </div>
                  <div className="text-600 text-sm mt-1">
                    {ticket.requester.firstName} {ticket.requester.lastName}
                  </div>
                  {ticket.assignedTo ? (
                    <div className="text-600 text-sm mt-1">
                      Assigned to {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}
                    </div>
                  ) : null}
                </div>
                <div className="text-right">
                  <div className="text-600 text-sm mb-2">{new Date(ticket.updatedAt).toLocaleDateString()}</div>
                  <span className="text-500 text-sm">Demo — no detail page</span>
                </div>
              </div>
              <p className="mb-0 mt-3 text-700">{ticket.description}</p>
            </div>
          </div>
        ))}
      </div>

      {DEMO_TICKETS.length > PAGE_SIZE ? (
        <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
          <span className="text-600 text-sm">
            Page {page} of {totalPages} ({DEMO_TICKETS.length} sample tickets)
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              label="Previous"
              outlined
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            />
            <Button
              type="button"
              label="Next"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
