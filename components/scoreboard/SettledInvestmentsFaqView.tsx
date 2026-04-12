import Link from "next/link";

const h2 = "text-xl font-semibold text-900 m-0 mb-2";
const body = "text-700 line-height-3 m-0 mb-4";
const ul = "text-700 line-height-3 m-0 mb-4 pl-4 flex flex-column gap-2";
const link = "text-blue-600 font-medium no-underline hover:underline";

export default function SettledInvestmentsFaqView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Settled Investments FAQ</h1>
                <p className="text-600 text-sm md:text-base m-0 mb-5">
                    Agent guide: <strong>Settled investments / annuities</strong> on the scoreboard—how <strong>Submitted</strong> and{" "}
                    <strong>Amount Paid</strong> work, what data is included, and how personal vs. team totals roll up.
                </p>

                <div
                    className="border-round-xl p-4 md:p-5 mb-5 text-center"
                    style={{
                        background: "linear-gradient(115deg, #0f766e 0%, #14b8a6 50%, #5eead4 100%)",
                        boxShadow: "0 8px 24px rgba(15, 118, 110, 0.25)",
                    }}
                >
                    <p className="m-0 text-white font-bold text-lg md:text-xl" style={{ letterSpacing: "0.06em" }}>
                        SCOREBOARD
                    </p>
                    <p className="m-0 mt-2 text-white font-semibold text-sm md:text-base opacity-90">
                        Settled investments &amp; annuities — agent guide
                    </p>
                </div>

                <section className="mb-5">
                    <h2 className={h2}>What&apos;s new</h2>
                    <p className={body}>
                        The scoreboard includes a control (typically a dropdown) to switch between <strong>Submitted</strong> (deals
                        submitted) and <strong>Amount Paid</strong> (paid investment and annuity activity, including trails). Use this
                        toggle whenever you compare numbers to commission reports.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={h2}>What counts in &quot;Amount Paid&quot;</h2>
                    <ul className={ul} style={{ listStyleType: "disc" }}>
                        <li>
                            <strong>Included:</strong> Canada investments, U.S. annuities, and <strong>trails</strong> that flow through
                            the settled / paid workflow.
                        </li>
                        <li>
                            <strong>Excluded from &quot;Settled&quot; for this view:</strong> mutual funds (they are handled outside this
                            settled bucket).
                        </li>
                        <li>
                            <strong>Value source:</strong> amounts come from <strong>paid and pending reports</strong> (commissions &amp;
                            overrides)—not gross premium or illustration totals.
                        </li>
                        <li>
                            <strong>Date logic:</strong> filtering and totals use the <strong>Amount Date</strong> (the date the payment was
                            entered in the system), not the original deal creation date.
                        </li>
                        <li>
                            <strong>History window:</strong> results are shown from <strong>July 2024</strong> forward; nothing earlier is
                            displayed on this scoreboard slice.
                        </li>
                    </ul>
                </section>

                <section className="mb-5">
                    <h2 className={h2}>Score roll-up (how totals are built)</h2>
                    <p className={body}>
                        <strong>Personal score</strong> = amount paid on your own deals <strong>plus</strong> overrides you receive from
                        downline paid activity that rolls to you.
                    </p>
                    <p className={body}>
                        <strong>Team score (for uplines)</strong> = the signing agent&apos;s paid amount <strong>plus</strong> the
                        upline&apos;s override where the hierarchy and contracts produce an override.
                    </p>
                    <p className={body}>
                        <strong>Hierarchy note:</strong> if an upline&apos;s role is below the producer&apos;s role in a way that blocks
                        overrides (for example, an SM upline with an ED downline in a structure where no override applies), the team line
                        may show only the downline&apos;s paid production—not a combined override you do not receive.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={h2}>Filters you will see</h2>
                    <p className={`${body} mb-2`}>
                        <strong>Generation count &amp; level</strong>
                    </p>
                    <p className={body}>
                        Choose which slice of your organization is included (for example, ED through first generation, second generation,
                        or entire downline). <strong>Level</strong> choices adjust based on the generation count you pick.
                    </p>
                    <p className={`${body} mb-2`}>
                        <strong>Time frame</strong>
                    </p>
                    <p className={body}>
                        Presets typically include MTD, last month, YTD, rolling windows (for example 60–180 days or 12 months), and a
                        custom range. All of these respect the <strong>Amount Date</strong> described above.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={h2}>Tips &amp; troubleshooting</h2>
                    <ol className={`${ul} pl-4`} style={{ listStyleType: "decimal" }}>
                        <li>
                            Numbers don&apos;t match another report? Confirm the <strong>time frame</strong> and that the view is set to{" "}
                            <strong>Amount Paid</strong> (not Submitted).
                        </li>
                        <li>
                            Deal feels &quot;old&quot; but the scoreboard date is newer—that is expected when the <strong>Amount Date</strong> is
                            the payment entry date.
                        </li>
                        <li>
                            For <strong>annuities</strong>, reconcile to your <strong>pending and paid</strong> commission reports before
                            opening a ticket.
                        </li>
                        <li>
                            Team totals look wrong? Re-check <strong>generation count / level</strong> so you are not accidentally
                            excluding part of the hierarchy you expect to include.
                        </li>
                        <li>
                            Still off after those checks? Contact the <strong>Development</strong> department with a{" "}
                            <strong>deal ID</strong> and the <strong>Amount Date</strong> you are questioning—agents can use{" "}
                            <Link href="/agent/tickets" className={link}>
                                My Tickets
                            </Link>{" "}
                            to reach the team.
                        </li>
                    </ol>
                </section>

                <section className="pt-3 border-top-1 surface-border">
                    <p className="text-700 text-sm m-0">
                        Open the live scoreboard:{" "}
                        <Link href="/agent/scoreboard/company" className={link}>
                            Company scoreboard
                        </Link>
                        {" · "}
                        <Link href="/agent/scoreboard/personal" className={link}>
                            Personal scoreboard
                        </Link>
                        {" · "}
                        <Link href="/agent/scoreboard/training" className={link}>
                            Scoreboard training
                        </Link>
                    </p>
                </section>
            </div>
        </div>
    );
}
