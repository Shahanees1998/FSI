import TeamReassignedClientsView from "@/components/team/TeamReassignedClientsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentTeamReassignedClientsPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <div className="p-3 md:p-4">
                <TeamReassignedClientsView />
            </div>
        </div>
    );
}
