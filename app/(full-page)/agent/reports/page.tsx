import PortalHubView from "@/components/portal/PortalHubView";
import {
  attachCounts,
  REPORTS_HUB_SECTIONS,
  REPORTS_RECORD_TYPES,
  REPORTS_TYPE_BY_HREF,
} from "@/lib/hubConfigs";
import { getEnrichedHubCountsForAgent, getEnrichedHubTotalForAgent } from "@/lib/workspaceHubData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentReportsPage() {
  const user = await requireCurrentUser("AGENT");
  const counts = await getEnrichedHubCountsForAgent(user.id, REPORTS_RECORD_TYPES);
  const total = await getEnrichedHubTotalForAgent(user.id, REPORTS_RECORD_TYPES);

  return (
    <PortalHubView
      title="Reports"
      description="Review paid and pending commissions, debts, roll-ups, and escrow activity."
      totalRecords={total}
      sections={attachCounts(REPORTS_HUB_SECTIONS, counts, REPORTS_TYPE_BY_HREF)}
      helpLinks={[{ href: "/agent/commissions", label: "Commission tracker" }]}
    />
  );
}
