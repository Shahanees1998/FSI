import NewAgentSpanishTutorialsView from "@/components/new-agents/NewAgentSpanishTutorialsView";
import { NewAgentShell } from "@/lib/newAgentCmsShell";
import { renderNewAgentCmsPage } from "@/lib/recruitingCmsPage";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentNewAgentsSpanishTutorialsPage() {
    await requireCurrentUser("AGENT");

    return renderNewAgentCmsPage(
        "spanish-tutorials",
        "Spanish Tutorials",
        <NewAgentShell title="Spanish Tutorials">
            <NewAgentSpanishTutorialsView />
        </NewAgentShell>
    );
}
