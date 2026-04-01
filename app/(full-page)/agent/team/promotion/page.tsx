import TeamPromotionView from "@/components/team/TeamPromotionView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentTeamPromotionPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <div className="p-3 md:p-4">
                <TeamPromotionView />
            </div>
        </div>
    );
}
