import VisualNetworkView from "@/components/team/VisualNetworkView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentTeamVisualNetworkPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <VisualNetworkView />
        </div>
    );
}
