"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CompanyCreateForm from "@/components/portal/CompanyCreateForm";
import ListEmptyState from "@/components/portal/ListEmptyState";
import {
  PORTAL_FILTER_FORM_CLASS,
  PORTAL_FILTER_LABEL_CLASS,
  PortalFilterApplyButton,
  PortalFilterActions,
  PortalFilterInput,
  PortalFilterResetLink,
  PortalListHeader,
  PortalListPageCard,
  PortalListTable,
  PortalListTableWrap,
  PortalListTd,
  PortalListTh,
  PortalListTheadRow,
  PortalListTr,
} from "@/components/portal/PortalListLayout";
import PaginationControls from "@/components/portal/PaginationControls";
import { PaginationMeta, SearchParamRecord } from "@/lib/portalPagination";

export type CompanyListItem = {
  id: string;
  name: string;
  location: string | null;
  department: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  createdAt: string;
  _count: { agents: number };
};

export default function CompaniesManager({
  variant = "admin",
  initialCompanies,
  pathname,
  searchParams,
  pagination,
  filters,
}: {
  variant?: "admin" | "agent";
  initialCompanies: CompanyListItem[];
  pathname: string;
  searchParams: SearchParamRecord;
  pagination: PaginationMeta;
  filters: { q?: string; state?: string; country?: string; department?: string };
}) {
  const [companies, setCompanies] = useState(initialCompanies);

  useEffect(() => {
    setCompanies(initialCompanies);
  }, [initialCompanies]);

  const hasActiveFilters =
    Boolean(filters.q?.trim()) ||
    Boolean(filters.state?.trim()) ||
    Boolean(filters.country?.trim()) ||
    Boolean(filters.department?.trim());

  const isAgent = variant === "agent";
  const createCompanyUrl = isAgent ? "/api/agent/companies" : "/api/admin/companies";

  const filterForm = (
    <form className={PORTAL_FILTER_FORM_CLASS} action={pathname} method="get">
      <input type="hidden" name="page" value="1" />
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
        <PortalFilterInput
          inputType="search"
          name="q"
          placeholder="Name, location, department…"
          defaultValue={filters.q || ""}
        />
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>State</label>
        <PortalFilterInput name="state" placeholder="Contains…" defaultValue={filters.state || ""} />
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Country</label>
        <PortalFilterInput name="country" placeholder="Contains…" defaultValue={filters.country || ""} />
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Department</label>
        <PortalFilterInput name="department" placeholder="Contains…" defaultValue={filters.department || ""} />
      </div>
      <PortalFilterActions>
        <PortalFilterApplyButton />
        <PortalFilterResetLink href={pathname} />
      </PortalFilterActions>
    </form>
  );

  const emptyState = (
    <ListEmptyState
      iconClass="pi pi-building"
      title={hasActiveFilters ? "No companies match your filters" : "No companies yet"}
      body={
        hasActiveFilters
          ? "Try clearing the search box or relaxing state, country, and department filters, then click Apply filters again."
          : isAgent
            ? "Create an organization to assign agents and group client profiles. Companies you add appear here for browsing and assignment."
            : "Use the form on the left to add your first company, then assign agents to it from the agent directory."
      }
      secondary={
        hasActiveFilters
          ? undefined
          : isAgent
            ? 'Click "New company" above to add your first record.'
            : undefined
      }
    />
  );

  const agentTable = (
    <PortalListTableWrap>
      <PortalListTable>
        <thead>
          <PortalListTheadRow>
            <PortalListTh>Name</PortalListTh>
            <PortalListTh>Location</PortalListTh>
            <PortalListTh>Department</PortalListTh>
            <PortalListTh>City</PortalListTh>
            <PortalListTh>State</PortalListTh>
            <PortalListTh>Country</PortalListTh>
            <PortalListTh className="text-right">Agents</PortalListTh>
          </PortalListTheadRow>
        </thead>
        <tbody>
          {companies.map((c) => (
            <PortalListTr key={c.id}>
              <PortalListTd className="font-medium text-900">
                <Link href={`${pathname}/${c.id}`} className="text-900 no-underline hover:underline">
                  {c.name}
                </Link>
              </PortalListTd>
              <PortalListTd>{c.location || "—"}</PortalListTd>
              <PortalListTd>{c.department || "—"}</PortalListTd>
              <PortalListTd>{c.city || "—"}</PortalListTd>
              <PortalListTd>{c.state || "—"}</PortalListTd>
              <PortalListTd>{c.country || "—"}</PortalListTd>
              <PortalListTd className="text-right text-600 pr-0">{c._count.agents}</PortalListTd>
            </PortalListTr>
          ))}
        </tbody>
      </PortalListTable>
    </PortalListTableWrap>
  );

  const listBlock =
    companies.length > 0 ? (
      isAgent ? (
        agentTable
      ) : (
        <div className="grid">
          {companies.map((c) => (
            <div key={c.id} className="col-12">
              <div className="border-1 surface-border border-round p-3">
                <div className="flex justify-content-between align-items-start gap-3">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-600 text-sm mt-1">
                      {[c.location, c.department].filter(Boolean).join(" · ") || "No location / department"}
                    </div>
                    <div className="text-600 text-sm mt-1">
                      {[c.city, c.state, c.country].filter(Boolean).join(", ") || "No address"}
                    </div>
                    <div className="text-600 text-sm mt-1">{c._count.agents} agent(s)</div>
                  </div>
                  <div className="text-right">
                    <Link href={`${pathname}/${c.id}`} className="font-medium">
                      View / edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    ) : (
      emptyState
    );

  if (isAgent) {
    return (
      <div className="flex flex-column gap-4">
        <PortalListPageCard>
          <PortalListHeader
            title="Companies"
            description="Add and browse organizations for assigning clients and profiles. Editing and removing records is available to administrators."
            actions={
              <Link href="/agent/companies/create" className="p-button p-component p-button-success font-medium no-underline">
                <span className="p-button-label p-c">New company</span>
              </Link>
            }
          />
          {filterForm}
        </PortalListPageCard>

        <PortalListPageCard>
          <p className="text-sm text-700 m-0 mb-3">
            Showing {companies.length === 0 ? 0 : (pagination.page - 1) * pagination.pageSize + 1}–
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} companies.
          </p>
          {listBlock}
          <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
        </PortalListPageCard>
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="col-12 lg:col-4">
        <PortalListPageCard>
          <CompanyCreateForm apiUrl={createCompanyUrl} heading="Add company" />
        </PortalListPageCard>
      </div>
      <div className="col-12 lg:col-8">
        <div className="flex flex-column gap-4">
          <PortalListPageCard>
            <PortalListHeader
              title="Companies"
              description="Manage organizations agents can be assigned to. Deleting a company is soft — it is hidden from lists but history is preserved."
            />
            {filterForm}
          </PortalListPageCard>

          <PortalListPageCard>
            <p className="text-sm text-700 m-0 mb-3">
              Showing {companies.length === 0 ? 0 : (pagination.page - 1) * pagination.pageSize + 1}–
              {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} companies.
            </p>
            {listBlock}
            <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
          </PortalListPageCard>
        </div>
      </div>
    </div>
  );
}
