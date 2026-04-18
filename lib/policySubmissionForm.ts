/** Client-side shape for policy submission wizard JSON. Kept JSON-serializable. */
export type PolicySubmissionFormData = {
  applicant?: {
    agentName?: string;
    stateDealSignedAt?: string;
    splitAgent?: string;
    traineeNote?: string;
  };
  company?: {
    companyId?: string;
    companyName?: string;
  };
  client?: {
    /** Selected dummy / preset client row id (optional). */
    dummyClientId?: string;
    /** @deprecated Legacy EFA field; kept for old saved JSON */
    efaType?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    product?: string;
    riders?: string;
    annualPremium?: string;
    monthlyPremium?: string;
  };
  documents?: {
    applicationNumber?: string;
    applicationIncludesESig?: boolean;
    applicationFileName?: string | null;
    eSignatureFileName?: string | null;
    illustrationFileName?: string | null;
    bankingInApplication?: boolean;
    bankingFileName?: string | null;
    replacesAnotherPolicy?: boolean;
  };
};

export const POLICY_SUBMISSION_STEPS = [
  { id: 0, label: "Applicant" },
  { id: 1, label: "Company" },
  { id: 2, label: "Client" },
  { id: 3, label: "Documents" },
] as const;

export type PolicySectionId = "applicant" | "company" | "client" | "documents";

function nonEmpty(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === "boolean") return true;
  if (typeof v === "string") return v.trim().length > 0;
  return false;
}

function clientIdentityComplete(f: PolicySubmissionFormData): boolean {
  const c = f.client;
  if (nonEmpty(c?.dummyClientId)) return true;
  if (nonEmpty(c?.efaType)) return true;
  return nonEmpty(c?.firstName) && nonEmpty(c?.lastName);
}

/** Per-section completion for sidebar checkmarks (golden when complete). */
export function isPolicySectionComplete(
  form: PolicySubmissionFormData | null | undefined,
  section: PolicySectionId
): boolean {
  const f = form ?? {};
  switch (section) {
    case "applicant":
      return nonEmpty(f.applicant?.agentName) && nonEmpty(f.applicant?.stateDealSignedAt);
    case "company":
      return nonEmpty(f.company?.companyId) || nonEmpty(f.company?.companyName);
    case "client":
      return (
        clientIdentityComplete(f) &&
        nonEmpty(f.client?.product) &&
        nonEmpty(f.client?.annualPremium)
      );
    case "documents": {
      const d = f.documents;
      return (
        nonEmpty(d?.applicationNumber) &&
        d?.applicationIncludesESig !== undefined &&
        nonEmpty(d?.applicationFileName) &&
        nonEmpty(d?.eSignatureFileName) &&
        nonEmpty(d?.illustrationFileName) &&
        d?.bankingInApplication !== undefined &&
        (nonEmpty(d?.bankingFileName) || d?.bankingInApplication === true) &&
        d?.replacesAnotherPolicy !== undefined
      );
    }
    default:
      return false;
  }
}

/** Weighted completion 0–100 across all sections (matches reference UI behavior). */
export function computePolicySubmissionProgress(form: PolicySubmissionFormData | null | undefined): number {
  const f = form ?? {};
  const checks: boolean[] = [
    nonEmpty(f.applicant?.agentName),
    nonEmpty(f.applicant?.stateDealSignedAt),
    nonEmpty(f.company?.companyId) || nonEmpty(f.company?.companyName),
    clientIdentityComplete(f),
    nonEmpty(f.client?.firstName),
    nonEmpty(f.client?.lastName),
    nonEmpty(f.client?.product),
    nonEmpty(f.client?.annualPremium),
    nonEmpty(f.documents?.applicationNumber),
    Boolean(f.documents?.applicationIncludesESig !== undefined),
    nonEmpty(f.documents?.applicationFileName),
    nonEmpty(f.documents?.eSignatureFileName),
    nonEmpty(f.documents?.illustrationFileName),
    Boolean(f.documents?.bankingInApplication !== undefined),
    nonEmpty(f.documents?.bankingFileName) || f.documents?.bankingInApplication === true,
    Boolean(f.documents?.replacesAnotherPolicy !== undefined),
  ];

  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 100);
}

export function parseFormDataJson(raw: unknown): PolicySubmissionFormData {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as PolicySubmissionFormData;
  }
  return {};
}

/** Shown in policy submission list and used for simple search. */
export function buildSummaryLabel(form: PolicySubmissionFormData | null | undefined): string {
  const f = form ?? {};
  const c = f.client;
  const name = [c?.firstName, c?.lastName].filter((s) => s && String(s).trim()).join(" ");
  const parts = [name.trim(), c?.product].filter((s) => s && String(s).trim());
  return parts.join(" · ") || "Policy submission";
}
