"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Paginator } from "primereact/paginator";
import { FilterMatchMode } from "primereact/api";
import type { DataTableFilterMeta } from "primereact/datatable";
import { useState } from "react";

type BoardView = "scoreboard" | "coaches";

const COMBINED_OPTIONS = [{ label: "Combined", value: "combined" }];
const PRODUCT_OPTIONS = [{ label: "Products", value: "products" }];
const LINE_OPTIONS = [{ label: "Insurance", value: "insurance" }];
const METRIC_OPTIONS = [{ label: "Submitted Annual Premium", value: "sap" }];
const TEAM_SCOPE_OPTIONS = [{ label: "TEAM (Individual)", value: "team_individual" }];
const PERIOD_OPTIONS = [{ label: "MTD", value: "mtd" }];

const ALL_OPTION = [{ label: "All", value: null }];

type PersonalRow = {
    id: string;
    rank: number;
    agentName: string;
    executiveDirector: string;
    level: string;
    production: number;
};

function emptyColumnFilters(): DataTableFilterMeta {
    return {
        agentName: { value: null, matchMode: FilterMatchMode.EQUALS },
        executiveDirector: { value: null, matchMode: FilterMatchMode.EQUALS },
        level: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

export default function PersonalScoreboardView() {
    const [boardView, setBoardView] = useState<BoardView>("scoreboard");
    const [combined, setCombined] = useState("combined");
    const [products, setProducts] = useState("products");
    const [line, setLine] = useState("insurance");
    const [metric, setMetric] = useState("sap");
    const [teamScope, setTeamScope] = useState("team_individual");
    const [period, setPeriod] = useState("mtd");
    const [dateRange, setDateRange] = useState<Date[] | null>([new Date(2026, 3, 1), new Date(2026, 3, 12)]);

    const [columnFilters, setColumnFilters] = useState<DataTableFilterMeta>(() => emptyColumnFilters());
    const [rows] = useState<PersonalRow[]>([]);

    const [first, setFirst] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [goToPage, setGoToPage] = useState(1);

    const totalRecords = 0;
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize) || 1);

    const resetToolbar = () => {
        setCombined("combined");
        setProducts("products");
        setLine("insurance");
        setMetric("sap");
        setTeamScope("team_individual");
        setPeriod("mtd");
        setDateRange([new Date(2026, 3, 1), new Date(2026, 3, 12)]);
        setColumnFilters(emptyColumnFilters());
        setFirst(0);
        setGoToPage(1);
        setPageSize(30);
    };

    const clearProductionFilter = () => {
        /* placeholder for future production range filter */
    };

    const productionFilterElement = () => (
        <Button type="button" label="Clear" className="p-button-text p-button-sm p-0" onClick={clearProductionFilter} />
    );

    const applyGoToPage = () => {
        const p = Math.min(Math.max(1, goToPage), totalPages);
        setGoToPage(p);
        setFirst((p - 1) * pageSize);
    };

    return (
        <div className="personal-scoreboard-view surface-card border-round border-1 surface-border overflow-hidden">
            <div
                className="flex flex-wrap justify-content-between align-items-center gap-3 p-3 md:p-4 border-bottom-1 surface-border"
                style={{ background: "linear-gradient(90deg, #fff7ed 0%, #ffedd5 50%, #fff7ed 100%)" }}
            >
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 flex align-items-center gap-2">
                    <i className="pi pi-trophy text-orange-500" aria-hidden />
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
                    <Link href="/agent/scoreboard/company" className="inline-block pb-2 text-600 font-medium no-underline hover:text-900">
                        Company
                    </Link>
                    <span className="inline-block pb-2 text-primary font-semibold border-bottom-2 border-primary cursor-default">
                        Personal
                    </span>
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
                            <Dropdown
                                value={teamScope}
                                options={TEAM_SCOPE_OPTIONS}
                                onChange={(e) => setTeamScope(e.value)}
                                className="w-14rem"
                            />
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
                            <Button type="button" label="Reset" className="p-button-outlined" onClick={resetToolbar} />
                            <Button type="button" label="Show Scoreboard" className="p-button-outlined p-button-primary font-semibold" onClick={() => {}} />
                        </div>

                        <DataTable
                            value={rows}
                            dataKey="id"
                            filters={columnFilters}
                            onFilter={(e) => setColumnFilters(e.filters)}
                            filterDisplay="row"
                            className="p-datatable-sm personal-scoreboard-table mb-3"
                            stripedRows
                            emptyMessage="No results found. Please adjust your search request."
                        >
                            <Column field="rank" header="#" style={{ width: "3rem" }} filter={false} />
                            <Column
                                field="agentName"
                                header="Agent's Name"
                                filter
                                showFilterMenu={false}
                                filterElement={(opts) => (
                                    <Dropdown
                                        value={opts.value}
                                        options={ALL_OPTION}
                                        onChange={(e) => opts.filterCallback(e.value)}
                                        placeholder="All"
                                        className="w-full text-sm"
                                        showClear
                                    />
                                )}
                            />
                            <Column
                                field="executiveDirector"
                                header="Current Executive Director"
                                filter
                                showFilterMenu={false}
                                filterElement={(opts) => (
                                    <Dropdown
                                        value={opts.value}
                                        options={ALL_OPTION}
                                        onChange={(e) => opts.filterCallback(e.value)}
                                        placeholder="All"
                                        className="w-full text-sm"
                                        showClear
                                    />
                                )}
                            />
                            <Column
                                field="level"
                                header="Level"
                                filter
                                showFilterMenu={false}
                                filterElement={(opts) => (
                                    <Dropdown
                                        value={opts.value}
                                        options={ALL_OPTION}
                                        onChange={(e) => opts.filterCallback(e.value)}
                                        placeholder="All"
                                        className="w-full text-sm"
                                        showClear
                                    />
                                )}
                            />
                            <Column
                                field="production"
                                header="Production"
                                body={() => "—"}
                                filter
                                showFilterMenu={false}
                                filterElement={productionFilterElement}
                            />
                        </DataTable>

                        <div className="flex flex-wrap justify-content-between align-items-center gap-3 border-top-1 surface-border pt-3">
                            <div className="flex flex-wrap align-items-center gap-2">
                                <span className="text-600 text-sm whitespace-nowrap">Items per page</span>
                                <Dropdown
                                    value={pageSize}
                                    options={[
                                        { label: "10", value: 10 },
                                        { label: "20", value: 20 },
                                        { label: "30", value: 30 },
                                        { label: "50", value: 50 },
                                    ]}
                                    onChange={(e) => {
                                        setPageSize(e.value);
                                        setFirst(0);
                                        setGoToPage(1);
                                    }}
                                    className="w-6rem"
                                />
                                <span className="text-600 text-sm whitespace-nowrap">Go to</span>
                                <InputNumber
                                    value={goToPage}
                                    onValueChange={(e) => setGoToPage(e.value ?? 1)}
                                    min={1}
                                    max={totalPages}
                                    showButtons
                                    className="w-6rem"
                                    inputClassName="text-sm"
                                />
                                <Button type="button" label="Go" className="p-button-sm p-button-outlined" onClick={applyGoToPage} />
                            </div>

                            <Paginator
                                first={first}
                                rows={pageSize}
                                totalRecords={totalRecords}
                                onPageChange={(e) => {
                                    if (e.rows !== pageSize) {
                                        setPageSize(e.rows);
                                        setFirst(0);
                                        setGoToPage(1);
                                    } else {
                                        setFirst(e.first);
                                        setGoToPage(Math.floor(e.first / e.rows) + 1);
                                    }
                                }}
                                rowsPerPageOptions={[10, 20, 30, 50]}
                                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                            />

                            <div className="flex flex-wrap gap-2">
                                <Button type="button" label="Export to PDF" className="p-button-outlined p-button-primary" onClick={() => {}} />
                                <Button type="button" label="Export to Excel" className="p-button-outlined p-button-primary" onClick={() => {}} />
                            </div>
                        </div>

                        <p className="text-600 text-xs m-0 mt-3">
                            Personal scoreboard filters and exports will connect to reporting services when data is available.
                        </p>
                    </>
                )}
            </div>

            <style jsx global>{`
                .personal-scoreboard-table .p-datatable-thead > tr > th {
                    background: #f8fafc !important;
                    font-weight: 700 !important;
                    font-size: 0.75rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    color: #334155 !important;
                    border-color: #e2e8f0 !important;
                }
                .personal-scoreboard-table .p-datatable-tbody > tr > td {
                    padding: 0.5rem 0.65rem !important;
                    vertical-align: middle;
                }
                .personal-scoreboard-table .p-column-filter-row > th {
                    background: #ffffff !important;
                    border-color: #e2e8f0 !important;
                }
            `}</style>
        </div>
    );
}
