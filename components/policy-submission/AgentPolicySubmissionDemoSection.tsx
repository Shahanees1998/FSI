"use client";

import { Button } from "primereact/button";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  PORTAL_FILTER_ACTIONS_CLASS,
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
import {
  DEMO_POLICY_SUBMISSIONS,
  DemoPolicySubmissionRow,
} from "@/lib/agentPolicySubmissionDemoData";

const PAGE_SIZE = 10;

function matchesProgressBucket(p: number, bucket: string): boolean {
  if (!bucket) return true;
  if (bucket === "low") return p <= 33;
  if (bucket === "mid") return p >= 34 && p <= 66;
  if (bucket === "high") return p >= 67;
  return true;
}

export default function AgentPolicySubmissionDemoSection() {
  const [draft, setDraft] = useState({
    q: "",
    status: "",
    progress: "",
  });
  const [applied, setApplied] = useState({
    q: "",
    status: "",
    progress: "",
  });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const t = applied.q.trim().toLowerCase();
    return DEMO_POLICY_SUBMISSIONS.filter((row: DemoPolicySubmissionRow) => {
      if (applied.status && row.status !== applied.status) return false;
      if (!matchesProgressBucket(row.progressPercent, applied.progress)) return false;
      if (!t) return true;
      return row.summaryLabel.toLowerCase().includes(t);
    });
  }, [applied]);

  useEffect(() => {
    setPage(1);
  }, [applied]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const slice = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApplied({ ...draft });
  };

  const resetFilters = () => {
    const empty = { q: "", status: "", progress: "" };
    setDraft(empty);
    setApplied(empty);
    setPage(1);
  };

  return (
    <PortalListPageCard>
      <div className="mb-4">
        <h2 className="text-xl font-semibold m-0 text-900">Sample policy submissions (demo)</h2>
        <p className="text-600 m-0 mt-2 text-sm">
          Extra illustrative rows for layout — same columns as above; not stored in the database.
        </p>
      </div>

      <form className={PORTAL_FILTER_FORM_CLASS} onSubmit={applyFilters}>
        <div className="col-12 md:col-4">
          <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
          <input
            type="search"
            className="p-inputtext p-component w-full"
            placeholder="Summary text…"
            value={draft.q}
            onChange={(e) => setDraft((prev) => ({ ...prev, q: e.target.value }))}
          />
        </div>
        <div className="col-12 md:col-4">
          <label className={PORTAL_FILTER_LABEL_CLASS}>Status</label>
          <select
            className="w-full p-inputtext p-component"
            value={draft.status}
            onChange={(e) => setDraft((prev) => ({ ...prev, status: e.target.value }))}
          >
            <option value="">Any status</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
          </select>
        </div>
        <div className="col-12 md:col-4">
          <label className={PORTAL_FILTER_LABEL_CLASS}>Progress</label>
          <select
            className="w-full p-inputtext p-component"
            value={draft.progress}
            onChange={(e) => setDraft((prev) => ({ ...prev, progress: e.target.value }))}
          >
            <option value="">Any progress</option>
            <option value="low">0-33%</option>
            <option value="mid">34-66%</option>
            <option value="high">67-100%</option>
          </select>
        </div>
        <div className={PORTAL_FILTER_ACTIONS_CLASS}>
          <button type="submit" className="p-button p-component">
            <span className="p-button-label">Apply filters</span>
          </button>
          <button type="button" className="p-button p-component p-button-text" onClick={resetFilters}>
            <span className="p-button-label">Reset</span>
          </button>
        </div>
      </form>

      {slice.length === 0 ? (
        <p className="text-600 m-0">No demo policy submissions match the filters.</p>
      ) : (
        <PortalListTableWrap>
          <PortalListTable>
            <thead>
              <PortalListTheadRow>
                <PortalListTh>Summary</PortalListTh>
                <PortalListTh>Status</PortalListTh>
                <PortalListTh>Progress</PortalListTh>
                <PortalListTh>Updated</PortalListTh>
              </PortalListTheadRow>
            </thead>
            <tbody>
              {slice.map((row) => (
                <PortalListTr key={row.id}>
                  <PortalListTd className="font-medium">{row.summaryLabel}</PortalListTd>
                  <PortalListTd>
                    <span
                      className={
                        row.status === "SUBMITTED" ? "text-green-700 font-medium" : "text-orange-600 font-medium"
                      }
                    >
                      {row.status === "SUBMITTED" ? "Submitted" : "Draft"}
                    </span>
                  </PortalListTd>
                  <PortalListTd>{row.progressPercent}%</PortalListTd>
                  <PortalListTd className="text-600">{row.updatedAt}</PortalListTd>
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
