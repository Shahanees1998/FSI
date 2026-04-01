import AdditionalCommissionListView from "@/components/my-business/AdditionalCommissionListView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessAdditionalCommissionPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <AdditionalCommissionListView />
        </div>
    );
}

