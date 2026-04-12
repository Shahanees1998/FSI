"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useMemo, useState } from "react";

export type DebtRow = {
    id: string;
    displayName: string;
    agentDetailLine: string;
    type: string;
    role: string;
    balanceOwed: string;
    paymentSource: string;
    schedule: string;
    amount: string;
    lastPaymentDate: string;
    nextPaymentDate: string;
    status: string;
    comment: string;
};

const SEED_ROWS: DebtRow[] = [
    {
        id: "1",
        displayName: "Jo Cleine Spinola",
        agentDetailLine: "Jo Cleine Spinola [JO SPI-A13713]",
        type: "US",
        role: "ED",
        balanceOwed: "$3,177.89",
        paymentSource: "N/A",
        schedule: "N/A",
        amount: "N/A",
        lastPaymentDate: "N/A",
        nextPaymentDate: "N/A",
        status: "Not set",
        comment: "",
    },
];

const ALL_DROPDOWN = [{ label: "All", value: null }];

const TYPE_OPTIONS = [...ALL_DROPDOWN, { label: "US", value: "US" }];
const ROLE_OPTIONS = [...ALL_DROPDOWN, { label: "ED", value: "ED" }];
const PAYMENT_SOURCE_OPTIONS = [...ALL_DROPDOWN, { label: "N/A", value: "N/A" }];
const SCHEDULE_OPTIONS = [...ALL_DROPDOWN, { label: "N/A", value: "N/A" }];
const STATUS_OPTIONS = [...ALL_DROPDOWN, { label: "Not set", value: "Not set" }];

function emptyFilters(): DataTableFilterMeta {
    return {
        displayName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        role: { value: null, matchMode: FilterMatchMode.EQUALS },
        balanceOwed: { value: null, matchMode: FilterMatchMode.CONTAINS },
        paymentSource: { value: null, matchMode: FilterMatchMode.EQUALS },
        schedule: { value: null, matchMode: FilterMatchMode.EQUALS },
        amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
        lastPaymentDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nextPaymentDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

export default function DebtsView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());

    const filtered = useMemo(() => {
        return SEED_ROWS.filter((row) => {
            const n = filters.displayName as { value: string | null };
            const t = filters.type as { value: string | null };
            const r = filters.role as { value: string | null };
            const b = filters.balanceOwed as { value: string | null };
            const ps = filters.paymentSource as { value: string | null };
            const sch = filters.schedule as { value: string | null };
            const amt = filters.amount as { value: string | null };
            const lp = filters.lastPaymentDate as { value: string | null };
            const np = filters.nextPaymentDate as { value: string | null };
            const st = filters.status as { value: string | null };
            if (n?.value && !`${row.displayName} ${row.agentDetailLine}`.toLowerCase().includes(String(n.value).toLowerCase())) return false;
            if (t?.value && row.type !== t.value) return false;
            if (r?.value && row.role !== r.value) return false;
            if (b?.value && !row.balanceOwed.toLowerCase().includes(String(b.value).toLowerCase())) return false;
            if (ps?.value && row.paymentSource !== ps.value) return false;
            if (sch?.value && row.schedule !== sch.value) return false;
            if (amt?.value && !row.amount.toLowerCase().includes(String(amt.value).toLowerCase())) return false;
            if (lp?.value && !row.lastPaymentDate.toLowerCase().includes(String(lp.value).toLowerCase())) return false;
            if (np?.value && !row.nextPaymentDate.toLowerCase().includes(String(np.value).toLowerCase())) return false;
            if (st?.value && row.status !== st.value) return false;
            return true;
        });
    }, [filters]);

    const clear = () => setFilters(emptyFilters());
    const total = SEED_ROWS.length;
    const n = filtered.length;
    const summary = n === 0 ? `Showing 0 of ${total} item${total === 1 ? "" : "s"}.` : `Showing 1–${n} of ${total} item${total === 1 ? "" : "s"}.`;

    const agentBody = (row: DebtRow) => (
        <div>
            <button type="button" className="p-0 border-none bg-transparent cursor-pointer text-left text-primary font-semibold underline">
                {row.displayName}
            </button>
            <div className="text-700 text-sm mt-1">{row.agentDetailLine}</div>
        </div>
    );

    const actionsBody = () => (
        <div className="flex flex-column gap-2 align-items-start">
            <Button type="button" label="View" icon="pi pi-eye" className="p-button-warning p-button-sm font-bold w-full" onClick={() => {}} />
            <Button type="button" label="History" icon="pi pi-folder" className="p-button-warning p-button-sm font-bold w-full" onClick={() => {}} />
        </div>
    );

    const indexBody = (_: DebtRow, options: { rowIndex: number }) => <span>{options.rowIndex + 1}</span>;

    return (
        <div className="debts-view surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-3 md:p-4">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">Debts</h1>

                <div className="flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                    <span className="text-700 text-sm font-semibold">{summary}</span>
                    <div className="flex gap-2">
                        <Button type="button" label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm font-bold" onClick={clear} />
                        <Button type="button" label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
                    </div>
                </div>

                <DataTable
                    value={filtered}
                    dataKey="id"
                    filters={filters}
                    onFilter={(e) => setFilters(e.filters)}
                    filterDisplay="row"
                    scrollable
                    scrollHeight="65vh"
                    className="p-datatable-sm debts-table"
                    stripedRows
                    emptyMessage="No debts match your filters."
                >
                    <Column header="#" body={indexBody} style={{ width: "2.75rem" }} filter={false} />
                    <Column
                        field="displayName"
                        header="AGENT"
                        body={agentBody}
                        filter
                        filterPlaceholder=""
                        showFilterMenu={false}
                        style={{ minWidth: "12rem" }}
                    />
                    <Column
                        field="type"
                        header="TYPE"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={TYPE_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="role"
                        header="ROLE"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={ROLE_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                        style={{ minWidth: "5rem" }}
                    />
                    <Column
                        field="balanceOwed"
                        header="BALANCE OWED"
                        body={(r: DebtRow) => <span className="font-bold text-900">{r.balanceOwed}</span>}
                        filter
                        filterPlaceholder=""
                        showFilterMenu={false}
                        style={{ minWidth: "8rem" }}
                    />
                    <Column
                        field="paymentSource"
                        header="PAYMENT SOURCE"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={PAYMENT_SOURCE_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                        style={{ minWidth: "8rem" }}
                    />
                    <Column
                        field="schedule"
                        header="SCHEDULE"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={SCHEDULE_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                        style={{ minWidth: "7rem" }}
                    />
                    <Column field="amount" header="AMOUNT" filter filterPlaceholder="" showFilterMenu={false} style={{ minWidth: "6rem" }} />
                    <Column
                        field="lastPaymentDate"
                        header="LAST PAYMENT DATE"
                        filter
                        filterPlaceholder=""
                        showFilterMenu={false}
                        style={{ minWidth: "9rem" }}
                    />
                    <Column
                        field="nextPaymentDate"
                        header="NEXT PAYMENT DATE"
                        filter
                        filterPlaceholder=""
                        showFilterMenu={false}
                        style={{ minWidth: "9rem" }}
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
                        style={{ minWidth: "7rem" }}
                    />
                    <Column field="comment" header="COMMENT" body={(r) => r.comment || ""} style={{ minWidth: "8rem" }} filter={false} />
                    <Column header="ACTIONS" body={actionsBody} style={{ minWidth: "7rem" }} filter={false} />
                </DataTable>

                <p className="text-600 text-xs m-0 mt-3">Sample debt row for layout; connect to ledger services for live balances and schedules.</p>
            </div>

            <style jsx global>{`
                .debts-table .p-datatable-thead > tr > th {
                    background: #fde047 !important;
                    color: #1d4ed8 !important;
                    font-weight: 700 !important;
                    font-size: 0.72rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    border-color: #e7e5e4 !important;
                    padding: 0.55rem 0.5rem !important;
                }
                .debts-table .p-column-filter-row > th {
                    background: #fffbeb !important;
                }
                .debts-table .p-datatable-tbody > tr > td {
                    padding: 0.45rem 0.5rem !important;
                    font-size: 0.85rem;
                    vertical-align: middle;
                }
            `}</style>
        </div>
    );
}
