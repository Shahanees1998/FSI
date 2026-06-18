import { AgentWorkspaceRecord } from "@prisma/client";
import { getSearchValue, normalizeSearchTerm, SearchParamRecord } from "@/lib/portalPagination";

type QueryParams = URLSearchParams | SearchParamRecord;

export function syntheticRecord(
  partial: Pick<AgentWorkspaceRecord, "id" | "agentId" | "recordType"> &
    Partial<Omit<AgentWorkspaceRecord, "id" | "agentId" | "recordType">>
): AgentWorkspaceRecord {
  const now = new Date();
  return {
    id: partial.id,
    agentId: partial.agentId,
    recordType: partial.recordType,
    clientName: partial.clientName ?? null,
    policyNumber: partial.policyNumber ?? null,
    associate: partial.associate ?? null,
    company: partial.company ?? null,
    status: partial.status ?? null,
    amount: partial.amount ?? null,
    recordDate: partial.recordDate ?? null,
    paidDate: partial.paidDate ?? null,
    metadata: partial.metadata ?? {},
    deletedAt: null,
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
  };
}

export function isLiveDerivedRecord(record: AgentWorkspaceRecord) {
  const metadata = record.metadata as Record<string, unknown> | null;
  return metadata?.source === "commission" || String(record.id).startsWith("live-");
}

export function matchesLiveRowQuery(record: AgentWorkspaceRecord, q: string | undefined) {
  if (!q) return true;
  const haystack = [
    record.clientName,
    record.policyNumber,
    record.associate,
    record.company,
    record.status,
    record.amount,
    JSON.stringify(record.metadata),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q.toLowerCase());
}

export function matchesLiveMetadataFilter(record: AgentWorkspaceRecord, key: string, value: string | undefined) {
  if (!value) return true;
  if (!key.startsWith("metadata.")) return true;
  const metaKey = key.slice("metadata.".length);
  const metadata = record.metadata as Record<string, unknown> | null;
  const field = metadata?.[metaKey];
  return field !== null && field !== undefined && String(field).toLowerCase().includes(value.toLowerCase());
}

export function filterLiveRows(
  rows: AgentWorkspaceRecord[],
  queryParams: QueryParams,
  extraFilterKeys: string[]
) {
  const q = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const status = normalizeSearchTerm(getSearchValue(queryParams, "status"));
  const company = normalizeSearchTerm(getSearchValue(queryParams, "company"));

  return rows.filter((row) => {
    if (status && !row.status?.toLowerCase().includes(status.toLowerCase())) return false;
    if (company && !row.company?.toLowerCase().includes(company.toLowerCase())) return false;
    if (!matchesLiveRowQuery(row, q)) return false;
    for (const key of extraFilterKeys) {
      const value = normalizeSearchTerm(getSearchValue(queryParams, key));
      if (!matchesLiveMetadataFilter(row, key, value)) return false;
    }
    return true;
  });
}
