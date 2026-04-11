type RegisterForOnlineCourseViewProps = {
    /** ExamFX (or partner) registration URL for the primary CTA */
    registrationUrl: string;
};

const SUPPORT_EMAIL = "brokersupport@experiorheadoffice.com";

const SPANISH_STATES = [
    "Texas",
    "Florida",
    "New York",
    "Connecticut (Life only)",
    "California",
    "New Mexico",
    "Pennsylvania (Life only)",
];

const PACKAGE_FEATURES = [
    { label: "Interactive learning portal", self: true, video: true, live: true },
    { label: "Chapter quizzes", self: true, video: true, live: true },
    { label: "Exam-style practice exams", self: true, video: true, live: true },
    { label: "On-demand video lectures", self: false, video: true, live: true },
    { label: "Live online instruction", self: false, video: false, live: true },
];

function CheckCell({ ok }: { ok: boolean }) {
    return (
        <td className="text-center border-1 surface-border p-2">
            {ok ? <i className="pi pi-check text-green-600" aria-label="Included" /> : "—"}
        </td>
    );
}

export default function RegisterForOnlineCourseView({ registrationUrl }: RegisterForOnlineCourseViewProps) {
    const registerHref = registrationUrl.trim() || "https://www.examfx.com/";

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Register for the Online Course</h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-4"
                    style={{
                        background: "linear-gradient(115deg, #ca8a04 0%, #eab308 40%, #fde047 100%)",
                        boxShadow: "0 8px 24px rgba(202, 138, 4, 0.28)",
                    }}
                >
                    <h2
                        className="m-0 text-white font-bold text-center line-height-3"
                        style={{
                            fontSize: "clamp(1.15rem, 3.5vw, 2rem)",
                            letterSpacing: "0.08em",
                        }}
                    >
                        REGISTER FOR THE ONLINE COURSE
                    </h2>
                </div>

                <section className="mb-4">
                    <div className="flex align-items-center gap-2 mb-3">
                        <span className="text-900 font-bold text-2xl">ExamFX</span>
                        <span className="text-600 text-sm font-medium border-left-1 surface-border pl-2">
                            Success Starts Here
                        </span>
                    </div>

                    <div
                        className="surface-100 border-round-lg border-1 surface-border p-4 mb-3"
                        style={{ borderLeft: "4px solid #eab308" }}
                    >
                        <p className="text-900 font-bold text-lg m-0 mb-2">
                            Course fee with Experior discount = <span className="text-orange-600">$32.99 USD</span>
                        </p>
                        <p className="text-700 line-height-3 m-0 mb-0">
                            When you register, you must enter your <strong>Executive Director&apos;s email address</strong>{" "}
                            associated with their Manager Account through ExamFX so your discounted rate applies correctly.
                        </p>
                    </div>

                    <p className="m-0 mb-3">
                        <a
                            href={registerHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-lg no-underline hover:underline"
                            style={{ color: "#db2777" }}
                        >
                            CLICK HERE TO REGISTER NOW!
                        </a>
                    </p>

                    <p className="text-700 line-height-3 m-0 mb-2">
                        <span className="font-semibold text-900">Spanish-language course availability</span> (where offered by
                        the state) includes: {SPANISH_STATES.join(", ")}.
                    </p>

                    <p className="text-700 line-height-3 m-0">
                        Executive Directors who need access to the Manager Account should contact{" "}
                        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 font-medium no-underline hover:underline">
                            {SUPPORT_EMAIL}
                        </a>
                        .
                    </p>
                </section>

                <section className="surface-50 border-round-lg p-4 mb-4 border-1 surface-border">
                    <h3 className="text-xl font-semibold text-900 mt-0 mb-2">Innovative training designed by experts</h3>
                    <p className="text-700 line-height-3 m-0 mb-4">
                        ExamFX focuses on high pass rates and practical, industry-informed content—including on-demand video
                        lectures—so you are prepared for life, health, property &amp; casualty, and related lines.
                    </p>

                    <div className="grid text-center mb-4">
                        <div className="col-12 md:col-4 p-3">
                            <p className="text-4xl font-bold text-orange-600 m-0 mb-1">90%</p>
                            <p className="text-600 text-sm m-0">Pass rate focus for over two decades</p>
                        </div>
                        <div className="col-12 md:col-4 p-3">
                            <p className="text-4xl font-bold text-orange-600 m-0 mb-1">6M+</p>
                            <p className="text-600 text-sm m-0">Learners trained through the platform</p>
                        </div>
                        <div className="col-12 md:col-4 p-3">
                            <p className="text-4xl font-bold text-orange-600 m-0 mb-1">60+</p>
                            <p className="text-600 text-sm m-0">Years of combined training experience</p>
                        </div>
                    </div>

                    <h4 className="text-lg font-semibold text-900 mt-0 mb-2">What you get</h4>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-0">
                        <li>Interactive learning portal (desktop, tablet, or mobile)</li>
                        <li>Interactive study calendar and chapter quizzes</li>
                        <li>Exam-style practice exams aligned to your state test</li>
                        <li>Optional live online or in-person training (package dependent)</li>
                        <li>Pass guarantee program (see ExamFX terms for eligibility)</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h3 className="text-xl font-semibold text-orange-600 mt-0 mb-3">Compare training packages</h3>
                    <div className="overflow-x-auto border-1 surface-border border-round-lg">
                        <table className="w-full border-collapse text-sm" style={{ minWidth: "320px" }}>
                            <thead>
                                <tr className="surface-100">
                                    <th className="text-left border-1 surface-border p-2 md:p-3">Feature</th>
                                    <th className="text-center border-1 surface-border p-2 md:p-3">Self-Study</th>
                                    <th className="text-center border-1 surface-border p-2 md:p-3">Video Study</th>
                                    <th className="text-center border-1 surface-border p-2 md:p-3">Live Online</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PACKAGE_FEATURES.map((row) => (
                                    <tr key={row.label}>
                                        <td className="border-1 surface-border p-2 md:p-3 text-700">{row.label}</td>
                                        <CheckCell ok={row.self} />
                                        <CheckCell ok={row.video} />
                                        <CheckCell ok={row.live} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="grid mb-4">
                    <div className="col-12 md:col-6 p-3 surface-50 border-round-lg border-1 surface-border">
                        <h4 className="text-900 font-semibold mt-0 mb-2 flex align-items-center gap-2">
                            <i className="pi pi-chart-bar text-yellow-600" aria-hidden />
                            Manager tracking
                        </h4>
                        <p className="text-700 line-height-3 m-0 text-sm">
                            Leaders can monitor progress and support new associates through the training journey.
                        </p>
                    </div>
                    <div className="col-12 md:col-6 p-3 surface-50 border-round-lg border-1 surface-border">
                        <h4 className="text-900 font-semibold mt-0 mb-2 flex align-items-center gap-2">
                            <i className="pi pi-comments text-yellow-600" aria-hidden />
                            Expert support
                        </h4>
                        <p className="text-700 line-height-3 m-0 text-sm">
                            Access content experts when you need clarification on tough topics or exam strategy.
                        </p>
                    </div>
                    <div className="col-12 md:col-6 p-3 surface-50 border-round-lg border-1 surface-border">
                        <h4 className="text-900 font-semibold mt-0 mb-2 flex align-items-center gap-2">
                            <i className="pi pi-check-square text-yellow-600" aria-hidden />
                            Personalized study paths
                        </h4>
                        <p className="text-700 line-height-3 m-0 text-sm">
                            Study plans adapt to your pace and focus areas so you spend time where it matters most.
                        </p>
                    </div>
                    <div className="col-12 md:col-6 p-3 surface-50 border-round-lg border-1 surface-border">
                        <h4 className="text-900 font-semibold mt-0 mb-2 flex align-items-center gap-2">
                            <i className="pi pi-verified text-yellow-600" aria-hidden />
                            Simulated exams
                        </h4>
                        <p className="text-700 line-height-3 m-0 text-sm">
                            Practice tests mirror the state exam experience to build confidence before test day.
                        </p>
                    </div>
                </section>

                <blockquote
                    className="surface-100 border-round-lg p-4 mb-4 m-0"
                    style={{ borderLeft: "4px solid #eab308" }}
                >
                    <p className="text-700 line-height-3 m-0 italic">
                        &ldquo;The material was clear and matched what I saw on the state exam. ExamFX made the process
                        straightforward.&rdquo;
                    </p>
                    <footer className="text-600 text-sm mt-2 m-0">— Mark, New Hampshire</footer>
                </blockquote>

                <section className="surface-50 border-round-lg p-4 mb-4 border-1 surface-border">
                    <h4 className="text-900 font-semibold mt-0 mb-2">Pass guarantee (summary)</h4>
                    <p className="text-700 line-height-3 m-0 text-sm">
                        If you score <strong>80% or higher</strong> on the ExamFX Guarantee Exam but do not pass your state exam
                        within the timeframe defined in ExamFX&apos;s current policy, you may be eligible for a refund on course
                        materials. Always read the official guarantee terms inside your ExamFX account before you purchase.
                    </p>
                </section>

                <footer className="flex flex-column md:flex-row align-items-center justify-content-between gap-3 pt-3 border-top-1 surface-border">
                    <span className="text-600 text-sm font-semibold">ExamFX · Insurance prelicensing</span>
                    <a
                        href={registerHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-button p-component p-button-warning font-bold no-underline"
                    >
                        <span className="p-button-label">Register at ExamFX</span>
                    </a>
                </footer>
            </div>
        </div>
    );
}
