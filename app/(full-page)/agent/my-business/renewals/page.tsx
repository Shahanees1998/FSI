import RenewalsListView from "@/components/my-business/RenewalsListView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessRenewalsPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <RenewalsListView />
        </div>
    );
}

