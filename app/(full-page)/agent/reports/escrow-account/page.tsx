import EscrowAccountView from "@/components/reports/EscrowAccountView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentReportsEscrowAccountPage() {
    await requireCurrentUser("AGENT");

    return <EscrowAccountView />;
}

