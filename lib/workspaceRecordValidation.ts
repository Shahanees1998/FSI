import { WorkspaceRecordType } from "@prisma/client";
import { WorkspaceRecordInput } from "@/lib/agentWorkspaceData";
import { getWorkspaceConfig, WorkspaceFormField } from "@/lib/workspaceRecordConfig";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(value: string | null | undefined) {
  return String(value ?? "").trim();
}

function fieldValue(input: WorkspaceRecordInput, key: string): string {
  if (key.startsWith("metadata.")) {
    const metaKey = key.slice("metadata.".length);
    const metadata = input.metadata as Record<string, unknown> | undefined;
    return trim(metadata?.[metaKey] as string | undefined);
  }

  const top = input[key as keyof WorkspaceRecordInput];
  if (top instanceof Date) {
    return top.toISOString().slice(0, 10);
  }
  if (typeof top === "number") {
    return String(top);
  }
  return trim(top as string | null | undefined);
}

function validateFieldFormat(
  field: WorkspaceFormField,
  input: WorkspaceRecordInput
): { ok: true } | { ok: false; error: string; field: string } {
  const value = fieldValue(input, field.key);
  if (!value) {
    return { ok: true };
  }

  if (field.type === "email" || field.key === "metadata.email") {
    if (!EMAIL_RE.test(value)) {
      return { ok: false, error: `Enter a valid ${field.label.toLowerCase()}.`, field: field.key };
    }
  }

  if (field.type === "number" || field.key === "amount") {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) {
      return { ok: false, error: `Enter a valid ${field.label.toLowerCase()}.`, field: field.key };
    }
  }

  return { ok: true };
}

export function validateWorkspaceRecordInput(
  recordType: WorkspaceRecordType,
  input: WorkspaceRecordInput
): { ok: true } | { ok: false; error: string; field?: string } {
  const config = getWorkspaceConfig(recordType);
  const fields = config.formFields;

  if (fields?.length) {
    for (const field of fields) {
      if (field.required) {
        const value = fieldValue(input, field.key);
        if (!value) {
          return { ok: false, error: `${field.label} is required.`, field: field.key };
        }
      }
      const formatCheck = validateFieldFormat(field, input);
      if (!formatCheck.ok) {
        return formatCheck;
      }
    }
    return { ok: true };
  }

  const hasCore =
    trim(input.associate) ||
    trim(input.clientName) ||
    trim(input.policyNumber) ||
    trim(input.company) ||
    trim(input.status);

  if (!hasCore) {
    return {
      ok: false,
      error: "Enter at least an associate, client, policy number, company, or status.",
    };
  }

  return { ok: true };
}

export function buildWorkspaceMetadataFromForm(
  recordType: WorkspaceRecordType,
  flat: Record<string, string>
): Record<string, unknown> {
  const config = getWorkspaceConfig(recordType);
  if (!config.formFields?.length) {
    return {};
  }

  const metadata: Record<string, unknown> = {};
  for (const field of config.formFields) {
    if (!field.key.startsWith("metadata.")) continue;
    const metaKey = field.key.slice("metadata.".length);
    const value = trim(flat[field.key]);
    if (value) {
      metadata[metaKey] = value;
    }
  }
  return metadata;
}

const TOP_LEVEL_FORM_KEYS = [
  "clientName",
  "policyNumber",
  "associate",
  "company",
  "status",
  "amount",
  "recordDate",
  "paidDate",
] as const;

export function buildWorkspaceRecordPayloadFromForm(
  recordType: WorkspaceRecordType,
  flat: Record<string, string>
): WorkspaceRecordInput {
  const config = getWorkspaceConfig(recordType);
  const metadata = buildWorkspaceMetadataFromForm(recordType, flat);
  const payload: WorkspaceRecordInput = {
    clientName: null,
    policyNumber: null,
    associate: null,
    company: null,
    status: null,
    amount: null,
    recordDate: null,
    paidDate: null,
    metadata,
  };

  for (const field of config.formFields ?? []) {
    if (field.key.startsWith("metadata.")) continue;
    if (!(TOP_LEVEL_FORM_KEYS as readonly string[]).includes(field.key)) continue;

    const raw = trim(flat[field.key]);
    if (field.key === "amount") {
      payload.amount = raw ? Number.parseFloat(raw) : null;
    } else {
      const stringKey = field.key as Exclude<(typeof TOP_LEVEL_FORM_KEYS)[number], "amount">;
      payload[stringKey] = raw || null;
    }
  }

  return payload;
}
