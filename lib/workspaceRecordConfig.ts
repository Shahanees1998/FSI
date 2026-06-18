import { WorkspaceRecordType } from "@prisma/client";

export type WorkspaceColumnFormat = "text" | "date" | "currency" | "boolean";

export interface WorkspaceColumn {
  key: string;
  label: string;
  format?: WorkspaceColumnFormat;
}

export interface WorkspaceFormField {
  key: string;
  label: string;
  type?: "text" | "date" | "select" | "email" | "number";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface WorkspaceFilterField {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "select";
  options?: { label: string; value: string }[];
}

export interface WorkspaceRecordTypeConfig {
  recordType: WorkspaceRecordType;
  title: string;
  description: string;
  pathname: string;
  columns: WorkspaceColumn[];
  filterFields?: WorkspaceFilterField[];
  formFields?: WorkspaceFormField[];
  allowCreate?: boolean;
}

export const WORKSPACE_RECORD_CONFIGS: Record<WorkspaceRecordType, WorkspaceRecordTypeConfig> = {
  INSURANCE: {
    recordType: "INSURANCE",
    title: "Insurance list",
    description: "Track insurance policies and premium activity.",
    pathname: "/agent/my-business/insurance",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "policyNumber", label: "Policy #" },
      { key: "associate", label: "Associate" },
      { key: "metadata.shareAssociate", label: "Share associate" },
      { key: "recordDate", label: "Created", format: "date" },
      { key: "paidDate", label: "Paid date", format: "date" },
      { key: "company", label: "Company" },
      { key: "metadata.enteredPremium", label: "Entered premium", format: "currency" },
      { key: "metadata.calculatedPremium", label: "Calculated premium", format: "currency" },
      { key: "metadata.hasSubDeal", label: "Sub deal", format: "boolean" },
    ],
    filterFields: [
      { key: "company", label: "Company", placeholder: "Carrier name…" },
      { key: "status", label: "Status", placeholder: "Paid, pending…" },
    ],
  },
  ANNUITIES: {
    recordType: "ANNUITIES",
    title: "Annuities",
    description: "Annuity business records.",
    pathname: "/agent/my-business/annuities",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "policyNumber", label: "Policy #" },
      { key: "associate", label: "Associate" },
      { key: "company", label: "Company" },
      { key: "amount", label: "Premium", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Created", format: "date" },
    ],
  },
  TRAIL: {
    recordType: "TRAIL",
    title: "Trail",
    description: "Trail commission records.",
    pathname: "/agent/my-business/trail",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "policyNumber", label: "Policy #" },
      { key: "company", label: "Company" },
      { key: "amount", label: "Trail amount", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Period", format: "date" },
    ],
  },
  RENEWALS: {
    recordType: "RENEWALS",
    title: "Renewals",
    description: "Policy renewal tracking.",
    pathname: "/agent/my-business/renewals",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "policyNumber", label: "Policy #" },
      { key: "company", label: "Company" },
      { key: "amount", label: "Renewal premium", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Renewal date", format: "date" },
    ],
  },
  GROUP: {
    recordType: "GROUP",
    title: "Group",
    description: "Group business records.",
    pathname: "/agent/my-business/group",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Group name" },
      { key: "policyNumber", label: "Policy #" },
      { key: "company", label: "Carrier" },
      { key: "associate", label: "Associate" },
      { key: "amount", label: "Premium", format: "currency" },
      { key: "status", label: "Status" },
    ],
  },
  HEALTH_DENTAL: {
    recordType: "HEALTH_DENTAL",
    title: "Health & Dental",
    description: "Health and dental business.",
    pathname: "/agent/my-business/health-dental",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "policyNumber", label: "Policy #" },
      { key: "company", label: "Carrier" },
      { key: "amount", label: "Premium", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Effective", format: "date" },
    ],
  },
  UNLICENSED: {
    recordType: "UNLICENSED",
    title: "Unlicensed",
    description: "Unlicensed agent business records.",
    pathname: "/agent/my-business/unlicensed",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "associate", label: "Associate" },
      { key: "company", label: "Company" },
      { key: "amount", label: "Amount", format: "currency" },
      { key: "status", label: "Status" },
    ],
  },
  ADDITIONAL_COMMISSION: {
    recordType: "ADDITIONAL_COMMISSION",
    title: "Additional commission",
    description: "Additional commission entries.",
    pathname: "/agent/my-business/additional-commission",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "policyNumber", label: "Reference" },
      { key: "company", label: "Company" },
      { key: "amount", label: "Commission", format: "currency" },
      { key: "paidDate", label: "Paid date", format: "date" },
      { key: "status", label: "Status" },
    ],
  },
  NEW_BUSINESS_TRANSMITTAL: {
    recordType: "NEW_BUSINESS_TRANSMITTAL",
    title: "New business transmittals",
    description: "NBT submissions and status.",
    pathname: "/agent/my-business/new-business-transmittals",
    allowCreate: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "policyNumber", label: "NBT #" },
      { key: "company", label: "Carrier" },
      { key: "associate", label: "Associate" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Submitted", format: "date" },
    ],
  },
  DOCUMENT: {
    recordType: "DOCUMENT",
    title: "Documents manager",
    description: "Uploaded and managed documents.",
    pathname: "/agent/my-business/documents-manager",
    allowCreate: true,
    columns: [
      { key: "metadata.documentName", label: "Document" },
      { key: "metadata.documentType", label: "Type" },
      { key: "clientName", label: "Client" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Uploaded", format: "date" },
    ],
  },
  REPORT_PAID: {
    recordType: "REPORT_PAID",
    title: "Paid reports",
    description: "Paid commission report entries — live from commission records plus manual rows.",
    pathname: "/agent/reports/paid",
    allowCreate: true,
    columns: [
      { key: "metadata.rank", label: "Rank" },
      { key: "associate", label: "Associate" },
      { key: "metadata.bracketCode", label: "Code" },
      { key: "metadata.insurance", label: "Insurance" },
      { key: "metadata.trail", label: "Trail" },
      { key: "amount", label: "Total payment", format: "currency" },
      { key: "status", label: "Status" },
      { key: "paidDate", label: "Paid date", format: "date" },
    ],
    filterFields: [
      { key: "status", label: "Status", placeholder: "Active, Terminated…" },
      { key: "metadata.type", label: "Type", placeholder: "General…" },
    ],
  },
  REPORT_PENDING: {
    recordType: "REPORT_PENDING",
    title: "Pending reports",
    description: "Pending commission report entries — live from pending and approved commissions.",
    pathname: "/agent/reports/pending",
    allowCreate: true,
    columns: [
      { key: "associate", label: "Associate" },
      { key: "metadata.debtor", label: "Debtor" },
      { key: "amount", label: "Amount", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Period", format: "date" },
    ],
  },
  REPORT_DEBT: {
    recordType: "REPORT_DEBT",
    title: "Debts",
    description: "Outstanding debt records — includes disputed commissions.",
    pathname: "/agent/reports/debts",
    allowCreate: true,
    columns: [
      { key: "associate", label: "Debtor" },
      { key: "metadata.creditor", label: "Creditor" },
      { key: "amount", label: "Balance", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Opened", format: "date" },
    ],
  },
  REPORT_ROLLUP: {
    recordType: "REPORT_ROLLUP",
    title: "Roll-ups",
    description: "Roll-up commission records — live from downline disputed commissions.",
    pathname: "/agent/reports/roll-ups",
    allowCreate: true,
    columns: [
      { key: "associate", label: "Associate" },
      { key: "metadata.upline", label: "Upline" },
      { key: "amount", label: "Roll-up amount", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Period", format: "date" },
    ],
  },
  REPORT_POTENTIAL_ROLLUP: {
    recordType: "REPORT_POTENTIAL_ROLLUP",
    title: "Potential roll-ups",
    description: "Projected roll-up opportunities — live from downline pending commissions.",
    pathname: "/agent/reports/potential-roll-ups",
    allowCreate: true,
    columns: [
      { key: "associate", label: "Associate" },
      { key: "metadata.upline", label: "Upline" },
      { key: "amount", label: "Potential amount", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Projected", format: "date" },
    ],
  },
  REPORT_ESCROW: {
    recordType: "REPORT_ESCROW",
    title: "Escrow account",
    description: "Escrow ledger transactions — live holds from approved commissions.",
    pathname: "/agent/reports/escrow-account",
    allowCreate: true,
    columns: [
      { key: "metadata.transactionType", label: "Type" },
      { key: "metadata.description", label: "Description" },
      { key: "amount", label: "Amount", format: "currency" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Date", format: "date" },
    ],
  },
  SCOREBOARD_PERSONAL: {
    recordType: "SCOREBOARD_PERSONAL",
    title: "Personal scoreboard",
    description: "Your production metrics — live totals from commissions plus any manual entries.",
    pathname: "/agent/scoreboard/personal",
    allowCreate: true,
    formFields: [
      {
        key: "metadata.metric",
        label: "Metric",
        required: true,
        placeholder: "e.g. Personal production, Annuities",
      },
      { key: "metadata.period", label: "Period", required: true, placeholder: "e.g. Q1 2026" },
      {
        key: "amount",
        label: "Value",
        type: "number",
        required: true,
        placeholder: "0.00",
      },
      { key: "metadata.goal", label: "Goal", required: true, placeholder: "e.g. $50,000" },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "On track", value: "On track" },
          { label: "Behind", value: "Behind" },
          { label: "Ahead", value: "Ahead" },
          { label: "Pending", value: "Pending" },
        ],
      },
    ],
    filterFields: [
      { key: "metadata.period", label: "Period", placeholder: "Q1 2026…" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "All statuses", value: "" },
          { label: "Live", value: "Live" },
          { label: "On track", value: "On track" },
          { label: "Behind", value: "Behind" },
          { label: "Ahead", value: "Ahead" },
          { label: "Pending", value: "Pending" },
        ],
      },
    ],
    columns: [
      { key: "metadata.metric", label: "Metric" },
      { key: "metadata.period", label: "Period" },
      { key: "amount", label: "Value", format: "currency" },
      { key: "metadata.goal", label: "Goal" },
      { key: "status", label: "Status" },
    ],
  },
  SCOREBOARD_COMPANY: {
    recordType: "SCOREBOARD_COMPANY",
    title: "Company scoreboard",
    description: "Company-wide production leaderboard — ranked from live commission data.",
    pathname: "/agent/scoreboard/company",
    allowCreate: true,
    formFields: [
      { key: "associate", label: "Agent", required: true, placeholder: "Agent full name" },
      { key: "metadata.level", label: "Level", required: true, placeholder: "e.g. ED, SED, FA" },
      {
        key: "amount",
        label: "Production",
        type: "number",
        required: true,
        placeholder: "0.00",
      },
      {
        key: "metadata.executiveDirector",
        label: "Executive director",
        placeholder: "Director name",
      },
      { key: "metadata.rank", label: "Rank", placeholder: "Optional — listing auto-ranks by production" },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
          { label: "Pending", value: "Pending" },
        ],
      },
    ],
    filterFields: [
      { key: "metadata.level", label: "Level", placeholder: "ED, SED…" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "All statuses", value: "" },
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
          { label: "Pending", value: "Pending" },
          { label: "Live", value: "Live" },
        ],
      },
    ],
    columns: [
      { key: "metadata.rank", label: "Rank" },
      { key: "associate", label: "Agent" },
      { key: "metadata.level", label: "Level" },
      { key: "amount", label: "Production", format: "currency" },
      { key: "metadata.executiveDirector", label: "Executive director" },
      { key: "status", label: "Status" },
    ],
  },
  TEAM_PROMOTION: {
    recordType: "TEAM_PROMOTION",
    title: "Promotion",
    description: "Team promotion tracking.",
    pathname: "/agent/team/promotion",
    allowCreate: true,
    formFields: [
      { key: "associate", label: "Associate", required: true, placeholder: "Associate name" },
      {
        key: "metadata.currentLevel",
        label: "Current level",
        required: true,
        placeholder: "e.g. FA, SFA, SM",
      },
      {
        key: "metadata.targetLevel",
        label: "Target level",
        required: true,
        placeholder: "e.g. ED, SED",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Pending", value: "Pending" },
          { label: "In progress", value: "In progress" },
          { label: "Completed", value: "Completed" },
          { label: "On hold", value: "On hold" },
        ],
      },
      { key: "recordDate", label: "Target date", type: "date", required: true },
    ],
    filterFields: [
      { key: "metadata.currentLevel", label: "Current level", placeholder: "FA, SFA…" },
      { key: "metadata.targetLevel", label: "Target level", placeholder: "ED, SED…" },
      { key: "status", label: "Status", placeholder: "Pending…" },
    ],
    columns: [
      { key: "associate", label: "Associate" },
      { key: "metadata.currentLevel", label: "Current level" },
      { key: "metadata.targetLevel", label: "Target level" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Target date", format: "date" },
    ],
  },
  TEAM_REASSIGNED_CLIENT: {
    recordType: "TEAM_REASSIGNED_CLIENT",
    title: "Reassigned clients",
    description: "Clients reassigned within your team.",
    pathname: "/agent/team/reassigned-clients",
    allowCreate: true,
    formFields: [
      { key: "clientName", label: "Client", required: true, placeholder: "Client full name" },
      { key: "associate", label: "From associate", required: true, placeholder: "Current associate name" },
      {
        key: "metadata.toAssociate",
        label: "To associate",
        required: true,
        placeholder: "New associate name",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Pending", value: "Pending" },
          { label: "In progress", value: "In progress" },
          { label: "Completed", value: "Completed" },
          { label: "On hold", value: "On hold" },
        ],
      },
      { key: "recordDate", label: "Reassigned date", type: "date", required: true },
    ],
    filterFields: [
      { key: "associate", label: "From associate", placeholder: "Associate name…" },
      { key: "metadata.toAssociate", label: "To associate", placeholder: "New associate…" },
      { key: "status", label: "Status", placeholder: "Pending…" },
    ],
    columns: [
      { key: "clientName", label: "Client" },
      { key: "associate", label: "From associate" },
      { key: "metadata.toAssociate", label: "To associate" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Reassigned", format: "date" },
    ],
  },
  TEAM_AGREEMENT: {
    recordType: "TEAM_AGREEMENT",
    title: "Agreements",
    description: "Team member agreements.",
    pathname: "/agent/team/agreements",
    allowCreate: true,
    formFields: [
      { key: "associate", label: "Agent", required: true, placeholder: "Agent full name" },
      { key: "metadata.recruiter", label: "Recruiter", required: true, placeholder: "Recruiter name" },
      { key: "metadata.fieldDirector", label: "Field director", placeholder: "Field director name" },
      {
        key: "status",
        label: "Agent status",
        type: "select",
        required: true,
        options: [
          { label: "Active", value: "Active" },
          { label: "Pending", value: "Pending" },
          { label: "Inactive", value: "Inactive" },
          { label: "Invited", value: "Invited" },
        ],
      },
      {
        key: "metadata.agreementLabel",
        label: "Agreement",
        type: "select",
        required: true,
        options: [
          { label: "Completed ADA", value: "Completed ADA" },
          { label: "Pending AOA", value: "Pending AOA" },
          { label: "AOA sent", value: "AOA sent" },
          { label: "In progress", value: "In progress" },
        ],
      },
      { key: "recordDate", label: "Agreement date", type: "date", required: true },
    ],
    columns: [
      { key: "associate", label: "Agent" },
      { key: "metadata.recruiter", label: "Recruiter" },
      { key: "metadata.fieldDirector", label: "Field director" },
      { key: "status", label: "Agent status" },
      { key: "metadata.agreementLabel", label: "Agreement" },
      { key: "recordDate", label: "Agreement date", format: "date" },
    ],
  },
  TEAM_INVITEE: {
    recordType: "TEAM_INVITEE",
    title: "Invitees",
    description: "Team invite and recruiting prospects.",
    pathname: "/agent/team/invitees",
    allowCreate: true,
    formFields: [
      { key: "associate", label: "Name", required: true, placeholder: "Full name" },
      {
        key: "metadata.email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      { key: "metadata.phone", label: "Phone", placeholder: "+1 (555) 000-0000" },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Invited", value: "Invited" },
          { label: "Pending", value: "Pending" },
          { label: "Active", value: "Active" },
          { label: "Declined", value: "Declined" },
        ],
      },
      { key: "recordDate", label: "Invited date", type: "date", required: true },
    ],
    columns: [
      { key: "associate", label: "Name" },
      { key: "metadata.email", label: "Email" },
      { key: "metadata.phone", label: "Phone" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Invited", format: "date" },
    ],
  },
  CARRIER_CONTRACT: {
    recordType: "CARRIER_CONTRACT",
    title: "My contracts",
    description: "Carrier contracting status.",
    pathname: "/agent/contracts/my-contracts",
    allowCreate: true,
    columns: [
      { key: "metadata.rank", label: "Rank" },
      { key: "company", label: "Carrier" },
      { key: "metadata.fpbStatus", label: "FPB status" },
      { key: "metadata.contractStatus", label: "Contract status" },
      { key: "metadata.states", label: "States" },
    ],
    filterFields: [
      { key: "metadata.rank", label: "Rank", placeholder: "PLATINUM…" },
      { key: "metadata.contractStatus", label: "Contract status", placeholder: "Approved…" },
    ],
  },
  CORPORATE_DOCUMENT: {
    recordType: "CORPORATE_DOCUMENT",
    title: "Corporate contracts",
    description: "Corporate contracting documents.",
    pathname: "/agent/contracts/corporate",
    allowCreate: true,
    columns: [
      { key: "metadata.documentName", label: "Document" },
      { key: "metadata.category", label: "Category" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Updated", format: "date" },
    ],
  },
  PRE_CONTRACTING_DOCUMENT: {
    recordType: "PRE_CONTRACTING_DOCUMENT",
    title: "Pre-contracting documents",
    description: "Documents required before contracting.",
    pathname: "/agent/contracts/pre-contracting-documents",
    allowCreate: true,
    columns: [
      { key: "metadata.documentName", label: "Document" },
      { key: "metadata.required", label: "Required", format: "boolean" },
      { key: "status", label: "Status" },
      { key: "recordDate", label: "Due date", format: "date" },
    ],
  },
  TEAM_CONTRACT: {
    recordType: "TEAM_CONTRACT",
    title: "Team contracts",
    description: "Team member carrier contracts.",
    pathname: "/agent/contracts/team-contracts",
    allowCreate: true,
    columns: [
      { key: "associate", label: "Associate" },
      { key: "company", label: "Carrier" },
      { key: "metadata.contractStatus", label: "Status" },
      { key: "metadata.states", label: "States" },
      { key: "recordDate", label: "Updated", format: "date" },
    ],
  },
};

export function getWorkspaceConfig(recordType: WorkspaceRecordType) {
  return WORKSPACE_RECORD_CONFIGS[recordType];
}

export function parseWorkspaceRecordType(value: string): WorkspaceRecordType | null {
  if (value in WORKSPACE_RECORD_CONFIGS) {
    return value as WorkspaceRecordType;
  }
  return null;
}
