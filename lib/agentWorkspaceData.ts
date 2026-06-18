import { AgentWorkspaceRecord, Prisma, WorkspaceRecordType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildPagedResult,
  getSearchValue,
  normalizeSearchTerm,
  parsePagination,
  SearchParamRecord,
} from "@/lib/portalPagination";
import { notDeletedOr } from "@/lib/softDelete";

type QueryParams = URLSearchParams | SearchParamRecord;

export type WorkspaceRecordInput = {
  clientName?: string | null;
  policyNumber?: string | null;
  associate?: string | null;
  company?: string | null;
  status?: string | null;
  amount?: number | null;
  recordDate?: string | Date | null;
  paidDate?: string | Date | null;
  metadata?: Record<string, unknown>;
};

function buildContainsFilter(query: string | undefined) {
  if (!query) return undefined;
  return { contains: query };
}

function parseOptionalDate(value: string | Date | null | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildWhere(
  agentId: string,
  recordType: WorkspaceRecordType,
  queryParams: QueryParams,
  extraFilterKeys: string[] = []
): Prisma.AgentWorkspaceRecordWhereInput {
  const q = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const status = normalizeSearchTerm(getSearchValue(queryParams, "status"));
  const company = normalizeSearchTerm(getSearchValue(queryParams, "company"));

  const extraFilters: Prisma.AgentWorkspaceRecordWhereInput[] = extraFilterKeys
    .filter((key) => !["q", "page", "pageSize", "status", "company"].includes(key))
    .map((key) => {
      const value = normalizeSearchTerm(getSearchValue(queryParams, key));
      if (!value) return null;
      if (key.startsWith("metadata.")) {
        const metaKey = key.slice("metadata.".length);
        return {
          metadata: {
            path: [metaKey],
            string_contains: value,
          },
        } as Prisma.AgentWorkspaceRecordWhereInput;
      }
      return { [key]: buildContainsFilter(value) } as Prisma.AgentWorkspaceRecordWhereInput;
    })
    .filter(Boolean) as Prisma.AgentWorkspaceRecordWhereInput[];

  const andFilters: Prisma.AgentWorkspaceRecordWhereInput[] = [{ OR: [...notDeletedOr()] }];

  if (status) {
    andFilters.push({ status: buildContainsFilter(status) });
  }
  if (company) {
    andFilters.push({ company: buildContainsFilter(company) });
  }
  if (extraFilters.length) {
    andFilters.push(...extraFilters);
  }
  if (q) {
    const searchOr: Prisma.AgentWorkspaceRecordWhereInput[] = [
      { clientName: buildContainsFilter(q) },
      { policyNumber: buildContainsFilter(q) },
      { associate: buildContainsFilter(q) },
      { company: buildContainsFilter(q) },
      { status: buildContainsFilter(q) },
    ];
    if (recordType === "TEAM_INVITEE") {
      searchOr.push({
        metadata: { path: ["email"], string_contains: q },
      } as unknown as Prisma.AgentWorkspaceRecordWhereInput);
      searchOr.push({
        metadata: { path: ["phone"], string_contains: q },
      } as unknown as Prisma.AgentWorkspaceRecordWhereInput);
    }
    if (recordType === "TEAM_PROMOTION") {
      searchOr.push({
        metadata: { path: ["currentLevel"], string_contains: q },
      } as unknown as Prisma.AgentWorkspaceRecordWhereInput);
      searchOr.push({
        metadata: { path: ["targetLevel"], string_contains: q },
      } as unknown as Prisma.AgentWorkspaceRecordWhereInput);
    }
    if (recordType === "TEAM_REASSIGNED_CLIENT") {
      searchOr.push({
        metadata: { path: ["toAssociate"], string_contains: q },
      } as unknown as Prisma.AgentWorkspaceRecordWhereInput);
    }
    andFilters.push({ OR: searchOr });
  }

  return {
    agentId,
    recordType,
    AND: andFilters,
  };
}

export async function listWorkspaceRecordsForAgent(
  agentId: string,
  recordType: WorkspaceRecordType,
  queryParams: QueryParams,
  extraFilterKeys: string[] = []
) {
  if (recordType === "SCOREBOARD_PERSONAL" || recordType === "SCOREBOARD_COMPANY") {
    const { listScoreboardRecordsForAgent } = await import("@/lib/scoreboardData");
    return listScoreboardRecordsForAgent(agentId, recordType, queryParams, extraFilterKeys);
  }

  const liveReportTypes = [
    "REPORT_PAID",
    "REPORT_PENDING",
    "REPORT_DEBT",
    "REPORT_ESCROW",
    "REPORT_ROLLUP",
    "REPORT_POTENTIAL_ROLLUP",
  ] as const;
  if ((liveReportTypes as readonly string[]).includes(recordType)) {
    const { listLiveReportRecordsForAgent } = await import("@/lib/reportsData");
    const live = await listLiveReportRecordsForAgent(agentId, recordType, queryParams, extraFilterKeys);
    if (live) return live;
  }

  const pagination = parsePagination(queryParams, { defaultPageSize: 20 });
  const where = buildWhere(agentId, recordType, queryParams, extraFilterKeys);

  const [total, data] = await Promise.all([
    prisma.agentWorkspaceRecord.count({ where }),
    prisma.agentWorkspaceRecord.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getWorkspaceRecordForAgent(
  agentId: string,
  recordType: WorkspaceRecordType,
  id: string
) {
  return prisma.agentWorkspaceRecord.findFirst({
    where: { id, agentId, recordType, OR: [...notDeletedOr()] },
  });
}

export async function createWorkspaceRecordForAgent(
  agentId: string,
  recordType: WorkspaceRecordType,
  input: WorkspaceRecordInput
) {
  return prisma.agentWorkspaceRecord.create({
    data: {
      agentId,
      recordType,
      clientName: input.clientName?.trim() || null,
      policyNumber: input.policyNumber?.trim() || null,
      associate: input.associate?.trim() || null,
      company: input.company?.trim() || null,
      status: input.status?.trim() || null,
      amount: typeof input.amount === "number" ? input.amount : null,
      recordDate: parseOptionalDate(input.recordDate),
      paidDate: parseOptionalDate(input.paidDate),
      metadata: (input.metadata ?? {}) as Prisma.InputJsonValue,
    },
  });
}

export async function updateWorkspaceRecordForAgent(
  agentId: string,
  recordType: WorkspaceRecordType,
  id: string,
  input: WorkspaceRecordInput
) {
  const existing = await getWorkspaceRecordForAgent(agentId, recordType, id);
  if (!existing) return null;

  return prisma.agentWorkspaceRecord.update({
    where: { id },
    data: {
      ...(input.clientName !== undefined ? { clientName: input.clientName?.trim() || null } : {}),
      ...(input.policyNumber !== undefined ? { policyNumber: input.policyNumber?.trim() || null } : {}),
      ...(input.associate !== undefined ? { associate: input.associate?.trim() || null } : {}),
      ...(input.company !== undefined ? { company: input.company?.trim() || null } : {}),
      ...(input.status !== undefined ? { status: input.status?.trim() || null } : {}),
      ...(input.amount !== undefined ? { amount: typeof input.amount === "number" ? input.amount : null } : {}),
      ...(input.recordDate !== undefined ? { recordDate: parseOptionalDate(input.recordDate) } : {}),
      ...(input.paidDate !== undefined ? { paidDate: parseOptionalDate(input.paidDate) } : {}),
      ...(input.metadata !== undefined ? { metadata: input.metadata as Prisma.InputJsonValue } : {}),
    },
  });
}

export async function deleteWorkspaceRecordForAgent(
  agentId: string,
  recordType: WorkspaceRecordType,
  id: string
) {
  const existing = await getWorkspaceRecordForAgent(agentId, recordType, id);
  if (!existing) return null;

  return prisma.agentWorkspaceRecord.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

export function getRecordFieldValue(record: AgentWorkspaceRecord, key: string): unknown {
  if (key.startsWith("metadata.")) {
    const metaKey = key.slice("metadata.".length);
    const metadata = record.metadata as Record<string, unknown> | null;
    return metadata?.[metaKey];
  }

  return record[key as keyof AgentWorkspaceRecord];
}

export function formatWorkspaceCellValue(value: unknown, format?: "text" | "date" | "currency" | "boolean") {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (format === "date") {
    const date = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
  }

  if (format === "currency") {
    const num = typeof value === "number" ? value : Number.parseFloat(String(value));
    if (!Number.isFinite(num)) return String(value);
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
  }

  if (format === "boolean") {
    if (typeof value === "boolean") return value ? "Yes" : "No";
    const normalized = String(value).toLowerCase();
    if (normalized === "true" || normalized === "yes") return "Yes";
    if (normalized === "false" || normalized === "no") return "No";
    return String(value);
  }

  return String(value);
}
