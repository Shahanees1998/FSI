const gold = "linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 40%, #b8860b 100%)";
const goldSoft = "linear-gradient(135deg, #fff9e6 0%, #ffefc2 100%)";

type QualCard = {
    n: number;
    title: string;
    region: string;
    scope: string;
    trackingGroup: string;
    requirement: string;
    settlementDeadline: string;
};

const GLOBAL: QualCard[] = [
    {
        n: 1,
        title: "Builders",
        region: "Global",
        scope: "Top 10 Global",
        trackingGroup: "ED Agency, Builders",
        requirement: "Based on official year-end contest results",
        settlementDeadline: "December 31, 2026",
    },
    {
        n: 2,
        title: "Settled Insurance, Personal",
        region: "Global",
        scope: "Top 10 Global",
        trackingGroup: "LCD-H&B-TRAVEL-GROUP",
        requirement: "$90,000 settled",
        settlementDeadline: "January 31, 2027",
    },
    {
        n: 3,
        title: "Settled Insurance, ED Agency",
        region: "Global",
        scope: "Top 10 Global",
        trackingGroup: "LCD-H&B-TRAVEL-GROUP",
        requirement: "$275,000 settled",
        settlementDeadline: "January 31, 2027",
    },
];

const CANADA: QualCard[] = [
    {
        n: 4,
        title: "Investment Paid Amount, Personal",
        region: "Canada",
        scope: "Top 5 Canada",
        trackingGroup: "INVESTMENT-TRAIL",
        requirement: "$200,000 settled",
        settlementDeadline: "January 31, 2027",
    },
    {
        n: 5,
        title: "Investment Paid Amount, ED Agency",
        region: "Canada",
        scope: "Top 2 Canada",
        trackingGroup: "INVESTMENT-TRAIL",
        requirement: "$370,000 settled",
        settlementDeadline: "January 31, 2027",
    },
];

const USA: QualCard[] = [
    {
        n: 6,
        title: "Investment Paid Amount, Personal",
        region: "USA",
        scope: "Top 3 USA",
        trackingGroup: "INVESTMENT-TRAIL",
        requirement: "$200,000 settled",
        settlementDeadline: "January 31, 2027",
    },
    {
        n: 7,
        title: "Investment Paid Amount, ED Agency",
        region: "USA",
        scope: "Top 2 USA",
        trackingGroup: "INVESTMENT-TRAIL",
        requirement: "$370,000 settled",
        settlementDeadline: "January 31, 2027",
    },
];

function QualGrid({ title, cards }: { title: string; cards: QualCard[] }) {
    return (
        <section className="mb-4">
            <h3 className="text-lg font-semibold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">{title}</h3>
            <div className="flex flex-column gap-3">
                {cards.map((c) => (
                    <div
                        key={c.n}
                        className="surface-card border-round border-1 surface-border p-4 shadow-1"
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                    >
                        <p className="text-900 font-semibold m-0 mb-2">
                            Category {c.n}: {c.title}
                        </p>
                        <dl className="m-0 grid gap-2 text-700 text-sm line-height-3" style={{ display: "grid", gap: "0.35rem 0" }}>
                            <div className="flex flex-column sm:flex-row sm:align-items-start gap-1">
                                <dt className="font-semibold text-900 m-0" style={{ minWidth: "12rem" }}>
                                    Scope
                                </dt>
                                <dd className="m-0">{c.scope}</dd>
                            </div>
                            <div className="flex flex-column sm:flex-row sm:align-items-start gap-1">
                                <dt className="font-semibold text-900 m-0" style={{ minWidth: "12rem" }}>
                                    Tracking group
                                </dt>
                                <dd className="m-0">{c.trackingGroup}</dd>
                            </div>
                            <div className="flex flex-column sm:flex-row sm:align-items-start gap-1">
                                <dt className="font-semibold text-900 m-0" style={{ minWidth: "12rem" }}>
                                    Requirement
                                </dt>
                                <dd className="m-0">{c.requirement}</dd>
                            </div>
                            <div className="flex flex-column sm:flex-row sm:align-items-start gap-1">
                                <dt className="font-semibold text-900 m-0" style={{ minWidth: "12rem" }}>
                                    Settlement deadline
                                </dt>
                                <dd className="m-0">{c.settlementDeadline}</dd>
                            </div>
                        </dl>
                    </div>
                ))}
            </div>
        </section>
    );
}

function DetailTile({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <div className="flex gap-3 align-items-start p-3 border-round surface-0">
            <i className={`${icon} text-yellow-700 text-2xl`} style={{ marginTop: "0.1rem" }} aria-hidden />
            <div>
                <p className="text-900 font-semibold m-0 mb-1 text-sm">{label}</p>
                <p className="text-700 m-0 line-height-3 text-sm">{value}</p>
            </div>
        </div>
    );
}

export default function DesertOasisContest2027View() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="flex flex-column lg:flex-row min-h-0">
                <div
                    className="flex flex-column justify-content-center p-4 md:p-5 lg:p-6 text-white flex-1"
                    style={{ background: gold, minHeight: "14rem" }}
                >
                    <p className="text-yellow-300 font-semibold text-sm m-0 mb-2 uppercase tracking-wider">Experior contest trip</p>
                    <h1 className="text-2xl md:text-3xl font-bold m-0 mb-2 line-height-3" style={{ maxWidth: "22rem" }}>
                        YOUR Desert Oasis Awaits
                    </h1>
                    <p className="text-100 m-0 mb-1 font-medium">Fairmont Scottsdale Princess</p>
                    <p className="text-yellow-200 m-0 text-lg font-semibold">March 10–14, 2027</p>
                </div>
                <div
                    className="flex-1 min-h-14rem surface-200 flex align-items-center justify-content-center p-4 text-600 text-sm text-center line-height-3 border-top-1 lg:border-top-none lg:border-left-1 surface-border"
                    style={{ minHeight: "14rem" }}
                >
                    Resort hero image — add to{" "}
                    <span className="white-space-nowrap text-xs font-mono px-1">public/images/contests/desert-oasis-2027-hero.jpg</span>{" "}
                    when available.
                </div>
            </div>

            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <p className="text-700 line-height-3 m-0 mb-4 text-lg">
                    Earn your escape to sun, success, and celebration under the Arizona sky. Top-performing Experior agents—your
                    getaway starts with your next sale. Contest runs from <strong>December 31, 2025</strong>, to{" "}
                    <strong>December 31, 2026</strong>.
                </p>

                <div
                    className="border-round-lg p-4 mb-5 border-2"
                    style={{ borderColor: "#e6c35c", background: goldSoft }}
                >
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <DetailTile icon="pi pi-calendar" label="Trip dates" value="March 10 – 14, 2027" />
                        </div>
                        <div className="col-12 md:col-6">
                            <DetailTile
                                icon="pi pi-clock"
                                label="Contest period"
                                value="December 31, 2025 – December 31, 2026"
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <DetailTile
                                icon="pi pi-users"
                                label="Reward"
                                value="All-expenses-paid trip for you and your spouse"
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <DetailTile
                                icon="pi pi-chart-bar"
                                label="Qualification basis"
                                value="Based on official contest tracking and final production results"
                            />
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-900 mt-0 mb-4 pb-2 border-bottom-2" style={{ borderColor: "#b8860b" }}>
                    How to qualify
                </h2>

                <QualGrid title="Global" cards={GLOBAL} />
                <QualGrid title="Canada" cards={CANADA} />
                <QualGrid title="USA" cards={USA} />

                <div
                    className="border-round-lg p-4 md:p-5 mt-2 mb-5 border-1 surface-border"
                    style={{ background: "#fffbea" }}
                >
                    <h3 className="text-900 font-semibold mt-0 mb-3">Important contest notes</h3>
                    <ul className="text-700 line-height-3 m-0 pl-4">
                        <li className="mb-2">
                            Qualification results are based on official contest tracking and final production figures. Settlement and
                            paid production deadlines apply where noted. All results are subject to final verification, and
                            qualification thresholds must be met to be eligible.
                        </li>
                        <li className="mb-2">
                            Senior National Executive Directors and above automatically qualify for the trip based on their promotion
                            date as of December 31, 2025.
                        </li>
                        <li className="mb-2">The qualifier reward includes travel for the qualifying associate and their spouse.</li>
                        <li className="mb-2">Qualification is subject to there being no outstanding compliance issues.</li>
                        <li>Experior reserves the right to validate and finalize all rankings and qualifiers.</li>
                    </ul>
                </div>

                <div className="text-center border-top-1 surface-border pt-5 pb-2">
                    <p className="text-700 line-height-3 m-0 mb-4 mx-auto" style={{ maxWidth: "30rem" }}>
                        Track your progress and see where you stand. Scoreboards will be updated regularly throughout the contest
                        period.
                    </p>
                    <div
                        className="inline-flex align-items-center justify-content-center gap-2 px-5 py-3 border-round font-semibold text-lg shadow-2"
                        style={{
                            background: "linear-gradient(90deg, #b8860b, #daa520)",
                            color: "#1a1a1a",
                            cursor: "default",
                        }}
                        role="status"
                        aria-label="Contest scoreboard coming soon"
                    >
                        <i className="pi pi-hourglass" aria-hidden />
                        Coming soon
                    </div>
                </div>
            </div>
        </div>
    );
}
