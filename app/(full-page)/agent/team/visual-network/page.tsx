import VisualNetworkView from "@/components/team/VisualNetworkView";
import { getAgentNetworkTreeForUser } from "@/lib/agentNetworkData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentTeamVisualNetworkPage() {
    const user = await requireCurrentUser("AGENT");
    const tree = await getAgentNetworkTreeForUser(user.id, { depth: 3, order: "oldest" });

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <VisualNetworkView initialTree={tree} />
        </div>
    );
}
