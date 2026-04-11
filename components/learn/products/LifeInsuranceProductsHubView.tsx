import Link from "next/link";

const link = "text-blue-600 font-medium no-underline hover:underline";

type LifeInsuranceProductsHubViewProps = {
    /** External or back-office URL for carrier quoting tools */
    quotingToolsUrl: string | null;
};

function ProductSection({
    title,
    description,
    bestFor,
    carriers,
    footerLink,
}: {
    title: string;
    description: string;
    bestFor: string[];
    carriers: string;
    footerLink?: { label: string; href: string };
}) {
    return (
        <section className="mb-5 pb-5 border-bottom-1 surface-border last:border-none last:pb-0">
            <h2 className="text-xl md:text-2xl font-semibold text-900 mt-0 mb-3">{title}</h2>
            <p className="text-700 line-height-3 m-0 mb-3">{description}</p>
            <p className="text-900 font-semibold m-0 mb-2">Best for</p>
            <ul className="text-700 line-height-3 m-0 pl-4 mb-3">
                {bestFor.map((item) => (
                    <li key={item} className="mb-1">
                        {item}
                    </li>
                ))}
            </ul>
            <p className="text-700 m-0 mb-2">
                <span className="font-semibold text-900">Carriers to consider:</span> {carriers}
            </p>
            {footerLink ? (
                <p className="m-0 mt-2">
                    <a href={footerLink.href} target="_blank" rel="noopener noreferrer" className={link}>
                        {footerLink.label}
                    </a>
                </p>
            ) : null}
        </section>
    );
}

export default function LifeInsuranceProductsHubView({ quotingToolsUrl }: LifeInsuranceProductsHubViewProps) {
    const quoteUrl = quotingToolsUrl?.trim() || null;

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Life Insurance Products Hub</h1>
                <p className="text-700 line-height-3 m-0 mb-5 text-lg">
                    Explore the full range of life insurance products available through Experior. Find the right solutions for your
                    clients based on their needs, budget, and life stage.
                </p>

                <ProductSection
                    title="Term life insurance"
                    description="Affordable, straightforward protection for a specific period. Ideal for young families, mortgage protection, and income replacement needs."
                    bestFor={[
                        "Young families (20s–40s) needing maximum coverage at minimum cost.",
                        "Mortgage protection and debt coverage.",
                        "Income replacement during working years.",
                        "Temporary needs with defined timeframes (10–30 years).",
                        "Budget-conscious clients seeking pure protection without cash value.",
                        "Clients who can qualify for standard health underwriting.",
                    ]}
                    carriers="Ethos, NLG, Corebridge, Mutual of Omaha."
                    footerLink={{
                        label: "Term simplified cheat sheet (medical)",
                        href: "/documents/learn/term-simplified-cheat-sheet-medical.pdf",
                    }}
                />

                <ProductSection
                    title="Whole life insurance"
                    description="Permanent protection with guaranteed cash value growth. Build wealth, create legacy, and provide lifelong coverage with predictable premiums."
                    bestFor={[
                        "Estate planning and wealth transfer.",
                        "Clients seeking maximum guarantees and predictable cash value growth.",
                        "Supplemental retirement income through policy loans.",
                        "Final expenses and burial costs.",
                        "Clients who value stability over growth potential.",
                        "Business succession planning.",
                        "Lifelong coverage with fixed premium payments.",
                    ]}
                    carriers="AuguStar, Foresters, MassMutual, Transamerica."
                />

                <section className="mb-5 pb-5 border-bottom-1 surface-border">
                    <h2 className="text-xl md:text-2xl font-semibold text-900 mt-0 mb-3">Indexed universal life (IUL) &amp; universal life (UL)</h2>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        Flexible permanent coverage with cash value tied to market indexes (IUL) or fixed interest (UL). Build
                        tax-advantaged wealth while maintaining death benefit protection.
                    </p>
                    <p className="text-900 font-semibold m-0 mb-2">Best for</p>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-3">
                        <li className="mb-1">Retirement income planning through tax-free policy loans.</li>
                        <li className="mb-1">Wealth accumulation with market-linked growth potential and flexibility.</li>
                        <li className="mb-1">High-net-worth clients seeking tax advantages.</li>
                        <li className="mb-1">Living benefit riders for chronic/critical illness protection.</li>
                        <li className="mb-1">Clients wanting flexibility in premium payment options.</li>
                        <li className="mb-1">Business owners and entrepreneurs.</li>
                        <li className="mb-1">Lifelong coverage with cash value tied to market performance.</li>
                    </ul>
                    <p className="text-700 m-0 mb-3">
                        <span className="font-semibold text-900">Carriers to consider:</span> F&amp;G, NLG, AuguStar, Corebridge.
                    </p>
                    <div
                        className="border-round-lg p-4 border-1"
                        style={{ background: "#ecfdf5", borderColor: "#86efac" }}
                    >
                        <p className="text-900 font-semibold m-0 mb-2">Living benefit riders</p>
                        <p className="text-700 line-height-3 m-0 text-sm md:text-base">
                            Many IUL and UL products include riders for chronic, critical, and terminal illness.{" "}
                            <strong>AIG</strong>, <strong>GUL</strong>, and <strong>Foresters</strong> are especially strong in this
                            space—compare rider language and pricing with your upline before you recommend a specific carrier.
                        </p>
                    </div>
                </section>

                <ProductSection
                    title="Final expense / burial insurance"
                    description="Simplified-issue permanent coverage designed to cover end-of-life expenses. Easy qualification, lower face amounts, and guaranteed approval options available."
                    bestFor={[
                        "Seniors (ages 50–85) needing simplified underwriting.",
                        "Covering funeral, burial, and final medical expenses.",
                        "Clients with health issues who can't qualify for traditional coverage.",
                        "Small face amounts ($5,000–$50,000) with moderate premiums.",
                        "No medical exam required for quick approval.",
                        "Lifelong coverage with minimal cash value focus.",
                    ]}
                    carriers="Ethos, American Amicable, Mutual of Omaha, Royal Neighbors."
                    footerLink={{
                        label: "Final expense cheat sheet (medical)",
                        href: "/documents/learn/final-expense-cheat-sheet-medical.pdf",
                    }}
                />

                <section className="mb-5">
                    <h2 className="text-xl md:text-2xl font-semibold text-900 mt-0 mb-3">Quick product comparison</h2>
                    <div className="overflow-auto border-1 surface-border border-round-lg shadow-1 bg-white">
                        <table className="w-full border-collapse text-sm" style={{ minWidth: "28rem" }}>
                            <thead>
                                <tr className="surface-200">
                                    <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">Product type</th>
                                    <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">Coverage period</th>
                                    <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">Cash value</th>
                                    <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">Typical premium</th>
                                    <th className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">Best for</th>
                                </tr>
                            </thead>
                            <tbody className="text-700">
                                <tr>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">Term life</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">10–30 years</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">None</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Lowest</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Young families, temporary needs</td>
                                </tr>
                                <tr>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">Whole life</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Lifetime</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Guaranteed growth</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Higher</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Estate planning, guarantees</td>
                                </tr>
                                <tr>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">IUL / UL</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Lifetime</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Market-linked potential</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Flexible</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Wealth accumulation, retirement</td>
                                </tr>
                                <tr>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border font-medium text-900">Final expense</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Lifetime</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Minimal</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Moderate</td>
                                    <td className="p-2 md:p-3 border-bottom-1 surface-border">Seniors, simplified underwriting</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section
                    className="border-round-xl p-4 md:p-5 text-center"
                    style={{ background: "#fff0e6" }}
                >
                    <h2 className="text-xl font-bold text-900 m-0 mb-2">Ready to quote?</h2>
                    <p className="text-700 line-height-3 m-0 mb-4 mx-auto" style={{ maxWidth: "30rem" }}>
                        Use our carrier quoting tools to find the best rates for your clients across all major life insurance
                        categories.
                    </p>
                    <div className="flex flex-column sm:flex-row gap-3 justify-content-center align-items-center">
                        {quoteUrl ? (
                            <a
                                href={quoteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex align-items-center justify-content-center px-4 py-3 border-round font-bold text-sm md:text-base no-underline shadow-2 text-900"
                                style={{ background: "#facc15", minWidth: "12rem" }}
                            >
                                Access quoting tools
                            </a>
                        ) : (
                            <span
                                className="inline-flex align-items-center justify-content-center px-4 py-3 border-round font-bold text-sm md:text-base text-900 opacity-80 cursor-default"
                                style={{ background: "#facc15", minWidth: "12rem" }}
                                title="Set NEXT_PUBLIC_LIFE_QUOTING_TOOLS_URL"
                            >
                                Access quoting tools
                            </span>
                        )}
                        <Link
                            href="/agent/learn/products/carriers"
                            className="inline-flex align-items-center justify-content-center px-4 py-3 border-round font-bold text-sm md:text-base no-underline bg-white text-900 shadow-1 border-2 border-blue-500 hover:surface-100 transition-duration-150"
                            style={{ minWidth: "12rem" }}
                        >
                            Review carrier list
                        </Link>
                    </div>
                    {!quoteUrl ? (
                        <p className="text-600 text-xs m-0 mt-3">
                            Add <code className="text-xs">NEXT_PUBLIC_LIFE_QUOTING_TOOLS_URL</code> to enable the quoting tools link.
                        </p>
                    ) : null}
                </section>
            </div>
        </div>
    );
}
