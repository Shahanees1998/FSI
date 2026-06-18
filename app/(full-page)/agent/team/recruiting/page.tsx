import PortalHubView from "@/components/portal/PortalHubView";
import { RECRUITING_HUB_SECTIONS } from "@/lib/hubConfigs";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentTeamRecruitingPage() {
  await requireCurrentUser("AGENT");

  return (
    <PortalHubView
      title="Recruiting"
      description="AOA sign-up, recruiting media, graphics, and new associate resources."
      sections={RECRUITING_HUB_SECTIONS}
      helpLinks={[
        { href: "/agent/team/invitees", label: "View invitees" },
        { href: "/agent/team/visual-network", label: "Visual network" },
      ]}
    />
  );
}
