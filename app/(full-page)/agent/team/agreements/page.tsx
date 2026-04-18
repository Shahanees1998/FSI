import TeamAgreementsView from "@/components/team/TeamAgreementsView";
import { requireCurrentUser } from "@/lib/serverAuth";
import { Suspense } from "react";

export default async function AgentTeamAgreementsPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <Suspense fallback={<div className="p-4 surface-ground min-h-20rem" />}>
                <TeamAgreementsView />
            </Suspense>
        </div>
    );
}
