import NewAgentReadyToSellView from "@/components/new-agents/NewAgentReadyToSellView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsReadyToSellPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <NewAgentReadyToSellView />
        </div>
    );
}

