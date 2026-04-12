import MyContractsView from "@/components/contracts/MyContractsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyContractsPage() {
    const user = await requireCurrentUser("AGENT");
    const fundServDisplay = user.agentProfile?.fundServCode?.trim() || null;

    return <MyContractsView fundServDisplay={fundServDisplay} />;
}

