type ScoreboardTrainingViewProps = {
    /** YouTube video ID only (from the watch URL), for “Investments Paid Amount Filter”. */
    investmentsPaidFilterVideoId: string | null;
};

export default function ScoreboardTrainingView({ investmentsPaidFilterVideoId }: ScoreboardTrainingViewProps) {
    const id = investmentsPaidFilterVideoId?.trim() || null;
    const embedSrc = id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : null;

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-3 md:p-4 lg:p-5">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Scoreboard Training</h1>

                <div
                    className="border-round-xl p-6 md:p-8 mb-5 text-center"
                    style={{
                        background: "linear-gradient(115deg, #eab308 0%, #facc15 45%, #fde047 100%)",
                        boxShadow: "0 10px 28px rgba(234, 179, 8, 0.35)",
                    }}
                >
                    <p
                        className="m-0 text-white font-black line-height-3"
                        style={{
                            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
                            letterSpacing: "0.12em",
                            textShadow: "0 2px 12px rgba(15, 23, 42, 0.2)",
                        }}
                    >
                        SCOREBOARD TRAINING
                    </p>
                </div>

                <section>
                    <h2 className="text-xl md:text-2xl font-semibold text-900 m-0 mb-3">Investments Paid Amount Filter</h2>
                    <p className="text-700 line-height-3 m-0 mb-3 text-sm md:text-base">
                        Walkthrough of the scoreboard filters for investments and paid amount, including date range, team scope, and how to
                        refresh results with <strong>Show Scoreboard</strong>.
                    </p>

                    {embedSrc ? (
                        <div
                            className="relative w-full overflow-hidden border-round border-1 surface-border bg-black"
                            style={{ paddingBottom: "56.25%", maxWidth: "56rem" }}
                        >
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
                    ) : (
                        <div
                            className="border-round border-1 surface-border surface-200 flex align-items-center justify-content-center text-600 text-sm p-5 text-center line-height-3"
                            style={{ aspectRatio: "16 / 9", maxWidth: "56rem" }}
                        >
                            Add the YouTube video ID to{" "}
                            <code className="text-xs mx-1">NEXT_PUBLIC_SCOREBOARD_TRAINING_INVESTMENTS_PAID_FILTER_VIDEO_ID</code> in your
                            environment to embed the recording here (ID only, e.g. from{" "}
                            <code className="text-xs">youtube.com/watch?v=...</code>).
                        </div>
                    )}

                    <p className="text-600 text-xs m-0 mt-3">
                        After watching, use <strong>Scoreboard → Company</strong> or <strong>Personal</strong> in the main menu to apply
                        the same filters live.
                    </p>
                </section>
            </div>
        </div>
    );
}
