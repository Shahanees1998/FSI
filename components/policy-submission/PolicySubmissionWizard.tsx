"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useRef, useState } from "react";
import FormProgressRing from "@/components/policy-submission/FormProgressRing";
import {
  computePolicySubmissionProgress,
  isPolicySectionComplete,
  PolicySectionId,
  PolicySubmissionFormData,
} from "@/lib/policySubmissionForm";
import { US_STATE_OPTIONS } from "@/lib/usStates";

const PRODUCT_OPTIONS = [
  { label: "Term life", value: "Term life" },
  { label: "Whole life", value: "Whole life" },
  { label: "Universal life", value: "Universal life" },
  { label: "Critical illness", value: "Critical illness" },
  { label: "Disability", value: "Disability" },
  { label: "Indexed universal life", value: "Indexed universal life" },
];

/** Sample clients (first + last) until linked to Client Profiles. */
const DUMMY_CLIENTS: { id: string; firstName: string; lastName: string; label: string }[] = [
  { id: "dc-sarah-mitchell", firstName: "Sarah", lastName: "Mitchell", label: "Sarah Mitchell" },
  { id: "dc-james-chen", firstName: "James", lastName: "Chen", label: "James Chen" },
  { id: "dc-emily-rodriguez", firstName: "Emily", lastName: "Rodriguez", label: "Emily Rodriguez" },
  { id: "dc-michael-obrien", firstName: "Michael", lastName: "O'Brien", label: "Michael O'Brien" },
  { id: "dc-priya-patel", firstName: "Priya", lastName: "Patel", label: "Priya Patel" },
];

/** Placeholder carriers until live company list is wired in. */
const DUMMY_COMPANIES: { id: string; name: string }[] = [
  { id: "dummy-acme", name: "Acme Insurance Group" },
  { id: "dummy-summit", name: "Summit Financial Partners" },
  { id: "dummy-harbor", name: "Harbor Life & Health" },
  { id: "dummy-metro", name: "Metro Brokerage Network" },
];

const SECTION_NAV: { id: string; label: string; section: PolicySectionId }[] = [
  { id: "section-applicant", label: "Applicant", section: "applicant" },
  { id: "section-company", label: "Company", section: "company" },
  { id: "section-client", label: "Client", section: "client" },
  { id: "section-documents", label: "Documents", section: "documents" },
];

function SectionNavRow({
  href,
  label,
  complete,
}: {
  href: string;
  label: string;
  complete: boolean;
}) {
  return (
    <a
      href={href}
      className="flex align-items-center gap-2 py-2 px-2 border-round no-underline"
      style={{ color: "inherit" }}
    >
      <span
        className="flex align-items-center justify-content-center flex-shrink-0 border-circle"
        style={{
          width: "1.25rem",
          height: "1.25rem",
          border: complete ? "2px solid #ca8a04" : "2px solid #d1d5db",
          background: complete ? "linear-gradient(145deg, #fef9c3 0%, #fde047 55%, #eab308 100%)" : "#f3f4f6",
          boxShadow: complete ? "inset 0 1px 0 rgba(255,255,255,0.6)" : "none",
        }}
        aria-hidden
      >
        {complete ? <i className="pi pi-check" style={{ fontSize: "0.65rem", color: "#854d0e" }} /> : null}
      </span>
      <span className={`text-sm ${complete ? "text-yellow-900 font-semibold" : "text-600"}`}>{label}</span>
    </a>
  );
}

function emptyForm(): PolicySubmissionFormData {
  return {
    applicant: {},
    company: {},
    client: {},
    documents: {},
  };
}

/** Single-page form: all steps visible; `currentStep` stored as 3 (complete layout). */
const SINGLE_PAGE_STEP = 3;

export default function PolicySubmissionWizard({
  policyId,
  initialForm,
  initialStep: _initialStep,
  initialStatus,
  defaultAgentName,
}: {
  policyId: string;
  initialForm: PolicySubmissionFormData;
  initialStep: number;
  initialStatus: "DRAFT" | "SUBMITTED";
  defaultAgentName: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<PolicySubmissionFormData>(() => ({
    ...emptyForm(),
    ...initialForm,
    applicant: { agentName: defaultAgentName, ...initialForm.applicant },
  }));
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSplit, setShowSplit] = useState(Boolean(initialForm.applicant?.splitAgent?.trim()));
  const [showTrainee, setShowTrainee] = useState(Boolean(initialForm.applicant?.traineeNote?.trim()));

  const isFirstRun = useRef(true);

  const progress = computePolicySubmissionProgress(form);

  const monthlyDisplay = (() => {
    const raw = form.client?.annualPremium?.replace(/[^0-9.]/g, "") ?? "";
    const n = Number.parseFloat(raw);
    if (!Number.isFinite(n) || n <= 0) return "0";
    return (n / 12).toLocaleString(undefined, { maximumFractionDigits: 2 });
  })();

  const persist = useCallback(
    async (opts?: { status?: "DRAFT" | "SUBMITTED" }) => {
      setSaving(true);
      try {
        const res = await fetch(`/api/agent/policy-submissions/${policyId}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formData: form,
            currentStep: SINGLE_PAGE_STEP,
            ...(opts?.status ? { status: opts.status } : {}),
          }),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          window.alert(typeof j.error === "string" ? j.error : "Save failed.");
        } else {
          router.refresh();
        }
      } finally {
        setSaving(false);
      }
    },
    [form, policyId, router]
  );

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const t = window.setTimeout(() => {
      void persist();
    }, 550);
    return () => window.clearTimeout(t);
  }, [form, persist]);

  const patchSection = <K extends keyof PolicySubmissionFormData>(
    key: K,
    partial: PolicySubmissionFormData[K]
  ) => {
    setForm((prev) => {
      const prevSec = (prev[key] ?? {}) as object;
      return {
        ...prev,
        [key]: { ...prevSec, ...((partial ?? {}) as object) },
      };
    });
  };

  const complete = async () => {
    setSubmitting(true);
    await persist({ status: "SUBMITTED" });
    setSubmitting(false);
    router.push("/agent/policy-submission");
    router.refresh();
  };

  return (
    <div className="grid">
      <div className="col-12 lg:col-3">
        <div
          className="surface-card border-round border-1 surface-border p-3 flex flex-column gap-3"
          style={{ position: "sticky", top: "1rem", alignSelf: "flex-start" }}
        >
          <p className="text-600 text-xs m-0 font-semibold uppercase">Sections</p>
          <nav className="flex flex-column" aria-label="Jump to section">
            {SECTION_NAV.map(({ id, label, section }) => (
              <SectionNavRow
                key={id}
                href={`#${id}`}
                label={label}
                complete={isPolicySectionComplete(form, section)}
              />
            ))}
          </nav>
          <div className="border-top-1 surface-border pt-3 flex flex-column align-items-center gap-2">
            <span className="text-600 text-xs font-medium">Completion</span>
            <FormProgressRing percent={progress} />
          </div>
        </div>
      </div>

      <div className="col-12 lg:col-9">
        <div className="surface-card border-round border-1 surface-border p-4">
          <p className="text-600 text-sm mt-0 mb-4">
            Life, critical illness & disability insurance —{" "}
            <span className="text-900 font-medium">{initialStatus === "SUBMITTED" ? "Submitted" : "Draft"}</span>
            {saving ? <span className="ml-2 text-primary">Saving…</span> : null}
          </p>

          <section id="section-applicant" className="mb-5 scroll-mt-3">
            <h2 className="text-xl text-orange-600 mt-0 mb-4">Applicant information</h2>
            <div className="grid">
              <div className="col-12 md:col-6">
                <label className="block mb-2 font-medium">Agent name</label>
                <InputText
                  className="w-full"
                  value={form.applicant?.agentName ?? ""}
                  onChange={(e) => patchSection("applicant", { agentName: e.target.value })}
                />
              </div>
              <div className="col-12 md:col-6">
                <label className="block mb-2 font-medium">State deal signed at</label>
                <Dropdown
                  className="w-full"
                  value={form.applicant?.stateDealSignedAt ?? null}
                  options={US_STATE_OPTIONS}
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select state"
                  showClear
                  onChange={(e) => patchSection("applicant", { stateDealSignedAt: e.value ?? "" })}
                />
              </div>
              <div className="col-12 flex flex-column gap-2">
                <button
                  type="button"
                  className="p-0 border-none bg-transparent text-orange-600 text-left cursor-pointer underline text-sm"
                  onClick={() => setShowSplit((v) => !v)}
                >
                  + Split agent
                </button>
                {showSplit ? (
                  <InputText
                    className="w-full md:w-6"
                    placeholder="Split agent name / code"
                    value={form.applicant?.splitAgent ?? ""}
                    onChange={(e) => patchSection("applicant", { splitAgent: e.target.value })}
                  />
                ) : null}
                <button
                  type="button"
                  className="p-0 border-none bg-transparent text-orange-600 text-left cursor-pointer underline text-sm"
                  onClick={() => setShowTrainee((v) => !v)}
                >
                  + Trainee here for credit
                </button>
                {showTrainee ? (
                  <InputText
                    className="w-full md:w-6"
                    placeholder="Trainee note"
                    value={form.applicant?.traineeNote ?? ""}
                    onChange={(e) => patchSection("applicant", { traineeNote: e.target.value })}
                  />
                ) : null}
              </div>
            </div>
          </section>

          <section id="section-company" className="mb-5 scroll-mt-3">
            <h2 className="text-xl text-orange-600 mt-0 mb-4">Company</h2>
            <label className="block mb-2 font-medium">Select company</label>
            <Dropdown
              className="w-full md:w-8"
              value={form.company?.companyId ?? null}
              options={DUMMY_COMPANIES}
              optionLabel="name"
              optionValue="id"
              placeholder="Choose a company"
              filter
              showClear
              onChange={(e) => {
                const id = e.value as string | null;
                const row = DUMMY_COMPANIES.find((c) => c.id === id);
                patchSection("company", { companyId: id ?? "", companyName: row?.name ?? "" });
              }}
            />
          </section>

          <section id="section-client" className="mb-5 scroll-mt-3">
            <h2 className="text-xl text-orange-600 mt-0 mb-4">Client information</h2>
            <div className="grid">
              <div className="col-12 md:col-8">
                <label className="block mb-2 font-medium">Client</label>
                <Dropdown
                  className="w-full"
                  value={form.client?.dummyClientId ?? null}
                  options={DUMMY_CLIENTS}
                  optionLabel="label"
                  optionValue="id"
                  placeholder="Select a client"
                  filter
                  showClear
                  onChange={(e) => {
                    const id = e.value as string | null;
                    const row = DUMMY_CLIENTS.find((c) => c.id === id);
                    if (!row) {
                      patchSection("client", {
                        dummyClientId: "",
                        efaType: "",
                        firstName: "",
                        lastName: "",
                      });
                      return;
                    }
                    patchSection("client", {
                      dummyClientId: row.id,
                      firstName: row.firstName,
                      lastName: row.lastName,
                    });
                  }}
                />
                <p className="text-orange-600 text-sm mt-2 line-height-3">
                  Pick a sample client or enter first and last name manually below.
                </p>
              </div>
              <div className="col-12 md:col-4 lg:col-4">
                <div className="surface-100 border-round p-3">
                  <label className="block font-medium mb-1">Application number</label>
                  <p className="text-600 text-sm m-0">Enter the same as on your signed application.</p>
                </div>
              </div>
              <div className="col-12 md:col-4">
                <label className="block mb-2 font-medium">First name</label>
                <InputText
                  className="w-full"
                  value={form.client?.firstName ?? ""}
                  onChange={(e) =>
                    patchSection("client", { firstName: e.target.value, dummyClientId: "", efaType: "" })
                  }
                />
              </div>
              <div className="col-12 md:col-4">
                <label className="block mb-2 font-medium">Middle name</label>
                <InputText
                  className="w-full"
                  value={form.client?.middleName ?? ""}
                  onChange={(e) => patchSection("client", { middleName: e.target.value })}
                />
              </div>
              <div className="col-12 md:col-4">
                <label className="block mb-2 font-medium">Last name</label>
                <InputText
                  className="w-full"
                  value={form.client?.lastName ?? ""}
                  onChange={(e) =>
                    patchSection("client", { lastName: e.target.value, dummyClientId: "", efaType: "" })
                  }
                />
              </div>
              <div className="col-12 md:col-6">
                <label className="block mb-2 font-medium">Product</label>
                <Dropdown
                  className="w-full"
                  value={form.client?.product ?? null}
                  options={PRODUCT_OPTIONS}
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select product"
                  showClear
                  onChange={(e) => patchSection("client", { product: e.value ?? "" })}
                />
              </div>
              <div className="col-12">
                <button
                  type="button"
                  className="p-0 border-none bg-transparent text-orange-600 text-sm underline"
                  onClick={() => {
                    window.alert("Add rider details in the field below.");
                  }}
                >
                  + Rider
                </button>
                <InputText
                  className="w-full mt-2"
                  placeholder="Riders (optional)"
                  value={form.client?.riders ?? ""}
                  onChange={(e) => patchSection("client", { riders: e.target.value })}
                />
              </div>
              <div className="col-12 md:col-6">
                <label className="block mb-2 font-medium">
                  <i className="pi pi-dollar mr-1" aria-hidden />
                  Annual premium
                </label>
                <InputText
                  className="w-full"
                  value={form.client?.annualPremium ?? ""}
                  onChange={(e) => patchSection("client", { annualPremium: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="col-12 md:col-6 flex align-items-end">
                <span className="text-700 pb-2">
                  = Monthly premium <span className="font-semibold">${monthlyDisplay}</span>
                </span>
              </div>
            </div>
          </section>

          <section id="section-documents" className="mb-2 scroll-mt-3">
            <h2 className="text-xl text-orange-600 mt-0 mb-4">Documents</h2>
            <div className="grid">
              <div className="col-12 md:col-6">
                <label className="block mb-2 font-medium">
                  <i className="pi pi-hashtag mr-1" aria-hidden />
                  Application number
                </label>
                <InputText
                  className="w-full"
                  value={form.documents?.applicationNumber ?? ""}
                  onChange={(e) => patchSection("documents", { applicationNumber: e.target.value })}
                />
              </div>
              <div className="col-12" />
              <div className="col-12 md:col-6">
                <div className="surface-ground border-round p-3 border-1 surface-border h-full">
                  <div className="flex align-items-center gap-2 mb-2">
                    <i className="pi pi-file text-600" aria-hidden />
                    <span className="font-semibold">Application</span>
                  </div>
                  <div className="flex align-items-center gap-2 mb-2">
                    <Checkbox
                      inputId="app-esig"
                      checked={Boolean(form.documents?.applicationIncludesESig)}
                      onChange={(e) => patchSection("documents", { applicationIncludesESig: Boolean(e.checked) })}
                    />
                    <label htmlFor="app-esig" className="text-sm cursor-pointer">
                      Application includes e-signature
                    </label>
                  </div>
                  <p className="text-600 text-sm m-0 mb-2">Drag and drop your file here — PDF only (stored as file name for now).</p>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="w-full text-sm"
                    onChange={(e) => {
                      const name = e.target.files?.[0]?.name ?? "";
                      patchSection("documents", { applicationFileName: name });
                    }}
                  />
                  {form.documents?.applicationFileName ? (
                    <p className="text-sm text-700 mt-2 m-0">Selected: {form.documents.applicationFileName}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-12 md:col-6">
                <div className="surface-ground border-round p-3 border-1 surface-border h-full">
                  <div className="flex align-items-center gap-2 mb-2">
                    <i className="pi pi-file text-600" aria-hidden />
                    <span className="font-semibold">E-signature</span>
                  </div>
                  <p className="text-600 text-sm m-0 mb-2">Drag and drop your file here — PDF only (stored as file name for now).</p>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="w-full text-sm"
                    onChange={(e) => {
                      const name = e.target.files?.[0]?.name ?? "";
                      patchSection("documents", { eSignatureFileName: name });
                    }}
                  />
                  {form.documents?.eSignatureFileName ? (
                    <p className="text-sm text-700 mt-2 m-0">Selected: {form.documents.eSignatureFileName}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-12 md:col-6">
                <div className="surface-ground border-round p-3 border-1 surface-border h-full">
                  <div className="flex align-items-center gap-2 mb-2">
                    <i className="pi pi-file text-600" aria-hidden />
                    <span className="font-semibold">Illustration</span>
                  </div>
                  <p className="text-600 text-sm m-0 mb-2">Drag and drop your file here — PDF only (stored as file name for now).</p>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="w-full text-sm"
                    onChange={(e) => {
                      const name = e.target.files?.[0]?.name ?? "";
                      patchSection("documents", { illustrationFileName: name });
                    }}
                  />
                  {form.documents?.illustrationFileName ? (
                    <p className="text-sm text-700 mt-2 m-0">Selected: {form.documents.illustrationFileName}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-12 md:col-6">
                <div className="surface-ground border-round p-3 border-1 surface-border h-full">
                  <div className="flex align-items-center gap-2 mb-2">
                    <i className="pi pi-file text-600" aria-hidden />
                    <span className="font-semibold">Banking information</span>
                  </div>
                  <div className="flex align-items-center gap-2 mb-2">
                    <Checkbox
                      inputId="bank-in-app"
                      checked={Boolean(form.documents?.bankingInApplication)}
                      onChange={(e) => patchSection("documents", { bankingInApplication: Boolean(e.checked) })}
                    />
                    <label htmlFor="bank-in-app" className="text-sm cursor-pointer">
                      Banking information is included in application
                    </label>
                  </div>
                  <p className="text-600 text-sm m-0 mb-2">Drag and drop your file here — PDF only (stored as file name for now).</p>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="w-full text-sm"
                    onChange={(e) => {
                      const name = e.target.files?.[0]?.name ?? "";
                      patchSection("documents", { bankingFileName: name });
                    }}
                  />
                  {form.documents?.bankingFileName ? (
                    <p className="text-sm text-700 mt-2 m-0">Selected: {form.documents.bankingFileName}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-12">
                <div className="flex align-items-center gap-2">
                  <Checkbox
                    inputId="replace-pol"
                    checked={Boolean(form.documents?.replacesAnotherPolicy)}
                    onChange={(e) => patchSection("documents", { replacesAnotherPolicy: Boolean(e.checked) })}
                  />
                  <label htmlFor="replace-pol" className="cursor-pointer">
                    This policy is to replace another policy
                  </label>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
          <Button
            type="button"
            label="Cancel"
            icon="pi pi-times"
            severity="secondary"
            text
            onClick={() => {
              if (window.confirm("Leave this policy submission? Your changes are saved automatically.")) {
                router.push("/agent/policy-submission");
              }
            }}
          />
          <Button
            type="button"
            label="Complete"
            icon="pi pi-check"
            loading={submitting}
            disabled={submitting || saving}
            onClick={() => void complete()}
          />
        </div>

        <div className="mt-3">
          <Link href="/agent/policy-submission" className="text-sm text-600">
            ← Back to policy submissions
          </Link>
        </div>
      </div>
    </div>
  );
}
