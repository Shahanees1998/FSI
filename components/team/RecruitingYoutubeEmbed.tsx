const DEFAULT_VIDEO_ID = "jNQXAC9IVRw";

type Props = {
    title: string;
    videoId?: string;
};

export default function RecruitingYoutubeEmbed({ title, videoId = DEFAULT_VIDEO_ID }: Props) {
    const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;

    return (
        <div className="recruiting-youtube-embed w-full max-w-full px-3 py-4 md:px-6 md:py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">{title}</h1>

            <section aria-label={title} className="w-full max-w-5xl mx-auto">
                <div
                    className="w-full overflow-hidden border-round-xl border-1 surface-border shadow-1 bg-black"
                    style={{ aspectRatio: "16 / 9" }}
                >
                    <iframe
                        title={title}
                        src={embedSrc}
                        className="w-full h-full border-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                </div>
            </section>
        </div>
    );
}
