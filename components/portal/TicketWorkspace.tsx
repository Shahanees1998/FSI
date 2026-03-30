"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ListEmptyState from "@/components/portal/ListEmptyState";
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

    return (
        <div className="grid">
            {canCreate && (
                <div className="col-12 lg:col-4">
                    <div className="surface-card border-round border-1 surface-border p-4">
                        <h3 className="mt-0">Open a new ticket</h3>
                        <label className="block mb-2">Category</label>
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
                        <label className="block mb-2">Subject</label>
                        <InputText
                            className="w-full mb-3"
                            value={form.subject}
                            onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                        />
                        <label className="block mb-2">Description</label>
                        <InputTextarea
                            rows={6}
                            className="w-full mb-3"
                            value={form.description}
                            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                        />
                        <label className="block mb-2">Priority</label>
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
            )}
            <div className={`col-12 ${canCreate ? "lg:col-8" : ""}`}>
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="flex flex-column lg:flex-row lg:justify-content-between lg:align-items-center gap-3 mb-4">
                        <div>
                            <h3 className="mt-0 mb-2">Ticket queue</h3>
                            <p className="m-0 text-600">
                                Search and filter tickets on the server, then open a full detail view for updates.
                            </p>
                        </div>
                        <form className="grid m-0 gap-2" action={pathname}>
                            <InputText name="q" placeholder="Search subject or requester..." defaultValue={filters.q || ""} />
                            <input type="hidden" name="status" value={filters.status || ""} />
                            <input type="hidden" name="priority" value={filters.priority || ""} />
                            <input type="hidden" name="category" value={filters.category || ""} />
                            <Button type="submit" label="Search" />
                        </form>
                    </div>
                    <form className="grid mb-4">
                        <div className="col-12 md:col-4">
                            <label className="block mb-2">Status</label>
                            <select
                                className="w-full p-inputtext p-component"
                                defaultValue={filters.status || ""}
                                onChange={(event) => {
                                    const url = new URL(window.location.href);
                                    if (event.target.value) {
                                        url.searchParams.set("status", event.target.value);
                                    } else {
                                        url.searchParams.delete("status");
                                    }
                                    url.searchParams.set("page", "1");
                                    window.location.href = `${url.pathname}${url.search}`;
                                }}
                            >
                                <option value="">All statuses</option>
                                <option value="OPEN">Open</option>
                                <option value="IN_PROGRESS">In progress</option>
                                <option value="WAITING_ON_AGENT">Waiting on agent</option>
                                <option value="WAITING_ON_CARRIER">Waiting on carrier</option>
                                <option value="RESOLVED">Resolved</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                        </div>
                        <div className="col-12 md:col-4">
                            <label className="block mb-2">Priority</label>
                            <select
                                className="w-full p-inputtext p-component"
                                defaultValue={filters.priority || ""}
                                onChange={(event) => {
                                    const url = new URL(window.location.href);
                                    if (event.target.value) {
                                        url.searchParams.set("priority", event.target.value);
                                    } else {
                                        url.searchParams.delete("priority");
                                    }
                                    url.searchParams.set("page", "1");
                                    window.location.href = `${url.pathname}${url.search}`;
                                }}
                            >
                                <option value="">All priorities</option>
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="URGENT">Urgent</option>
                            </select>
                        </div>
                        <div className="col-12 md:col-4">
                            <label className="block mb-2">Category</label>
                            <select
                                className="w-full p-inputtext p-component"
                                defaultValue={filters.category || ""}
                                onChange={(event) => {
                                    const url = new URL(window.location.href);
                                    if (event.target.value) {
                                        url.searchParams.set("category", event.target.value);
                                    } else {
                                        url.searchParams.delete("category");
                                    }
                                    url.searchParams.set("page", "1");
                                    window.location.href = `${url.pathname}${url.search}`;
                                }}
                            >
                                <option value="">All categories</option>
                                <option value="GENERAL">General</option>
                                <option value="COMMISSION">Commission</option>
                                <option value="CARRIER">Carrier</option>
                                <option value="TECHNICAL">Technical</option>
                                <option value="COMPLIANCE">Compliance</option>
                            </select>
                        </div>
                    </form>
                    {tickets.length > 0 ? (
                        <div className="grid">
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="col-12">
                                    <div className="border-1 surface-border border-round p-3">
                                        <div className="flex justify-content-between align-items-start gap-3">
                                            <div>
                                                <div className="font-semibold">{ticket.subject}</div>
                                                <div className="text-600 text-sm mt-1">
                                                    {ticket.category} | {ticket.priority} | {ticket.status}
                                                </div>
                                                {ticket.requester && (
                                                    <div className="text-600 text-sm mt-1">
                                                        {ticket.requester.firstName} {ticket.requester.lastName}
                                                    </div>
                                                )}
                                                {ticket.assignedTo && (
                                                    <div className="text-600 text-sm mt-1">
                                                        Assigned to {ticket.assignedTo.firstName}{" "}
                                                        {ticket.assignedTo.lastName}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-600 text-sm mb-2">
                                                    {new Date(ticket.updatedAt).toLocaleDateString()}
                                                </div>
                                                <Link href={`${pathname}/${ticket.id}`} className="font-medium">
                                                    View details
                                                </Link>
                                            </div>
                                        </div>
                                        <p className="mb-0 mt-3 text-700">{ticket.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                    ? "Nothing in the queue matches your current search, status, priority, or category. Try broadening one of those filters to see more results."
                                    : canCreate
                                      ? "When you need help with commissions, carriers, or technical issues, submit a ticket using the form on the left. Your open requests will appear here with full history."
                                      : "When agents or carriers submit support requests, they will appear in this list for triage, assignment, and updates. New activity will show the latest status and assignee at a glance."
                            }
                            secondary={
                                hasActiveFilters
                                    ? "Reset filters from the dropdowns above or clear the search field, then refresh the list."
                                    : undefined
                            }
                        />
                    )}
                    {message && <p className="mt-3 mb-0 font-medium">{message}</p>}
                    <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
                </div>
            </div>
        </div>
    );
}
