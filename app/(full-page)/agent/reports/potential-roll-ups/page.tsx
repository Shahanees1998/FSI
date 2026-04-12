import Link from "next/link";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentReportsPotentialRollUpsPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <div className="flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0">Potential Rollups</h1>
                <Link
                    href="/agent/reports/roll-ups"
                    className="p-button p-component p-button-warning font-bold no-underline inline-flex align-items-center justify-content-center px-3 py-2 border-round"
                >
                    <span className="p-button-label">BACK TO ROLLUPS</span>
                </Link>
            </div>
            <p className="text-600 m-0">Placeholder for potential rollup candidates; connect to chargeback workflows when data is available.</p>
        </div>
    );
}
