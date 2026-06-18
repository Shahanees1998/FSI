import { renderAgentWorkspacePageForAgent } from "@/lib/renderAgentWorkspacePage";
import { requireCurrentUser } from "@/lib/serverAuth";
import { SearchParamRecord } from "@/lib/portalPagination";

export default async function AgentReportsPendingPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  const user = await requireCurrentUser("AGENT");
  return renderAgentWorkspacePageForAgent(user.id, "REPORT_PENDING", searchParams);
}
