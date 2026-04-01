import InsuranceListView from "@/components/my-business/InsuranceListView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessInsurancePage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <InsuranceListView />
        </div>
    );
}

