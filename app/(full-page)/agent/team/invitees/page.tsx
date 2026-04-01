import { requireCurrentUser } from "@/lib/serverAuth";
import { redirect } from "next/navigation";

/** Legacy URL: /agent/team/invitees → canonical /agent/team/invites */
export default async function AgentTeamInviteesRedirectPage() {
    await requireCurrentUser("AGENT");
    redirect("/agent/team/invites");
}
