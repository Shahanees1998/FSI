"use client";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
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
import { useMemo, useState, useEffect } from "react";
import {
  DEMO_CLIENTS,
  DEMO_POLICIES,
  DEMO_POLICY_PROGRESS_BUCKETS,
  DemoClientRow,
} from "@/lib/agentClientsDemoData";
import { US_STATE_OPTIONS } from "@/lib/usStates";

const PAGE_SIZE = 5;

const STATE_FILTER_OPTIONS = [{ label: "Any state", value: "" }, ...US_STATE_OPTIONS];

function uniqueCities(clients: DemoClientRow[]): { label: string; value: string }[] {
  const set = new Set(clients.map((c) => c.city).filter(Boolean));
  return [{ label: "Any city", value: "" }, ...Array.from(set).sort().map((city) => ({ label: city, value: city }))];
}

function matchesProgressBucket(p: number, bucket: string): boolean {
  if (!bucket) return true;
  if (bucket === "low") return p <= 33;
  if (bucket === "mid") return p >= 34 && p <= 66;
  if (bucket === "high") return p >= 67;
  return true;
}

export default function AgentClientsDemoSections() {
  const cityOptions = useMemo(() => uniqueCities(DEMO_CLIENTS), []);

  const [clientQ, setClientQ] = useState("");
  const [clientState, setClientState] = useState<string>("");
  const [clientCity, setClientCity] = useState<string>("");
  const [clientPage, setClientPage] = useState(1);

  const [policyQ, setPolicyQ] = useState("");
  const [policyStatus, setPolicyStatus] = useState<string>("");
  const [policyProgress, setPolicyProgress] = useState<string>("");
  const [policyPage, setPolicyPage] = useState(1);

  const filteredClients = useMemo(() => {
    const q = clientQ.trim().toLowerCase();
    return DEMO_CLIENTS.filter((c) => {
      if (clientState && c.state !== clientState) return false;
      if (clientCity && c.city !== clientCity) return false;
      if (!q) return true;
      return (
        c.displayName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.replace(/\D/g, "").includes(q.replace(/\D/g, "")) ||
        c.phone.toLowerCase().includes(q)
      );
    });
  }, [clientQ, clientState, clientCity]);

  const filteredPolicies = useMemo(() => {
    const q = policyQ.trim().toLowerCase();
    return DEMO_POLICIES.filter((p) => {
      if (policyStatus === "DRAFT" && p.status !== "DRAFT") return false;
      if (policyStatus === "SUBMITTED" && p.status !== "SUBMITTED") return false;
      if (!matchesProgressBucket(p.progressPercent, policyProgress)) return false;
      if (!q) return true;
      return p.summaryLabel.toLowerCase().includes(q);
    });
  }, [policyQ, policyStatus, policyProgress]);

  useEffect(() => {
    setClientPage(1);
  }, [clientQ, clientState, clientCity]);

  useEffect(() => {
    setPolicyPage(1);
  }, [policyQ, policyStatus, policyProgress]);

  const clientTotalPages = Math.max(1, Math.ceil(filteredClients.length / PAGE_SIZE));
  const clientSlice = useMemo(() => {
    const start = (clientPage - 1) * PAGE_SIZE;
    return filteredClients.slice(start, start + PAGE_SIZE);
  }, [filteredClients, clientPage]);

  const policyTotalPages = Math.max(1, Math.ceil(filteredPolicies.length / PAGE_SIZE));
  const policySlice = useMemo(() => {
    const start = (policyPage - 1) * PAGE_SIZE;
    return filteredPolicies.slice(start, start + PAGE_SIZE);
  }, [filteredPolicies, policyPage]);

  const policyStatusOptions = [
    { label: "Any status", value: "" },
    { label: "Draft", value: "DRAFT" },
    { label: "Submitted", value: "SUBMITTED" },
  ];

  return (
    <div className="flex flex-column gap-5 mt-5">
      <PortalListPageCard>
        <div className="mb-4">
          <h2 className="text-xl font-semibold m-0 text-900">Sample clients (demo)</h2>
          <p className="text-600 m-0 mt-2 text-sm">
            Illustrative list with filters and pagination — not saved to your account.
          </p>
        </div>

        <div className={PORTAL_FILTER_FORM_CLASS}>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
            <InputText
              className="w-full"
              placeholder="Name, email, or phone"
              value={clientQ}
              onChange={(e) => setClientQ(e.target.value)}
            />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>State</label>
            <Dropdown
              className="w-full"
              value={clientState}
              options={STATE_FILTER_OPTIONS}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => setClientState(e.value ?? "")}
            />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>City</label>
            <Dropdown
              className="w-full"
              value={clientCity}
              options={cityOptions}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => setClientCity(e.value ?? "")}
              filter
            />
          </div>
        </div>

        {clientSlice.length === 0 ? (
          <p className="text-600 m-0">No demo clients match the filters.</p>
        ) : (
          <PortalListTableWrap>
            <PortalListTable>
              <thead>
                <PortalListTheadRow>
                  <PortalListTh>Name</PortalListTh>
                  <PortalListTh>Email</PortalListTh>
                  <PortalListTh>Phone</PortalListTh>
                  <PortalListTh>City</PortalListTh>
                  <PortalListTh>State</PortalListTh>
                  <PortalListTh>Updated</PortalListTh>
                </PortalListTheadRow>
              </thead>
              <tbody>
                {clientSlice.map((c) => (
                  <PortalListTr key={c.id}>
                    <PortalListTd>{c.displayName}</PortalListTd>
                    <PortalListTd>{c.email}</PortalListTd>
                    <PortalListTd>{c.phone}</PortalListTd>
                    <PortalListTd>{c.city}</PortalListTd>
                    <PortalListTd>{c.state}</PortalListTd>
                    <PortalListTd className="text-600">{c.updatedAt}</PortalListTd>
                  </PortalListTr>
                ))}
              </tbody>
            </PortalListTable>
          </PortalListTableWrap>
        )}

        {filteredClients.length > PAGE_SIZE ? (
          <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
            <span className="text-600 text-sm">
              Page {clientPage} of {clientTotalPages} ({filteredClients.length} rows)
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                label="Previous"
                outlined
                disabled={clientPage <= 1}
                onClick={() => setClientPage((p) => Math.max(1, p - 1))}
              />
              <Button
                type="button"
                label="Next"
                disabled={clientPage >= clientTotalPages}
                onClick={() => setClientPage((p) => Math.min(clientTotalPages, p + 1))}
              />
            </div>
          </div>
        ) : null}
      </PortalListPageCard>

      <PortalListPageCard>
        <div className="mb-4">
          <h2 className="text-xl font-semibold m-0 text-900">Sample policies (demo)</h2>
          <p className="text-600 m-0 mt-2 text-sm">
            Illustrative policy submissions — not linked to live policy data.
          </p>
        </div>

        <div className={PORTAL_FILTER_FORM_CLASS}>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search summary</label>
            <InputText
              className="w-full"
              placeholder="Filter by summary text"
              value={policyQ}
              onChange={(e) => setPolicyQ(e.target.value)}
            />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Status</label>
            <Dropdown
              className="w-full"
              value={policyStatus}
              options={policyStatusOptions}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => setPolicyStatus(e.value ?? "")}
            />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Progress</label>
            <Dropdown
              className="w-full"
              value={policyProgress}
              options={[...DEMO_POLICY_PROGRESS_BUCKETS]}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => setPolicyProgress(e.value ?? "")}
            />
          </div>
        </div>

        {policySlice.length === 0 ? (
          <p className="text-600 m-0">No demo policies match the filters.</p>
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
                {policySlice.map((p) => (
                  <PortalListTr key={p.id}>
                    <PortalListTd className="font-medium">{p.summaryLabel}</PortalListTd>
                    <PortalListTd>
                      <span className={p.status === "SUBMITTED" ? "text-green-700 font-medium" : "text-orange-600 font-medium"}>
                        {p.status === "SUBMITTED" ? "Submitted" : "Draft"}
                      </span>
                    </PortalListTd>
                    <PortalListTd>{p.progressPercent}%</PortalListTd>
                    <PortalListTd className="text-600">{p.updatedAt}</PortalListTd>
                  </PortalListTr>
                ))}
              </tbody>
            </PortalListTable>
          </PortalListTableWrap>
        )}

        {filteredPolicies.length > PAGE_SIZE ? (
          <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
            <span className="text-600 text-sm">
              Page {policyPage} of {policyTotalPages} ({filteredPolicies.length} rows)
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                label="Previous"
                outlined
                disabled={policyPage <= 1}
                onClick={() => setPolicyPage((p) => Math.max(1, p - 1))}
              />
              <Button
                type="button"
                label="Next"
                disabled={policyPage >= policyTotalPages}
                onClick={() => setPolicyPage((p) => Math.min(policyTotalPages, p + 1))}
              />
            </div>
          </div>
        ) : null}
      </PortalListPageCard>
    </div>
  );
}
