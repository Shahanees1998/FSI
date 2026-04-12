import CompanyScoreboardView from "@/components/scoreboard/CompanyScoreboardView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentCompanyScoreboardPage() {
    await requireCurrentUser("AGENT");

    return <CompanyScoreboardView />;
}

