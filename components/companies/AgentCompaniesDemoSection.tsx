"use client";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useMemo, useState, useEffect } from "react";
import {
  PORTAL_FILTER_FORM_CLASS,
  PORTAL_FILTER_LABEL_CLASS,
  PortalListPageCard,
  PortalListTable,
  PortalListTableWrap,
  PortalListTd,
  PortalListTh,
  PortalListTheadRow,
  PortalListTr,
} from "@/components/portal/PortalListLayout";
import { DEMO_AGENT_COMPANIES, DemoCompanyRow } from "@/lib/agentCompaniesDemoData";
import { US_STATE_OPTIONS } from "@/lib/usStates";

const PAGE_SIZE = 4;

const STATE_FILTER_OPTIONS = [{ label: "Any state", value: "" }, ...US_STATE_OPTIONS];

function uniqueCountries(rows: DemoCompanyRow[]) {
  const set = new Set(rows.map((r) => r.country).filter(Boolean) as string[]);
  return [{ label: "Any country", value: "" }, ...Array.from(set).sort().map((c) => ({ label: c, value: c }))];
}

function uniqueDepartments(rows: DemoCompanyRow[]) {
  const set = new Set(rows.map((r) => r.department).filter(Boolean) as string[]);
  return [{ label: "Any department", value: "" }, ...Array.from(set).sort().map((d) => ({ label: d, value: d }))];
}

export default function AgentCompaniesDemoSection() {
  const countryOptions = useMemo(() => uniqueCountries(DEMO_AGENT_COMPANIES), []);
  const departmentOptions = useMemo(() => uniqueDepartments(DEMO_AGENT_COMPANIES), []);

  const [q, setQ] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return DEMO_AGENT_COMPANIES.filter((c) => {
      if (state && c.state !== state) return false;
      if (country && (c.country || "") !== country) return false;
      if (department && (c.department || "") !== department) return false;
      if (!t) return true;
      const blob = [c.name, c.location, c.department, c.city, c.country]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(t);
    });
  }, [q, state, country, department]);

  useEffect(() => {
    setPage(1);
  }, [q, state, country, department]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const slice = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <PortalListPageCard>
      <div className="mb-4">
        <h2 className="text-xl font-semibold m-0 text-900">Sample companies (demo)</h2>
        <p className="text-600 m-0 mt-2 text-sm">
          Illustrative organizations — not saved to your database. Filters and pagination below.
        </p>
      </div>

      <div className={PORTAL_FILTER_FORM_CLASS}>
        <div className="col-12 md:col-6 lg:col-3">
          <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
          <InputText
            className="w-full"
            placeholder="Name, location, department, city…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <label className={PORTAL_FILTER_LABEL_CLASS}>State</label>
          <Dropdown
            className="w-full"
            value={state}
            options={STATE_FILTER_OPTIONS}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setState(e.value ?? "")}
          />
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <label className={PORTAL_FILTER_LABEL_CLASS}>Country</label>
          <Dropdown
            className="w-full"
            value={country}
            options={countryOptions}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setCountry(e.value ?? "")}
            filter
          />
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <label className={PORTAL_FILTER_LABEL_CLASS}>Department</label>
          <Dropdown
            className="w-full"
            value={department}
            options={departmentOptions}
            optionLabel="label"
            optionValue="value"
            onChange={(e) => setDepartment(e.value ?? "")}
            filter
          />
        </div>
      </div>

      {slice.length === 0 ? (
        <p className="text-600 m-0">No demo companies match the filters.</p>
      ) : (
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
              {slice.map((c) => (
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
      )}

      {filtered.length > PAGE_SIZE ? (
        <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
          <span className="text-600 text-sm">
            Page {page} of {totalPages} ({filtered.length} rows)
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
    </PortalListPageCard>
  );
}
