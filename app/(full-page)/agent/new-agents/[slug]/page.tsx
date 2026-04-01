import { requireCurrentUser } from "@/lib/serverAuth";
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

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <p className="text-600 text-sm m-0 mb-2">New Agents</p>
            <h1 className="mt-0 mb-2">{title}</h1>
            <p className="text-600 m-0">Dummy content for now.</p>
        </div>
    );
}
