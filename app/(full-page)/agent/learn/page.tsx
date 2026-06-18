import PortalHubView from "@/components/portal/PortalHubView";
import { LEARN_HUB_SECTIONS } from "@/lib/hubConfigs";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentLearnPage() {
  await requireCurrentUser("AGENT");

  return (
    <PortalHubView
      title="Learn"
      description="Training, product resources, department guides, forms, and portal announcements."
      sections={LEARN_HUB_SECTIONS}
      helpLinks={[
        { href: "/agent/new-agents/getting-started", label: "New agents getting started" },
        { href: "/agent/learn/development/releases", label: "Portal releases" },
      ]}
    />
  );
}
