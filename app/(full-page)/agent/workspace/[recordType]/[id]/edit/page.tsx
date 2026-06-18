import { notFound } from "next/navigation";
import WorkspaceRecordForm, { toDateInputValue } from "@/components/portal/WorkspaceRecordForm";
import { PortalListPageCard, PortalListHeader } from "@/components/portal/PortalListLayout";
import { getWorkspaceRecordForAgent } from "@/lib/agentWorkspaceData";
import { getWorkspaceConfig, parseWorkspaceRecordType } from "@/lib/workspaceRecordConfig";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function WorkspaceRecordEditPage({
  params,
}: {
  params: { recordType: string; id: string };
}) {
  const user = await requireCurrentUser("AGENT");
  const recordType = parseWorkspaceRecordType(params.recordType);
  if (!recordType) notFound();

  const record = await getWorkspaceRecordForAgent(user.id, recordType, params.id);
  if (!record) notFound();

  const config = getWorkspaceConfig(recordType);

  return (
    <PortalListPageCard>
      <PortalListHeader title={`Edit ${config.title.toLowerCase()}`} description={config.description} />
      <WorkspaceRecordForm
        recordType={recordType}
        mode="edit"
        recordId={record.id}
        initial={{
          clientName: record.clientName || "",
          policyNumber: record.policyNumber || "",
          associate: record.associate || "",
          company: record.company || "",
          status: record.status || "",
          amount: record.amount != null ? String(record.amount) : "",
          recordDate: toDateInputValue(record.recordDate),
          paidDate: toDateInputValue(record.paidDate),
        }}
        initialMetadata={(record.metadata as Record<string, unknown> | null) ?? null}
      />
    </PortalListPageCard>
  );
}
