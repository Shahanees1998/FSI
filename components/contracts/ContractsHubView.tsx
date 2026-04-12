import Link from "next/link";

const link = "text-blue-600 font-medium no-underline hover:underline";

const SECTIONS: { href: string; title: string; description: string; icon: string }[] = [
    {
        href: "/agent/contracts/pre-contracting-documents",
        title: "Pre-contracting documents",
        description: "Upload and maintain the files contracting needs before carrier applications go out.",
        icon: "pi pi-file",
    },
    {
        href: "/agent/contracts/my-contracts",
        title: "My contracts",
        description: "Start or continue carrier contracting, track status, and fix flagged items.",
        icon: "pi pi-book",
    },
    {
        href: "/agent/contracts/team-contracts",
        title: "Team contracts",
        description: "Review contracting activity for agents you support (when permissions apply).",
        icon: "pi pi-users",
    },
    {
        href: "/agent/contracts/corporate",
        title: "Corporate",
        description: "Entity paperwork and corporate contracting workflows.",
        icon: "pi pi-building",
    },
];

export default function ContractsHubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "56rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Contracts</h1>
                <p className="text-700 line-height-3 m-0 mb-5">
                    Manage pre-contracting files, your carrier appointments, team visibility, and corporate paperwork. Full workflows will
                    connect to the back office as this area is completed; use the links below to move between sections.
                </p>

                <div className="grid">
                    {SECTIONS.map((s) => (
                        <div key={s.href} className="col-12 md:col-6 mb-3">
                            <Link
                                href={s.href}
                                className="block h-full no-underline text-900 border-1 surface-border border-round-lg p-4 surface-ground hover:surface-hover transition-duration-150 shadow-1"
                            >
                                <div className="flex align-items-start gap-3">
                                    <span
                                        className="inline-flex align-items-center justify-content-center border-round flex-shrink-0 text-900"
                                        style={{ width: "2.5rem", height: "2.5rem", background: "#fef3c7" }}
                                        aria-hidden
                                    >
                                        <i className={`${s.icon} text-lg`} />
                                    </span>
                                    <div>
                                        <h2 className="text-lg font-semibold m-0 mb-2">{s.title}</h2>
                                        <p className="text-600 text-sm line-height-3 m-0">{s.description}</p>
                                        <span className={`${link} text-sm inline-block mt-2`}>Open →</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <section className="mt-5 pt-4 border-top-1 surface-border">
                    <h2 className="text-lg font-semibold text-900 m-0 mb-2">Training &amp; help</h2>
                    <ul className="m-0 pl-4 text-700 line-height-3 flex flex-column gap-2">
                        <li>
                            <Link href="/agent/learn/about-experior/getting-started/contracting-faq" className={link}>
                                Contracting FAQ
                            </Link>
                        </li>
                        <li>
                            <Link href="/agent/learn/departments/contracting" className={link}>
                                Learn → Departments → Contracting
                            </Link>
                        </li>
                        <li>
                            <Link href="/agent/learn/about-experior/getting-started/getting-appointed" className={link}>
                                Getting appointed / contracted
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
