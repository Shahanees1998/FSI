import AnnuitiesListView from "@/components/my-business/AnnuitiesListView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessAnnuitiesPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <AnnuitiesListView />
        </div>
    );
}

