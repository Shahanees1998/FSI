"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ListEmptyState from "@/components/portal/ListEmptyState";
import {
  PORTAL_FILTER_ACTIONS_CLASS,
  PORTAL_FILTER_FORM_CLASS,
  PORTAL_FILTER_LABEL_CLASS,
  PortalListHeader,
  PortalListPageCard,
  PortalListTable,
  PortalListTableWrap,
  PortalListTd,
  PortalListTdActions,
  PortalListTh,
  PortalListThActions,
  PortalListTheadRow,
  PortalListTr,
} from "@/components/portal/PortalListLayout";
import PaginationControls from "@/components/portal/PaginationControls";
import { PaginationMeta, SearchParamRecord } from "@/lib/portalPagination";

interface Ticket {
  id: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  updatedAt: string | Date;
  requester?: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  assignedTo?: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

export default function TicketWorkspace({
  initialTickets,
  canCreate,
  pathname,
  searchParams,
  pagination,
  filters,
}: {
  initialTickets: Ticket[];
  canCreate: boolean;
  pathname: string;
  searchParams: SearchParamRecord;
  pagination: PaginationMeta;
  filters: {
    q?: string;
    status?: string;
    priority?: string;
    category?: string;
  };
}) {
  const [tickets, setTickets] = useState(initialTickets);
  const [form, setForm] = useState({
    category: "GENERAL",
    subject: "",
    description: "",
    priority: "MEDIUM",
  });
  const [message, setMessage] = useState<string | null>(null);
  const hasActiveFilters =
    Boolean(filters.q?.trim()) ||
    Boolean(filters.status) ||
    Boolean(filters.priority) ||
    Boolean(filters.category);

  const createTicket = async () => {
    setMessage(null);
    const response = await fetch("/api/tickets", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error || "Unable to create ticket.");
      return;
    }
    setTickets((prev) => [payload.ticket, ...prev]);
    setForm({
      category: "GENERAL",
      subject: "",
      description: "",
      priority: "MEDIUM",
    });
    setMessage("Ticket created successfully.");
  };

  const filterForm = (
    <form className={PORTAL_FILTER_FORM_CLASS} action={pathname} method="get">
      <input type="hidden" name="page" value="1" />
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS} htmlFor="tickets-search-q">
          Search
        </label>
        <input
          id="tickets-search-q"
          type="search"
          name="q"
          placeholder="Subject or requester…"
          defaultValue={filters.q || ""}
          className="p-inputtext p-component w-full"
        />
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Status</label>
        <select name="status" className="w-full p-inputtext p-component" defaultValue={filters.status || ""}>
          <option value="">All statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="WAITING_ON_AGENT">Waiting on agent</option>
          <option value="WAITING_ON_CARRIER">Waiting on carrier</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Priority</label>
        <select name="priority" className="w-full p-inputtext p-component" defaultValue={filters.priority || ""}>
          <option value="">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Category</label>
        <select name="category" className="w-full p-inputtext p-component" defaultValue={filters.category || ""}>
          <option value="">All categories</option>
          <option value="GENERAL">General</option>
          <option value="COMMISSION">Commission</option>
          <option value="CARRIER">Carrier</option>
          <option value="TECHNICAL">Technical</option>
          <option value="COMPLIANCE">Compliance</option>
        </select>
      </div>
      <div className={PORTAL_FILTER_ACTIONS_CLASS}>
        <button type="submit" className="p-button p-component">
          <span className="p-button-label">Apply filters</span>
        </button>
        <Link href={pathname} className="p-button p-component p-button-text">
          <span className="p-button-label">Reset</span>
        </Link>
      </div>
    </form>
  );

  const listCard = (
    <PortalListPageCard>
      <PortalListHeader
        title="Tickets"
        description="Search and filter on the server, then open a ticket for full detail and updates."
      />
      {filterForm}
      {tickets.length > 0 ? (
        <PortalListTableWrap>
          <PortalListTable>
            <thead>
              <PortalListTheadRow>
                <PortalListTh>Subject</PortalListTh>
                <PortalListTh>Category</PortalListTh>
                <PortalListTh>Priority</PortalListTh>
                <PortalListTh>Status</PortalListTh>
                <PortalListTh>Requester</PortalListTh>
                <PortalListTh>Updated</PortalListTh>
                <PortalListThActions>Actions</PortalListThActions>
              </PortalListTheadRow>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <PortalListTr key={ticket.id}>
                  <PortalListTd className="font-medium text-900 max-w-20rem white-space-normal line-height-3">
                    {ticket.subject}
                  </PortalListTd>
                  <PortalListTd>{ticket.category}</PortalListTd>
                  <PortalListTd>{ticket.priority}</PortalListTd>
                  <PortalListTd>{ticket.status}</PortalListTd>
                  <PortalListTd className="text-600">
                    {ticket.requester
                      ? `${ticket.requester.firstName} ${ticket.requester.lastName}`
                      : "—"}
                  </PortalListTd>
                  <PortalListTd className="text-600">{new Date(ticket.updatedAt).toLocaleDateString()}</PortalListTd>
                  <PortalListTdActions>
                    <Link href={`${pathname}/${ticket.id}`} className="p-button p-component p-button-text p-button-sm font-medium no-underline">
                      View
                    </Link>
                  </PortalListTdActions>
                </PortalListTr>
              ))}
            </tbody>
          </PortalListTable>
        </PortalListTableWrap>
      ) : (
        <ListEmptyState
          iconClass="pi pi-ticket"
          title={
            hasActiveFilters
              ? "No tickets match your filters"
              : canCreate
                ? "You have no tickets yet"
                : "The ticket queue is empty"
          }
          body={
            hasActiveFilters
              ? "Nothing in the queue matches your current search or filters. Try broadening them, then Apply filters again."
              : canCreate
                ? "When you need help with commissions, carriers, or technical issues, submit a ticket using the form on the left."
                : "When agents or carriers submit support requests, they will appear here for triage and assignment."
          }
          secondary={
            hasActiveFilters ? "Use Reset to clear filters or broaden your search." : undefined
          }
        />
      )}
      {message && <p className="mt-3 mb-0 font-medium">{message}</p>}
      <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
    </PortalListPageCard>
  );

  if (!canCreate) {
    return listCard;
  }

  return (
    <div className="grid">
      <div className="col-12 lg:col-4">
        <div className="surface-card border-round border-1 surface-border p-4">
          <h3 className="mt-0">Open a new ticket</h3>
          <label className={PORTAL_FILTER_LABEL_CLASS}>Category</label>
          <Dropdown
            className="w-full mb-3"
            value={form.category}
            options={[
              { label: "General", value: "GENERAL" },
              { label: "Commission", value: "COMMISSION" },
              { label: "Carrier", value: "CARRIER" },
              { label: "Technical", value: "TECHNICAL" },
              { label: "Compliance", value: "COMPLIANCE" },
            ]}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.value }))}
          />
          <label className={PORTAL_FILTER_LABEL_CLASS}>Subject</label>
          <InputText
            className="w-full mb-3"
            value={form.subject}
            onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
          />
          <label className={PORTAL_FILTER_LABEL_CLASS}>Description</label>
          <InputTextarea
            rows={6}
            className="w-full mb-3"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
          <label className={PORTAL_FILTER_LABEL_CLASS}>Priority</label>
          <Dropdown
            className="w-full mb-3"
            value={form.priority}
            options={[
              { label: "Low", value: "LOW" },
              { label: "Medium", value: "MEDIUM" },
              { label: "High", value: "HIGH" },
              { label: "Urgent", value: "URGENT" },
            ]}
            onChange={(e) => setForm((prev) => ({ ...prev, priority: e.value }))}
          />
          <Button label="Submit ticket" onClick={createTicket} />
        </div>
      </div>
      <div className="col-12 lg:col-8">{listCard}</div>
    </div>
  );
}
