"use client";

const VIDEOS = [
    {
        title: "HOW TO REGISTER FOR YOUR PRE-LICENSE COURSE",
        subtitle: "(For discount ask for your Executive Director's discount email)",
        videoId: "dQw4w9WgXcQ",
    },
    {
        title: "ALL INFORMATION ABOUT LICENSING IS IN NIPR",
        subtitle: "",
        videoId: "jNQXAC9IVRw",
    },
];

export default function NewAgentSpanishTutorialsView() {
    return (
        <div className="new-agent-spanish px-3 py-4 md:px-5 md:py-5">
            <h1 className="text-2xl font-bold text-900 m-0 mb-4">Spanish Tutorials</h1>

            <section
                className="border-round-lg p-4 md:p-5 mb-4 text-center"
                style={{ background: "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)" }}
            >
                <h2
                    className="m-0 text-white font-bold uppercase"
                    style={{
                        fontSize: "clamp(2rem, 7vw, 4rem)",
                        letterSpacing: "0.02em",
                        textShadow: "0 4px 10px rgba(0,0,0,0.25)",
                    }}
                >
                    Tutorials in Spanish
                </h2>
            </section>

            {VIDEOS.map((video) => (
                <section key={video.title} className="mb-5">
                    <h3 className="text-3xl font-semibold text-yellow-700 mt-0 mb-1">{video.title}</h3>
                    {video.subtitle && <p className="text-yellow-700 font-medium m-0 mb-3">{video.subtitle}</p>}
                    <div
                        className="w-full overflow-hidden border-round-lg border-1 surface-border shadow-1 bg-black"
                        style={{ aspectRatio: "16 / 9" }}
                    >
                        <iframe
                            title={video.title}
                            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
                            className="w-full h-full border-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </div>
                </section>
            ))}

            <h3 className="text-3xl font-semibold text-yellow-700 mt-0">BROWSING THE EXPERIOR ONLINE PLATFORM</h3>
        </div>
    );
}

