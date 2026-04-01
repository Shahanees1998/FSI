import NewAgentSpanishTutorialsView from "@/components/new-agents/NewAgentSpanishTutorialsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsSpanishTutorialsPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <NewAgentSpanishTutorialsView />
        </div>
    );
}

