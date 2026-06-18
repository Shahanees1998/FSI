"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import ListEmptyState from "@/components/portal/ListEmptyState";
import {
  PORTAL_FILTER_FORM_CLASS,
  PORTAL_FILTER_LABEL_CLASS,
  PortalFilterApplyButton,
  PortalFilterActions,
  PortalFilterInput,
  PortalFilterResetLink,
  PortalFilterSelect,
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
import { useToast } from "@/store/toast.context";
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

const CATEGORY_OPTIONS = [
  { label: "General", value: "GENERAL" },
  { label: "Commission", value: "COMMISSION" },
  { label: "Carrier", value: "CARRIER" },
  { label: "Technical", value: "TECHNICAL" },
  { label: "Compliance", value: "COMPLIANCE" },
];

const PRIORITY_OPTIONS = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Urgent", value: "URGENT" },
];

const EMPTY_FORM = {
  category: "GENERAL",
  subject: "",
  description: "",
  priority: "MEDIUM",
};

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
  const router = useRouter();
  const { showToast } = useToast();
  const [tickets, setTickets] = useState(initialTickets);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setTickets(initialTickets);
  }, [initialTickets]);

  const hasActiveFilters =
    Boolean(filters.q?.trim()) ||
    Boolean(filters.status) ||
    Boolean(filters.priority) ||
    Boolean(filters.category);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const closeCreateDialog = () => {
    setCreateDialogVisible(false);
    resetForm();
  };

  const createTicket = async () => {
    const nextErrors: Record<string, string> = {};
    if (!form.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    }
    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      showToast("warn", "Check required fields", "Subject and description are required.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) {
        showToast("error", payload.error || "Unable to create ticket.");
        return;
      }

      showToast("success", "Ticket created successfully.");
      closeCreateDialog();
      router.refresh();
    } catch {
      showToast("error", "Unable to create ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const filterForm = (
    <form className={PORTAL_FILTER_FORM_CLASS} action={pathname} method="get">
      <input type="hidden" name="page" value="1" />
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS} htmlFor="tickets-search-q">
          Search
        </label>
        <PortalFilterInput
          id="tickets-search-q"
          inputType="search"
          name="q"
          placeholder="Subject or requester…"
          defaultValue={filters.q || ""}
        />
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Status</label>
        <PortalFilterSelect name="status" defaultValue={filters.status || ""}>
          <option value="">All statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="WAITING_ON_AGENT">Waiting on agent</option>
          <option value="WAITING_ON_CARRIER">Waiting on carrier</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </PortalFilterSelect>
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Priority</label>
        <PortalFilterSelect name="priority" defaultValue={filters.priority || ""}>
          <option value="">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </PortalFilterSelect>
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Category</label>
        <PortalFilterSelect name="category" defaultValue={filters.category || ""}>
          <option value="">All categories</option>
          <option value="GENERAL">General</option>
          <option value="COMMISSION">Commission</option>
          <option value="CARRIER">Carrier</option>
          <option value="TECHNICAL">Technical</option>
          <option value="COMPLIANCE">Compliance</option>
        </PortalFilterSelect>
      </div>
      <PortalFilterActions>
        <PortalFilterApplyButton />
        <PortalFilterResetLink href={pathname} />
      </PortalFilterActions>
    </form>
  );

  const table = (
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
                <Link
                  href={`${pathname}/${ticket.id}`}
                  className="p-button p-component p-button-text p-button-sm font-medium no-underline"
                >
                  View
                </Link>
              </PortalListTdActions>
            </PortalListTr>
          ))}
        </tbody>
      </PortalListTable>
    </PortalListTableWrap>
  );

  return (
    <div className="flex flex-column gap-4">
      <PortalListPageCard>
        <PortalListHeader
          title="Tickets"
          description="Search and filter support requests, then open a ticket for full detail and updates."
          actions={
            canCreate ? (
              <Button
                label="New ticket"
                icon="pi pi-plus"
                severity="success"
                onClick={() => setCreateDialogVisible(true)}
              />
            ) : undefined
          }
        />
        {filterForm}
      </PortalListPageCard>

      <PortalListPageCard>
        <p className="text-sm text-700 m-0 mb-3">
          Showing {tickets.length === 0 ? 0 : (pagination.page - 1) * pagination.pageSize + 1}–
          {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} tickets.
        </p>

        {tickets.length > 0 ? (
          table
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
                  ? "When you need help with commissions, carriers, or technical issues, open a new ticket using the button above."
                  : "When agents or carriers submit support requests, they will appear here for triage and assignment."
            }
            secondary={
              hasActiveFilters
                ? "Use Reset to clear filters or broaden your search."
                : canCreate
                  ? 'Click "New ticket" above to get started.'
                  : undefined
            }
          />
        )}

        <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
      </PortalListPageCard>

      {canCreate ? (
        <Dialog
          header="Open a new ticket"
          visible={createDialogVisible}
          onHide={closeCreateDialog}
          style={{ width: "min(520px, 95vw)" }}
          modal
          draggable={false}
          footer={
            <div className="flex justify-content-end gap-2">
              <Button label="Cancel" severity="secondary" outlined onClick={closeCreateDialog} disabled={submitting} />
              <Button label="Submit ticket" icon="pi pi-check" onClick={createTicket} loading={submitting} />
            </div>
          }
        >
          <div className="flex flex-column gap-3">
            <div>
              <label className={PORTAL_FILTER_LABEL_CLASS}>Category</label>
              <Dropdown
                className="w-full"
                value={form.category}
                options={CATEGORY_OPTIONS}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.value }))}
              />
            </div>
            <div>
              <label className={PORTAL_FILTER_LABEL_CLASS}>
                Subject <span className="text-red-500">*</span>
              </label>
              <InputText
                className={classNames("w-full", { "p-invalid": Boolean(errors.subject) })}
                value={form.subject}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, subject: e.target.value }));
                  if (errors.subject) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.subject;
                      return next;
                    });
                  }
                }}
              />
              {errors.subject ? <small className="p-error block mt-1">{errors.subject}</small> : null}
            </div>
            <div>
              <label className={PORTAL_FILTER_LABEL_CLASS}>
                Description <span className="text-red-500">*</span>
              </label>
              <InputTextarea
                rows={6}
                className={classNames("w-full", { "p-invalid": Boolean(errors.description) })}
                value={form.description}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, description: e.target.value }));
                  if (errors.description) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.description;
                      return next;
                    });
                  }
                }}
              />
              {errors.description ? <small className="p-error block mt-1">{errors.description}</small> : null}
            </div>
            <div>
              <label className={PORTAL_FILTER_LABEL_CLASS}>Priority</label>
              <Dropdown
                className="w-full"
                value={form.priority}
                options={PRIORITY_OPTIONS}
                onChange={(e) => setForm((prev) => ({ ...prev, priority: e.value }))}
              />
            </div>
          </div>
        </Dialog>
      ) : null}
    </div>
  );
}
