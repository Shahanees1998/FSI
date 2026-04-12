"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import { useMemo, useState } from "react";

type BoardView = "scoreboard" | "coaches";

export type ScoreboardAgentRow = {
    rank: number;
    name: string;
    countryLabel: string;
    executiveDirector: string;
    level: string;
    production: number;
    avatarSeed: string;
};

const COMBINED_OPTIONS = [{ label: "Combined", value: "combined" }];
const PRODUCT_OPTIONS = [{ label: "Products", value: "products" }];
const LINE_OPTIONS = [{ label: "Insurance", value: "insurance" }];
const METRIC_OPTIONS = [{ label: "Submitted Annual Premium", value: "sap" }];
const SCOPE_OPTIONS = [{ label: "Personal", value: "personal" }];
const PERIOD_OPTIONS = [{ label: "MTD", value: "mtd" }];
const TOP_FILTER_OPTIONS = [
    { label: "Top 3 agents", value: "3" },
    { label: "Top 10 agents", value: "10" },
    { label: "Top 25 agents", value: "25" },
    { label: "All (table only)", value: "all" },
];

const LEVELS = ["FA", "SNED", "SED", "SFA", "SM", "ED"] as const;
const TEAMS = [
    "Summit Financial",
    "Horizon Group",
    "Pinnacle Partners",
    "NorthStar Team",
    "Legacy Builders",
    "Elite Producers",
];

const FIRST_NAMES = [
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Quinn",
    "Avery",
    "Skyler",
    "Jamie",
    "Drew",
    "Blake",
    "Cameron",
    "Reese",
    "Parker",
    "Logan",
];

const LAST_NAMES = [
    "Nguyen",
    "Patel",
    "Garcia",
    "Martinez",
    "Okafor",
    "Silva",
    "Kowalski",
    "Andersen",
    "Haddad",
    "Fernandez",
    "Cohen",
    "Murphy",
    "Chen",
    "Ibrahim",
    "Thompson",
];

function formatMoney(n: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);
}

function buildAllRows(): ScoreboardAgentRow[] {
    const topThree: ScoreboardAgentRow[] = [
        {
            rank: 1,
            name: "Aasim Saled",
            countryLabel: "USA",
            executiveDirector: "Summit Financial",
            level: "ED",
            production: 120_000,
            avatarSeed: "Aasim+Saled",
        },
        {
            rank: 2,
            name: "Adeola Abiodun",
            countryLabel: "USA",
            executiveDirector: "Horizon Group",
            level: "SM",
            production: 105_600,
            avatarSeed: "Adeola+Abiodun",
        },
        {
            rank: 3,
            name: "Oluwamayowa Familua",
            countryLabel: "Canada",
            executiveDirector: "Pinnacle Partners",
            level: "SFA",
            production: 80_000,
            avatarSeed: "Oluwamayowa+Familua",
        },
    ];

    const rest: ScoreboardAgentRow[] = Array.from({ length: 197 }, (_, i) => {
        const fn = FIRST_NAMES[(i * 3) % FIRST_NAMES.length];
        const ln = LAST_NAMES[(i * 5) % LAST_NAMES.length];
        const production = 79_500 - i * 320 - (i % 9) * 40;
        return {
            rank: 4 + i,
            name: `${fn} ${ln}`,
            countryLabel: i % 4 === 0 ? "Canada" : "USA",
            executiveDirector: TEAMS[i % TEAMS.length],
            level: LEVELS[i % LEVELS.length],
            production: Math.max(1200, production),
            avatarSeed: `${fn}+${ln}+${i}`,
        };
    });

    return [...topThree, ...rest];
}

const ALL_ROWS = buildAllRows();

function avatarUrl(seed: string) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&size=128&background=e2e8f0&color=0f172a`;
}

function PodiumCard({
    place,
    name,
    team,
    production,
    tone,
}: {
    place: 1 | 2 | 3;
    name: string;
    team: string;
    production: number;
    tone: "gold" | "silver" | "bronze";
}) {
    const bg =
        tone === "gold"
            ? "linear-gradient(160deg, #fde047 0%, #eab308 100%)"
            : tone === "silver"
              ? "linear-gradient(160deg, #e2e8f0 0%, #cbd5e1 100%)"
              : "linear-gradient(160deg, #fed7aa 0%, #fdba74 100%)";
    const orderClass = place === 1 ? "order-2" : place === 2 ? "order-1" : "order-3";
    const scaleStyle = place === 1 ? { transform: "scale(1.03)" } : undefined;
    return (
        <div className={`col-12 md:col-4 ${orderClass}`}>
            <div
                className="border-round-xl p-4 text-center h-full shadow-2"
                style={{ background: bg, border: "1px solid rgba(15,23,42,0.08)", ...scaleStyle }}
            >
                <div className="text-900 font-bold text-lg mb-1">#{place}</div>
                {place === 1 ? <i className="pi pi-star-fill text-yellow-900 text-2xl mb-2" aria-hidden /> : null}
                {/* eslint-disable-next-line @next/next/no-img-element -- external avatar placeholder */}
                <img
                    src={avatarUrl(name.replace(/\s+/g, "+"))}
                    alt=""
                    className="border-circle mx-auto mb-2"
                    style={{ width: "4.5rem", height: "4.5rem", objectFit: "cover" }}
                />
                <div className="font-bold text-900 text-lg line-height-3 mb-1">{name}</div>
                <div className="text-700 text-sm mb-2">{team}</div>
                <div className="text-900 font-bold text-xl">{formatMoney(production)}</div>
            </div>
        </div>
    );
}

export default function CompanyScoreboardView() {
    const [boardView, setBoardView] = useState<BoardView>("scoreboard");
    const [combined, setCombined] = useState("combined");
    const [products, setProducts] = useState("products");
    const [line, setLine] = useState("insurance");
    const [metric, setMetric] = useState("sap");
    const [scope, setScope] = useState("personal");
    const [period, setPeriod] = useState("mtd");
    const [dateRange, setDateRange] = useState<Date[] | null>([new Date(2026, 3, 1), new Date(2026, 3, 12)]);
    const [topFilter, setTopFilter] = useState("3");
    const [first, setFirst] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    const total = ALL_ROWS.length;

    const pageRows = useMemo(() => ALL_ROWS.slice(first, first + pageSize), [first, pageSize]);

    const rangeStart = total === 0 ? 0 : first + 1;
    const rangeEnd = Math.min(first + pageSize, total);
    const rangeLabel = total === 0 ? "Showing 0 of 0 items." : `Showing ${rangeStart} - ${rangeEnd} of ${total} items.`;

    const podium = ALL_ROWS.slice(0, 3);

    const resetFilters = () => {
        setCombined("combined");
        setProducts("products");
        setLine("insurance");
        setMetric("sap");
        setScope("personal");
        setPeriod("mtd");
        setDateRange([new Date(2026, 3, 1), new Date(2026, 3, 12)]);
        setTopFilter("3");
        setFirst(0);
        setPageSize(50);
    };

    const nameBody = (row: ScoreboardAgentRow) => (
        <div className="flex align-items-center gap-2">
            <span className="text-lg" title={row.countryLabel}>
                {row.countryLabel === "Canada" ? "🇨🇦" : "🇺🇸"}
            </span>
            <span className="font-medium text-900">{row.name}</span>
        </div>
    );

    const avatarBody = (row: ScoreboardAgentRow) => (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element -- external avatar placeholder */}
            <img
                src={avatarUrl(row.avatarSeed)}
                alt=""
                className="border-circle"
                style={{ width: "2.25rem", height: "2.25rem", objectFit: "cover" }}
            />
        </>
    );

    const productionBody = (row: ScoreboardAgentRow) => (
        <span className="font-semibold text-900 text-right block">{formatMoney(row.production)}</span>
    );

    return (
        <div className="company-scoreboard-view surface-card border-round border-1 surface-border overflow-hidden">
            <div
                className="flex flex-wrap justify-content-between align-items-center gap-3 p-3 md:p-4 border-bottom-1 surface-border"
                style={{ background: "#f5f0e8" }}
            >
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 flex align-items-center gap-2">
                    <i className="pi pi-trophy text-yellow-600" aria-hidden />
                    Scoreboard
                </h1>
                <div className="flex gap-1">
                    <Button
                        type="button"
                        label="Scoreboard"
                        className={boardView === "scoreboard" ? "p-button-warning font-bold" : "p-button-outlined"}
                        onClick={() => setBoardView("scoreboard")}
                    />
                    <Button
                        type="button"
                        label="Coaches Corner"
                        className={boardView === "coaches" ? "p-button-warning font-bold" : "p-button-outlined"}
                        onClick={() => setBoardView("coaches")}
                    />
                </div>
            </div>

            <div className="p-3 md:p-4">
                <div className="flex gap-4 border-bottom-1 surface-border mb-3">
                    <Link
                        href="/agent/scoreboard/company"
                        className="inline-block pb-2 text-primary font-semibold border-bottom-2 border-primary no-underline"
                    >
                        Company
                    </Link>
                    <Link href="/agent/scoreboard/personal" className="inline-block pb-2 text-600 font-medium no-underline hover:text-900">
                        Personal
                    </Link>
                </div>

                {boardView === "coaches" ? (
                    <div className="surface-ground border-round border-1 surface-border p-4 md:p-5">
                        <h2 className="text-xl font-semibold text-900 mt-0">Coaches Corner</h2>
                        <p className="text-700 line-height-3 m-0">
                            Coaching notes and resources will appear here when the scoreboard integration is complete.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-2 align-items-end mb-3">
                            <Dropdown value={combined} options={COMBINED_OPTIONS} onChange={(e) => setCombined(e.value)} className="w-10rem" />
                            <Dropdown value={products} options={PRODUCT_OPTIONS} onChange={(e) => setProducts(e.value)} className="w-10rem" />
                            <Dropdown value={line} options={LINE_OPTIONS} onChange={(e) => setLine(e.value)} className="w-10rem" />
                            <Dropdown value={metric} options={METRIC_OPTIONS} onChange={(e) => setMetric(e.value)} className="w-18rem" />
                            <Dropdown value={scope} options={SCOPE_OPTIONS} onChange={(e) => setScope(e.value)} className="w-10rem" />
                            <Dropdown value={period} options={PERIOD_OPTIONS} onChange={(e) => setPeriod(e.value)} className="w-8rem" />
                            <Calendar
                                value={dateRange}
                                onChange={(e) => setDateRange((e.value as Date[] | null) ?? null)}
                                selectionMode="range"
                                readOnlyInput
                                showIcon
                                dateFormat="yy-mm-dd"
                                placeholder="Date range"
                                className="w-full md:w-20rem"
                            />
                            <Button type="button" label="Reset" className="p-button-outlined" onClick={resetFilters} />
                            <Button type="button" label="Show Scoreboard" className="p-button-primary font-semibold" onClick={() => {}} />
                            <Dropdown
                                value={topFilter}
                                options={TOP_FILTER_OPTIONS}
                                onChange={(e) => setTopFilter(e.value)}
                                className="w-12rem"
                            />
                        </div>

                        <div className="grid mb-4">
                            <PodiumCard place={2} name={podium[1].name} team={podium[1].executiveDirector} production={podium[1].production} tone="silver" />
                            <PodiumCard place={1} name={podium[0].name} team={podium[0].executiveDirector} production={podium[0].production} tone="gold" />
                            <PodiumCard place={3} name={podium[2].name} team={podium[2].executiveDirector} production={podium[2].production} tone="bronze" />
                        </div>

                        <p className="text-700 text-sm font-semibold m-0 mb-2">{rangeLabel}</p>

                        <DataTable value={pageRows} dataKey="rank" className="p-datatable-sm scoreboard-agent-table mb-3" stripedRows>
                            <Column field="rank" header="#" style={{ width: "3rem" }} />
                            <Column header="Avatar" body={avatarBody} style={{ width: "4rem" }} />
                            <Column header="Agent's Name" body={nameBody} style={{ minWidth: "12rem" }} />
                            <Column field="executiveDirector" header="Current Executive Director" style={{ minWidth: "11rem" }} />
                            <Column field="level" header="Level" style={{ width: "6rem" }} />
                            <Column field="production" header="Production" body={productionBody} style={{ minWidth: "9rem" }} />
                            <Column
                                header=""
                                body={() => (
                                    <Button type="button" icon="pi pi-info-circle" className="p-button-text p-button-sm" aria-label="Info" />
                                )}
                                style={{ width: "3rem" }}
                            />
                        </DataTable>

                        <div className="flex flex-wrap justify-content-between align-items-center gap-3 border-top-1 surface-border pt-3">
                            <span className="text-600 text-sm">{rangeLabel}</span>
                            <Paginator
                                first={first}
                                rows={pageSize}
                                totalRecords={total}
                                onPageChange={(e) => {
                                    if (e.rows !== pageSize) {
                                        setPageSize(e.rows);
                                        setFirst(0);
                                    } else {
                                        setFirst(e.first);
                                    }
                                }}
                                rowsPerPageOptions={[25, 50, 100]}
                                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            />
                        </div>

                        <p className="text-600 text-xs m-0 mt-3">
                            Sample rankings and pagination for layout; connect to analytics services for live production totals.
                        </p>
                    </>
                )}
            </div>

            <style jsx global>{`
                .scoreboard-agent-table .p-datatable-thead > tr > th {
                    background: #f8fafc !important;
                    font-weight: 700 !important;
                    font-size: 0.75rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    color: #334155 !important;
                    border-color: #e2e8f0 !important;
                }
                .scoreboard-agent-table .p-datatable-tbody > tr > td {
                    padding: 0.5rem 0.65rem !important;
                    vertical-align: middle;
                }
            `}</style>
        </div>
    );
}
