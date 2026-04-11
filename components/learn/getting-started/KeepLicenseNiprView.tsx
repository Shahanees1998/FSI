const NIPR_URL = "https://www.nipr.com/";

export default function KeepLicenseNiprView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4 md:text-left">
                    Keep your License up to date with NIPR
                </h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-4"
                    style={{
                        background: "linear-gradient(115deg, #ca8a04 0%, #eab308 45%, #fde047 100%)",
                        boxShadow: "0 8px 24px rgba(202, 138, 4, 0.28)",
                    }}
                >
                    <p
                        className="m-0 text-white font-bold line-height-3"
                        style={{
                            fontSize: "clamp(1.05rem, 3vw, 1.75rem)",
                            letterSpacing: "0.06em",
                        }}
                    >
                        KEEP YOUR LICENSE UP TO DATE
                    </p>
                </div>

                <p className="text-orange-600 font-semibold text-lg md:text-xl m-0 mb-5">
                    Keep your license up to date with NIPR
                </p>

                <a
                    href={NIPR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex align-items-center justify-content-center px-5 py-2 border-1 surface-border border-round bg-white text-blue-600 font-bold no-underline hover:surface-100 transition-colors transition-duration-150"
                    style={{ minWidth: "7rem", letterSpacing: "0.08em" }}
                >
                    NIPR
                </a>

                <p className="text-700 line-height-3 m-0 mt-5 text-sm md:text-base text-left mx-auto" style={{ maxWidth: "36rem" }}>
                    Use the{" "}
                    <a href={NIPR_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium no-underline hover:underline">
                        National Insurance Producer Registry (NIPR)
                    </a>{" "}
                    to renew resident and non-resident licenses, update your profile, and complete many state transactions in one
                    place. Always confirm your state&apos;s specific rules alongside NIPR.
                </p>
            </div>
        </div>
    );
}
