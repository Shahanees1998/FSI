import DebtsView from "@/components/reports/DebtsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentReportsDebtsPage() {
    await requireCurrentUser("AGENT");

    return <DebtsView />;
}

