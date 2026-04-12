import TeamContractsView from "@/components/contracts/TeamContractsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentTeamContractsPage() {
    await requireCurrentUser("AGENT");

    return <TeamContractsView />;
}

