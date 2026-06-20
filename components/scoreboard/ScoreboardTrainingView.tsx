import Link from "next/link";

/** Placeholder embed — same corporate video used on recruiting pages until scoreboard training is recorded. */
const DEFAULT_TRAINING_VIDEO_ID = "zOXvHy9kPfw";

type ScoreboardTrainingViewProps = {
    investmentsPaidFilterVideoId: string | null;
};

const quickReference = [
    {
        label: "Submitted",
        detail: "Deals submitted within the selected time frame.",
        icon: "pi pi-send",
    },
    {
        label: "Amount Paid",
        detail: "Paid investment, annuity, and trail activity from commission reports.",
        icon: "pi pi-dollar",
    },
    {
        label: "Show Scoreboard",
        detail: "Applies your filters and refreshes personal or company totals.",
        icon: "pi pi-refresh",
    },
] as const;

const trainingSteps = [
    {
        step: "1",
        title: "Pick your view",
        detail: "Switch between Submitted and Amount Paid so the scoreboard matches the report you are reconciling.",
    },
    {
        step: "2",
        title: "Set your filters",
        detail: "Choose date range, generation count, and team level before running the scoreboard.",
    },
    {
        step: "3",
        title: "Verify totals",
        detail: "Compare results to paid and pending commission reports, then adjust filters if numbers differ.",
    },
] as const;

const relatedLinks = [
    {
        href: "/agent/scoreboard/company",
        title: "Company scoreboard",
        description: "Company-wide production and leaderboard metrics.",
        icon: "pi pi-building",
    },
    {
        href: "/agent/scoreboard/personal",
        title: "Personal scoreboard",
        description: "Your submitted and paid production.",
        icon: "pi pi-user",
    },
    {
        href: "/agent/scoreboard/settled-investments-faq",
        title: "Settled investments FAQ",
        description: "How Amount Paid, trails, and roll-ups work.",
        icon: "pi pi-question-circle",
    },
    {
        href: "/agent/tickets",
        title: "My tickets",
        description: "Reach support if numbers still look off.",
        icon: "pi pi-ticket",
    },
] as const;

function RelatedLinkCard({
    href,
    title,
    description,
    icon,
}: {
    href: string;
    title: string;
    description: string;
    icon: string;
}) {
    return (
        <Link
            href={href}
            className="scoreboard-content-link no-underline text-900 border-1 surface-border border-round-lg p-3 surface-card hover:surface-hover transition-duration-150"
        >
            <div className="flex align-items-start gap-3">
                <span
                    className="inline-flex align-items-center justify-content-center border-round flex-shrink-0 bg-primary text-white"
                    style={{ width: "2.25rem", height: "2.25rem" }}
                    aria-hidden
                >
                    <i className={`${icon} text-sm`} />
                </span>
                <div className="min-w-0">
                    <div className="font-semibold text-sm line-height-3">{title}</div>
                    <p className="text-600 text-xs m-0 mt-1 line-height-3">{description}</p>
                </div>
                <i className="pi pi-arrow-right text-500 text-sm ml-auto flex-shrink-0 mt-1" aria-hidden />
            </div>
        </Link>
    );
}

export default function ScoreboardTrainingView({ investmentsPaidFilterVideoId }: ScoreboardTrainingViewProps) {
    const videoId = investmentsPaidFilterVideoId?.trim() || DEFAULT_TRAINING_VIDEO_ID;
    const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;

    return (
        <div className="scoreboard-content-page surface-card border-round border-1 surface-border overflow-hidden w-full">
            <header
                className="scoreboard-content-hero px-4 py-5 md:px-6 md:py-6 border-bottom-1 surface-border"
                style={{
                    background:
                        "linear-gradient(135deg, var(--primary-900, #111827) 0%, var(--primary-700, #262626) 55%, var(--primary-600, #404040) 100%)",
                }}
            >
                <div className="max-w-screen-xl mx-auto">
                    <p
                        className="text-xs md:text-sm font-semibold uppercase m-0 mb-2 text-white-alpha-70"
                        style={{ letterSpacing: "0.12em" }}
                    >
                        Scoreboard
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold text-white m-0 mb-3">Training</h1>
                    <p className="text-white-alpha-90 line-height-3 m-0 max-w-40rem text-sm md:text-base">
                        Watch the walkthrough, then apply the same filters on your live scoreboard to reconcile production
                        numbers with confidence.
                    </p>
                </div>
            </header>

            <div className="p-4 md:p-5 lg:p-6 max-w-screen-xl mx-auto">
                <div className="grid">
                    <div className="col-12 xl:col-8">
                        <section className="scoreboard-training-video-card surface-ground border-round-xl border-1 surface-border overflow-hidden mb-4">
                            <div className="px-4 py-3 md:px-5 md:py-4 border-bottom-1 surface-border flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between gap-2">
                                <div>
                                    <h2 className="text-lg md:text-xl font-semibold text-900 m-0">
                                        Investments paid amount filter
                                    </h2>
                                    <p className="text-600 text-sm m-0 mt-1 line-height-3">
                                        Date range, team scope, and refreshing results on the scoreboard.
                                    </p>
                                </div>
                                <span className="inline-flex align-items-center gap-2 px-3 py-1 border-round-lg surface-card border-1 surface-border text-xs font-medium text-700 flex-shrink-0">
                                    <i className="pi pi-play-circle text-primary" aria-hidden />
                                    Video walkthrough
                                </span>
                            </div>

                            <div className="scoreboard-training-video bg-black">
                                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                    <iframe
                                        title="Scoreboard training: Investments paid amount filter"
                                        src={embedSrc}
                                        className="absolute top-0 left-0 w-full h-full border-none"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="mb-4">
                            <h3 className="text-base font-semibold text-900 m-0 mb-3">How to follow along</h3>
                            <div className="grid">
                                {trainingSteps.map((item) => (
                                    <div key={item.step} className="col-12 md:col-4">
                                        <div className="scoreboard-training-step h-full surface-ground border-round-xl border-1 surface-border p-4">
                                            <span
                                                className="inline-flex align-items-center justify-content-center border-circle bg-primary text-white font-semibold text-sm mb-3"
                                                style={{ width: "2rem", height: "2rem" }}
                                                aria-hidden
                                            >
                                                {item.step}
                                            </span>
                                            <h4 className="text-sm font-semibold text-900 m-0 mb-2 line-height-3">
                                                {item.title}
                                            </h4>
                                            <p className="text-600 text-sm m-0 line-height-3">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <p className="text-600 text-sm m-0 line-height-3 border-left-3 border-primary pl-3">
                            After watching, open the live scoreboard and apply the same filters. Cross-check totals against
                            your paid and pending commission reports before opening a ticket.
                        </p>
                    </div>

                    <div className="col-12 xl:col-4">
                        <aside className="flex flex-column gap-4 xl:sticky" style={{ top: "1rem" }}>
                            <section className="surface-ground border-round-xl border-1 surface-border p-4">
                                <h3 className="text-base font-semibold text-900 m-0 mb-3 flex align-items-center gap-2">
                                    <i className="pi pi-bookmark text-primary" aria-hidden />
                                    Quick reference
                                </h3>
                                <div className="flex flex-column gap-3">
                                    {quickReference.map((item) => (
                                        <div
                                            key={item.label}
                                            className="surface-card border-round-lg border-1 surface-border p-3"
                                        >
                                            <div className="flex align-items-start gap-2 mb-1">
                                                <i className={`${item.icon} text-primary text-sm mt-1`} aria-hidden />
                                                <span className="font-semibold text-sm text-900">{item.label}</span>
                                            </div>
                                            <p className="text-600 text-xs m-0 pl-4 line-height-3">{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="surface-ground border-round-xl border-1 surface-border p-4">
                                <h3 className="text-base font-semibold text-900 m-0 mb-1">Related resources</h3>
                                <p className="text-600 text-sm m-0 mb-3 line-height-3">
                                    Continue to the scoreboard views and guides referenced in this training.
                                </p>
                                <div className="flex flex-column gap-2">
                                    {relatedLinks.map((item) => (
                                        <RelatedLinkCard key={item.href} {...item} />
                                    ))}
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>

                <section className="mt-5 pt-4 border-top-1 surface-border">
                    <div className="flex flex-column md:flex-row md:align-items-center md:justify-content-between gap-3">
                        <div>
                            <p
                                className="text-600 text-xs md:text-sm font-medium uppercase m-0 mb-1"
                                style={{ letterSpacing: "0.04em" }}
                            >
                                Ready to practice?
                            </p>
                            <p className="text-700 text-sm m-0 line-height-3">
                                Use the same filters from the video on your live scoreboard views.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href="/agent/scoreboard/company"
                                className="scoreboard-footer-btn scoreboard-footer-btn--outlined"
                            >
                                Company scoreboard
                            </Link>
                            <Link
                                href="/agent/scoreboard/personal"
                                className="scoreboard-footer-btn scoreboard-footer-btn--primary"
                            >
                                Personal scoreboard
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
