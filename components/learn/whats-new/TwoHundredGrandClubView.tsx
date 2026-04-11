import Image from "next/image";
import type { TwoHundredGrandHonoree } from "@/components/learn/whats-new/twoHundredGrandClubData";
import { TWO_HUNDRED_GRAND_SECTIONS } from "@/components/learn/whats-new/twoHundredGrandClubData";

const GOLD = "#d4a012";
const GOLD_LIGHT = "#f0d060";
const GOLD_DARK = "#8a6a0a";

function RoundPhoto({ honoree }: { honoree: TwoHundredGrandHonoree }) {
    const src = honoree.imageSrc?.trim();
    const ring = (
        <div
            className="border-circle overflow-hidden flex align-items-center justify-content-center flex-shrink-0"
            style={{
                width: "7.5rem",
                height: "7.5rem",
                border: `3px solid ${GOLD}`,
                background: "#1a1a1a",
            }}
        >
            {src ? (
                <Image src={src} alt="" width={120} height={120} className="w-full h-full object-cover" />
            ) : (
                <i className="pi pi-user text-5xl" style={{ color: "#555" }} aria-hidden />
            )}
        </div>
    );
    return (
        <div className="flex align-items-center justify-content-center gap-2 md:gap-3 my-3">
            <i className="pi pi-shield text-4xl md:text-5xl flex-shrink-0" style={{ color: GOLD_LIGHT }} aria-hidden />
            {ring}
        </div>
    );
}

function HonoreeCard({ honoree }: { honoree: TwoHundredGrandHonoree }) {
    return (
        <article
            className="border-round-xl p-4 text-center shadow-2 flex flex-column align-items-center"
            style={{
                background: "linear-gradient(165deg, #4a4a4a 0%, #2d2d2d 45%, #1f1f1f 100%)",
                border: `1px solid ${GOLD_DARK}`,
            }}
        >
            <h3
                className="m-0 mb-1 font-bold line-height-3 text-sm md:text-base"
                style={{ color: GOLD_LIGHT, letterSpacing: "0.04em" }}
            >
                {honoree.name.toUpperCase()}
            </h3>
            <RoundPhoto honoree={honoree} />
            <div className="flex align-items-center justify-content-center gap-2 flex-wrap mt-1">
                <span style={{ color: GOLD }} aria-hidden>
                    ★
                </span>
                <p className="text-white text-sm m-0 line-height-3" style={{ maxWidth: "16rem" }}>
                    {honoree.team}
                </p>
                <span style={{ color: GOLD }} aria-hidden>
                    ★
                </span>
            </div>
            <p className="text-500 text-xs m-0 mt-2 tracking-wide">{honoree.period}</p>
            <p className="m-0 mt-3 font-bold text-xs md:text-sm" style={{ color: GOLD_LIGHT, letterSpacing: "0.08em" }}>
                200K CLUB
            </p>
        </article>
    );
}

export default function TwoHundredGrandClubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <header
                className="relative px-4 py-8 md:py-10 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #3d3d3d 0%, #2a2a2a 40%, #1a1a1a 100%)",
                }}
            >
                <p className="text-500 text-xs m-0 mb-4 font-semibold tracking-wide">Experior Financial Group Inc.</p>
                <div className="flex flex-column md:flex-row align-items-center md:align-items-start justify-content-center gap-4 md:gap-6">
                    <div className="flex align-items-center gap-3">
                        <i className="pi pi-shield text-6xl md:text-7xl" style={{ color: GOLD_LIGHT }} aria-hidden />
                        <span
                            className="font-bold line-height-1"
                            style={{
                                color: GOLD_LIGHT,
                                fontSize: "clamp(2rem, 6vw, 3.25rem)",
                                letterSpacing: "0.06em",
                                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                            }}
                        >
                            200K
                            <br />
                            <span style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)" }}>CLUB</span>
                        </span>
                    </div>
                    <div
                        className="border-round-lg px-4 py-3 text-center md:text-left"
                        style={{ border: `2px solid ${GOLD}`, maxWidth: "22rem" }}
                    >
                        <p className="text-white font-bold m-0 line-height-3 text-sm md:text-base">
                            $200,000 IN ONE MONTH AGENCY PREMIUM!
                        </p>
                    </div>
                </div>
            </header>

            <div className="p-4 md:p-5 lg:p-6 surface-50">
                <h1 className="text-2xl font-bold text-900 m-0 mb-2 text-center">200 Grand Club</h1>
                <p className="text-700 line-height-3 m-0 mb-6 text-sm md:text-base text-center mx-auto" style={{ maxWidth: "38rem" }}>
                    Recognizing agents who achieved <strong>$200,000 in one month</strong> in agency premium.
                </p>

                {TWO_HUNDRED_GRAND_SECTIONS.map((section) => (
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
                    Add circular portraits under{" "}
                    <code className="text-xs white-space-nowrap">public/images/hierarchy-clubs/200-grand/</code> and{" "}
                    <code className="text-xs">imageSrc</code> in <code className="text-xs">twoHundredGrandClubData.ts</code>. Update
                    2024 rows when team names and qualification months are finalized on the official list.
                </p>
            </div>
        </div>
    );
}
