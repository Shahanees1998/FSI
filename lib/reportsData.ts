import { AgentWorkspaceRecord, CommissionStatus, WorkspaceRecordType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAgentDisplayName, getDownlineUserIdsForAgent } from "@/lib/agentNetworkData";
import { filterLiveRows, syntheticRecord } from "@/lib/liveWorkspaceRecords";
import { buildPagedResult, parsePagination, SearchParamRecord } from "@/lib/portalPagination";

type QueryParams = URLSearchParams | SearchParamRecord;

const PAID_STATUSES: CommissionStatus[] = ["PAID"];
const PENDING_STATUSES: CommissionStatus[] = ["PENDING", "APPROVED"];
const DEBT_STATUSES: CommissionStatus[] = ["DISPUTED"];
const ESCROW_STATUSES: CommissionStatus[] = ["APPROVED"];
const POTENTIAL_ROLLUP_STATUSES: CommissionStatus[] = ["PENDING", "APPROVED"];
const ROLLUP_STATUSES: CommissionStatus[] = ["DISPUTED"];

type CommissionWithCarrier = Awaited<ReturnType<typeof loadAgentCommissions>>[number];

async function loadAgentCommissions(agentId: string, statuses: CommissionStatus[]) {
  return prisma.commissionRecord.findMany({
    where: { agentId, status: { in: statuses } },
    include: {
      carrierProfile: { select: { carrierName: true } },
    },
    orderBy: { statementMonth: "desc" },
  });
}

async function loadDownlineCommissions(uplineUserId: string, statuses: CommissionStatus[]) {
  const downlineIds = await getDownlineUserIdsForAgent(uplineUserId);
  if (downlineIds.length === 0) return [];

  return prisma.commissionRecord.findMany({
    where: { agentId: { in: downlineIds }, status: { in: statuses } },
    include: {
      carrierProfile: { select: { carrierName: true } },
    },
    orderBy: { statementMonth: "desc" },
  });
}

function carrierLabel(carrierProfile: { carrierName: string } | null) {
  return carrierProfile?.carrierName?.trim() || "Carrier";
}

function commissionToPaidRow(
  agentId: string,
  record: Awaited<ReturnType<typeof loadAgentCommissions>>[number],
  index: number
): AgentWorkspaceRecord {
  return syntheticRecord({
    id: `live-paid-${record.id}`,
    agentId,
    recordType: "REPORT_PAID",
    clientName: record.clientName,
    policyNumber: record.policyNumber,
    associate: record.clientName,
    company: carrierLabel(record.carrierProfile),
    amount: record.amount,
    status: record.status,
    paidDate: record.paidAt,
    recordDate: record.statementMonth,
    metadata: {
      source: "commission",
      rank: index + 1,
      bracketCode: record.policyNumber,
      insurance: record.productLine,
      trail: "—",
      type: "Commission",
    },
  });
}

function commissionToPendingRow(
  agentId: string,
  record: Awaited<ReturnType<typeof loadAgentCommissions>>[number]
): AgentWorkspaceRecord {
  return syntheticRecord({
    id: `live-pending-${record.id}`,
    agentId,
    recordType: "REPORT_PENDING",
    clientName: record.clientName,
    policyNumber: record.policyNumber,
    associate: record.clientName,
    company: carrierLabel(record.carrierProfile),
    amount: record.amount,
    status: record.status,
    recordDate: record.statementMonth,
    metadata: {
      source: "commission",
      debtor: record.clientName,
      productLine: record.productLine,
    },
  });
}

function commissionToDebtRow(
  agentId: string,
  record: Awaited<ReturnType<typeof loadAgentCommissions>>[number]
): AgentWorkspaceRecord {
  return syntheticRecord({
    id: `live-debt-${record.id}`,
    agentId,
    recordType: "REPORT_DEBT",
    clientName: record.clientName,
    policyNumber: record.policyNumber,
    associate: record.clientName,
    company: carrierLabel(record.carrierProfile),
    amount: record.amount,
    status: record.status,
    recordDate: record.statementMonth,
    metadata: {
      source: "commission",
      creditor: carrierLabel(record.carrierProfile),
      productLine: record.productLine,
      notes: record.notes,
    },
  });
}

async function listReportRows(
  agentId: string,
  recordType: WorkspaceRecordType,
  queryParams: QueryParams,
  extraFilterKeys: string[],
  statuses: CommissionStatus[],
  mapRow: (
    agentId: string,
    record: Awaited<ReturnType<typeof loadAgentCommissions>>[number],
    index: number
  ) => AgentWorkspaceRecord
) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 20 });

  const [commissions, manualRows] = await Promise.all([
    loadAgentCommissions(agentId, statuses),
    prisma.agentWorkspaceRecord.findMany({
      where: { agentId, recordType, deletedAt: null },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const liveRows = commissions.map((record, index) => mapRow(agentId, record, index));
  const manualTagged = manualRows.map((row) => ({
    ...row,
    metadata: { ...(row.metadata as Record<string, unknown>), source: "manual" },
  }));

  const merged = filterLiveRows([...liveRows, ...manualTagged], queryParams, extraFilterKeys).sort(
    (a, b) => (b.recordDate?.getTime() ?? 0) - (a.recordDate?.getTime() ?? 0)
  );

  const total = merged.length;
  const data = merged.slice(pagination.skip, pagination.skip + pagination.pageSize);
  return buildPagedResult(data, total, pagination);
}

function commissionToEscrowRow(
  agentId: string,
  record: CommissionWithCarrier,
  index: number
): AgentWorkspaceRecord {
  return syntheticRecord({
    id: `live-escrow-${record.id}`,
    agentId,
    recordType: "REPORT_ESCROW",
    clientName: record.clientName,
    policyNumber: record.policyNumber,
    amount: record.amount,
    status: "Pending release",
    recordDate: record.statementMonth,
    metadata: {
      source: "commission",
      transactionType: "Hold",
      description: `Approved payout — ${record.productLine} (${record.policyNumber})`,
    },
  });
}

async function commissionToPotentialRollupRow(
  uplineUserId: string,
  uplineName: string,
  record: CommissionWithCarrier & { agentId: string }
): Promise<AgentWorkspaceRecord> {
  const associate = await getAgentDisplayName(record.agentId);
  return syntheticRecord({
    id: `live-potential-rollup-${record.id}`,
    agentId: uplineUserId,
    recordType: "REPORT_POTENTIAL_ROLLUP",
    clientName: record.clientName,
    policyNumber: record.policyNumber,
    associate,
    company: carrierLabel(record.carrierProfile),
    amount: record.amount,
    status: record.status,
    recordDate: record.statementMonth,
    metadata: {
      source: "commission",
      upline: uplineName,
      productLine: record.productLine,
    },
  });
}

async function commissionToRollupRow(
  uplineUserId: string,
  uplineName: string,
  record: CommissionWithCarrier & { agentId: string }
): Promise<AgentWorkspaceRecord> {
  const associate = await getAgentDisplayName(record.agentId);
  return syntheticRecord({
    id: `live-rollup-${record.id}`,
    agentId: uplineUserId,
    recordType: "REPORT_ROLLUP",
    clientName: record.clientName,
    policyNumber: record.policyNumber,
    associate,
    company: carrierLabel(record.carrierProfile),
    amount: record.amount,
    status: "Active",
    recordDate: record.statementMonth,
    metadata: {
      source: "commission",
      upline: uplineName,
      productLine: record.productLine,
      notes: record.notes,
    },
  });
}

async function listDownlineReportRows(
  agentId: string,
  recordType: WorkspaceRecordType,
  queryParams: QueryParams,
  extraFilterKeys: string[],
  statuses: CommissionStatus[],
  mapRow: (
    uplineUserId: string,
    uplineName: string,
    record: CommissionWithCarrier & { agentId: string }
  ) => Promise<AgentWorkspaceRecord>
) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 20 });
  const uplineName = await getAgentDisplayName(agentId);

  const [commissions, manualRows] = await Promise.all([
    loadDownlineCommissions(agentId, statuses),
    prisma.agentWorkspaceRecord.findMany({
      where: { agentId, recordType, deletedAt: null },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const liveRows = await Promise.all(
    commissions.map((record) => mapRow(agentId, uplineName, record))
  );
  const manualTagged = manualRows.map((row) => ({
    ...row,
    metadata: { ...(row.metadata as Record<string, unknown>), source: "manual" },
  }));

  const merged = filterLiveRows([...liveRows, ...manualTagged], queryParams, extraFilterKeys).sort(
    (a, b) => (b.recordDate?.getTime() ?? 0) - (a.recordDate?.getTime() ?? 0)
  );

  const total = merged.length;
  const data = merged.slice(pagination.skip, pagination.skip + pagination.pageSize);
  return buildPagedResult(data, total, pagination);
}

async function listEscrowReportRows(agentId: string, queryParams: QueryParams, extraFilterKeys: string[]) {
  return listReportRows(
    agentId,
    "REPORT_ESCROW",
    queryParams,
    extraFilterKeys,
    ESCROW_STATUSES,
    (id, record) => commissionToEscrowRow(id, record, 0)
  );
}

export async function listPaidReportRows(agentId: string, queryParams: QueryParams, extraFilterKeys: string[]) {
  return listReportRows(agentId, "REPORT_PAID", queryParams, extraFilterKeys, PAID_STATUSES, commissionToPaidRow);
}

export async function listPendingReportRows(agentId: string, queryParams: QueryParams, extraFilterKeys: string[]) {
  return listReportRows(
    agentId,
    "REPORT_PENDING",
    queryParams,
    extraFilterKeys,
    PENDING_STATUSES,
    (id, record) => commissionToPendingRow(id, record)
  );
}

export async function listDebtReportRows(agentId: string, queryParams: QueryParams, extraFilterKeys: string[]) {
  return listReportRows(
    agentId,
    "REPORT_DEBT",
    queryParams,
    extraFilterKeys,
    DEBT_STATUSES,
    (id, record) => commissionToDebtRow(id, record)
  );
}

export async function listLiveReportRecordsForAgent(
  agentId: string,
  recordType: WorkspaceRecordType,
  queryParams: QueryParams,
  extraFilterKeys: string[] = []
) {
  if (recordType === "REPORT_PAID") {
    return listPaidReportRows(agentId, queryParams, extraFilterKeys);
  }
  if (recordType === "REPORT_PENDING") {
    return listPendingReportRows(agentId, queryParams, extraFilterKeys);
  }
  if (recordType === "REPORT_DEBT") {
    return listDebtReportRows(agentId, queryParams, extraFilterKeys);
  }
  if (recordType === "REPORT_ESCROW") {
    return listEscrowReportRows(agentId, queryParams, extraFilterKeys);
  }
  if (recordType === "REPORT_POTENTIAL_ROLLUP") {
    return listDownlineReportRows(
      agentId,
      recordType,
      queryParams,
      extraFilterKeys,
      POTENTIAL_ROLLUP_STATUSES,
      commissionToPotentialRollupRow
    );
  }
  if (recordType === "REPORT_ROLLUP") {
    return listDownlineReportRows(
      agentId,
      recordType,
      queryParams,
      extraFilterKeys,
      ROLLUP_STATUSES,
      commissionToRollupRow
    );
  }
  return null;
}

export async function countLiveReportRecords(agentId: string, recordType: WorkspaceRecordType) {
  if (recordType === "REPORT_PAID") {
    return prisma.commissionRecord.count({ where: { agentId, status: { in: PAID_STATUSES } } });
  }
  if (recordType === "REPORT_PENDING") {
    return prisma.commissionRecord.count({ where: { agentId, status: { in: PENDING_STATUSES } } });
  }
  if (recordType === "REPORT_DEBT") {
    return prisma.commissionRecord.count({ where: { agentId, status: { in: DEBT_STATUSES } } });
  }
  if (recordType === "REPORT_ESCROW") {
    return prisma.commissionRecord.count({ where: { agentId, status: { in: ESCROW_STATUSES } } });
  }
  const downlineIds = await getDownlineUserIdsForAgent(agentId);
  if (!downlineIds.length) return 0;
  if (recordType === "REPORT_POTENTIAL_ROLLUP") {
    return prisma.commissionRecord.count({
      where: { agentId: { in: downlineIds }, status: { in: POTENTIAL_ROLLUP_STATUSES } },
    });
  }
  if (recordType === "REPORT_ROLLUP") {
    return prisma.commissionRecord.count({
      where: { agentId: { in: downlineIds }, status: { in: ROLLUP_STATUSES } },
    });
  }
  return 0;
}
