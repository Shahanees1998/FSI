import {
    BUILDERS_BONUS_MAIN_ROWS,
    BUILDERS_BONUS_PERIOD,
    ED_AGENCY_BONUS_COLUMNS,
} from "@/components/learn/whats-new/buildersBonusQualifiersData";

export default function BuildersBonusQualifiersView() {
    const maxEdRows = Math.max(ED_AGENCY_BONUS_COLUMNS.left.length, ED_AGENCY_BONUS_COLUMNS.right.length);

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "60rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-1">Builders Bonus Qualifiers</h1>
                <p className="text-700 font-semibold m-0 mb-4">{BUILDERS_BONUS_PERIOD}</p>

                <p className="text-700 line-height-3 m-0 mb-5 text-sm md:text-base">
                    Builders bonus production and ED+ agency qualifiers as published by head office for this period.
                </p>

                <section className="mb-5">
                    <div
                        className="font-bold text-900 text-sm md:text-base px-3 py-2 border-round-top border-1 border-bottom-none surface-border"
                        style={{ background: "#fef08a" }}
                    >
                        Builders bonuses
                    </div>
                    <div className="overflow-auto border-1 surface-border border-round-bottom border-top-none">
                        <table className="w-full border-collapse text-sm" style={{ minWidth: "36rem" }}>
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
                                        className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold white-space-nowrap"
                                    >
                                        Bonus type
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-right p-2 md:p-3 border-bottom-1 surface-border font-semibold white-space-nowrap"
                                    >
                                        Recruits
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-right p-2 md:p-3 border-bottom-1 surface-border font-semibold white-space-nowrap"
                                    >
                                        Life apps
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {BUILDERS_BONUS_MAIN_ROWS.map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-2 md:p-3 border-bottom-1 surface-border text-900 align-top line-height-3">
                                            {row.name}
                                        </td>
                                        <td className="p-2 md:p-3 border-bottom-1 surface-border text-700 white-space-nowrap align-top">
                                            {row.title}
                                        </td>
                                        <td className="p-2 md:p-3 border-bottom-1 surface-border text-700 align-top">{row.bonusType}</td>
                                        <td className="p-2 md:p-3 border-bottom-1 surface-border text-900 text-right tabular-nums align-top">
                                            {row.recruits}
                                        </td>
                                        <td className="p-2 md:p-3 border-bottom-1 surface-border text-900 text-right tabular-nums align-top">
                                            {row.lifeApps}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <div
                        className="font-bold text-900 text-sm md:text-base px-3 py-2 border-round-top border-1 border-bottom-none surface-border"
                        style={{ background: "#fef08a" }}
                    >
                        ED+ agency bonuses
                    </div>
                    <div className="overflow-auto border-1 surface-border border-round-bottom border-top-none">
                        <table className="w-full border-collapse text-sm">
                            <tbody>
                                {Array.from({ length: maxEdRows }, (_, i) => (
                                    <tr key={i}>
                                        <td className="p-2 md:p-3 border-bottom-1 surface-border text-900 align-top line-height-3" style={{ width: "50%" }}>
                                            {ED_AGENCY_BONUS_COLUMNS.left[i] ?? "—"}
                                        </td>
                                        <td className="p-2 md:p-3 border-bottom-1 surface-border text-900 align-top line-height-3" style={{ width: "50%" }}>
                                            {ED_AGENCY_BONUS_COLUMNS.right[i] ?? "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <p className="text-600 text-sm line-height-3 m-0 mt-5">
                    To refresh this report, edit <code className="text-xs">buildersBonusQualifiersData.ts</code>.
                </p>
            </div>
        </div>
    );
}
