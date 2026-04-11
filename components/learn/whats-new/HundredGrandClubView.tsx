import Image from "next/image";
import type { HundredGrandHonoree } from "@/components/learn/whats-new/hundredGrandClubData";
import { HUNDRED_GRAND_SECTIONS } from "@/components/learn/whats-new/hundredGrandClubData";

const GOLD = "#ffcc00";
const GOLD_DARK = "#b8860b";

function CardPhoto({ honoree }: { honoree: HundredGrandHonoree }) {
    const src = honoree.imageSrc?.trim();
    if (src) {
        return (
            <div className="relative w-full h-full" style={{ minHeight: "13rem" }}>
                <Image src={src} alt="" fill className="object-cover object-top" sizes="(max-width: 768px) 50vw, 280px" />
            </div>
        );
    }
    return (
        <div
            className="w-full h-full flex align-items-center justify-content-center"
            style={{ minHeight: "13rem", background: "#111" }}
        >
            <i className="pi pi-user text-6xl" style={{ color: "#444" }} aria-hidden />
        </div>
    );
}

function HonoreeCard({ honoree }: { honoree: HundredGrandHonoree }) {
    return (
        <article
            className="flex flex-column border-round-lg overflow-hidden shadow-2"
            style={{
                background: "#000",
                border: `2px solid ${GOLD_DARK}`,
                minHeight: "24rem",
            }}
        >
            <div className="relative flex overflow-hidden" style={{ flex: "1 1 55%", minHeight: "13rem" }}>
                <div className="absolute top-0 bottom-0 left-0 w-3 z-1" style={{ background: GOLD }} aria-hidden />
                <div className="pl-3 w-full h-full relative">
                    <CardPhoto honoree={honoree} />
                </div>
            </div>
            <div className="p-3 pt-2 flex flex-column flex-auto" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #000 100%)" }}>
                <h3 className="text-white font-bold text-sm md:text-base m-0 mb-1 line-height-3">{honoree.name}</h3>
                <p className="m-0 mb-2 text-sm line-height-3" style={{ color: GOLD }}>
                    {honoree.team}
                </p>
                <p className="text-white text-xs m-0 mb-3 opacity-90">{honoree.period}</p>
                <div className="mt-auto text-center pt-2 relative">
                    <div
                        className="inline-block px-3 py-1 border-round-sm mb-1"
                        style={{ background: GOLD, color: "#000", fontWeight: 800, fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}
                    >
                        100K
                    </div>
                    <div className="text-white font-bold text-sm tracking-wide">CLUB</div>
                </div>
            </div>
        </article>
    );
}

export default function HundredGrandClubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <header
                className="relative text-center px-4 py-8 md:py-10 overflow-hidden"
                style={{ background: "#000" }}
            >
                <div
                    className="absolute top-0 left-0 border-circle opacity-30 pointer-events-none"
                    style={{
                        width: "10rem",
                        height: "10rem",
                        background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)`,
                        transform: "translate(-20%, -20%)",
                    }}
                    aria-hidden
                />
                <div
                    className="absolute top-0 right-0 w-full h-full opacity-15 pointer-events-none"
                    style={{
                        background: `repeating-linear-gradient(-45deg, transparent, transparent 12px, ${GOLD} 12px, ${GOLD} 14px)`,
                    }}
                    aria-hidden
                />
                <p
                    className="text-white font-semibold text-sm md:text-base m-0 mb-2 relative"
                    style={{ letterSpacing: "0.05em" }}
                >
                    Congratulations!!
                </p>
                <h1
                    className="m-0 mb-4 relative font-bold line-height-3"
                    style={{
                        color: GOLD,
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
                    }}
                >
                    $100 Grand Club
                </h1>
                <div
                    className="inline-block px-4 py-2 border-round font-semibold text-sm md:text-base relative"
                    style={{ background: GOLD, color: "#000" }}
                >
                    $100 Grand in one month Agency Premium
                </div>
                <p className="text-500 text-xs m-0 mt-6 text-right relative" style={{ maxWidth: "56rem", marginLeft: "auto", marginRight: "auto" }}>
                    Experior Financial Group Inc.
                </p>
            </header>

            <div className="p-4 md:p-5 lg:p-6 bg-white">
                <p
                    className="text-700 line-height-3 m-0 mb-6 text-sm md:text-base text-center"
                    style={{ maxWidth: "40rem", marginLeft: "auto", marginRight: "auto" }}
                >
                    Honoring agents and teams who reached <strong>$100,000 in one month</strong> in agency premium.
                </p>

                {HUNDRED_GRAND_SECTIONS.map((section) => (
                    <section key={section.heading} className="mb-6 last:mb-0">
                        <h2 className="text-xl font-semibold text-900 m-0 mb-4 pb-2 border-bottom-2 surface-border">{section.heading}</h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 15rem), 1fr))",
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
                    Portraits: add files under{" "}
                    <code className="text-xs white-space-nowrap">public/images/hierarchy-clubs/100-grand/</code> and set{" "}
                    <code className="text-xs">imageSrc</code> on each entry in <code className="text-xs">hundredGrandClubData.ts</code>.
                </p>
            </div>
        </div>
    );
}
