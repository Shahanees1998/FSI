type NewsAndEventsViewProps = {
    /** Registration / tickets URL for Experior Factor (Orlando convention). */
    experiorFactorTicketsUrl: string | null;
    /** Qualifiers-only registration for Entrepreneurs Lounge webinar. */
    entrepreneursLoungeRegisterUrl: string | null;
};

const link = "text-blue-600 font-medium no-underline hover:underline";

export default function NewsAndEventsView({ experiorFactorTicketsUrl, entrepreneursLoungeRegisterUrl }: NewsAndEventsViewProps) {
    const factorUrl = experiorFactorTicketsUrl?.trim() ?? "";
    const loungeUrl = entrepreneursLoungeRegisterUrl?.trim() ?? "";

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-1">News &amp; Events</h1>
                <p className="text-blue-600 font-semibold text-sm m-0 mb-2 text-center md:text-left">Compliance</p>
                <h2 className="text-xl md:text-2xl font-bold text-900 text-center m-0 mb-6">Exciting Updates From Head Office</h2>

                {/* Experior Factor */}
                <section className="mb-6">
                    <div
                        className="border-round-xl overflow-hidden border-1 surface-border relative"
                        style={{
                            background: "linear-gradient(125deg, #4c1d95 0%, #a21caf 35%, #db2777 70%, #7c3aed 100%)",
                            minHeight: "14rem",
                        }}
                    >
                        <div className="p-4 md:p-6 text-center relative z-1" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}>
                            <p className="text-white text-sm md:text-base font-medium m-0 mb-3 opacity-90">
                                Experior Factor Annual Convention
                            </p>
                            <h3 className="m-0 mb-2 line-height-3">
                                <span className="text-white font-bold text-xl md:text-3xl tracking-wide">EXPAND THE VISION</span>
                                <br />
                                <span className="font-bold text-xl md:text-3xl tracking-wide" style={{ color: "#fb923c" }}>
                                    LEAD THE CHANGE
                                </span>
                            </h3>
                            <p
                                className="text-indigo-100 m-0 mb-4 text-sm md:text-base mx-auto line-height-3"
                                style={{ maxWidth: "28rem" }}
                            >
                                Where champions are recognized and new leaders rise.
                            </p>
                            <div className="flex flex-column sm:flex-row gap-2 align-items-center justify-content-center flex-wrap">
                                <div
                                    className="px-4 py-2 font-semibold text-white text-sm md:text-base border-round"
                                    style={{
                                        background: "rgba(76, 29, 149, 0.95)",
                                        transform: "skewX(-6deg)",
                                    }}
                                >
                                    <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
                                        Join us in Orlando — April 29 – May 1
                                    </span>
                                </div>
                                {factorUrl ? (
                                    <a
                                        href={factorUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 font-bold text-sm md:text-base border-round no-underline text-white"
                                        style={{
                                            background: "#ea580c",
                                            transform: "skewX(-6deg)",
                                        }}
                                    >
                                        <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
                                            TICKETS ON SALE — REGISTER NOW!
                                        </span>
                                    </a>
                                ) : (
                                    <div
                                        className="px-4 py-2 font-bold text-sm md:text-base border-round text-white"
                                        style={{
                                            background: "#ea580c",
                                            transform: "skewX(-6deg)",
                                        }}
                                    >
                                        <span style={{ display: "inline-block", transform: "skewX(6deg)" }}>
                                            TICKETS ON SALE — REGISTER NOW!
                                        </span>
                                    </div>
                                )}
                            </div>
                            {!factorUrl && (
                                <p className="text-white text-xs m-0 mt-3 opacity-90">
                                    Add <code className="text-xs">NEXT_PUBLIC_EXPERIOR_FACTOR_TICKETS_URL</code> to link this banner to
                                    your registration page.
                                </p>
                            )}
                        </div>
                    </div>
                    <p className="text-600 text-sm m-0 mt-2 line-height-3">
                        Convention hero graphic: add{" "}
                        <span className="white-space-nowrap text-xs font-mono">public/images/news-events/experior-factor-banner.jpg</span>{" "}
                        when marketing supplies the asset (optional background image can be wired later).
                    </p>
                </section>

                {/* Entrepreneurs Lounge */}
                <section className="border-top-1 surface-border pt-6">
                    <div className="flex align-items-center gap-2 mb-3">
                        <span
                            className="text-white text-xs font-bold px-2 py-1 border-round-sm"
                            style={{ background: "#171717" }}
                        >
                            MONTHLY CONTEST
                        </span>
                    </div>
                    <h3 className="text-yellow-600 font-bold text-lg md:text-xl m-0 mb-3 tracking-wide line-height-3">
                        ENTREPRENEURS LOUNGE WEBINAR SERIES!
                    </h3>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        You <strong>MUST</strong> first qualify to be able to attend and register for this meeting!
                    </p>
                    <p className="text-700 line-height-3 m-0 mb-4">
                        The meeting link is sent in an Experior newsletter to agents closer to meeting dates. Watch your inbox.
                    </p>

                    <div className="flex flex-column lg:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <p className="text-900 font-semibold m-0 mb-2">Entrepreneurs Lounge</p>
                            <p className="text-900 font-semibold m-0 mb-2">Learn from top leaders</p>
                            <ul className="text-700 line-height-3 m-0 pl-4 mb-4">
                                <li>Grow your business</li>
                                <li>Claim your reward</li>
                                <li>Hit your goal</li>
                                <li>Choose your prize</li>
                            </ul>
                            <p className="text-900 font-semibold m-0 mb-2">Qualify by meeting one of the following in the prior month:</p>
                            <ul className="text-700 line-height-3 m-0 pl-4 mb-3">
                                <li>4 AOAs</li>
                                <li>$7,500 in settled personal premium</li>
                                <li>$250,000 in personal investments</li>
                            </ul>
                            <p className="text-600 text-sm line-height-3 m-0">
                                Attend the entire exclusive webinar and select one reward.
                            </p>
                        </div>
                        <div
                            className="flex-1 border-1 border-dashed surface-border surface-100 border-round p-4 flex flex-column align-items-center justify-content-center text-center text-600 text-sm line-height-3"
                            style={{ minHeight: "15rem" }}
                        >
                            <p className="m-0 mb-3">
                                <i className="pi pi-clock text-yellow-600 text-xl mr-2" aria-hidden />
                                <strong className="text-900">8:00 p.m. ET</strong>
                            </p>
                            <p className="m-0 mb-3">
                                <i className="pi pi-calendar text-yellow-600 text-xl mr-2" aria-hidden />
                                <strong className="text-900">2nd Thursday monthly</strong>
                            </p>
                            <p className="m-0">Promotional graphic — add to public/images/news-events/ when available.</p>
                        </div>
                    </div>

                    <p className="text-center m-0">
                        {loungeUrl ? (
                            <a href={loungeUrl} target="_blank" rel="noopener noreferrer" className={link}>
                                REGISTER HERE (For Qualifiers ONLY)
                            </a>
                        ) : (
                            <>
                                <span className="text-600 text-sm">REGISTER HERE (For Qualifiers ONLY) — </span>
                                <span className="text-600 text-sm">
                                    configure <code className="text-xs">NEXT_PUBLIC_ENTREPRENEURS_LOUNGE_REGISTER_URL</code>
                                </span>
                            </>
                        )}
                    </p>
                </section>
            </div>
        </div>
    );
}
