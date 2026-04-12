const linkClass = "text-blue-600 font-medium no-underline hover:underline";

const SUPPORT_EMAIL = "experiorconnect@experiorheadoffice.ca";

function YoutubeEmbed({ videoId, title, emptyHint }: { videoId: string | null; title: string; emptyHint: string }) {
    const id = videoId?.trim() || null;
    if (!id) {
        return (
            <div
                className="border-round border-1 surface-border surface-200 flex align-items-center justify-content-center text-600 text-sm p-4 text-center"
                style={{ aspectRatio: "16 / 9", maxWidth: "42rem" }}
            >
                {emptyHint}
            </div>
        );
    }

    const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;

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

export type ExperiorConnectWorkvivoGettingStartedViewProps = {
    desktopLoginUrl: string;
    iosAppUrl: string;
    androidAppUrl: string;
    /** Optional relative path (e.g. /images/learn/workvivo-spaces.png) for the Spaces screenshot */
    dashboardImageSrc: string | null;
    profileTutorialYoutubeId: string | null;
    createPostTutorialYoutubeId: string | null;
};

export default function ExperiorConnectWorkvivoGettingStartedView({
    desktopLoginUrl,
    iosAppUrl,
    androidAppUrl,
    dashboardImageSrc,
    profileTutorialYoutubeId,
    createPostTutorialYoutubeId,
}: ExperiorConnectWorkvivoGettingStartedViewProps) {
    const desktop = desktopLoginUrl.trim();
    const ios = iosAppUrl.trim();
    const android = androidAppUrl.trim();
    const iosQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ios)}`;
    const androidQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(android)}`;

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">
                    Experior Connect - Workvivo Getting Started
                </h1>

                <div
                    className="border-round-xl p-5 md:p-6 mb-5 text-center"
                    style={{
                        background: "linear-gradient(180deg, #fde047 0%, #facc15 100%)",
                        boxShadow: "0 4px 14px rgba(234, 179, 8, 0.35)",
                    }}
                >
                    <p className="text-sm font-bold text-900 m-0 mb-3 tracking-wide" style={{ letterSpacing: "0.12em" }}>
                        workvivo
                    </p>
                    <p className="m-0 text-900 font-black text-4xl md:text-5xl leading-tight" style={{ lineHeight: 1.05 }}>
                        EXPERIOR
                        <br />
                        <span className="text-white" style={{ WebkitTextStroke: "1px rgba(15, 23, 42, 0.25)" }}>
                            CONNECT
                        </span>
                    </p>
                </div>

                <section className="mb-5">
                    <h2 className="text-xl font-semibold text-900 m-0 mb-2">What is Experior Connect - Workvivo?</h2>
                    <p className="text-700 line-height-3 m-0">
                        Experior Connect - Workvivo is the central hub for our agents to connect with their teams. Each Executive Director
                        can create private spaces for team communication, where Q&amp;A, events, news, and documents are shared.
                        Additionally, Experior Connect provides a platform for users to interact and celebrate with other teams, directors,
                        and our co-founders, Jamie Prickett and CEO Lee-Ann Prickett, enhancing collaboration. It is meant to replace their
                        Telegram and WhatsApp groups. This app is customizable and social, ensuring that our company community and success
                        are accessible at every corner.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className="text-xl font-semibold text-900 m-0 mb-2">Who has access?</h2>
                    <p className="text-700 line-height-3 m-0">
                        Currently, only licensed agents at Experior have access to Experior Connect - Workvivo.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className="text-xl font-semibold text-900 m-0 mb-3">What is the first step to access Experior Connect?</h2>
                    <ol className="text-700 line-height-3 m-0 pl-3 flex flex-column gap-3" style={{ listStyleType: "decimal" }}>
                        <li>
                            <strong>Account creation.</strong> Accounts are created automatically once you are licensed. You will receive a
                            welcome email from Experior Connect with a link to set your password. This link expires after 48 hours. If it has
                            expired, email{" "}
                            <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
                                {SUPPORT_EMAIL}
                            </a>
                            .
                        </li>
                        <li>
                            <strong>Login.</strong> Use your back office email and the password you created.
                        </li>
                        <li>
                            <strong>Profile.</strong> Explore the interface and set up a profile photo.
                        </li>
                        <li>
                            <strong>Spaces.</strong> Go to the <strong>Spaces</strong> section on the left sidebar. Request access to your
                            Executive Director&apos;s space.
                            <p className="m-0 mt-2 text-600 text-sm">
                                <strong>Note for Executive Directors:</strong> You are responsible for creating a space for your team,
                                setting it to <strong>Private</strong>, and adding a description.
                            </p>
                        </li>
                        <li>
                            <strong>Features.</strong> Use News, Articles, Community Space, Documents, and Media to stay engaged.
                        </li>
                    </ol>
                </section>

                <section className="mb-5">
                    <h2 className="text-xl font-semibold text-900 m-0 mb-3">Spaces overview</h2>
                    {dashboardImageSrc?.trim() ? (
                        <div className="relative w-full border-round border-1 surface-border overflow-hidden bg-white">
                            {/* eslint-disable-next-line @next/next/no-img-element -- src comes from env / public path */}
                            <img
                                src={dashboardImageSrc.trim()}
                                alt="Workvivo dashboard showing Spaces"
                                className="w-full h-auto block"
                            />
                        </div>
                    ) : (
                        <div
                            className="border-round border-1 surface-border surface-100 flex align-items-center justify-content-center text-600 text-sm p-5 text-center"
                            style={{ minHeight: "12rem" }}
                        >
                            Add a Spaces screenshot under <code className="text-xs">public/images/learn/</code> and set{" "}
                            <code className="text-xs">NEXT_PUBLIC_WORKVIVO_DASHBOARD_IMAGE_SRC</code> (e.g.{" "}
                            <code className="text-xs">/images/learn/workvivo-spaces.png</code>) to display it here.
                        </div>
                    )}
                </section>

                <section className="mb-5">
                    <h2 className="text-xl font-semibold text-900 m-0 mb-3">Platform access</h2>
                    <ul className="m-0 pl-4 flex flex-column gap-2 text-700">
                        <li>
                            <a href={desktop} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                Desktop link
                            </a>
                        </li>
                        <li>
                            <a href={ios} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                Mobile App Store
                            </a>
                        </li>
                        <li>
                            <a href={android} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                Mobile Google Play
                            </a>
                        </li>
                    </ul>

                    <div
                        className="border-round-xl p-4 md:p-5 mt-4 text-center"
                        style={{ background: "#0f172a", color: "#f8fafc" }}
                    >
                        <p className="text-sm font-bold tracking-wide m-0 mb-4" style={{ letterSpacing: "0.08em" }}>
                            EXPERIOR CONNECT MOBILE APP
                        </p>
                        <div className="flex flex-wrap justify-content-center gap-5 md:gap-6">
                            <div>
                                <p className="text-xs m-0 mb-2 opacity-90">App Store</p>
                                {/* eslint-disable-next-line @next/next/no-img-element -- external QR data URL service */}
                                <img src={iosQrSrc} alt="QR code linking to the Workvivo app on the App Store" width={200} height={200} />
                            </div>
                            <div>
                                <p className="text-xs m-0 mb-2 opacity-90">Google Play</p>
                                <img
                                    src={androidQrSrc}
                                    alt="QR code linking to the Workvivo app on Google Play"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-5">
                    <h2 className="text-xl font-semibold text-900 m-0 mb-2">Contact</h2>
                    <p className="text-700 line-height-3 m-0">
                        For any questions, requests, or issues, email{" "}
                        <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
                            {SUPPORT_EMAIL}
                        </a>
                        .
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-900 m-0 mb-4">Tutorials</h2>
                    <div className="flex flex-column gap-5">
                        <div>
                            <h3 className="text-lg font-semibold text-900 m-0 mb-2">Workvivo - Profile setup tutorial</h3>
                            <YoutubeEmbed
                                videoId={profileTutorialYoutubeId}
                                title="Workvivo profile setup tutorial"
                                emptyHint="Video will appear here once NEXT_PUBLIC_WORKVIVO_PROFILE_TUTORIAL_YOUTUBE_ID is set (YouTube video ID only)."
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-900 m-0 mb-2">
                                Workvivo - How to create a post &amp; where to post
                            </h3>
                            <YoutubeEmbed
                                videoId={createPostTutorialYoutubeId}
                                title="Workvivo how to create a post"
                                emptyHint="Video will appear here once NEXT_PUBLIC_WORKVIVO_CREATE_POST_TUTORIAL_YOUTUBE_ID is set (YouTube video ID only)."
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
