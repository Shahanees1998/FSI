import NewAgentRunYourBusinessView from "@/components/new-agents/NewAgentRunYourBusinessView";
import { NewAgentShell } from "@/lib/newAgentCmsShell";
import { renderNewAgentCmsPage } from "@/lib/recruitingCmsPage";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsRunYourBusinessPage() {
    await requireCurrentUser("AGENT");

    return renderNewAgentCmsPage(
        "run-your-business",
        "Run Your Business",
        <NewAgentShell title="Run Your Business">
            <NewAgentRunYourBusinessView />
        </NewAgentShell>
    );
}
