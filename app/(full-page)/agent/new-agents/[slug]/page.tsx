import { requireCurrentUser } from "@/lib/serverAuth";
import { renderNewAgentCmsPage } from "@/lib/recruitingCmsPage";
import { notFound } from "next/navigation";

const SECTIONS: Record<string, string> = {
    "getting-started": "Getting Started",
    "get-licensed": "Get Licensed",
    "ready-to-sell": "Ready To Sell",
    "run-your-business": "Run Your Business",
    "spanish-tutorials": "Spanish Tutorials",
};

export default async function AgentNewAgentsSectionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    await requireCurrentUser("AGENT");
    const { slug } = await params;
    const title = SECTIONS[slug];
    if (!title) {
        notFound();
    }

    return renderNewAgentCmsPage(slug, title);
}
