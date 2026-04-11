const link = "text-blue-600 font-medium no-underline hover:underline";
const providerTitle = "text-xl font-semibold text-orange-600 mt-0 mb-2";

export default function CeCreditsProvidersView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">CE Credits Providers</h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-5 text-center"
                    style={{
                        background: "linear-gradient(115deg, #ca8a04 0%, #eab308 45%, #fde047 100%)",
                        boxShadow: "0 8px 24px rgba(202, 138, 4, 0.28)",
                    }}
                >
                    <p
                        className="m-0 text-white font-bold line-height-3"
                        style={{ fontSize: "clamp(1rem, 2.8vw, 1.65rem)", letterSpacing: "0.06em" }}
                    >
                        CONTINUING EDUCATION FOR EXPERIOR AGENTS
                    </p>
                </div>

                <p className="text-700 line-height-3 m-0 mb-5">
                    Licensed agents must complete continuing education (CE) on the schedule each state requires. Experior partners
                    with several providers that offer discounts or included access—choose the option that fits your lines and
                    renewal cycle.
                </p>

                <section className="mb-5 pb-5 border-bottom-1 surface-border">
                    <h2 className={providerTitle}>Kaplan Financial Education</h2>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-3">
                        <li className="mb-2">
                            <strong>Free access</strong> to Kaplan&apos;s <strong>Total Access CE</strong> program for licensed
                            Experior agents.
                        </li>
                        <li className="mb-2">
                            <strong>15% discount</strong> on additional Kaplan products beyond the included CE library.
                        </li>
                        <li className="mb-2">
                            <strong>State reporting fees</strong> are billed separately—you are responsible for those charges when
                            applicable.
                        </li>
                    </ul>
                    <p className="text-700 m-0 mb-2">
                        <a href="/documents/kaplan-total-access-ce-guide.pdf" target="_blank" rel="noopener noreferrer" className={link}>
                            Guide to Kaplan Total Access CE (PDF)
                        </a>
                    </p>
                    <p className="text-700 m-0">
                        <a href="https://www.kaplanfinancial.com/" target="_blank" rel="noopener noreferrer" className={link}>
                            Kaplan website
                        </a>
                    </p>
                </section>

                <section className="mb-5 pb-5 border-bottom-1 surface-border">
                    <h2 className={providerTitle}>United Insurance Educators, Inc.</h2>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        <a href="https://www.uiece.com/" target="_blank" rel="noopener noreferrer" className={link}>
                            https://www.uiece.com/
                        </a>
                    </p>
                    <p className="text-700 m-0 mb-2">
                        <strong>50% discount</strong> on CE credits when you use coupon code{" "}
                        <code className="surface-100 border-1 surface-border border-round px-2 py-1 text-900 font-semibold">
                            EXPERIOR
                        </code>
                        .
                    </p>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        <strong>United States:</strong> available in all states.
                        <br />
                        <strong>Canada:</strong> Alberta, British Columbia, Manitoba, Ontario, and Saskatchewan.
                    </p>
                    <p className="text-700 m-0 mb-2">
                        <a href="/documents/uiece-ce-instructions.pdf" target="_blank" rel="noopener noreferrer" className={link}>
                            Download instructions (PDF)
                        </a>
                    </p>
                    <p className="text-700 m-0">
                        <a href="/documents/uiece-ce-instructions.pdf" target="_blank" rel="noopener noreferrer" className={link}>
                            Click to view instructions here
                        </a>
                    </p>
                </section>

                <section className="mb-5 pb-5 border-bottom-1 surface-border">
                    <h2 className={providerTitle}>WebCE</h2>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-3">
                        <li className="mb-2">Broad approvals across the U.S. (50 states + D.C. &amp; Guam).</li>
                        <li className="mb-2">One-click packages aligned to common license renewal bundles.</li>
                        <li className="mb-2">Mobile-friendly platform with optional read-aloud audio.</li>
                        <li className="mb-2">Fast credit reporting to regulators where supported.</li>
                    </ul>
                    <p className="text-700 m-0">
                        <a href="https://www.webce.com/experior" target="_blank" rel="noopener noreferrer" className={link}>
                            CLICK HERE — WebCE for Experior
                        </a>
                    </p>
                </section>

                <section className="mb-0">
                    <h2 className={providerTitle}>ExamFX</h2>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        When you enroll in a qualifying <strong>pre-licensing</strong> package, a <strong>CE bundle</strong> may be
                        included for <strong>365 days</strong> from activation. Regular renewal pricing is typically{" "}
                        <strong>$49.95/year</strong>; Experior agents with a manager account can apply a{" "}
                        <strong>30% discount</strong> using their <strong>manager email</strong> as the promo code at checkout (
                        <strong>$34.95</strong> where that offer applies—confirm in ExamFX before you pay).
                    </p>
                    <p className="text-700 m-0">
                        <a href="https://www.examfx.com/experior" target="_blank" rel="noopener noreferrer" className={link}>
                            ExamFX for Experior
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
