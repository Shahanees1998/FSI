import type { RecordRow } from "@/components/learn/whats-new/recordBreakersData";
import { COMPANY_RECORDS_MAIN, COMPANY_RECORDS_SETTLED } from "@/components/learn/whats-new/recordBreakersData";

function RecordTable({ rows, rankLabels }: { rows: RecordRow[]; rankLabels: string[] }) {
    return (
        <div className="overflow-auto border-1 surface-border border-round">
            <table className="w-full border-collapse text-sm" style={{ minWidth: "36rem" }}>
                <thead>
                    <tr className="surface-100">
                        <th
                            scope="col"
                            className="text-left p-2 md:p-3 border-bottom-1 surface-border font-semibold text-900 sticky left-0 surface-100 z-1"
                        >
                            <span className="p-sr-only">Metric</span>
                        </th>
                        {rankLabels.map((h) => (
                            <th
                                key={h}
                                scope="col"
                                className="text-center p-2 md:p-3 border-bottom-1 surface-border border-left-1 surface-border font-semibold text-900"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.label}>
                            <th
                                scope="row"
                                className="text-left p-2 md:p-3 border-bottom-1 surface-border font-medium text-900 align-top sticky left-0 bg-white white-space-nowrap"
                            >
                                {row.label}
                            </th>
                            {row.ranks.map((cell, i) => (
                                <td
                                    key={i}
                                    className={`p-2 md:p-3 border-bottom-1 surface-border border-left-1 surface-border align-top ${
                                        cell?.highlight ? "" : "surface-0"
                                    }`}
                                    style={cell?.highlight ? { background: "#fef08a" } : undefined}
                                >
                                    {cell ? (
                                        <>
                                            <div className="text-600 text-xs mb-1">{cell.monthYear}</div>
                                            <div className="text-900 font-semibold text-right tabular-nums">{cell.value}</div>
                                        </>
                                    ) : (
                                        <span className="text-400">—</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function RecordBreakersView() {
    const rankLabels = ["#1", "#2", "#3", "#4", "#5"];

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2 text-center">Record Breakers</h1>
                <h2 className="text-xl font-semibold text-900 m-0 mb-4 text-center">Company Records</h2>

                <p className="text-700 line-height-3 m-0 mb-4 text-center text-sm md:text-base">
                    Top five historical ranks by category. Yellow cells reflect the latest published refresh (e.g. Mar-26). Remaining
                    slots are shown as — until head office supplies the full matrix.
                </p>

                <section className="mb-5">
                    <RecordTable rows={COMPANY_RECORDS_MAIN} rankLabels={rankLabels} />
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-900 m-0 mb-2 text-center">Since July 2024</h3>
                    <RecordTable rows={COMPANY_RECORDS_SETTLED} rankLabels={rankLabels} />
                </section>

                <p className="text-600 text-sm line-height-3 m-0 mt-4 text-center">
                    To update figures, edit <code className="text-xs">recordBreakersData.ts</code> or replace this page with a CMS /
                    API feed when available.
                </p>
            </div>
        </div>
    );
}
