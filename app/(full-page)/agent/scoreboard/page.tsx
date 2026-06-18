import PortalHubView from "@/components/portal/PortalHubView";
import {
  attachCounts,
  SCOREBOARD_HUB_SECTIONS,
  SCOREBOARD_RECORD_TYPES,
  SCOREBOARD_TYPE_BY_HREF,
} from "@/lib/hubConfigs";
import { getEnrichedHubCountsForAgent, getEnrichedHubTotalForAgent } from "@/lib/workspaceHubData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentScoreboardPage() {
  const user = await requireCurrentUser("AGENT");
  const counts = await getEnrichedHubCountsForAgent(user.id, SCOREBOARD_RECORD_TYPES);
  const total = await getEnrichedHubTotalForAgent(user.id, SCOREBOARD_RECORD_TYPES);

  return (
    <PortalHubView
      title="Scoreboard"
      description="Monitor personal and company production, training, and settled investment guidance."
      totalRecords={total}
      sections={attachCounts(SCOREBOARD_HUB_SECTIONS, counts, SCOREBOARD_TYPE_BY_HREF)}
    />
  );
}
