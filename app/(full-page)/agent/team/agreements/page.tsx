import TeamAgreementsWorkspaceShell from "@/components/team/TeamAgreementsWorkspaceShell";
import { renderAgentWorkspacePageForAgent } from "@/lib/renderAgentWorkspacePage";
import { requireCurrentUser } from "@/lib/serverAuth";
import { SearchParamRecord } from "@/lib/portalPagination";
import { Suspense } from "react";

export default async function AgentTeamAgreementsPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    const user = await requireCurrentUser("AGENT");
    const list = await renderAgentWorkspacePageForAgent(user.id, "TEAM_AGREEMENT", searchParams);

    return (
        <Suspense fallback={<div className="surface-card border-round border-1 surface-border p-4">Loading agreements…</div>}>
            <TeamAgreementsWorkspaceShell>{list}</TeamAgreementsWorkspaceShell>
        </Suspense>
    );
}
