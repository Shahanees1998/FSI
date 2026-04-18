import { requireCurrentUser } from "@/lib/serverAuth";

export default async function CompoundRecruitingPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <p className="text-600 text-sm m-0 mb-2">
                <span className="font-medium text-800">Team</span>
                <span className="mx-2">/</span>
                <span className="font-medium text-800">Recruiting</span>
                <span className="mx-2">/</span>
                <span>Compound Recruiting</span>
            </p>

            <h1 className="text-2xl font-semibold text-900 m-0 mb-2">Compound Recruiting</h1>
            <p className="text-600 m-0 mb-4 line-height-3">
                Use this area for resources and guidance on compound recruiting—growing your organization through layered
                introductions, duplicable systems, and long-term associate development.
            </p>

            <div className="flex flex-column gap-4">
                <section>
                    <h2 className="text-lg font-semibold text-900 m-0 mb-2">What we&apos;ll add here</h2>
                    <ul className="m-0 pl-4 text-700 line-height-3" style={{ listStyleType: "disc" }}>
                        <li className="mb-2">Overview of the compound recruiting model and how it fits your market.</li>
                        <li className="mb-2">Scripts, checklists, and follow-up cadences you can use with prospects.</li>
                        <li className="mb-2">Videos or PDFs from corporate (placeholders until assets are linked).</li>
                        <li>FAQs and links to related tools elsewhere in the portal.</li>
                    </ul>
                </section>

                <section className="border-top-1 surface-border pt-4">
                    <h2 className="text-lg font-semibold text-900 m-0 mb-2">For now</h2>
                    <p className="text-700 m-0 line-height-3">
                        Content is placeholder. Replace this page with your final copy, media embeds, and downloads when ready.
                    </p>
                </section>
            </div>
        </div>
    );
}
