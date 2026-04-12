import ContractsHubView from "@/components/contracts/ContractsHubView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentContractsPage() {
    await requireCurrentUser("AGENT");

    return <ContractsHubView />;
}

