import Image from "next/image";
import type { MillionClubHonoree } from "@/components/learn/whats-new/oneMillionHierarchyClubData";
import { ONE_MILLION_CLUB_HONOREES } from "@/components/learn/whats-new/oneMillionHierarchyClubData";

function HonoreePhoto({ honoree }: { honoree: MillionClubHonoree }) {
    const src = honoree.imageSrc?.trim();
    if (src) {
        return (
            <div className="relative w-full" style={{ aspectRatio: "1", background: "rgba(0,0,0,0.82)" }}>
                <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
            </div>
        );
    }
    return (
        <div
            className="w-full flex align-items-center justify-content-center"
            style={{ aspectRatio: "1", background: "rgba(0,0,0,0.82)" }}
        >
            <i className="pi pi-user text-6xl text-400" aria-hidden />
        </div>
    );
}

function HonoreeCard({ honoree }: { honoree: MillionClubHonoree }) {
    return (
        <article
            className="border-round-lg overflow-hidden border-2 shadow-2 bg-white"
            style={{ borderColor: "#ca8a04" }}
        >
            <div className="text-center py-2 px-2" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #171717 100%)" }}>
                <span className="text-yellow-400 font-bold tracking-wide" style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)" }}>
                    $1M CLUB
                </span>
            </div>
            <div className="text-center text-white text-xs md:text-sm font-semibold py-2 px-2 line-height-3" style={{ background: "#b45309" }}>
                $1 Million in ONE MONTH Hierarchy Premium
            </div>
            <HonoreePhoto honoree={honoree} />
            <div className="p-3 md:p-4 text-center border-top-1 surface-border">
                <h3 className="text-900 font-bold text-sm md:text-base m-0 mb-2 line-height-3">{honoree.name}</h3>
                <p className="text-700 text-sm m-0 mb-1 line-height-3">{honoree.title}</p>
                <p className="text-600 text-sm m-0 mb-2 line-height-3">{honoree.team}</p>
                <p className="text-900 font-semibold text-xs m-0 tracking-wide">{honoree.period}</p>
            </div>
            <div className="px-3 py-2 surface-100 border-top-1 surface-border">
                <p className="text-600 text-xs m-0 text-center">Experior Financial Group Inc.</p>
            </div>
        </article>
    );
}

export default function OneMillionHierarchyClubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <header
                className="text-center px-4 py-6 md:py-8 relative overflow-hidden"
                style={{
                    background: "radial-gradient(ellipse at top, rgba(234,179,8,0.25) 0%, transparent 55%), linear-gradient(180deg, #0a0a0a 0%, #171717 100%)",
                }}
            >
                <div
                    className="absolute top-0 left-0 right-0 bottom-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 30%, #facc15 0, transparent 2px), radial-gradient(circle at 80% 20%, #facc15 0, transparent 2px), radial-gradient(circle at 40% 70%, #facc15 0, transparent 2px)",
                        backgroundSize: "120px 120px",
                    }}
                    aria-hidden
                />
                <p className="text-yellow-400 font-bold m-0 mb-2 relative" style={{ fontSize: "clamp(2rem, 6vw, 3.25rem)", letterSpacing: "0.06em" }}>
                    $1M CLUB
                </p>
                <p className="text-white text-lg md:text-xl font-semibold m-0 mb-4 relative">CONGRATULATIONS!</p>
                <div
                    className="inline-block text-white font-semibold text-sm md:text-base px-4 py-2 border-round relative"
                    style={{ background: "linear-gradient(90deg, #a16207, #ca8a04, #a16207)" }}
                >
                    $1 Million in ONE MONTH Hierarchy Premium
                </div>
                <p className="text-500 text-xs m-0 mt-4 relative">Experior Financial Group Inc.</p>
            </header>

            <div className="p-4 md:p-5 lg:p-6">
                <p className="text-700 line-height-3 m-0 mb-5 text-sm md:text-base text-center" style={{ maxWidth: "40rem", marginLeft: "auto", marginRight: "auto" }}>
                    Recognizing leaders who achieved <strong>$1 million in one month</strong> in hierarchy premium with Experior.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 16rem), 1fr))",
                        gap: "1.25rem",
                    }}
                >
                    {ONE_MILLION_CLUB_HONOREES.map((h, i) => (
                        <HonoreeCard key={`${h.name}-${i}`} honoree={h} />
                    ))}
                </div>

                <p className="text-600 text-sm line-height-3 m-0 mt-5 text-center">
                    Add official portraits under{" "}
                    <code className="text-xs white-space-nowrap">public/images/hierarchy-clubs/1m/</code> using the filenames in{" "}
                    <code className="text-xs">oneMillionHierarchyClubData.ts</code>, or clear <code className="text-xs">imageSrc</code>{" "}
                    until assets are ready.
                </p>
            </div>
        </div>
    );
}
