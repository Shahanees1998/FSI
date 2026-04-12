import { COMING_SOON_FOOTER, COMING_SOON_ROWS } from "@/lib/learn/developmentComingSoonData";

const tableHeaderBg = "#f59e0b";
const heroBg = "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)";
const footerColor = "#d97706";

export default function DevelopmentComingSoonView() {
    return (
        <div className="surface-ground border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <p className="text-600 text-sm font-semibold m-0 mb-3">Coming Soon</p>

                <header
                    className="border-round-xl overflow-hidden mb-5 relative flex align-items-center justify-content-center py-4 md:py-5 px-4"
                    style={{ background: heroBg }}
                >
                    <h1 className="text-white font-bold text-3xl md:text-5xl m-0 tracking-wide" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
                        COMING SOON
                    </h1>
                    <span
                        className="absolute flex align-items-center justify-content-center border-circle bg-white shadow-2"
                        style={{ top: "0.75rem", right: "0.75rem", width: "2.25rem", height: "2.25rem" }}
                        aria-hidden
                    >
                        <i className="pi pi-clock text-900 text-lg" />
                    </span>
                </header>

                <h2 className="text-900 font-bold m-0 mb-4 uppercase underline text-base md:text-lg tracking-wide">Upcoming releases</h2>

                <div className="overflow-auto border-1 surface-border border-round-lg bg-white shadow-1 mb-5">
                    <table className="w-full border-collapse" style={{ minWidth: "22rem" }}>
                        <thead>
                            <tr style={{ background: tableHeaderBg }}>
                                <th
                                    className="text-left text-900 font-bold p-2 md:p-3 border-bottom-1 surface-border align-top white-space-nowrap"
                                    style={{ width: "14rem" }}
                                >
                                    Task
                                </th>
                                <th className="text-left text-900 font-bold p-2 md:p-3 border-bottom-1 surface-border">Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMING_SOON_ROWS.map((row) => (
                                <tr key={row.task} className="border-bottom-1 surface-border last:border-none">
                                    <td className="p-2 md:p-3 align-top border-right-1 surface-border font-bold text-900 text-sm md:text-base">
                                        {row.task}
                                    </td>
                                    <td className="p-2 md:p-3 align-top text-700 text-sm md:text-base line-height-3">
                                        <ul className="m-0 pl-4">
                                            {row.bullets.map((b) => (
                                                <li key={b} className="mb-1 last:mb-0">
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p
                    className="text-center text-base md:text-lg font-semibold line-height-3 m-0 px-2"
                    style={{ color: footerColor }}
                >
                    {COMING_SOON_FOOTER}
                </p>
            </div>
        </div>
    );
}
