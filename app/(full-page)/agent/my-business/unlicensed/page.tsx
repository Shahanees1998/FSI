import UnlicensedListView from "@/components/my-business/UnlicensedListView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessUnlicensedPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <UnlicensedListView />
        </div>
    );
}

