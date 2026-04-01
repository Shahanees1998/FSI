import GroupListView from "@/components/my-business/GroupListView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessGroupPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <GroupListView />
        </div>
    );
}

