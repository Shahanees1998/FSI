import { WorkspaceRecordType } from "@prisma/client";
import AgentWorkspaceList from "@/components/portal/AgentWorkspaceList";
import { listWorkspaceRecordsForAgent } from "@/lib/agentWorkspaceData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { getWorkspaceConfig } from "@/lib/workspaceRecordConfig";

export async function renderAgentWorkspacePageForAgent(
  agentId: string,
  recordType: WorkspaceRecordType,
  searchParams: SearchParamRecord = {}
) {
  const config = getWorkspaceConfig(recordType);
  const filterKeys = config.filterFields?.map((field) => field.key) ?? [];
  const result = await listWorkspaceRecordsForAgent(agentId, recordType, searchParams, filterKeys);

  return (
    <AgentWorkspaceList
      recordType={recordType}
      searchParams={searchParams}
      records={result.data}
      pagination={result.pagination}
    />
  );
}
