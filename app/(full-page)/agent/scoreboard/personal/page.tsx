import PersonalScoreboardView from "@/components/scoreboard/PersonalScoreboardView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentPersonalScoreboardPage() {
    await requireCurrentUser("AGENT");

    return <PersonalScoreboardView />;
}

