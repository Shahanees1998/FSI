import { AgentWorkspaceRecord, CommissionStatus, WorkspaceRecordType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { filterLiveRows, isLiveDerivedRecord, syntheticRecord } from "@/lib/liveWorkspaceRecords";
import { buildPagedResult, parsePagination, SearchParamRecord } from "@/lib/portalPagination";
import { notDeletedOr } from "@/lib/softDelete";

type QueryParams = URLSearchParams | SearchParamRecord;

const LIVE_STATUSES: CommissionStatus[] = ["PAID", "APPROVED", "PENDING"];

export async function listPersonalScoreboardRows(agentId: string, queryParams: QueryParams, extraFilterKeys: string[]) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 20 });

  const [commissions, manualRows] = await Promise.all([
    prisma.commissionRecord.findMany({
      where: { agentId, status: { in: LIVE_STATUSES } },
      orderBy: { statementMonth: "desc" },
    }),
    prisma.agentWorkspaceRecord.findMany({
      where: { agentId, recordType: "SCOREBOARD_PERSONAL", OR: [...notDeletedOr()] },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const byProduct = new Map<string, { total: number; latestMonth: Date }>();
  for (const row of commissions) {
    const productKey = row.productLine.trim() || "Other";
    const existing = byProduct.get(productKey);
    const month = row.statementMonth;
    if (!existing) {
      byProduct.set(productKey, { total: row.amount, latestMonth: month });
    } else {
      existing.total += row.amount;
      if (month > existing.latestMonth) existing.latestMonth = month;
    }
  }

  const liveRows: AgentWorkspaceRecord[] = Array.from(byProduct.entries()).map(([productLine, stats], index) =>
    syntheticRecord({
      id: `live-personal-${index}`,
      agentId,
      recordType: "SCOREBOARD_PERSONAL",
      amount: stats.total,
      status: "Live",
      recordDate: stats.latestMonth,
      metadata: {
        source: "commission",
        metric: productLine,
        period: stats.latestMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        goal: "—",
      },
    })
  );

  const manualTagged = manualRows.map((row) => ({
    ...row,
    metadata: { ...(row.metadata as Record<string, unknown>), source: "manual" },
  }));

  const merged = filterLiveRows([...liveRows, ...manualTagged], queryParams, extraFilterKeys).sort(
    (a, b) => (b.amount ?? 0) - (a.amount ?? 0)
  );

  const total = merged.length;
  const data = merged.slice(pagination.skip, pagination.skip + pagination.pageSize);
  return buildPagedResult(data, total, pagination);
}

export async function listCompanyScoreboardRows(agentId: string, queryParams: QueryParams, extraFilterKeys: string[]) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 20 });

  const [grouped, agents, manualRows] = await Promise.all([
    prisma.commissionRecord.groupBy({
      by: ["agentId"],
      where: { status: { in: LIVE_STATUSES } },
      _sum: { amount: true },
    }),
    prisma.user.findMany({
      where: { role: "AGENT" },
      include: { agentProfile: true },
    }),
    prisma.agentWorkspaceRecord.findMany({
      where: { agentId, recordType: "SCOREBOARD_COMPANY", OR: [...notDeletedOr()] },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const agentById = new Map(agents.map((agent) => [agent.id, agent]));

  const liveRows: AgentWorkspaceRecord[] = grouped
    .sort((a, b) => (b._sum.amount ?? 0) - (a._sum.amount ?? 0))
    .map((group, index) => {
      const agent = agentById.get(group.agentId);
      const profile = agent?.agentProfile;
      const name =
        [agent?.firstName, agent?.lastName].filter(Boolean).join(" ").trim() ||
        agent?.email?.split("@")[0] ||
        "Agent";

      return syntheticRecord({
        id: `live-company-${group.agentId}`,
        agentId,
        recordType: "SCOREBOARD_COMPANY",
        associate: name,
        amount: group._sum.amount ?? 0,
        status: "Active",
        metadata: {
          source: "commission",
          rank: index + 1,
          level: agent?.jobTitle || profile?.agencyName || "Agent",
          executiveDirector: profile?.agencyName || "—",
        },
      });
    });

  const manualTagged = manualRows.map((row) => ({
    ...row,
    metadata: { ...(row.metadata as Record<string, unknown>), source: "manual" },
  }));

  const merged = filterLiveRows([...liveRows, ...manualTagged], queryParams, extraFilterKeys).sort(
    (a, b) => (b.amount ?? 0) - (a.amount ?? 0)
  );

  const ranked = merged.map((row, index) => {
    const metadata = row.metadata as Record<string, unknown>;
    if (metadata?.source === "commission") {
      return {
        ...row,
        metadata: { ...metadata, rank: index + 1 },
      };
    }
    return row;
  });

  const total = ranked.length;
  const data = ranked.slice(pagination.skip, pagination.skip + pagination.pageSize);
  return buildPagedResult(data, total, pagination);
}

export function isLiveScoreboardRecord(record: AgentWorkspaceRecord) {
  return isLiveDerivedRecord(record);
}

export async function listScoreboardRecordsForAgent(
  agentId: string,
  recordType: WorkspaceRecordType,
  queryParams: QueryParams,
  extraFilterKeys: string[] = []
) {
  if (recordType === "SCOREBOARD_PERSONAL") {
    return listPersonalScoreboardRows(agentId, queryParams, extraFilterKeys);
  }
  if (recordType === "SCOREBOARD_COMPANY") {
    return listCompanyScoreboardRows(agentId, queryParams, extraFilterKeys);
  }
  throw new Error(`Unsupported scoreboard record type: ${recordType}`);
}

export async function countLiveScoreboardRecords(agentId: string, recordType: WorkspaceRecordType) {
  if (recordType === "SCOREBOARD_PERSONAL") {
    const rows = await prisma.commissionRecord.findMany({
      where: { agentId, status: { in: LIVE_STATUSES } },
      select: { productLine: true },
    });
    return new Set(rows.map((row) => row.productLine.trim() || "Other")).size;
  }
  if (recordType === "SCOREBOARD_COMPANY") {
    const grouped = await prisma.commissionRecord.groupBy({
      by: ["agentId"],
      where: { status: { in: LIVE_STATUSES } },
    });
    return grouped.length;
  }
  return 0;
}
