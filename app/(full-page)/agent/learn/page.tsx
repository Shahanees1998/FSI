import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentLearnPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <h1 className="mt-0 mb-2">Learn</h1>
            <p className="text-600 m-0">This section will contain training and learning resources.</p>
        </div>
    );
}

