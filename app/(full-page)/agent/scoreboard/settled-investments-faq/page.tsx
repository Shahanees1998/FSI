import { renderSettledInvestmentsFaqPage } from "@/lib/scoreboardCmsPage";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentSettledInvestmentsFaqPage() {
    await requireCurrentUser("AGENT");
    return renderSettledInvestmentsFaqPage();
}
