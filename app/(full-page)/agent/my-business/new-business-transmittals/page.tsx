import NewBusinessTransmittalsView from "@/components/my-business/NewBusinessTransmittalsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewBusinessTransmittalsPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <NewBusinessTransmittalsView />
        </div>
    );
}

