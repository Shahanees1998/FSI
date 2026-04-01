import TrailListView from "@/components/my-business/TrailListView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessTrailPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <TrailListView />
        </div>
    );
}

