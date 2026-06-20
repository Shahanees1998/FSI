import Link from "next/link";
import type { ReactNode } from "react";

const relatedLinks = [
    {
        href: "/agent/scoreboard/company",
        title: "Company scoreboard",
        description: "View company-wide production and leaderboard metrics.",
        icon: "pi pi-building",
    },
    {
        href: "/agent/scoreboard/personal",
        title: "Personal scoreboard",
        description: "Track your own submitted and paid production.",
        icon: "pi pi-user",
    },
    {
        href: "/agent/scoreboard/training",
        title: "Scoreboard training",
        description: "Video walkthrough of filters and paid amount views.",
        icon: "pi pi-video",
    },
    {
        href: "/agent/tickets",
        title: "My tickets",
        description: "Open a support ticket if numbers still look off.",
        icon: "pi pi-ticket",
    },
] as const;

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
        label: "Amount Date",
        detail: "Payment entry date in the system—not the original deal date.",
        icon: "pi pi-calendar",
    },
] as const;

type FaqSection = {
    id: string;
    title: string;
    icon: string;
    content: ReactNode;
};

function FaqCard({ section }: { section: FaqSection }) {
    return (
        <section
            id={section.id}
            className="scoreboard-faq-section surface-ground border-round-xl border-1 surface-border p-4 md:p-5"
        >
            <div className="flex align-items-start gap-3 mb-3">
                <span
                    className="inline-flex align-items-center justify-content-center border-round flex-shrink-0 bg-primary text-white"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    aria-hidden
                >
                    <i className={`${section.icon} text-base`} />
                </span>
                <h2 className="text-lg md:text-xl font-semibold text-900 m-0 line-height-3 pt-1">{section.title}</h2>
            </div>
            <div className="scoreboard-faq-body text-700 line-height-3 text-sm md:text-base">{section.content}</div>
        </section>
    );
}

export default function SettledInvestmentsFaqView() {
    const sections: FaqSection[] = [
        {
            id: "whats-new",
            title: "What's new",
            icon: "pi pi-info-circle",
            content: (
                <p className="m-0">
                    The scoreboard includes a control to switch between <strong>Submitted</strong> (deals submitted) and{" "}
                    <strong>Amount Paid</strong> (paid investment and annuity activity, including trails). Use this toggle
                    whenever you compare numbers to commission reports.
                </p>
            ),
        },
        {
            id: "amount-paid",
            title: 'What counts in "Amount Paid"',
            icon: "pi pi-list",
            content: (
                <ul className="m-0 pl-4 flex flex-column gap-3" style={{ listStyleType: "disc" }}>
                    <li>
                        <strong>Included:</strong> Canada investments, U.S. annuities, and <strong>trails</strong> that flow
                        through the settled / paid workflow.
                    </li>
                    <li>
                        <strong>Excluded from &quot;Settled&quot; for this view:</strong> mutual funds (handled outside this
                        settled bucket).
                    </li>
                    <li>
                        <strong>Value source:</strong> amounts come from <strong>paid and pending reports</strong> (commissions
                        &amp; overrides)—not gross premium or illustration totals.
                    </li>
                    <li>
                        <strong>Date logic:</strong> filtering and totals use the <strong>Amount Date</strong> (the date the
                        payment was entered in the system), not the original deal creation date.
                    </li>
                    <li>
                        <strong>History window:</strong> results are shown from <strong>July 2024</strong> forward; nothing
                        earlier is displayed on this scoreboard slice.
                    </li>
                </ul>
            ),
        },
        {
            id: "roll-up",
            title: "Score roll-up (how totals are built)",
            icon: "pi pi-sitemap",
            content: (
                <div className="flex flex-column gap-3">
                    <p className="m-0">
                        <strong>Personal score</strong> = amount paid on your own deals <strong>plus</strong> overrides you
                        receive from downline paid activity that rolls to you.
                    </p>
                    <p className="m-0">
                        <strong>Team score (for uplines)</strong> = the signing agent&apos;s paid amount <strong>plus</strong>{" "}
                        the upline&apos;s override where the hierarchy and contracts produce an override.
                    </p>
                    <p className="m-0">
                        <strong>Hierarchy note:</strong> if an upline&apos;s role is below the producer&apos;s role in a way that
                        blocks overrides (for example, an SM upline with an ED downline in a structure where no override
                        applies), the team line may show only the downline&apos;s paid production—not a combined override you do
                        not receive.
                    </p>
                </div>
            ),
        },
        {
            id: "filters",
            title: "Filters you will see",
            icon: "pi pi-filter",
            content: (
                <div className="flex flex-column gap-4">
                    <div>
                        <p className="font-semibold text-900 m-0 mb-2">Generation count &amp; level</p>
                        <p className="m-0">
                            Choose which slice of your organization is included (for example, ED through first generation,
                            second generation, or entire downline). <strong>Level</strong> choices adjust based on the generation
                            count you pick.
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-900 m-0 mb-2">Time frame</p>
                        <p className="m-0">
                            Presets typically include MTD, last month, YTD, rolling windows (for example 60–180 days or 12
                            months), and a custom range. All of these respect the <strong>Amount Date</strong> described above.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "troubleshooting",
            title: "Tips & troubleshooting",
            icon: "pi pi-wrench",
            content: (
                <ol className="m-0 pl-4 flex flex-column gap-3" style={{ listStyleType: "decimal" }}>
                    <li>
                        Numbers don&apos;t match another report? Confirm the <strong>time frame</strong> and that the view is
                        set to <strong>Amount Paid</strong> (not Submitted).
                    </li>
                    <li>
                        Deal feels &quot;old&quot; but the scoreboard date is newer—that is expected when the{" "}
                        <strong>Amount Date</strong> is the payment entry date.
                    </li>
                    <li>
                        For <strong>annuities</strong>, reconcile to your <strong>pending and paid</strong> commission reports
                        before opening a ticket.
                    </li>
                    <li>
                        Team totals look wrong? Re-check <strong>generation count / level</strong> so you are not accidentally
                        excluding part of the hierarchy you expect to include.
                    </li>
                    <li>
                        Still off after those checks? Contact the <strong>Development</strong> department with a{" "}
                        <strong>deal ID</strong> and the <strong>Amount Date</strong> you are questioning—agents can use{" "}
                        <Link href="/agent/tickets" className="text-primary font-medium no-underline hover:underline">
                            My Tickets
                        </Link>{" "}
                        to reach the team.
                    </li>
                </ol>
            ),
        },
    ];

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
                    <h1 className="text-2xl md:text-3xl font-bold text-white m-0 mb-3">Settled Investments FAQ</h1>
                    <p className="text-white-alpha-90 line-height-3 m-0 max-w-40rem text-sm md:text-base">
                        Agent guide to settled investments and annuities on the scoreboard—how{" "}
                        <strong className="text-white">Submitted</strong> and <strong className="text-white">Amount Paid</strong>{" "}
                        work, what data is included, and how personal vs. team totals roll up.
                    </p>
                </div>
            </header>

            <div className="p-4 md:p-5 lg:p-6 max-w-screen-xl mx-auto">
                <div className="grid">
                    <div className="col-12 xl:col-8">
                        <nav
                            className="scoreboard-faq-toc surface-ground border-round-xl border-1 surface-border p-4 mb-4"
                            aria-label="FAQ sections"
                        >
                            <p className="text-600 text-xs font-semibold uppercase m-0 mb-3" style={{ letterSpacing: "0.06em" }}>
                                On this page
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="inline-flex align-items-center gap-2 px-3 py-2 border-round-lg border-1 surface-border surface-card text-sm text-700 no-underline hover:surface-hover transition-duration-150"
                                    >
                                        <i className={`${section.icon} text-primary text-xs`} aria-hidden />
                                        {section.title}
                                    </a>
                                ))}
                            </div>
                        </nav>

                        <div className="flex flex-column gap-4">
                            {sections.map((section) => (
                                <FaqCard key={section.id} section={section} />
                            ))}
                        </div>
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
                                    Open the scoreboard views and support tools referenced in this guide.
                                </p>
                                <div className="flex flex-column gap-2">
                                    {relatedLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="scoreboard-content-link no-underline text-900 border-1 surface-border border-round-lg p-3 surface-card hover:surface-hover transition-duration-150"
                                        >
                                            <div className="flex align-items-start gap-3">
                                                <span
                                                    className="inline-flex align-items-center justify-content-center border-round flex-shrink-0 bg-primary text-white"
                                                    style={{ width: "2.25rem", height: "2.25rem" }}
                                                    aria-hidden
                                                >
                                                    <i className={`${item.icon} text-sm`} />
                                                </span>
                                                <div className="min-w-0">
                                                    <div className="font-semibold text-sm line-height-3">{item.title}</div>
                                                    <p className="text-600 text-xs m-0 mt-1 line-height-3">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <i
                                                    className="pi pi-arrow-right text-500 text-sm ml-auto flex-shrink-0 mt-1"
                                                    aria-hidden
                                                />
                                            </div>
                                        </Link>
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
                                Open the live scoreboard
                            </p>
                            <p className="text-700 text-sm m-0 line-height-3">
                                Apply these rules on your company or personal scoreboard views.
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
