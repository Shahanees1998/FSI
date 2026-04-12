import Image from "next/image";

const link = "text-blue-600 font-medium no-underline hover:underline";

type AnnuitiesQuantumViewProps = {
    /** Experior Advisor Portal / Quantum Group URL (optional) */
    advisorPortalUrl: string | null;
};

export default function AnnuitiesQuantumView({ advisorPortalUrl }: AnnuitiesQuantumViewProps) {
    const portal = advisorPortalUrl?.trim() || null;

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Annuities/Quantum</h1>

                <div className="flex align-items-center gap-3 mb-4">
                    <div
                        className="flex align-items-center justify-content-center border-circle w-3rem h-3rem flex-shrink-0 text-white font-bold text-xl shadow-1"
                        style={{ background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" }}
                        aria-hidden
                    >
                        Q
                    </div>
                    <span
                        className="text-3xl md:text-4xl font-normal m-0"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#5b21b6" }}
                    >
                        Quantum
                    </span>
                </div>

                <section className="pb-4 mb-4 border-bottom-1 surface-border">
                    {portal ? (
                        <p className="m-0 mb-2">
                            <a href={portal} target="_blank" rel="noopener noreferrer" className={`${link} text-lg font-bold`}>
                                Experior Advisor Portal — The Quantum Group
                            </a>
                            <span className="text-900 font-bold"> (Password: Partnership)</span>
                        </p>
                    ) : (
                        <p className="text-900 font-bold m-0 mb-2 text-lg">
                            Experior Advisor Portal — The Quantum Group <span className="font-bold">(Password: Partnership)</span>
                        </p>
                    )}
                    <p className="text-700 line-height-3 m-0">
                        Use this portal for contracting, contacts, product information, and more useful resources.
                    </p>
                    {!portal ? (
                        <p className="text-600 text-xs m-0 mt-2">
                            Set <code className="text-xs">NEXT_PUBLIC_QUANTUM_ADVISOR_PORTAL_URL</code> to link the portal heading.
                        </p>
                    ) : null}
                </section>

                <section className="pb-4 mb-4 border-bottom-1 surface-border">
                    <h2 className="text-lg font-semibold text-900 m-0 mb-2">Sales support</h2>
                    <p className="text-700 line-height-3 m-0 mb-1">
                        <strong className="text-900">Colton Cangley</strong> — VP of Advisor Development
                    </p>
                    <p className="text-700 m-0 mb-1">
                        <span className="font-semibold text-900">Phone:</span>{" "}
                        <a href="tel:+18004401088" className={link}>
                            800-440-1088
                        </a>
                    </p>
                    <p className="text-700 m-0">
                        <span className="font-semibold text-900">E-mail:</span>{" "}
                        <a href="mailto:ccangley@thequantum.com" className={link}>
                            ccangley@thequantum.com
                        </a>
                    </p>
                </section>

                <section className="pb-4 mb-4 border-bottom-1 surface-border">
                    <h2 className="text-lg font-semibold text-900 m-0 mb-2">Questions and illustration requests</h2>
                    <p className="text-700 m-0">
                        <span className="font-semibold text-900">E-mail:</span>{" "}
                        <a href="mailto:casedesign@thequantum.com" className={link}>
                            casedesign@thequantum.com
                        </a>
                    </p>
                </section>

                <section className="pb-4 mb-4 border-bottom-1 surface-border">
                    <h2 className="text-lg font-semibold text-900 m-0 mb-2">Annexus sign-up</h2>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        When completing agent/representative information with Annexus, use the following values where applicable:
                    </p>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-3">
                        <li className="mb-2">
                            <strong className="text-900">IDC:</strong> Quantum
                        </li>
                        <li className="mb-2">
                            <strong className="text-900">IDC marketer first name:</strong> Colton
                        </li>
                        <li className="mb-2">
                            <strong className="text-900">IDC marketer last name:</strong> Cangley
                        </li>
                        <li className="mb-2">
                            <strong className="text-900">IDC marketer e-mail address:</strong> ccangley@thequantum.com
                        </li>
                    </ul>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        For <strong className="text-900">Submitting annuity application as</strong>, select:
                    </p>
                    <ul className="text-700 line-height-3 m-0 pl-4">
                        <li>
                            <strong>Through broker dealer</strong> — BD name: <strong className="text-900">EXPERIOR FINANCIAL GROUP INC</strong>
                        </li>
                    </ul>
                </section>

                <section className="pb-4 mb-4 border-bottom-1 surface-border">
                    <h2 className="text-lg font-semibold text-900 m-0 mb-2">Annexus form reference</h2>
                    <p className="text-600 text-sm m-0 mb-3">
                        Example of the data entry step (fields may change; follow current Annexus prompts).
                    </p>
                    <div className="border-1 surface-border border-round-lg overflow-hidden shadow-1 bg-white" style={{ maxWidth: "28rem" }}>
                        <Image
                            src="/images/learn/annexus-quantum-agent-form.png"
                            alt="Annexus portal: agent information with IDC Quantum, marketer Colton Cangley, submitting as Through Broker Dealer, BD name Experior Financial Group Inc"
                            width={525}
                            height={1024}
                            className="w-full h-auto block"
                            sizes="(max-width: 768px) 100vw, 28rem"
                        />
                    </div>
                </section>

                <p className="m-0">
                    <a
                        href="/documents/learn/suitability-quick-reference-quantum.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                    >
                        Suitability quick reference guide
                    </a>
                </p>
            </div>
        </div>
    );
}
