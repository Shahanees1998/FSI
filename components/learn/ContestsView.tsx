import { Divider } from "primereact/divider";

const link = "text-blue-600 font-medium no-underline hover:underline";

function PromoGraphicPlaceholder() {
    return (
        <div
            className="flex align-items-center justify-content-center w-full border-1 border-dashed surface-border surface-100 border-round p-3 text-500 text-sm text-center line-height-3"
            style={{ minHeight: "10rem" }}
        >
            Promotional graphic — replace with an image from{" "}
            <span className="text-xs font-mono white-space-nowrap">public/images/contests/</span> when available.
        </div>
    );
}

function TwoUpGraphics() {
    return (
        <div className="flex flex-column md:flex-row gap-3 w-full">
            <div className="flex-1 w-full">
                <PromoGraphicPlaceholder />
            </div>
            <div className="flex-1 w-full">
                <PromoGraphicPlaceholder />
            </div>
        </div>
    );
}

export default function ContestsView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div
                className="flex align-items-center justify-content-between px-4 py-3 md:px-5"
                style={{
                    background: "linear-gradient(90deg, #b8860b 0%, #daa520 35%, #f4d03f 50%, #daa520 65%, #b8860b 100%)",
                }}
            >
                <span className="text-white font-bold text-xl md:text-2xl tracking-widest" style={{ letterSpacing: "0.2em" }}>
                    CONTESTS
                </span>
                <i className="pi pi-trophy text-white text-3xl md:text-4xl" aria-hidden />
            </div>

            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "56rem" }}>
                <section className="mb-1">
                    <h2 className="text-xl font-semibold text-900 mt-0 mb-3">Debt Medic</h2>
                    <PromoGraphicPlaceholder />
                </section>

                <Divider className="my-4" />

                <section className="mb-1">
                    <h2 className="text-xl font-semibold mt-0 mb-3" style={{ color: "#0f766e", letterSpacing: "0.12em" }}>
                        ETHOS
                    </h2>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        From January 1 to June 30, earn up to 20% more on every policy you sell through Ethos Rewards. All it takes
                        is $1k in In Force Issued Premium to get started.
                    </p>
                    <p className="m-0 mb-3">
                        <a
                            href="/documents/contests/ethos-rewards-program-en.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            View program details (English)
                        </a>
                        {" · "}
                        <a
                            href="/documents/contests/ethos-rewards-program-es.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            View program details (Spanish)
                        </a>
                    </p>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        Earn a $1,000 cash bonus for 5 or more Accumulation IUL policies sold between February 1–May 31, 2024. Offer
                        up to $2M in coverage in as little as 10 minutes!
                    </p>
                    <p className="m-0">
                        <a
                            href="/documents/contests/ethos-accumulation-iul-incentive.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            View incentive details
                        </a>
                        {" · "}
                        <a
                            href="/documents/contests/ethos-product-resources.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            View product resources
                        </a>
                    </p>
                </section>

                <Divider className="my-4" />

                <section className="mb-1">
                    <h2 className="text-xl font-semibold text-900 mt-0 mb-3">{"F&G"}</h2>
                    <PromoGraphicPlaceholder />
                </section>

                <Divider className="my-4" />

                <section className="mb-1">
                    <h2 className="text-xl font-semibold text-900 mt-0 mb-3">Pan-American Life</h2>
                    <p className="m-0 mb-3">
                        <a
                            href="/documents/contests/pan-american-summit-2027-vienna.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            Pan-American Life Summit 2027 Vienna PDF
                        </a>
                    </p>
                    <TwoUpGraphics />
                </section>

                <Divider className="my-4" />

                <section className="mb-1">
                    <h2 className="text-xl font-semibold text-900 mt-0 mb-3">Foresters</h2>
                    <p className="m-0 mb-3">
                        <a
                            href="/documents/contests/foresters-italy-incentive.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            Foresters Italy Incentive PDF
                        </a>
                    </p>
                    <TwoUpGraphics />
                </section>

                <Divider className="my-4" />

                <section className="mb-0">
                    <h2 className="text-xl font-semibold text-900 mt-0 mb-3">EOS</h2>
                    <p className="m-0 mb-3">
                        <a
                            href="/documents/contests/eos-earn-qualified-review.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            EOS Earn on Every Qualified Review PDF
                        </a>
                    </p>
                    <TwoUpGraphics />
                </section>
            </div>
        </div>
    );
}
