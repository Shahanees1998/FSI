import PaidReportsView from "@/components/reports/PaidReportsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentReportsPaidPage() {
    await requireCurrentUser("AGENT");

    return <PaidReportsView />;
}

