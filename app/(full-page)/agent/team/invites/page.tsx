import TeamInviteesView from "@/components/team/TeamInviteesView";
import { requireCurrentUser } from "@/lib/serverAuth";

/** Team → Invites: full-page invitees listing (same data as embedded Invitees on Agreements). */
export default async function AgentTeamInvitesPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0">
            <TeamInviteesView />
        </div>
    );
}
