import NewAgentGetLicensedView from "@/components/new-agents/NewAgentGetLicensedView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsGetLicensedPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <NewAgentGetLicensedView />
        </div>
    );
}

