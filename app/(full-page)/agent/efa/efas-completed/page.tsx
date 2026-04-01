import EfasCompletedListing from "@/components/efa/EfasCompletedListing";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentEfasCompletedPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <h1 className="mt-0 mb-4 text-2xl font-semibold text-900">EFAs Completed</h1>
            <EfasCompletedListing variant="full" />
        </div>
    );
}
