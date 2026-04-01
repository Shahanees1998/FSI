import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentReportsPaidPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <h1 className="mt-0 mb-2">Paid Reports</h1>
            <p className="text-600 m-0">Dummy content for now.</p>
        </div>
    );
}

