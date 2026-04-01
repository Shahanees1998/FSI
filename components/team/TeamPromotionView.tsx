"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { classNames } from "primereact/utils";
import { useState } from "react";

const ACCENT = "#f97316";
const DROPDOWN_ALL = [{ label: "All", value: null }];

type PromotionRow = {
    id: string;
    agentName: string;
    currentLvl: string;
    newLvl: string;
    ed: string;
    structure: string;
    recruitmentDate: string;
    requirementsAchieved: string;
    date: Date | null;
};

function emptyFilters(): DataTableFilterMeta {
    return {
        agentName: { value: null, matchMode: FilterMatchMode.EQUALS },
        currentLvl: { value: null, matchMode: FilterMatchMode.EQUALS },
        newLvl: { value: null, matchMode: FilterMatchMode.EQUALS },
        ed: { value: null, matchMode: FilterMatchMode.EQUALS },
        structure: { value: "Team X", matchMode: FilterMatchMode.CONTAINS },
        recruitmentDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        requirementsAchieved: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.DATE_IS },
    };
}

function TabHeader({ label, count }: { label: string; count: number }) {
    return (
        <span className="flex align-items-center gap-2">
            {label}
            <span
                className="inline-flex align-items-center justify-content-center border-circle text-xs font-bold min-w-1rem h-1rem px-1"
                style={{ background: ACCENT, color: "#fff", fontSize: "0.65rem" }}
            >
                {count}
            </span>
        </span>
    );
}

export default function TeamPromotionView() {
    const [activeTab, setActiveTab] = useState(0);
    const [statusPill, setStatusPill] = useState<"pending" | "promoted" | "rejected">("pending");
    const [records] = useState<PromotionRow[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const promotionCount = 0;
    const pendingCount = 0;
    const promotedCount = 0;
    const rejectedCount = 0;

    const clearFilters = () => {
        setFilters(emptyFilters());
        setFirst(0);
    };

    const indexBody = (_: PromotionRow, options: { rowIndex: number }) => <span>{options.rowIndex + 1}</span>;

    const dateBody = (row: PromotionRow) =>
        row.date ? (
            <span className="text-sm">{row.date.toLocaleDateString()}</span>
        ) : (
            <span className="text-500">—</span>
        );

    const promotionTable = (
        <>
            <div className="flex flex-wrap gap-2 mb-3">
                {(
                    [
                        { key: "pending" as const, label: "Pending", count: pendingCount },
                        { key: "promoted" as const, label: "Promoted", count: promotedCount },
                        { key: "rejected" as const, label: "Rejected", count: rejectedCount },
                    ] as const
                ).map(({ key, label, count }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setStatusPill(key)}
                        className={classNames(
                            "flex align-items-center gap-2 border-round-xl border-1 px-3 py-2 text-sm cursor-pointer transition-colors transition-duration-150",
                            statusPill === key ? "surface-200 border-300 text-900" : "bg-white border-200 text-700 hover:surface-50"
                        )}
                    >
                        {label}
                        <span
                            className="inline-flex align-items-center justify-content-center border-circle text-xs font-bold min-w-1rem h-1rem px-1"
                            style={{ background: ACCENT, color: "#fff", fontSize: "0.65rem" }}
                        >
                            {count}
                        </span>
                    </button>
                ))}
            </div>

            <DataTable
                value={records}
                filters={filters}
                filterDisplay="row"
                onFilter={(e) => {
                    setFilters(e.filters);
                    setFirst(0);
                }}
                paginator
                rows={rows}
                first={first}
                onPage={(e) => {
                    setFirst(e.first);
                    setRows(e.rows ?? rows);
                }}
                rowsPerPageOptions={[10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                className="p-datatable-sm team-promotion-datatable"
                emptyMessage="No results found. Please adjust your search request."
                dataKey="id"
            >
                <Column header="#" body={indexBody} style={{ width: "2.5rem" }} filter={false} />
                <Column
                    field="agentName"
                    header="Agent's name"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "10rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={DROPDOWN_ALL}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column
                    field="currentLvl"
                    header="Current lvl"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "8rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={DROPDOWN_ALL}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column
                    field="newLvl"
                    header="New lvl"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "8rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={DROPDOWN_ALL}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column
                    field="ed"
                    header="ED"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "8rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={DROPDOWN_ALL}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column
                    field="structure"
                    header="Structure"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "10rem" }}
                    filterElement={(opts) => (
                        <div className="flex align-items-center gap-1 w-full flex-wrap">
                            {opts.value ? (
                                <Chip
                                    label={String(opts.value)}
                                    removable
                                    onRemove={() => {
                                        opts.filterCallback(null);
                                        return true;
                                    }}
                                    className="text-sm"
                                />
                            ) : (
                                <InputText
                                    className="w-full text-sm p-inputtext-sm"
                                    placeholder="Filter"
                                    value=""
                                    onChange={(e) => opts.filterCallback(e.target.value || null)}
                                />
                            )}
                        </div>
                    )}
                />
                <Column
                    field="recruitmentDate"
                    header="Recruitment date"
                    filter
                    filterPlaceholder=""
                    showFilterMenu={false}
                    style={{ minWidth: "9rem" }}
                />
                <Column
                    field="requirementsAchieved"
                    header="Requirements achieved"
                    filter
                    filterPlaceholder=""
                    showFilterMenu={false}
                    style={{ minWidth: "11rem" }}
                />
                <Column
                    field="date"
                    header="Date"
                    body={dateBody}
                    dataType="date"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "10rem" }}
                    filterElement={(opts) => (
                        <Calendar
                            value={opts.value as Date | null}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="Select d..."
                            showIcon
                            className="w-full p-inputtext-sm"
                            dateFormat="mm/dd/yy"
                        />
                    )}
                />
                <Column
                    header=""
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "9rem" }}
                    filterElement={() => (
                        <div className="flex gap-2 justify-content-end flex-wrap">
                            <Button type="button" label="Clear" className="p-button-text p-button-sm text-primary" onClick={clearFilters} />
                            <Button
                                type="button"
                                label="Apply"
                                className="p-button-sm border-none text-white"
                                style={{ background: ACCENT, borderColor: ACCENT }}
                                onClick={() => {}}
                            />
                        </div>
                    )}
                    body={() => <span />}
                />
            </DataTable>

            <style jsx global>{`
                .team-promotion-datatable .p-datatable-thead > tr > th {
                    font-size: 0.75rem;
                    font-weight: 600;
                    vertical-align: top;
                }
                .team-promotion-datatable .p-datatable-filter-row > td {
                    background: var(--surface-0);
                    vertical-align: middle;
                }
                .team-promotion-datatable.p-datatable .p-datatable-tbody > tr > td {
                    padding: 0.65rem 0.5rem;
                }
            `}</style>
        </>
    );

    return (
        <div className="team-promotion-view">
            <div className="flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                <h1 className="text-2xl font-bold text-900 m-0">Promotion</h1>
                <p className="text-600 text-sm m-0">Promotions will be updated each 15 minutes.</p>
            </div>

            <TabView
                activeIndex={activeTab}
                onTabChange={(e) => setActiveTab(e.index)}
                className="team-promotion-tabs"
            >
                <TabPanel header={<TabHeader label="Promotion" count={promotionCount} />}>{promotionTable}</TabPanel>
                <TabPanel header="Requirements">
                    <p className="text-600 m-0 py-4">Requirements content will appear here.</p>
                </TabPanel>
                <TabPanel header="Current standing">
                    <p className="text-600 m-0 py-4">Current standing content will appear here.</p>
                </TabPanel>
                <TabPanel header="My current standing">
                    <p className="text-600 m-0 py-4">My current standing content will appear here.</p>
                </TabPanel>
            </TabView>

            <style jsx global>{`
                .team-promotion-tabs .p-tabview-nav {
                    border: none;
                    background: transparent;
                    gap: 0.25rem;
                }
                .team-promotion-tabs .p-tabview-nav-link {
                    border: none !important;
                    border-bottom: 3px solid transparent !important;
                    border-radius: 0 !important;
                    background: transparent !important;
                    padding: 0.75rem 1rem !important;
                }
                .team-promotion-tabs .p-highlight .p-tabview-nav-link {
                    border-bottom-color: ${ACCENT} !important;
                    color: var(--text-color) !important;
                    font-weight: 600;
                }
                .team-promotion-tabs .p-tabview-panels {
                    background: transparent;
                    padding: 1rem 0 0 0;
                }
            `}</style>
        </div>
    );
}
