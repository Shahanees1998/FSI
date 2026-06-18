import PortalHubView from "@/components/portal/PortalHubView";
import {
  attachCounts,
  TEAM_HUB_SECTIONS,
  TEAM_RECORD_TYPES,
  TEAM_TYPE_BY_HREF,
} from "@/lib/hubConfigs";
import { getWorkspaceRecordCountsForAgent, getWorkspaceRecordTotalForAgent } from "@/lib/workspaceHubData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentTeamPage() {
  const user = await requireCurrentUser("AGENT");
  const counts = await getWorkspaceRecordCountsForAgent(user.id, TEAM_RECORD_TYPES);
  const total = await getWorkspaceRecordTotalForAgent(user.id, TEAM_RECORD_TYPES);

  return (
    <PortalHubView
      title="Team"
      description="Manage agreements, invitees, promotions, reassignments, and your visual network."
      totalRecords={total}
      sections={attachCounts(TEAM_HUB_SECTIONS, counts, TEAM_TYPE_BY_HREF)}
      helpLinks={[{ href: "/agent/team/recruiting", label: "Recruiting hub" }]}
    />
  );
}
