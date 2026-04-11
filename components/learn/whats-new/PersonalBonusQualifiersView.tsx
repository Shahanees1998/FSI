import { PERSONAL_BONUS_PERIOD, PERSONAL_BONUS_TIERS } from "@/components/learn/whats-new/personalBonusQualifiersData";

export default function PersonalBonusQualifiersView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "56rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-1">Personal Bonus Qualifiers</h1>
                <p className="text-700 font-semibold m-0 mb-4">{PERSONAL_BONUS_PERIOD}</p>

                <p className="text-700 line-height-3 m-0 mb-5 text-sm md:text-base">
                    Qualifiers listed by bonus tier. Premium and recruit figures are shown as published by head office. Names may
                    include team tags and symbols from the official report.
                </p>

                <div className="flex flex-column gap-5">
                    {PERSONAL_BONUS_TIERS.map((tier) => (
                        <section key={tier.id}>
                            <div
                                className="font-bold text-900 text-sm md:text-base px-3 py-2 border-round-top border-1 border-bottom-none surface-border"
                                style={{ background: "#fef08a" }}
                            >
                                {tier.banner}
                            </div>
                            <div className="overflow-auto border-1 surface-border border-round-bottom border-top-none">
                                <table className="w-full border-collapse text-sm" style={{ minWidth: "28rem" }}>
                                    <thead>
                                        <tr className="surface-100">
                                            <th scope="col" className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold">
                                                Name / team
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold white-space-nowrap"
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-right p-2 md:p-3 border-bottom-1 surface-border font-semibold white-space-nowrap"
                                            >
                                                Premium
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-right p-2 md:p-3 border-bottom-1 surface-border font-semibold white-space-nowrap"
                                            >
                                                Recruits
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tier.rows.map((row, i) => (
                                            <tr key={`${tier.id}-${i}`}>
                                                <td className="p-2 md:p-3 border-bottom-1 surface-border text-900 align-top line-height-3">
                                                    {row.name}
                                                </td>
                                                <td className="p-2 md:p-3 border-bottom-1 surface-border text-700 white-space-nowrap align-top">
                                                    {row.title}
                                                </td>
                                                <td className="p-2 md:p-3 border-bottom-1 surface-border text-900 text-right tabular-nums align-top">
                                                    {row.premium}
                                                </td>
                                                <td className="p-2 md:p-3 border-bottom-1 surface-border text-900 text-right tabular-nums align-top">
                                                    {row.recruits ?? "—"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    ))}
                </div>

                <p className="text-600 text-sm line-height-3 m-0 mt-5">
                    To refresh this list, update <code className="text-xs">personalBonusQualifiersData.ts</code> (or connect an API
                    later).
                </p>
            </div>
        </div>
    );
}
