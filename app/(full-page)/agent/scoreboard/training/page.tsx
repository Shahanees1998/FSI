import { renderScoreboardTrainingPage } from "@/lib/scoreboardCmsPage";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentScoreboardTrainingPage() {
    await requireCurrentUser("AGENT");

    const investmentsPaidFilterVideoId =
        process.env.NEXT_PUBLIC_SCOREBOARD_TRAINING_INVESTMENTS_PAID_FILTER_VIDEO_ID?.trim() ?? null;

    return renderScoreboardTrainingPage(investmentsPaidFilterVideoId);
}
