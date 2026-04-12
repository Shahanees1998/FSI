import PendingReportsView from "@/components/reports/PendingReportsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentReportsPendingPage() {
    await requireCurrentUser("AGENT");

    return <PendingReportsView />;
}

