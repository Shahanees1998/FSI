import NewAgentGettingStartedView from "@/components/new-agents/NewAgentGettingStartedView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsGettingStartedPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <NewAgentGettingStartedView />
        </div>
    );
}

