"use client";

import Link from "next/link";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useMemo, useState } from "react";

export type RollupRow = {
    id: string;
    edWhoCoveredChargeBack: string;
    debtor: string;
    originalChargeBackDate: string;
    status: string;
    dealType: string;
    chargebackAmount: string | null;
    toBeRolledUp: string | null;
    edPendingReport: string | null;
    amountPaidByEd: string | null;
    amountPaidBackToEd: string | null;
    debtorPendingReport: string | null;
};

/** Sample rows empty for “No results found.” layout; replace with API data when wired. */
const SEED_ROWS: RollupRow[] = [];

const DEBTOR_FILTER_OPTIONS = [
    { label: "Jo Cleine Spinola", value: "Jo Cleine Spinola" },
    { label: "Carlos Gomez", value: "Carlos Gomez" },
];

const STATUS_OPTIONS = [
    { label: "All", value: null },
    { label: "Active", value: "Active" },
    { label: "Paid Before RU", value: "Paid Before RU" },
    { label: "Paid", value: "Paid" },
    { label: "Paid to ED", value: "Paid to ED" },
    { label: "Paid by Agent", value: "Paid by Agent" },
];

const DEAL_TYPE_OPTIONS = [
    { label: "All", value: null },
    { label: "General", value: "General" },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        debtor: { value: null, matchMode: FilterMatchMode.EQUALS },
        originalChargeBackDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        dealType: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

function moneyOrDash(v: string | null) {
    if (!v?.trim()) return <span className="text-500">—</span>;
    const t = v.trim();
    const cls =
        t.startsWith("-") || t.startsWith("$-") ? "text-red-600 font-semibold" : t.startsWith("+") ? "text-green-700 font-semibold" : "text-900 font-medium";
    return <span className={cls}>{v}</span>;
}

function reportLink(label: string | null) {
    if (!label?.trim()) return <span className="text-500">—</span>;
    return (
        <button type="button" className="p-0 border-none bg-transparent cursor-pointer text-primary font-semibold underline text-left">
            {label}
        </button>
    );
}

const legendItems: { term: string; desc: string }[] = [
    { term: "Active", desc: "Potential RollUp converted to RollUp but not yet covered by ED (Executive Director)." },
    { term: "Paid Before RU", desc: "Paid by the Debtor before conversion to RollUp." },
    { term: "Paid", desc: "ED has already covered the RollUp." },
    { term: "Paid to ED", desc: "RollUp amount has been paid back to the ED." },
    { term: "Paid by Agent", desc: "Return of RollUp amount to ED, but the ED report is not yet paid." },
];

export default function RollupsView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());

    const filtered = useMemo(() => {
        return SEED_ROWS.filter((row) => {
            const d = filters.debtor as { value: string | null };
            const dt = filters.originalChargeBackDate as { value: string | null };
            const s = filters.status as { value: string | null };
            const t = filters.dealType as { value: string | null };
            if (d?.value && row.debtor !== d.value) return false;
            if (dt?.value && !row.originalChargeBackDate.toLowerCase().includes(String(dt.value).toLowerCase())) return false;
            if (s?.value && row.status !== s.value) return false;
            if (t?.value && row.dealType !== t.value) return false;
            return true;
        });
    }, [filters]);

    const clear = () => setFilters(emptyFilters());

    const indexBody = (_: RollupRow, options: { rowIndex: number }) => <span>{options.rowIndex + 1}</span>;

    return (
        <div className="rollups-view surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-3 md:p-4">
                <div className="flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-900 m-0">Rollups</h1>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/agent/reports/potential-roll-ups"
                            className="p-button p-component p-button-warning font-bold no-underline inline-flex align-items-center justify-content-center px-3 py-2 border-round text-center"
                        >
                            <span className="p-button-label">POTENTIAL ROLLUPS</span>
                        </Link>
                        <Button type="button" label="EXPORT ROLLUPS" icon="pi pi-download" className="p-button-warning font-bold" onClick={() => {}} />
                    </div>
                </div>

                <ul className="list-none p-0 m-0 mb-3 text-700 text-sm line-height-3">
                    {legendItems.map(({ term, desc }) => (
                        <li key={term} className="mb-1">
                            <span className="italic underline font-semibold text-900">{term}:</span> {desc}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap justify-content-end align-items-center gap-2 mb-2">
                    <Button type="button" label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm font-bold" onClick={clear} />
                    <Button type="button" label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
                </div>

                <DataTable
                    value={filtered}
                    dataKey="id"
                    filters={filters}
                    onFilter={(e) => setFilters(e.filters)}
                    filterDisplay="row"
                    scrollable
                    scrollHeight="60vh"
                    className="p-datatable-sm rollups-table"
                    stripedRows
                    emptyMessage="No results found."
                >
                    <Column header="#" body={indexBody} style={{ width: "2.75rem" }} filter={false} />
                    <Column field="edWhoCoveredChargeBack" header="ED WHO COVERED CHARGE BACK" style={{ minWidth: "11rem" }} filter={false} />
                    <Column
                        field="debtor"
                        header="DEBTOR"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={DEBTOR_FILTER_OPTIONS}
                                optionLabel="label"
                                optionValue="value"
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="Select Debtor"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="originalChargeBackDate"
                        header="ORIGINAL CHARGE BACK DATE"
                        filter
                        filterPlaceholder=""
                        showFilterMenu={false}
                        style={{ minWidth: "10rem" }}
                    />
                    <Column
                        field="status"
                        header="STATUS"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={STATUS_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                        style={{ minWidth: "8rem" }}
                    />
                    <Column
                        field="dealType"
                        header="DEAL TYPE"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={DEAL_TYPE_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                        style={{ minWidth: "7rem" }}
                    />
                    <Column
                        field="chargebackAmount"
                        header="CHARGEBACK AMOUNT"
                        body={(r: RollupRow) => moneyOrDash(r.chargebackAmount)}
                        style={{ minWidth: "8rem" }}
                        filter={false}
                    />
                    <Column field="toBeRolledUp" header="TO BE ROLLED-UP" body={(r) => moneyOrDash(r.toBeRolledUp)} style={{ minWidth: "8rem" }} filter={false} />
                    <Column
                        field="edPendingReport"
                        header="ED'S PENDING REPORT"
                        body={(r: RollupRow) => reportLink(r.edPendingReport)}
                        style={{ minWidth: "9rem" }}
                        filter={false}
                    />
                    <Column field="amountPaidByEd" header="AMOUNT PAID BY ED" body={(r) => moneyOrDash(r.amountPaidByEd)} style={{ minWidth: "8rem" }} filter={false} />
                    <Column
                        field="amountPaidBackToEd"
                        header="AMOUNT PAID BACK TO ED"
                        body={(r) => moneyOrDash(r.amountPaidBackToEd)}
                        style={{ minWidth: "9rem" }}
                        filter={false}
                    />
                    <Column
                        field="debtorPendingReport"
                        header="DEBTOR'S PENDING REPORT"
                        body={(r) => reportLink(r.debtorPendingReport)}
                        style={{ minWidth: "9rem" }}
                        filter={false}
                    />
                </DataTable>

                <p className="text-600 text-xs m-0 mt-3">Rollup rows and filters are layout placeholders until chargeback roll-up APIs are connected.</p>
            </div>

            <style jsx global>{`
                .rollups-table .p-datatable-thead > tr > th {
                    background: #fed7aa !important;
                    color: #1c1917 !important;
                    font-weight: 700 !important;
                    font-size: 0.7rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    border-color: #e7e5e4 !important;
                    padding: 0.55rem 0.45rem !important;
                }
                .rollups-table .p-column-filter-row > th {
                    background: #ffedd5 !important;
                }
                .rollups-table .p-datatable-tbody > tr > td {
                    padding: 0.45rem 0.45rem !important;
                    font-size: 0.85rem;
                    vertical-align: middle;
                }
            `}</style>
        </div>
    );
}
