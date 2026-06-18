import PortalHubView from "@/components/portal/PortalHubView";
import { NEW_AGENTS_HUB_SECTIONS } from "@/lib/hubConfigs";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsPage() {
    await requireCurrentUser("AGENT");

    return (
        <PortalHubView
            title="New Agents"
            description="Onboarding paths for licensed and unlicensed associates — getting started, licensing, selling, and running your business."
            sections={NEW_AGENTS_HUB_SECTIONS}
            helpLinks={[
                { href: "/agent/learn/about-experior/getting-started/getting-started-with-experior-checklist-licensed", label: "Licensed checklist" },
                { href: "/agent/team/recruiting/aoa-online-sign-up", label: "AOA online sign up" },
            ]}
        />
    );
}
