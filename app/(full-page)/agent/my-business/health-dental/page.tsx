import HealthDentalListView from "@/components/my-business/HealthDentalListView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessHealthDentalPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <HealthDentalListView />
        </div>
    );
}

