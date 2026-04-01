const BEAM_PDF_LINKS: { title: string; href: string }[] = [
    {
        title: "BEAM — Program overview and eligibility (reference)",
        href: "/documents/beam-document-1.pdf",
    },
    {
        title: "BEAM — Training and onboarding checklist",
        href: "/documents/beam-document-2.pdf",
    },
];

export default function BeamRecruitingView() {
    return (
        <div className="beam-recruiting w-full max-w-full px-3 py-4 md:px-6 md:py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">BEAM</h1>

            <ul className="list-none m-0 p-0 flex flex-column gap-3">
                {BEAM_PDF_LINKS.map((doc) => (
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
    );
}
