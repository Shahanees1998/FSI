import Image from "next/image";
import type { FourHundredGrandHonoree } from "@/components/learn/whats-new/fourHundredGrandClubData";
import { FOUR_HUNDRED_GRAND_SECTIONS } from "@/components/learn/whats-new/fourHundredGrandClubData";

const GOLD = "#d4af37";
const GOLD_LIGHT = "#f4e4a6";
const GOLD_DARK = "#8a7020";

function HeroShield() {
    return (
        <div className="flex flex-column align-items-center flex-shrink-0 text-6xl md:text-7xl" style={{ color: GOLD_LIGHT }} aria-hidden>
            <i className="pi pi-shield" />
            <span
                className="font-bold mt-1 line-height-1"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", letterSpacing: "0.1em", color: GOLD }}
            >
                400K
            </span>
            <span className="font-bold text-sm md:text-base mt-1" style={{ letterSpacing: "0.25em", color: GOLD_LIGHT }}>
                CLUB
            </span>
        </div>
    );
}

function HonoreeCard({ honoree }: { honoree: FourHundredGrandHonoree }) {
    const src = honoree.imageSrc?.trim();
    return (
        <article
            className="border-round-xl p-4 flex flex-column align-items-center text-center shadow-2 overflow-hidden relative"
            style={{
                background: "linear-gradient(165deg, #525252 0%, #3f3f3f 40%, #262626 100%)",
                border: `1px solid ${GOLD_DARK}`,
                minHeight: "20rem",
            }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0.2,
                    background:
                        "repeating-linear-gradient(-35deg, transparent, transparent 14px, rgba(255,255,255,0.03) 14px, rgba(255,255,255,0.03) 15px)",
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
                <div className="flex flex-column align-items-center flex-shrink-0" style={{ color: GOLD_LIGHT }} aria-hidden>
                    <i className="pi pi-shield text-3xl md:text-4xl" />
                    <span className="font-bold text-xs mt-0" style={{ color: GOLD, letterSpacing: "0.12em" }}>
                        400K
                    </span>
                </div>
                <div
                    className="border-circle overflow-hidden flex-shrink-0"
                    style={{
                        width: "7.5rem",
                        height: "7.5rem",
                        border: "3px solid #fff",
                        boxShadow: `0 0 0 3px ${GOLD}, inset 0 0 0 1px rgba(0,0,0,0.2)`,
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
                        className="text-xs md:text-sm m-0 line-height-3 font-semibold text-white"
                        style={i > 0 ? { marginTop: "0.35rem" } : undefined}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </article>
    );
}

export default function FourHundredGrandClubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <header
                className="relative px-4 py-8 md:py-10 overflow-hidden"
                style={{
                    background: "linear-gradient(125deg, #404040 0%, #2d2d2d 50%, #1f1f1f 100%)",
                }}
            >
                <div
                    className="absolute inset-0 opacity-35 pointer-events-none"
                    style={{
                        background: "repeating-linear-gradient(-40deg, transparent, transparent 16px, rgba(255,255,255,0.04) 16px, rgba(255,255,255,0.04) 17px)",
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
                            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                        }}
                    >
                        <p className="text-white font-bold m-0 line-height-3 text-sm md:text-base tracking-wide">
                            $400,000 IN ONE MONTH AGENCY PREMIUM!
                        </p>
                    </div>
                </div>
            </header>

            <div className="p-4 md:p-5 lg:p-6 surface-50">
                <h1 className="text-2xl font-bold text-900 m-0 mb-2 text-center">400 Grand Club</h1>
                <p className="text-700 line-height-3 m-0 mb-6 text-sm md:text-base text-center mx-auto" style={{ maxWidth: "38rem" }}>
                    Honoring achievers who reached <strong>$400,000 in one month</strong> in agency premium.
                </p>

                {FOUR_HUNDRED_GRAND_SECTIONS.map((section) => (
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
                    Portraits: <code className="text-xs">public/images/hierarchy-clubs/400-grand/</code> +{" "}
                    <code className="text-xs">imageSrc</code> in <code className="text-xs">fourHundredGrandClubData.ts</code>. Add any
                    missing 2023 honorees from the official wall when available.
                </p>
            </div>
        </div>
    );
}
