import { RELEASE_MONTHS, RELEASES_MONTH_FOOTER, type ReleaseTask } from "@/lib/learn/developmentReleasesData";

const tableHeaderBg = "#f59e0b";
const ribbonBg = "#f59e0b";
const heroBg = "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)";

function TaskSummaryCell({ task }: { task: ReleaseTask }) {
    const pH = task.purposeHeading ?? "Purpose of the task:";
    const dH = task.detailsHeading ?? "Details:";
    const sH = task.summaryHeading ?? "Summary:";

    return (
        <div className="text-700 line-height-3 text-sm md:text-base py-2 pr-2">
            <p className="font-bold text-900 m-0 mb-2">{task.title}</p>
            <p className="m-0 mb-2">
                <strong className="text-900">{pH}</strong> {task.purpose}
            </p>
            <p className="m-0 mb-1">
                <strong className="text-900">{dH}</strong>
            </p>
            <ul className="m-0 mb-2 pl-4">
                {task.details.map((line) => (
                    <li key={line} className="mb-1">
                        {line}
                    </li>
                ))}
            </ul>
            <p className="m-0">
                <strong className="text-900">{sH}</strong> {task.summary}
            </p>
        </div>
    );
}

export default function DevelopmentReleasesView() {
    return (
        <div className="surface-ground border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <p className="text-600 text-sm font-semibold m-0 mb-3">Releases</p>

                <header
                    className="border-round-xl overflow-hidden mb-5 relative flex align-items-center justify-content-center py-4 md:py-5 px-4"
                    style={{ background: heroBg }}
                >
                    <h1 className="text-white font-bold text-3xl md:text-5xl m-0 tracking-wide" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
                        RELEASES
                    </h1>
                    <span
                        className="absolute text-xs font-bold border-circle bg-white text-900 shadow-2 white-space-nowrap"
                        style={{ top: "0.75rem", right: "0.75rem", padding: "0.35rem 0.5rem" }}
                    >
                        New
                    </span>
                </header>

                {RELEASE_MONTHS.map((month) => (
                    <section key={month.monthBanner} className="mb-5 last:mb-0">
                        <div
                            className="flex align-items-center justify-content-center gap-3 py-3 px-4 border-round-lg mb-4"
                            style={{ background: ribbonBg }}
                        >
                            <i className="pi pi-calendar text-white text-xl md:text-2xl opacity-90" aria-hidden />
                            <h2 className="text-white font-bold text-lg md:text-2xl m-0 tracking-widest" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}>
                                {month.monthBanner.toUpperCase()}
                            </h2>
                            <i className="pi pi-calendar text-white text-xl md:text-2xl opacity-90" aria-hidden />
                        </div>

                        {month.sections.map((day) => (
                            <div key={day.dateLabel} className="mb-6 last:mb-0">
                                <p className="font-bold text-900 m-0 mb-3 uppercase underline text-sm md:text-base tracking-wide">
                                    {day.dateLabel}
                                </p>
                                <div className="overflow-auto border-1 surface-border border-round-lg bg-white shadow-1">
                                    <table className="w-full border-collapse" style={{ minWidth: "20rem" }}>
                                        <thead>
                                            <tr style={{ background: tableHeaderBg }}>
                                                <th
                                                    className="text-left text-900 font-bold p-2 md:p-3 border-bottom-1 surface-border align-top white-space-nowrap"
                                                    style={{ width: "7rem" }}
                                                >
                                                    Issue type
                                                </th>
                                                <th className="text-left text-900 font-bold p-2 md:p-3 border-bottom-1 surface-border">
                                                    Summary
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {day.tasks.map((task) => (
                                                <tr key={task.title} className="border-bottom-1 surface-border last:border-none">
                                                    <td className="p-2 md:p-3 align-top border-right-1 surface-border font-bold text-900 text-sm">
                                                        {task.issueType}
                                                    </td>
                                                    <td className="p-0 md:p-0 align-top border-none">
                                                        <TaskSummaryCell task={task} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}

                        <p className="text-600 text-sm line-height-3 m-0 mt-4" style={{ maxWidth: "48rem" }}>
                            {RELEASES_MONTH_FOOTER}
                        </p>
                    </section>
                ))}
            </div>
        </div>
    );
}
