type BackOfficeFeesViewProps = {
    /** Optional YouTube video ID for ecosystem overview embed */
    ecosystemVideoId?: string | null;
};

const FEES: { role: string; monthly: string }[] = [
    { role: "Unlicensed", monthly: "$19" },
    { role: "Financial Associate", monthly: "$40" },
    { role: "Senior Financial Associate", monthly: "$50" },
    { role: "Senior Manager", monthly: "$70" },
    { role: "Executive Director", monthly: "$85" },
];

const INCLUDED = [
    "CE credits",
    "EFA tools",
    "Quote tools",
    "eApp software",
    "Dashboard",
    "Client management system",
    "Support across all lines of business",
    "Contracting",
    "Compliance",
] as const;

function VideoOrPlaceholder({ videoId }: { videoId?: string | null }) {
    const id = videoId?.trim();
    if (id) {
        return (
            <div
                className="relative w-full overflow-hidden border-round border-1 surface-border bg-black mb-5"
                style={{ paddingBottom: "56.25%" }}
            >
                <iframe
                    title="Ecosystem fees overview"
                    src={`https://www.youtube.com/embed/${id}`}
                    className="absolute top-0 left-0 w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div
            className="border-round border-1 surface-border mb-5 flex align-items-center justify-content-center text-600 text-sm"
            style={{
                minHeight: "min(42vh, 360px)",
                background: "linear-gradient(180deg, #374151 0%, #1f2937 100%)",
            }}
        >
            Overview video or graphic can be placed here (set NEXT_PUBLIC_ECOSYSTEM_FEES_VIDEO_ID for a YouTube embed).
        </div>
    );
}

export default function BackOfficeFeesView({ ecosystemVideoId }: BackOfficeFeesViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-1">Back Office Fees</h1>
                <p className="text-xl font-semibold text-orange-600 m-0 mb-3">Ecosystem fees</p>

                <p className="text-700 m-0 mb-2 flex flex-column sm:flex-row flex-wrap gap-2 sm:gap-4">
                    <a
                        href="/documents/entrepreneur-ecosystem.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium no-underline hover:underline"
                    >
                        Entrepreneur Ecosystem
                    </a>
                    <a
                        href="/documents/entrepreneur-ecosystem-spanish.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium no-underline hover:underline"
                    >
                        Entrepreneur Ecosystem — Spanish
                    </a>
                </p>

                <VideoOrPlaceholder videoId={ecosystemVideoId} />

                <h2 className="text-xl font-semibold text-900 mt-0 mb-3">Back office ecosystem fees</h2>
                <p className="text-700 line-height-3 m-0 mb-3">
                    Monthly ecosystem fees vary by role. They help fund the administrative services and technology stack you use in
                    the portal every day.
                </p>

                <div className="overflow-x-auto border-1 surface-border border-round-lg mb-3">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="surface-100">
                                <th className="text-left border-1 surface-border p-3">Role</th>
                                <th className="text-right border-1 surface-border p-3">Monthly fee</th>
                            </tr>
                        </thead>
                        <tbody className="text-700">
                            {FEES.map((row) => (
                                <tr key={row.role}>
                                    <td className="border-1 surface-border p-3 font-medium text-900">{row.role}</td>
                                    <td className="border-1 surface-border p-3 text-right">{row.monthly}/month</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-600 text-sm m-0 mb-4 line-height-3">
                    <strong>Note:</strong> Licensed associate pricing includes CRM and email where offered in your program tier.
                </p>

                <div
                    className="surface-50 border-round-lg border-1 surface-border p-4 md:p-5"
                    style={{ borderLeft: "4px solid #eab308" }}
                >
                    <h3 className="text-lg font-semibold text-900 mt-0 mb-3">
                        Access our administrative services technology, which includes:
                    </h3>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-0">
                        {INCLUDED.map((item) => (
                            <li key={item} className="mb-2">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
