import CompoundRecruitingView from "@/components/team/CompoundRecruitingView";
import EdOwnershipProgramView from "@/components/team/EdOwnershipProgramView";
import { notFound } from "next/navigation";
import { requireCurrentUser } from "@/lib/serverAuth";
import { renderRecruitingCmsPage } from "@/lib/recruitingCmsPage";
import { ReactNode } from "react";

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
    "compound-recruiting": "Compound Recruiting",
    "aoa-pdf-viewing-only": "AOA PDF Viewing",
};

const CFRB_URL = "https://www.newstalk1010.com/audio.html";
const WHY_CORPORATE_URL = "https://www.youtube.com/watch?v=zOXvHy9kPfw";
const WHY_SPANISH_URL = "https://www.youtube.com/watch?v=SoGwY1KqDBc";

const EXTERNAL_DEFAULTS: Record<string, string> = {
    "cfrb-newstalk-1010-interview-ceo-jamie-prickett": CFRB_URL,
    "why-choose-experior-corporate-video": WHY_CORPORATE_URL,
    "why-choose-experior-spanish-subtitles": WHY_SPANISH_URL,
};

function RecruitingShell({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0 w-full max-w-full bg-white">
            <div className="surface-100 border-bottom-1 surface-border px-3 py-2 md:px-4">
                <p className="text-600 text-sm m-0">
                    <span className="font-medium text-800">Team</span>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-800">Recruiting</span>
                    <span className="mx-2">/</span>
                    <span>{title}</span>
                </p>
            </div>
            {children}
        </div>
    );
}

function fallbackForSlug(slug: string): ReactNode | undefined {
    if (slug === "ed-ownership-program") {
        return (
            <RecruitingShell title="ED Ownership Program">
                <EdOwnershipProgramView />
            </RecruitingShell>
        );
    }
    if (slug === "compound-recruiting") {
        return (
            <RecruitingShell title="Compound Recruiting">
                <CompoundRecruitingView />
            </RecruitingShell>
        );
    }
    return undefined;
}

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

    return renderRecruitingCmsPage(slug, title, fallbackForSlug(slug), EXTERNAL_DEFAULTS[slug]);
}
