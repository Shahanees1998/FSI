import { requireCurrentUser } from "@/lib/serverAuth";

const DATA_SHEET_PDFS = [
    { title: "EFA Data Sheet - Licensed Associates", href: "/documents/efa-data-sheet-1.pdf" },
    { title: "EFA Data Sheet - Unlicensed Associates", href: "/documents/efa-data-sheet-2.pdf" },
];

export default async function AgentEfaDataSheetsPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0 w-full max-w-full bg-white">
            <div className="surface-100 border-bottom-1 surface-border px-3 py-2 md:px-4">
                <p className="text-600 text-sm m-0">
                    <span className="font-medium text-800">EFA</span>
                    <span className="mx-2">/</span>
                    <span>Data Sheets</span>
                </p>
            </div>

            <div className="px-3 py-4 md:px-6 md:py-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">EFA Data Sheets</h1>

                <ul className="list-none m-0 p-0 flex flex-column gap-3">
                    {DATA_SHEET_PDFS.map((doc) => (
                        <li key={doc.href}>
                            <a
                                href={doc.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex align-items-center gap-3 w-full no-underline text-800 border-round-lg p-3 md:p-4 transition-colors transition-duration-150 hover:brightness-95"
                                style={{ background: "#f2f2f2" }}
                            >
                                <i className="pi pi-file-pdf text-2xl text-600 flex-shrink-0" aria-hidden />
                                <div className="flex-grow-1 min-w-0">
                                    <div className="font-medium text-900 line-height-3">{doc.title}</div>
                                    <div className="text-sm text-500 mt-1">.pdf</div>
                                </div>
                                <i className="pi pi-external-link text-xl text-600 flex-shrink-0" aria-hidden />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

