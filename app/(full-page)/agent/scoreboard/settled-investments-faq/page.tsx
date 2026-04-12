import SettledInvestmentsFaqView from "@/components/scoreboard/SettledInvestmentsFaqView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentSettledInvestmentsFaqPage() {
    await requireCurrentUser("AGENT");

    return <SettledInvestmentsFaqView />;
}

