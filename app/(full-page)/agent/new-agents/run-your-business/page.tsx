import NewAgentRunYourBusinessView from "@/components/new-agents/NewAgentRunYourBusinessView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsRunYourBusinessPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <NewAgentRunYourBusinessView />
        </div>
    );
}

