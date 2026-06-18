import NewAgentReadyToSellView from "@/components/new-agents/NewAgentReadyToSellView";
import { NewAgentShell } from "@/lib/newAgentCmsShell";
import { renderNewAgentCmsPage } from "@/lib/recruitingCmsPage";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsReadyToSellPage() {
    await requireCurrentUser("AGENT");

    return renderNewAgentCmsPage(
        "ready-to-sell",
        "Ready To Sell",
        <NewAgentShell title="Ready To Sell">
            <NewAgentReadyToSellView />
        </NewAgentShell>
    );
}
