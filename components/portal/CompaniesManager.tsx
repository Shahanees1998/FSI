"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import CompanyCreateForm from "@/components/portal/CompanyCreateForm";
import {
  PORTAL_FILTER_ACTIONS_CLASS,
  PORTAL_FILTER_FORM_CLASS,
  PORTAL_FILTER_LABEL_CLASS,
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
import { US_STATE_OPTIONS } from "@/lib/usStates";

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
    <form
      className={isAgent ? PORTAL_FILTER_FORM_CLASS : "grid m-0 gap-2 w-full"}
      action={pathname}
      method="get"
    >
      <input type="hidden" name="page" value="1" />
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
        {isAgent ? (
          <input
            type="search"
            name="q"
            placeholder="Name, location, department…"
            defaultValue={filters.q || ""}
            className="p-inputtext p-component w-full"
          />
        ) : (
          <InputText name="q" className="w-full" placeholder="Name, location, department…" defaultValue={filters.q || ""} />
        )}
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>State</label>
        <select name="state" className="w-full p-inputtext p-component" defaultValue={filters.state || ""}>
          <option value="">Any state</option>
          {US_STATE_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Country</label>
        {isAgent ? (
          <input
            type="text"
            name="country"
            placeholder="Contains…"
            defaultValue={filters.country || ""}
            className="p-inputtext p-component w-full"
          />
        ) : (
          <InputText name="country" className="w-full" placeholder="Contains…" defaultValue={filters.country || ""} />
        )}
      </div>
      <div className="col-12 md:col-6 lg:col-3">
        <label className={PORTAL_FILTER_LABEL_CLASS}>Department</label>
        {isAgent ? (
          <input
            type="text"
            name="department"
            placeholder="Contains…"
            defaultValue={filters.department || ""}
            className="p-inputtext p-component w-full"
          />
        ) : (
          <InputText name="department" className="w-full" placeholder="Contains…" defaultValue={filters.department || ""} />
        )}
      </div>
      <div className={isAgent ? PORTAL_FILTER_ACTIONS_CLASS : "col-12 flex gap-2 align-items-end"}>
        <button type="submit" className="p-button p-component">
          <span className="p-button-label">Apply filters</span>
        </button>
        <Link href={pathname} className="p-button p-component p-button-text">
          <span className="p-button-label">Reset</span>
        </Link>
      </div>
    </form>
  );

  const listBlock =
    companies.length > 0 ? (
      isAgent ? (
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
                  <PortalListTd className="font-medium text-900">{c.name}</PortalListTd>
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
      <p className="text-600 mb-0">
        {hasActiveFilters
          ? "No companies match your filters."
          : isAgent
            ? "No companies yet. Create one to get started."
            : "No companies yet. Use the form on the left to add your first company, then assign agents to it from the agent directory."}
      </p>
    );

  if (isAgent) {
    return (
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

        {listBlock}

        <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
      </PortalListPageCard>
    );
  }

  return (
    <div className="grid">
      <div className="col-12 lg:col-4">
        <div className="surface-card border-round border-1 surface-border p-4">
          <CompanyCreateForm apiUrl={createCompanyUrl} heading="Add company" />
        </div>
      </div>
      <div className="col-12 lg:col-8">
        <div className="surface-card border-round border-1 surface-border p-4">
          <div className="flex flex-column lg:flex-row lg:justify-content-between lg:align-items-center gap-3 mb-4">
            <div>
              <h3 className="mt-0 mb-2">Companies</h3>
              <p className="m-0 text-600">
                Manage organizations agents can be assigned to. Deleting a company is soft — it is hidden from lists but
                history is preserved.
              </p>
            </div>
            {filterForm}
          </div>
          {listBlock}
          <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
        </div>
      </div>
    </div>
  );
}
