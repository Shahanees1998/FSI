const link = "text-blue-600 font-medium no-underline hover:underline";

const RESOURCE_LINKS: { label: string; href: string }[] = [
    { label: "How to obtain a Series 65 license", href: "/documents/learn/global-view/how-to-obtain-series-65-license.pdf" },
    { label: "Old school new school (PDF)", href: "/documents/learn/global-view/old-school-new-school.pdf" },
    { label: "Global View compensation", href: "/documents/learn/global-view/global-view-compensation.pdf" },
    {
        label: "Global View Capital Management / Experior compensation",
        href: "/documents/learn/global-view/global-view-capital-management-experior-compensation.pdf",
    },
    {
        label: "Instructions to register for Series 65 course",
        href: "/documents/learn/global-view/instructions-to-register-for-series-65-course.pdf",
    },
    { label: "Global View fees", href: "/documents/learn/global-view/global-view-fees.pdf" },
    {
        label: "Series 65 licensing for Canadian citizens",
        href: "/documents/learn/global-view/series-65-licensing-for-canadian-citizens.pdf",
    },
    { label: "Pathway to the Series 65 exam", href: "/documents/learn/global-view/pathway-to-the-series-65-exam.pdf" },
    {
        label: "Global View Capital Management AUM — fee income calculation example",
        href: "/documents/learn/global-view/global-view-aum-fee-income-calculation-example.pdf",
    },
    {
        label: "The trifecta overview — Global View Capital Management, Experior, Quantum",
        href: "/documents/learn/global-view/the-trifecta-overview.pdf",
    },
    {
        label: "The trifecta executive summary — Global View Capital Management, Experior, Quantum",
        href: "/documents/learn/global-view/the-trifecta-executive-summary.pdf",
    },
    {
        label: "Global View Capital Management award announcement",
        href: "/documents/learn/global-view/global-view-capital-management-award-announcement.pdf",
    },
    {
        label: "Global View Capital Advisors active management brochure",
        href: "/documents/learn/global-view/global-view-capital-advisors-active-management-brochure.pdf",
    },
    { label: "Executive summary", href: "/documents/learn/global-view/executive-summary.pdf" },
];

function RecordingEmbed({ videoId, title }: { videoId: string | null; title: string }) {
    if (!videoId?.trim()) {
        return (
            <div
                className="border-round border-1 surface-border surface-200 flex align-items-center justify-content-center text-600 text-sm p-4 text-center"
                style={{ aspectRatio: "16 / 9", maxWidth: "42rem" }}
            >
                Video will appear here once the YouTube ID is configured for this recording.
            </div>
        );
    }

    const src = `https://www.youtube-nocookie.com/embed/${videoId.trim()}?rel=0`;

    return (
        <div
            className="relative w-full overflow-hidden border-round border-1 surface-border bg-black mx-auto"
            style={{ paddingBottom: "56.25%", maxWidth: "42rem" }}
        >
            <iframe
                title={title}
                src={src}
                className="absolute top-0 left-0 w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
    );
}

type GlobalViewInvestmentPlatformViewProps = {
    compensationGridVideoId: string | null;
    trifectaRecruitingVideoId: string | null;
};

export default function GlobalViewInvestmentPlatformView({
    compensationGridVideoId,
    trifectaRecruitingVideoId,
}: GlobalViewInvestmentPlatformViewProps) {
    const compId = compensationGridVideoId?.trim() || null;
    const trifectaId = trifectaRecruitingVideoId?.trim() || null;

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Global View Investment Platform</h1>

                <section className="pb-4 mb-4 border-bottom-1 surface-border">
                    <ul className="m-0 pl-4 flex flex-column gap-2 text-700 line-height-3">
                        {RESOURCE_LINKS.map((item) => (
                            <li key={item.href}>
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className={link}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="pb-4 mb-4 border-bottom-1 surface-border">
                    <h2 className="text-lg font-semibold text-900 m-0 mb-3">Recordings:</h2>
                    <div className="flex flex-column gap-5">
                        <div>
                            <p className="text-700 font-medium m-0 mb-2 line-height-3">
                                Experior — compensation &amp; grid explanation by Dina Fliss, Founder, President &amp; Chief Investment
                                Strategist
                            </p>
                            <RecordingEmbed videoId={compId} title="Experior compensation and grid explanation" />
                        </div>
                        <div>
                            <p className="text-700 font-medium m-0 mb-2 line-height-3">Trifecta recruiting video: November 2023</p>
                            <RecordingEmbed videoId={trifectaId} title="Trifecta recruiting video November 2023" />
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-900 m-0 mb-2">Key contact</h2>
                    <p className="text-700 line-height-3 m-0 mb-1">
                        <strong className="text-900">Jack Peters</strong> — President, Global View Capital Advisors
                    </p>
                    <p className="text-700 m-0 mb-1">
                        <span className="font-semibold text-900">Phone:</span>{" "}
                        <a href="tel:+12626501030" className={link}>
                            262-650-1030
                        </a>
                    </p>
                    <p className="text-700 m-0">
                        <span className="font-semibold text-900">E-mail:</span>{" "}
                        <a href="mailto:jpeters@gvcaponline.com" className={link}>
                            jpeters@gvcaponline.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
