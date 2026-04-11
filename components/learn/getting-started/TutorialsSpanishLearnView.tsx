type TutorialsSpanishLearnViewProps = {
    videos: {
        preLicense?: string;
        nipr?: string;
        platform?: string;
        eo?: string;
        inviteLead?: string;
        nbtEfaLite?: string;
    };
};

function VideoEmbed({ videoId, title }: { videoId?: string | null; title: string }) {
    if (!videoId?.trim()) {
        return (
            <div
                className="border-round border-1 surface-border surface-200 flex align-items-center justify-content-center text-600 text-sm p-5"
                style={{ aspectRatio: "16 / 9", maxHeight: "420px" }}
            >
                Video will appear here once the YouTube ID is configured for this section.
            </div>
        );
    }

    const src = `https://www.youtube.com/embed/${videoId.trim()}`;

    return (
        <div
            className="relative w-full overflow-hidden border-round border-1 surface-border bg-black"
            style={{ paddingBottom: "56.25%" }}
        >
            <iframe
                title={title}
                src={src}
                className="absolute top-0 left-0 w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}

const headingClass = "text-xl md:text-2xl font-semibold m-0 mb-2";
const headingStyle = { color: "#b45309" };

export default function TutorialsSpanishLearnView({ videos }: TutorialsSpanishLearnViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Tutorials in Spanish</h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-5 text-center"
                    style={{
                        background: "linear-gradient(115deg, #ca8a04 0%, #eab308 45%, #fde047 100%)",
                        boxShadow: "0 8px 24px rgba(202, 138, 4, 0.28)",
                    }}
                >
                    <p
                        className="m-0 text-white font-bold line-height-3"
                        style={{ fontSize: "clamp(1.05rem, 3vw, 1.75rem)", letterSpacing: "0.08em" }}
                    >
                        TUTORIALS IN SPANISH
                    </p>
                </div>

                <section className="mb-5">
                    <h2 className={headingClass} style={headingStyle}>
                        HOW TO REGISTER FOR YOUR PRE-LICENSE COURSE
                    </h2>
                    <p className="text-700 text-sm m-0 mb-2">(For discount, ask your Executive Director for the discount email.)</p>
                    <p className="text-600 text-sm font-medium m-0 mb-3">Pre Licencia en ExamFX — Spanish version</p>
                    <VideoEmbed videoId={videos.preLicense} title="Pre-licencia ExamFX (Spanish)" />
                </section>

                <section className="mb-5">
                    <h2 className={headingClass} style={headingStyle}>
                        ALL INFORMATION ABOUT LICENSING IS IN NIPR
                    </h2>
                    <p className="text-600 text-sm font-medium m-0 mb-3">Solicitar la licencia en NIPR y más — Spanish version</p>
                    <VideoEmbed videoId={videos.nipr} title="NIPR licensing (Spanish)" />
                </section>

                <section className="mb-5">
                    <h2 className={headingClass} style={headingStyle}>
                        BROWSING THE EXPERIOR ONLINE PLATFORM
                    </h2>
                    <p className="text-600 text-sm font-medium m-0 mb-3">Navegando la plataforma online de Experior</p>
                    <VideoEmbed videoId={videos.platform} title="Experior online platform (Spanish)" />
                </section>

                <section className="mb-5">
                    <h2 className={headingClass} style={headingStyle}>
                        HOW TO ACQUIRE THE ERRORS AND OMISSIONS CERTIFICATE
                    </h2>
                    <p className="text-600 text-sm font-medium m-0 mb-3">Cómo adquirir el certificado de errores y omisiones</p>
                    <VideoEmbed videoId={videos.eo} title="E and O certificate (Spanish)" />
                </section>

                <section className="mb-5">
                    <h2 className={headingClass} style={headingStyle}>
                        HOW TO SEND AN INVITATION LINK TO A LEAD
                    </h2>
                    <p className="text-600 text-sm font-medium m-0 mb-3">Cómo enviar un enlace de invitación a un prospecto</p>
                    <VideoEmbed videoId={videos.inviteLead} title="Invitation link to lead (Spanish)" />
                </section>

                <section className="mb-0">
                    <h2 className={headingClass} style={headingStyle}>
                        HOW TO DO AN NBT &amp; EFA LITE
                    </h2>
                    <p className="text-600 text-sm font-medium m-0 mb-3">NBT y EFA Lite — Spanish version</p>
                    <VideoEmbed videoId={videos.nbtEfaLite} title="NBT and EFA Lite (Spanish)" />
                </section>
            </div>
        </div>
    );
}
