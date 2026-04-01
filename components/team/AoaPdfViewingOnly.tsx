import Link from "next/link";

const AOA_PDF_LINKS: { title: string; href: string }[] = [
    {
        title: "AOA (Associate/Agent Ownership Agreement) for licensed associates",
        href: "#",
    },
    {
        title: "AOA (Associate/Agent Ownership Agreement) for unlicensed associates",
        href: "#",
    },
    {
        title: "AOA (Associate/Agent Ownership Agreement) for licensed associates - Spanish Version",
        href: "#",
    },
    {
        title: "AOA (Associate/Agent Ownership Agreement) for unlicensed associates - Spanish Version",
        href: "#",
    },
];

export default function AoaPdfViewingOnly() {
    return (
        <div className="aoa-pdf-viewing w-full max-w-full px-3 py-4 md:px-6 md:py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">AOA pdf</h1>

            <ul className="list-none m-0 p-0 flex flex-column gap-3">
                {AOA_PDF_LINKS.map((doc) => (
                    <li key={doc.title}>
                        <a
                            href={doc.href}
                            {...(doc.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="flex align-items-center gap-3 w-full no-underline text-800 border-round-lg p-3 md:p-4 transition-colors transition-duration-150 hover:brightness-95"
                            style={{ background: "#f2f2f2" }}
                        >
                            <i className="pi pi-file text-2xl text-600 flex-shrink-0" aria-hidden />
                            <div className="flex-grow-1 min-w-0">
                                <div className="font-medium text-900 line-height-3">{doc.title}</div>
                                <div className="text-sm text-500 mt-1">.pdf</div>
                            </div>
                            <i className="pi pi-external-link text-xl text-600 flex-shrink-0" aria-hidden />
                        </a>
                    </li>
                ))}
            </ul>

            <p className="font-bold text-900 m-0 mt-6 line-height-3 text-sm md:text-base">
                Please complete the AOA application{" "}
                <Link href="/agent/team/recruiting/aoa-online-sign-up" className="text-primary underline">
                    online
                </Link>{" "}
                and not on the PDF or on a paper copy.
            </p>
        </div>
    );
}
