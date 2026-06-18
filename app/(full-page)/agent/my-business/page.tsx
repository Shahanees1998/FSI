import PortalHubView from "@/components/portal/PortalHubView";
import {
  attachCounts,
  MY_BUSINESS_HUB_SECTIONS,
  MY_BUSINESS_RECORD_TYPES,
  MY_BUSINESS_TYPE_BY_HREF,
} from "@/lib/hubConfigs";
import { getWorkspaceRecordCountsForAgent, getWorkspaceRecordTotalForAgent } from "@/lib/workspaceHubData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessPage() {
  const user = await requireCurrentUser("AGENT");
  const counts = await getWorkspaceRecordCountsForAgent(user.id, MY_BUSINESS_RECORD_TYPES);
  const total = await getWorkspaceRecordTotalForAgent(user.id, MY_BUSINESS_RECORD_TYPES);

  return (
    <PortalHubView
      title="My Business"
      description="Track insurance, annuities, renewals, documents, and new business across your book of business."
      totalRecords={total}
      sections={attachCounts(MY_BUSINESS_HUB_SECTIONS, counts, MY_BUSINESS_TYPE_BY_HREF)}
      helpLinks={[
        { href: "/agent/policy-submission", label: "Policy submission wizard" },
        { href: "/agent/clients", label: "Client profiles" },
      ]}
    />
  );
}
