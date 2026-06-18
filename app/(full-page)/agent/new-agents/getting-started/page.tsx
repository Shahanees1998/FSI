import NewAgentGettingStartedView from "@/components/new-agents/NewAgentGettingStartedView";
import { NewAgentShell } from "@/lib/newAgentCmsShell";
import { renderNewAgentCmsPage } from "@/lib/recruitingCmsPage";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsGettingStartedPage() {
    await requireCurrentUser("AGENT");

    return renderNewAgentCmsPage(
        "getting-started",
        "Getting Started",
        <NewAgentShell title="Getting Started">
            <NewAgentGettingStartedView />
        </NewAgentShell>
    );
}
