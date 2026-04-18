import { requireCurrentUser } from "@/lib/serverAuth";
import { notFound } from "next/navigation";

const RECRUITING_PAGES: Record<string, string> = {
    "aoa-online-sign-up": "AOA (Online Sign Up)",
    "new-associates": "New Associates",
    "ed-ownership-program": "ED Ownership Program",
    beam: "BEAM",
    "usa-recruiting-video": "USA Recruiting Video",
    "the-imo-of-the-future": "The IMO of the Future",
    graphics: "Graphics",
    "cfrb-newstalk-1010-interview-ceo-jamie-prickett": "CFRB Newstalk 1010 Interview with CEO, Jamie Prickett",
    "why-choose-experior-corporate-video": "Why Choose Experior Corporate Video",
    "why-choose-experior-spanish-subtitles": "Why Choose Experior | Spanish Subtitles",
};

export default async function AgentTeamRecruitingSubPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    await requireCurrentUser("AGENT");
    const { slug } = await params;
    const title = RECRUITING_PAGES[slug];
    if (!title) {
        notFound();
    }

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <p className="text-600 text-sm m-0 mb-2">Team / Recruiting</p>
            <h1 className="mt-0 mb-2">{title}</h1>
            <p className="text-600 m-0">Dummy content for now.</p>
        </div>
    );
}
