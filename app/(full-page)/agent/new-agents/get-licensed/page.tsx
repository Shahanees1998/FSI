import NewAgentGetLicensedView from "@/components/new-agents/NewAgentGetLicensedView";
import { NewAgentShell } from "@/lib/newAgentCmsShell";
import { renderNewAgentCmsPage } from "@/lib/recruitingCmsPage";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsGetLicensedPage() {
    await requireCurrentUser("AGENT");

    return renderNewAgentCmsPage(
        "get-licensed",
        "Get Licensed",
        <NewAgentShell title="Get Licensed">
            <NewAgentGetLicensedView />
        </NewAgentShell>
    );
}
