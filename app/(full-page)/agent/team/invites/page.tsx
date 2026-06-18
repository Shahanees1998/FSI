import { renderAgentWorkspacePageForAgent } from "@/lib/renderAgentWorkspacePage";
import { requireCurrentUser } from "@/lib/serverAuth";
import { SearchParamRecord } from "@/lib/portalPagination";

export default async function AgentTeamInvitesPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  const user = await requireCurrentUser("AGENT");
  const mergedParams: SearchParamRecord = {
    ...searchParams,
    status: typeof searchParams.status === "string" ? searchParams.status : "Invited",
  };
  return renderAgentWorkspacePageForAgent(user.id, "TEAM_INVITEE", mergedParams);
}
