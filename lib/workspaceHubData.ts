import { WorkspaceRecordType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { notDeletedOr } from "@/lib/softDelete";

export async function getWorkspaceRecordCountsForAgent(
  agentId: string,
  recordTypes: WorkspaceRecordType[]
) {
  const groups = await prisma.agentWorkspaceRecord.groupBy({
    by: ["recordType"],
    where: {
      agentId,
      OR: [...notDeletedOr()],
      recordType: { in: recordTypes },
    },
    _count: { _all: true },
  });

  const counts: Record<string, number> = {};
  for (const type of recordTypes) {
    counts[type] = 0;
  }
  for (const group of groups) {
    counts[group.recordType] = group._count._all;
  }
  return counts;
}

const LIVE_REPORT_TYPES: WorkspaceRecordType[] = [
  "REPORT_PAID",
  "REPORT_PENDING",
  "REPORT_DEBT",
  "REPORT_ROLLUP",
  "REPORT_POTENTIAL_ROLLUP",
  "REPORT_ESCROW",
];

const LIVE_SCOREBOARD_TYPES: WorkspaceRecordType[] = ["SCOREBOARD_PERSONAL", "SCOREBOARD_COMPANY"];

/** Workspace counts plus live commission-derived rows for reports and scoreboard hubs. */
export async function getEnrichedHubCountsForAgent(agentId: string, recordTypes: WorkspaceRecordType[]) {
  const counts = await getWorkspaceRecordCountsForAgent(agentId, recordTypes);

  const needsReports = recordTypes.some((type) => LIVE_REPORT_TYPES.includes(type));
  const needsScoreboard = recordTypes.some((type) => LIVE_SCOREBOARD_TYPES.includes(type));

  const [{ countLiveReportRecords }, { countLiveScoreboardRecords }] = await Promise.all([
    needsReports ? import("@/lib/reportsData") : Promise.resolve({ countLiveReportRecords: async () => 0 }),
    needsScoreboard ? import("@/lib/scoreboardData") : Promise.resolve({ countLiveScoreboardRecords: async () => 0 }),
  ]);

  await Promise.all(
    recordTypes.map(async (type) => {
      if (LIVE_REPORT_TYPES.includes(type)) {
        counts[type] = (counts[type] ?? 0) + (await countLiveReportRecords(agentId, type));
      }
      if (LIVE_SCOREBOARD_TYPES.includes(type)) {
        counts[type] = (counts[type] ?? 0) + (await countLiveScoreboardRecords(agentId, type));
      }
    })
  );

  return counts;
}

export async function getWorkspaceRecordTotalForAgent(agentId: string, recordTypes: WorkspaceRecordType[]) {
  const counts = await getWorkspaceRecordCountsForAgent(agentId, recordTypes);
  return Object.values(counts).reduce((sum, n) => sum + n, 0);
}

export async function getEnrichedHubTotalForAgent(agentId: string, recordTypes: WorkspaceRecordType[]) {
  const counts = await getEnrichedHubCountsForAgent(agentId, recordTypes);
  return Object.values(counts).reduce((sum, n) => sum + n, 0);
}
