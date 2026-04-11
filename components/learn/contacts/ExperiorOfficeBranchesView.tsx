const link = "text-blue-600 font-medium no-underline hover:underline";

const DEFAULT_EMBED_URL = "https://www.experiorfinancialgroup.com/";

type ExperiorOfficeBranchesViewProps = {
    /** Full URL of the public Experior page to embed (Contact / branches / corporate site). */
    embedUrl: string | null;
};

export default function ExperiorOfficeBranchesView({ embedUrl }: ExperiorOfficeBranchesViewProps) {
    const url = (embedUrl?.trim() || DEFAULT_EMBED_URL).trim();

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden flex flex-column" style={{ minHeight: "70vh" }}>
            <div className="p-4 md:p-5 border-bottom-1 surface-border flex-shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Experior Office Branches</h1>
                <p className="text-700 line-height-3 m-0 text-sm md:text-base">
                    The corporate Experior site opens below so you can use <strong>Contact Us</strong>, branch information, and other
                    public pages without leaving the portal. If the frame is blank (some browsers block embedding), use{" "}
                    <strong>Open in new window</strong>.
                </p>
            </div>

            <div className="flex flex-column gap-2 p-3 md:p-4 flex-auto min-h-0" style={{ minHeight: "0" }}>
                <div className="flex flex-wrap gap-2 align-items-center justify-content-between flex-shrink-0">
                    <p className="text-600 text-sm m-0">Scroll inside the frame to view the full page.</p>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`${link} text-sm white-space-nowrap`}>
                        Open in new window
                    </a>
                </div>
                <div
                    className="w-full flex-auto border-1 surface-border border-round bg-white overflow-hidden"
                    style={{ minHeight: "65vh" }}
                >
                    <iframe
                        title="Experior Financial Group — office branches and contact"
                        src={url}
                        className="w-full border-none block"
                        style={{ height: "65vh", minHeight: "480px" }}
                        allow="clipboard-write; fullscreen"
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                </div>
                <p className="text-600 text-xs m-0 flex-shrink-0">
                    Override the embedded URL with{" "}
                    <code className="text-xs white-space-nowrap">NEXT_PUBLIC_EXPERIOR_OFFICE_BRANCHES_URL</code> (full{" "}
                    <code className="text-xs">https://…</code> link to the page you want agents to see).
                </p>
            </div>
        </div>
    );
}
