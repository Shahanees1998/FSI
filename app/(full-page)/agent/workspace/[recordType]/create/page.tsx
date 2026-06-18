import { notFound } from "next/navigation";
import WorkspaceRecordForm from "@/components/portal/WorkspaceRecordForm";
import { PortalListPageCard, PortalListHeader } from "@/components/portal/PortalListLayout";
import { getWorkspaceConfig, parseWorkspaceRecordType } from "@/lib/workspaceRecordConfig";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function WorkspaceRecordCreatePage({
  params,
}: {
  params: { recordType: string };
}) {
  await requireCurrentUser("AGENT");
  const recordType = parseWorkspaceRecordType(params.recordType);
  if (!recordType) notFound();

  const config = getWorkspaceConfig(recordType);

  return (
    <PortalListPageCard>
      <PortalListHeader title={`New ${config.title.toLowerCase()}`} description={config.description} />
      <WorkspaceRecordForm recordType={recordType} mode="create" />
    </PortalListPageCard>
  );
}
