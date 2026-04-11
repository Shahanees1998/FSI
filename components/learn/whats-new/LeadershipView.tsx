import Image from "next/image";
import type { LeaderProfile } from "@/components/learn/whats-new/leadershipData";
import { ADVISORY_TEAM, EXECUTIVE_PARTNERS, EXPERIOR_LEADERSHIP_COUNCIL } from "@/components/learn/whats-new/leadershipData";
import type { ReactNode } from "react";

function Avatar({ profile }: { profile: LeaderProfile }) {
    const src = profile.imageSrc?.trim();
    if (src) {
        return (
            <div
                className="mx-auto mb-2 border-round-lg overflow-hidden surface-200 relative"
                style={{ width: "100%", maxWidth: "11rem", aspectRatio: "1" }}
            >
                <Image src={src} alt="" fill className="object-cover" sizes="176px" />
            </div>
        );
    }
    return (
        <div
            className="mx-auto mb-2 border-round-lg overflow-hidden surface-200 flex align-items-center justify-content-center"
            style={{ width: "100%", maxWidth: "11rem", aspectRatio: "1" }}
        >
            <i className="pi pi-user text-5xl text-400" aria-hidden />
        </div>
    );
}

function LeaderCard({ profile }: { profile: LeaderProfile }) {
    return (
        <div className="text-center px-1">
            <Avatar profile={profile} />
            <div className="font-bold text-900 text-sm line-height-3">{profile.name}</div>
            <div className="text-600 text-xs line-height-3 mt-1">{profile.title}</div>
        </div>
    );
}

function SectionTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-xl font-semibold text-900 mt-0 mb-4 pb-2 border-bottom-2 surface-border">{children}</h2>;
}

export default function LeadershipView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-6">Leadership</h1>

                <section className="mb-6">
                    <SectionTitle>Experior Leadership Council</SectionTitle>
                    {EXPERIOR_LEADERSHIP_COUNCIL.length === 0 ? (
                        <p className="text-700 line-height-3 m-0 text-sm md:text-base">
                            Council listings will appear here when published by head office.
                        </p>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(10.5rem, 1fr))", gap: "1rem" }}>
                            {EXPERIOR_LEADERSHIP_COUNCIL.map((p, i) => (
                                <LeaderCard key={`council-${i}`} profile={p} />
                            ))}
                        </div>
                    )}
                </section>

                <section className="mb-6">
                    <SectionTitle>Executive Partners</SectionTitle>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(10.5rem, 1fr))", gap: "1rem" }}>
                        {EXECUTIVE_PARTNERS.map((p, i) => (
                            <LeaderCard key={`ep-${i}`} profile={p} />
                        ))}
                    </div>
                </section>

                <section>
                    <SectionTitle>Experior Advisory Team</SectionTitle>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(10.5rem, 1fr))", gap: "1rem" }}>
                        {ADVISORY_TEAM.map((p, i) => (
                            <LeaderCard key={`adv-${i}`} profile={p} />
                        ))}
                    </div>
                    <p className="text-600 text-sm line-height-3 m-0 mt-4">
                        To show photos, add files under <code className="text-xs">public/images/leadership/</code> and set{" "}
                        <code className="text-xs">imageSrc</code> on each person in <code className="text-xs">leadershipData.ts</code>{" "}
                        (e.g. <code className="text-xs">/images/leadership/dror-david.jpg</code>).
                    </p>
                </section>
            </div>
        </div>
    );
}
