import Image from "next/image";
import type { ThreeHundredGrandHonoree } from "@/components/learn/whats-new/threeHundredGrandClubData";
import { THREE_HUNDRED_GRAND_SECTIONS } from "@/components/learn/whats-new/threeHundredGrandClubData";

const GOLD = "#d4af37";
const GOLD_LIGHT = "#f4e4a6";
const GOLD_DARK = "#8a7020";

function HeroShield() {
    return (
        <div className="flex flex-column align-items-center flex-shrink-0 text-6xl md:text-7xl" style={{ color: GOLD_LIGHT }} aria-hidden>
            <i className="pi pi-shield" />
            <span className="font-bold mt-1 line-height-1" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", letterSpacing: "0.12em", color: GOLD }}>
                300K
            </span>
            <span className="font-bold text-sm md:text-base mt-1" style={{ letterSpacing: "0.25em", color: GOLD_LIGHT }}>
                CLUB
            </span>
        </div>
    );
}

function HonoreeCard({ honoree }: { honoree: ThreeHundredGrandHonoree }) {
    const src = honoree.imageSrc?.trim();
    return (
        <article
            className="border-round-xl p-4 flex flex-column align-items-center text-center shadow-2 overflow-hidden relative"
            style={{
                background: "linear-gradient(160deg, #4a5568 0%, #2d3748 45%, #1a202c 100%)",
                border: `1px solid ${GOLD_DARK}`,
                minHeight: "19rem",
            }}
        >
            <div
                className="absolute pointer-events-none opacity-08 left-50 top-30"
                style={{
                    width: "140%",
                    height: "140%",
                    transform: "translate(-50%, -30%)",
                    background: "repeating-radial-gradient(circle at center, transparent 0, transparent 18px, rgba(212,175,55,0.12) 18px, rgba(212,175,55,0.12) 20px)",
                }}
                aria-hidden
            />
            <h3
                className="m-0 mb-3 font-bold line-height-3 text-sm md:text-base relative z-1"
                style={{ color: GOLD_LIGHT, letterSpacing: "0.06em" }}
            >
                {honoree.name}
            </h3>
            <div className="flex align-items-center justify-content-center gap-1 md:gap-2 relative z-1 mb-3">
                <i className="pi pi-shield text-5xl md:text-6xl flex-shrink-0" style={{ color: GOLD_LIGHT }} aria-hidden />
                <div
                    className="border-circle overflow-hidden flex-shrink-0"
                    style={{
                        width: "7.5rem",
                        height: "7.5rem",
                        border: `4px solid ${GOLD}`,
                        background: "#111",
                    }}
                >
                    {src ? (
                        <Image src={src} alt="" width={120} height={120} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex align-items-center justify-content-center">
                            <i className="pi pi-user text-5xl" style={{ color: "#555" }} aria-hidden />
                        </div>
                    )}
                </div>
            </div>
            <div className="relative z-1 mt-auto">
                {honoree.footerLines.map((line, i) => (
                    <p
                        key={i}
                        className="text-xs md:text-sm m-0 line-height-3 font-semibold"
                        style={{ color: GOLD, ...(i > 0 ? { marginTop: "0.25rem" } : {}) }}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </article>
    );
}

export default function ThreeHundredGrandClubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <header
                className="relative px-4 py-8 md:py-10 overflow-hidden"
                style={{
                    background: "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.12) 0%, transparent 50%), linear-gradient(145deg, #4a5568 0%, #2c3e50 35%, #1a252f 100%)",
                }}
            >
                <div
                    className="absolute inset-0 opacity-25 pointer-events-none"
                    style={{
                        background: "repeating-radial-gradient(circle at 50% 40%, transparent 0, transparent 24px, rgba(255,255,255,0.04) 24px, rgba(255,255,255,0.04) 26px)",
                    }}
                    aria-hidden
                />
                <p className="text-500 text-xs m-0 mb-6 font-semibold tracking-wide relative z-1">Experior Financial Group Inc.</p>
                <div className="flex flex-column md:flex-row align-items-center justify-content-center gap-6 relative z-1">
                    <HeroShield />
                    <div
                        className="border-round-lg px-5 py-3 text-center"
                        style={{
                            background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_DARK})`,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
                        }}
                    >
                        <p className="text-white font-bold m-0 line-height-3 text-sm md:text-base tracking-wide">
                            $300,000 IN ONE MONTH AGENCY PREMIUM!
                        </p>
                    </div>
                </div>
            </header>

            <div className="p-4 md:p-5 lg:p-6 surface-50">
                <h1 className="text-2xl font-bold text-900 m-0 mb-2 text-center">300 Grand Club</h1>
                <p className="text-700 line-height-3 m-0 mb-6 text-sm md:text-base text-center mx-auto" style={{ maxWidth: "38rem" }}>
                    Honoring achievers who reached <strong>$300,000 in one month</strong> in agency premium.
                </p>

                {THREE_HUNDRED_GRAND_SECTIONS.map((section) => (
                    <section key={section.heading} className="mb-6 last:mb-0">
                        <h2 className="text-xl font-semibold text-900 m-0 mb-4 pb-2 border-bottom-2 surface-border">{section.heading}</h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 14rem), 1fr))",
                                gap: "1.25rem",
                            }}
                        >
                            {section.honorees.map((h, i) => (
                                <HonoreeCard key={`${section.heading}-${h.name}-${i}`} honoree={h} />
                            ))}
                        </div>
                    </section>
                ))}

                <p className="text-600 text-sm line-height-3 m-0 mt-6 text-center">
                    Portraits: <code className="text-xs">public/images/hierarchy-clubs/300-grand/</code> +{" "}
                    <code className="text-xs">imageSrc</code> in <code className="text-xs">threeHundredGrandClubData.ts</code>. Add
                    additional 2023 honorees when the full list is available.
                </p>
            </div>
        </div>
    );
}
