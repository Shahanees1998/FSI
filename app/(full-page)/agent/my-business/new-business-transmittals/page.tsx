import { renderAgentWorkspacePageForAgent } from "@/lib/renderAgentWorkspacePage";
import { requireCurrentUser } from "@/lib/serverAuth";
import { SearchParamRecord } from "@/lib/portalPagination";

export default async function AgentMyBusinessNewBusinessTransmittalsPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  const user = await requireCurrentUser("AGENT");
  return renderAgentWorkspacePageForAgent(user.id, "NEW_BUSINESS_TRANSMITTAL", searchParams);
}
