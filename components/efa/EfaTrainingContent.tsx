import Link from "next/link";

const DEFAULT_VIDEO_ID = "jNQXAC9IVRw";

const RESOURCE_LINKS: { label: string; href: string }[] = [
    {
        label: "Debt Section",
        href: "https://www.youtube.com/results?search_query=debt+section+financial+planning",
    },
    {
        label: "EFA Savings and Retirement",
        href: "https://www.youtube.com/results?search_query=EFA+savings+retirement",
    },
    {
        label: "EFA Education section",
        href: "https://www.youtube.com/results?search_query=EFA+education+insurance",
    },
    {
        label: "Life Insurance section",
        href: "https://www.youtube.com/results?search_query=life+insurance+training",
    },
];

export default function EfaTrainingContent() {
    const videoId = process.env.NEXT_PUBLIC_EFA_TRAINING_VIDEO_ID ?? DEFAULT_VIDEO_ID;
    const embedSrc = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="efa-training-content max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">EFA Training</h1>

            <div
                className="relative w-full overflow-hidden border-round border-1 surface-border bg-black"
                style={{ paddingBottom: "56.25%" }}
            >
                <iframe
                    title="EFA training video"
                    src={embedSrc}
                    className="absolute top-0 left-0 w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>

            <nav className="mt-5 flex flex-column gap-3 align-items-start" aria-label="Training resources">
                {RESOURCE_LINKS.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-lg no-underline hover:underline"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

        </div>
    );
}
