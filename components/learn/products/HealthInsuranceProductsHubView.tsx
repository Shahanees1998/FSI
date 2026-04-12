import type { ReactNode } from "react";
import Link from "next/link";

const link = "text-blue-600 font-medium no-underline hover:underline";

type HealthInsuranceProductsHubViewProps = {
    newHealthPartnersUrl: string | null;
    c2gUrl: string | null;
};

function ScenarioBox({ children }: { children: ReactNode }) {
    return (
        <div
            className="border-round-lg p-4 mb-3 border-1"
            style={{ background: "#ecfdf5", borderColor: "#86efac" }}
        >
            <p className="text-900 font-semibold m-0 mb-2">Typical client scenarios</p>
            <ul className="text-700 line-height-3 m-0 pl-4 text-sm md:text-base">{children}</ul>
        </div>
    );
}

function PlatformCallout({
    title,
    description,
    actionUrl,
    actionLabel,
}: {
    title: string;
    description: string;
    actionUrl: string | null;
    actionLabel: string;
}) {
    return (
        <div
            className="border-round-lg p-4 mb-3 border-1"
            style={{ background: "#fef9c3", borderColor: "#fde047" }}
        >
            <p className="text-900 font-semibold m-0 mb-2">{title}</p>
            <p className="text-700 line-height-3 m-0 mb-3 text-sm md:text-base">{description}</p>
            {actionUrl ? (
                <a
                    href={actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex align-items-center justify-content-center px-4 py-2 border-round font-bold text-sm no-underline shadow-2 text-900"
                    style={{ background: "#facc15" }}
                >
                    {actionLabel}
                </a>
            ) : (
                <span
                    className="inline-flex align-items-center justify-content-center px-4 py-2 border-round font-bold text-sm text-900 opacity-80 cursor-default"
                    style={{ background: "#facc15" }}
                    title="Set the platform URL in environment variables"
                >
                    {actionLabel}
                </span>
            )}
        </div>
    );
}

function CertCallout({
    title,
    intro,
    items,
}: {
    title: string;
    intro: string;
    items: { tone: "required" | "ifApplicable"; label: string }[];
}) {
    return (
        <div
            className="border-round-lg p-4 mb-0 border-1"
            style={{ background: "#ccfbf1", borderColor: "#5eead4" }}
        >
            <p className="text-900 font-semibold m-0 mb-2">{title}</p>
            <p className="text-700 line-height-3 m-0 mb-3 text-sm md:text-base">{intro}</p>
            <ul className="list-none m-0 p-0 flex flex-column gap-2">
                {items.map((row) => (
                    <li key={row.label} className="flex flex-wrap align-items-center gap-2 text-700 text-sm md:text-base">
                        <span
                            className="inline-block px-2 py-1 border-round text-xs font-bold white-space-nowrap"
                            style={{
                                background: row.tone === "required" ? "#fecaca" : "#e5e7eb",
                                color: row.tone === "required" ? "#991b1b" : "#374151",
                            }}
                        >
                            {row.tone === "required" ? "Required" : "If applicable"}
                        </span>
                        <span>{row.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SidebarCard({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="surface-card border-round border-1 surface-border p-4 shadow-1 mb-3">
            <h2 className="text-lg font-semibold text-900 m-0 mb-2">{title}</h2>
            {children}
        </div>
    );
}

export default function HealthInsuranceProductsHubView({
    newHealthPartnersUrl,
    c2gUrl,
}: HealthInsuranceProductsHubViewProps) {
    const nhp = newHealthPartnersUrl?.trim() || null;
    const c2g = c2gUrl?.trim() || null;

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Health Insurance Products Hub</h1>
                <p className="text-700 line-height-3 m-0 mb-5 text-lg" style={{ maxWidth: "48rem" }}>
                    Explore the health insurance segments available through Experior. Understand what products you can offer, what
                    certifications you need, and which platforms to use for quoting and enrollment.
                </p>

                <div className="flex flex-column lg:flex-row gap-4 align-items-start">
                    <div className="flex-1 min-w-0 order-2 lg:order-1" style={{ maxWidth: "52rem" }}>
                        <section className="mb-5 pb-5 border-bottom-1 surface-border">
                            <h2 className="text-xl md:text-2xl font-semibold text-900 mt-0 mb-3">ACA / Marketplace plans</h2>
                            <p className="text-700 line-height-3 m-0 mb-3">
                                Individual and family major medical plans available on- and off-exchange. These are comprehensive
                                health insurance plans for under-65 clients who don&apos;t have employer coverage.
                            </p>
                            <ScenarioBox>
                                <li className="mb-1">Self-employed individuals and small-business owners without group coverage.</li>
                                <li className="mb-1">Early retirees who are not yet Medicare-eligible.</li>
                                <li className="mb-1">Clients with pre-existing conditions who need guaranteed-issue major medical.</li>
                                <li className="mb-1">Families comparing subsidies and metal-tier plans during open enrollment.</li>
                                <li className="mb-1">Part-time or gig workers without access to employer-sponsored benefits.</li>
                            </ScenarioBox>
                            <PlatformCallout
                                title="Your platform: New Health Partners"
                                description="Use New Health Partners for ACA quoting, enrollment, and plan comparisons. Your upline can help you activate access and complete any broker onboarding steps."
                                actionUrl={nhp}
                                actionLabel="Get started"
                            />
                            <CertCallout
                                title="Certification requirements for ACA"
                                intro="You will generally need an active Life &amp; Health producer license in the state where you sell, plus federal Marketplace (CMS/FFM) training each plan year where applicable."
                                items={[
                                    { tone: "required", label: "Life & Health license" },
                                    { tone: "required", label: "CMS / FFM certifications (annual)" },
                                    { tone: "ifApplicable", label: "State-based exchange certification" },
                                ]}
                            />
                        </section>

                        <section className="mb-5 pb-5 border-bottom-1 surface-border">
                            <h2 className="text-xl md:text-2xl font-semibold text-900 mt-0 mb-3">Medicare products</h2>
                            <p className="text-700 line-height-3 m-0 mb-3">
                                Medicare Advantage (Part C), Medicare Supplement (Medigap), and Part D prescription drug plans for
                                clients 65+ and certain disabled individuals. Help seniors navigate their Medicare options.
                            </p>
                            <ScenarioBox>
                                <li className="mb-1">Clients turning 65 and newly eligible for Medicare.</li>
                                <li className="mb-1">Seniors comparing plans during Annual Enrollment (AEP) or other valid election periods.</li>
                                <li className="mb-1">Beneficiaries who want supplemental coverage alongside Original Medicare.</li>
                                <li className="mb-1">Clients evaluating prescription drug coverage (Part D) or MAPD bundles.</li>
                                <li className="mb-1">Individuals under 65 on Medicare due to disability (where permitted).</li>
                            </ScenarioBox>
                            <PlatformCallout
                                title="Your platform: C2G"
                                description="C2G supports Medicare Advantage, Part D, and related workflows so you can quote, enroll, and manage renewals in one ecosystem. Confirm contracting and certifications with your upline."
                                actionUrl={c2g}
                                actionLabel="Get started"
                            />
                            <CertCallout
                                title="Certification requirements for Medicare"
                                intro="Medicare sales typically require AHIP each year plus carrier-specific product certifications before you can submit business."
                                items={[
                                    { tone: "required", label: "Life & Health license" },
                                    { tone: "required", label: "AHIP certification (annual)" },
                                    { tone: "required", label: "Carrier-specific certifications" },
                                ]}
                            />
                        </section>

                        <section className="mb-5 pb-5 border-bottom-1 surface-border">
                            <h2 className="text-xl md:text-2xl font-semibold text-900 mt-0 mb-3">Fixed indemnity</h2>
                            <p className="text-700 line-height-3 m-0 mb-3">
                                Fixed indemnity plans provide cash benefits for hospital stays, medical services, and other healthcare
                                events. Benefits are paid directly to the policyholder regardless of actual medical costs.
                            </p>
                            <ScenarioBox>
                                <li className="mb-1">Clients who want cash benefits to offset deductibles and everyday care.</li>
                                <li className="mb-1">Households with high-deductible health plans seeking extra financial cushion.</li>
                                <li className="mb-1">Workers who want simple, scheduled-benefit coverage alongside major medical.</li>
                            </ScenarioBox>
                            <p className="text-700 m-0 mb-1">
                                <span className="font-semibold text-900">Carriers to consider:</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["UHOne via C2G", "Mutual of Omaha", "Manhattan Life", "Assurity"].map((name) => (
                                    <span
                                        key={name}
                                        className="inline-block px-3 py-2 border-round border-1 surface-border bg-white text-700 text-sm font-medium"
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="mb-5 pb-5 border-bottom-1 surface-border">
                            <div
                                className="border-round-xl border-1 surface-border overflow-hidden surface-card shadow-1"
                                style={{ borderLeftWidth: "4px", borderLeftColor: "#f97316" }}
                            >
                                <div className="p-4 md:p-5">
                                    <h2 className="text-xl md:text-2xl font-semibold text-900 mt-0 mb-3">
                                        Supplemental / ancillary products
                                    </h2>
                                    <p className="text-700 line-height-3 m-0 mb-4">
                                        These products fill gaps in major medical coverage and provide additional financial protection.
                                        Sell alongside ACA, Medicare, or employer plans to give clients comprehensive coverage.
                                    </p>
                                    <div className="surface-100 border-round-lg p-4 mb-4">
                                        <p className="text-600 text-xs font-bold m-0 mb-3 letter-spacing-1">
                                            CARRIERS TO CONSIDER FOR ALL SUPPLEMENTAL PRODUCTS
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {["UHOne via C2G", "Mutual of Omaha", "Manhattan Life", "Assurity"].map((name) => (
                                                <span
                                                    key={name}
                                                    className="inline-block px-3 py-2 border-round border-1 surface-border bg-white text-700 text-sm"
                                                >
                                                    {name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {[
                                        {
                                            title: "Disability insurance",
                                            what: "Income protection that pays benefits if you are unable to work due to illness or injury.",
                                            ideal: "Working professionals and self-employed individuals who rely on their income to maintain their lifestyle.",
                                        },
                                        {
                                            title: "Critical illness insurance",
                                            what: "Lump sum coverage paid upon diagnosis of a covered serious illness like cancer, heart attack, or stroke.",
                                            ideal: "Anyone who wants financial protection from the out-of-pocket costs and income disruption caused by major illnesses.",
                                        },
                                        {
                                            title: "Accident insurance",
                                            what: "Coverage that pays benefits for injuries caused by accidental events.",
                                            ideal: "Active individuals, families, and those with high deductibles who want extra protection from unexpected accidents.",
                                        },
                                        {
                                            title: "Dental, vision & hearing insurance",
                                            what: "Coverage for routine and major dental, vision, and hearing care not fully covered by medical plans.",
                                            ideal: "Individuals and families looking to manage everyday healthcare expenses affordably.",
                                        },
                                    ].map((block, i) => (
                                        <div
                                            key={block.title}
                                            className={i > 0 ? "pt-4 mt-4 border-top-1 surface-border" : undefined}
                                        >
                                            <h3 className="text-lg font-semibold text-900 m-0 mb-2">{block.title}</h3>
                                            <p className="text-700 line-height-3 m-0 mb-2 text-sm md:text-base">
                                                <span className="font-semibold text-900">What it is:</span> {block.what}
                                            </p>
                                            <p className="text-700 line-height-3 m-0 text-sm md:text-base">
                                                <span className="font-semibold text-900">Ideal client:</span> {block.ideal}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="mb-5">
                            <h2 className="text-xl md:text-2xl font-semibold text-900 mt-0 mb-3 text-center">
                                Health insurance at a glance
                            </h2>
                            <div className="overflow-auto border-1 surface-border border-round-lg shadow-1 bg-white">
                                <table className="w-full border-collapse text-sm" style={{ minWidth: "36rem" }}>
                                    <thead>
                                        <tr className="surface-200">
                                            <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">
                                                Product type
                                            </th>
                                            <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">
                                                Target clients
                                            </th>
                                            <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">
                                                Platform
                                            </th>
                                            <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">
                                                Key certifications
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-700">
                                        <tr>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">
                                                ACA / Marketplace
                                            </td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">Under-65, individuals / families</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">New Health Partners</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">CMS / FFM (annual)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">
                                                Medicare Advantage &amp; Part D
                                            </td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">65+, disabled individuals</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">C2G</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">AHIP + carrier certs (annual)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">
                                                Medicare Supplement
                                            </td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">Medicare beneficiaries</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">C2G / Direct</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">L&amp;H license</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">
                                                Disability &amp; accident
                                            </td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">Working professionals</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">Direct carrier</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">L&amp;H license only</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">Critical illness</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">All ages, health concerns</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">Direct carrier</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">L&amp;H license only</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">
                                                Dental, vision, hearing
                                            </td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">All ages</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">Direct carrier</td>
                                            <td className="p-2 md:p-3 border-bottom-1 surface-border">L&amp;H license only</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section
                            className="border-round-xl p-4 md:p-5 text-center border-1 surface-border"
                            style={{ background: "#111827", color: "#f9fafb" }}
                        >
                            <h2 className="text-xl font-bold m-0 mb-2" style={{ color: "#fff" }}>
                                Ready to start selling health insurance?
                            </h2>
                            <p className="line-height-3 m-0 mb-4 mx-auto text-sm md:text-base" style={{ maxWidth: "36rem", color: "#e5e7eb" }}>
                                Make sure you have your Life &amp; Health license, complete your certifications, and get contracted through
                                the platforms above.
                            </p>
                            <div className="flex flex-column sm:flex-row gap-3 justify-content-center align-items-center">
                                <Link
                                    href="/agent/learn/about-experior/getting-started/mandatory-documents"
                                    className="inline-flex align-items-center justify-content-center px-4 py-3 border-round font-bold text-sm md:text-base no-underline shadow-2 text-900"
                                    style={{ background: "#facc15", minWidth: "12rem" }}
                                >
                                    Licensing requirements
                                </Link>
                                <Link
                                    href="/agent/learn/about-experior/getting-started/getting-appointed"
                                    className="inline-flex align-items-center justify-content-center px-4 py-3 border-round font-bold text-sm md:text-base no-underline bg-transparent opacity-100 hover:opacity-90 transition-duration-150"
                                    style={{
                                        minWidth: "12rem",
                                        color: "#fff",
                                        border: "2px solid #fff",
                                    }}
                                >
                                    Get ready to sell
                                </Link>
                            </div>
                        </section>

                        {(!nhp || !c2g) && (
                            <p className="text-600 text-xs m-0 mt-4 text-center">
                                Set <code className="text-xs">NEXT_PUBLIC_NEW_HEALTH_PARTNERS_URL</code> and{" "}
                                <code className="text-xs">NEXT_PUBLIC_C2G_HEALTH_URL</code> to enable the &quot;Get started&quot; platform
                                buttons.
                            </p>
                        )}
                    </div>

                    <aside className="w-full lg:w-20rem flex-shrink-0 lg:sticky lg:top-4 order-1 lg:order-2">
                        <SidebarCard title="Key platforms">
                            <p className="text-700 text-sm m-0 mb-3">Access your health insurance portals:</p>
                            <ul className="m-0 pl-4 text-700 text-sm line-height-3">
                                <li className="mb-2">
                                    {nhp ? (
                                        <a href={nhp} target="_blank" rel="noopener noreferrer" className={link}>
                                            New Health Partners (ACA)
                                        </a>
                                    ) : (
                                        <span className="text-600">New Health Partners (ACA)</span>
                                    )}
                                </li>
                                <li>
                                    {c2g ? (
                                        <a href={c2g} target="_blank" rel="noopener noreferrer" className={link}>
                                            C2G (Medicare)
                                        </a>
                                    ) : (
                                        <span className="text-600">C2G (Medicare)</span>
                                    )}
                                </li>
                            </ul>
                        </SidebarCard>
                        <SidebarCard title="Important dates">
                            <ul className="m-0 p-0 list-none text-700 text-sm line-height-3 flex flex-column gap-3">
                                <li>
                                    <span className="font-semibold text-900">ACA open enrollment</span>
                                    <br />
                                    November 1 – January 15
                                </li>
                                <li>
                                    <span className="font-semibold text-900">Medicare AEP</span>
                                    <br />
                                    October 15 – December 7
                                </li>
                                <li>
                                    <span className="font-semibold text-900">Medicare OEP</span>
                                    <br />
                                    January 1 – March 31
                                </li>
                            </ul>
                        </SidebarCard>
                    </aside>
                </div>
            </div>
        </div>
    );
}
