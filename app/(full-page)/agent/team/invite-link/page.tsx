import { requireCurrentUser } from "@/lib/serverAuth";
import { redirect } from "next/navigation";

/** Team → Invite link: land on Agreements and open the Invite Associates dialog. */
export default async function AgentTeamInviteLinkPage() {
    await requireCurrentUser("AGENT");
    redirect("/agent/team/agreements?inviteAssociate=1");
}
