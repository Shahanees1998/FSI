import { renderAgentWorkspacePageForAgent } from "@/lib/renderAgentWorkspacePage";
import { requireCurrentUser } from "@/lib/serverAuth";
import { SearchParamRecord } from "@/lib/portalPagination";

export default async function AgentCorporateContractsPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  const user = await requireCurrentUser("AGENT");
  return renderAgentWorkspacePageForAgent(user.id, "CORPORATE_DOCUMENT", searchParams);
}
