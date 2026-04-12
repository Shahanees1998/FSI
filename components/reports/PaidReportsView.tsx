"use client";

import Link from "next/link";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import { useMemo, useState } from "react";

export type PaidReportRow = {
    id: string;
    rank: number;
    displayName: string;
    line2: string;
    line3: string;
    bracketCode: string;
    /** Raw insurance cell text; may contain " / " for split coloring */
    insurance: string | null;
    trail: string | null;
    annuities: string | null;
    renewals: string | null;
    unlicensed: string | null;
    commissions: string | null;
    rollups: string | null;
    escrow: string | null;
    totalForPayment: string | null;
    status: string;
    userStatus: string;
    type: string;
    notes: string;
    paidDate: string;
};

const USER_STATUS_OPTIONS = [
    { label: "All", value: null },
    { label: "Active", value: "Active" },
    { label: "Terminated", value: "Terminated" },
];

const TYPE_OPTIONS = [
    { label: "All", value: null },
    { label: "General", value: "General" },
];

const NOTES_POOL = [
    "Work hard in silence, let your success be your noise. — Frank Ocean",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. — Churchill",
    "Discipline is choosing between what you want now and what you want most. — Abraham Lincoln",
    "The way to get started is to quit talking and begin doing. — Walt Disney",
    "Quality means doing it right when no one is looking. — Henry Ford",
];

function formatSignedAmounts(text: string | null) {
    if (!text?.trim()) return <span className="text-500">—</span>;
    const parts = text.split(" / ").map((p) => p.trim());
    return (
        <span className="line-height-3">
            {parts.map((part, i) => {
                const isNeg = part.startsWith("-");
                const isPos = part.startsWith("+");
                const cls = isNeg ? "text-red-600 font-semibold" : isPos ? "text-green-700 font-semibold" : "text-900";
                return (
                    <span key={i}>
                        {i > 0 ? <span className="text-600"> / </span> : null}
                        <span className={cls}>{part}</span>
                    </span>
                );
            })}
        </span>
    );
}

function moneyClassSingle(s: string | null) {
    if (!s) return "text-500";
    const t = s.trim();
    if (t.startsWith("-") || t.startsWith("$-")) return "text-red-600 font-semibold";
    if (t.startsWith("+")) return "text-green-700 font-semibold";
    return "text-900 font-medium";
}

function buildRows(): PaidReportRow[] {
    const rows: PaidReportRow[] = [
        {
            id: "1",
            rank: 1,
            displayName: "Jo Cleine Spinola",
            line2: "Jo Cleine Spinola",
            line3: "JC investment Group LLC",
            bracketCode: "JO SPI-A13713",
            insurance: "+$4,799.99 / -$2,992.89",
            trail: null,
            annuities: null,
            renewals: "-$84.61",
            unlicensed: null,
            commissions: null,
            rollups: null,
            escrow: "$17.22",
            totalForPayment: "$1,705.27",
            status: "Paid",
            userStatus: "Active",
            type: "General",
            notes: NOTES_POOL[0],
            paidDate: "2026-04-09 16:07:10",
        },
        {
            id: "2",
            rank: 2,
            displayName: "Jo Cleine Spinola",
            line2: "Jo Cleine Spinola",
            line3: "JC investment Group LLC",
            bracketCode: "JO SPI-A13713",
            insurance: "+$1,200.00 / -$400.00",
            trail: "+$50.00",
            annuities: null,
            renewals: null,
            unlicensed: null,
            commissions: "+$320.00",
            rollups: null,
            escrow: "$10.00",
            totalForPayment: "$1,180.00",
            status: "Paid",
            userStatus: "Active",
            type: "General",
            notes: NOTES_POOL[1],
            paidDate: "2026-04-08 14:22:01",
        },
        {
            id: "3",
            rank: 3,
            displayName: "Jo Cleine Spinola",
            line2: "Jo Cleine Spinola",
            line3: "JC investment Group LLC",
            bracketCode: "JO SPI-A13713",
            insurance: "+$900.00",
            trail: null,
            annuities: "-$120.00",
            renewals: null,
            unlicensed: null,
            commissions: "+$210.00",
            rollups: null,
            escrow: null,
            totalForPayment: "$990.00",
            status: "Paid",
            userStatus: "Active",
            type: "General",
            notes: NOTES_POOL[2],
            paidDate: "2026-04-07 09:15:44",
        },
        {
            id: "4",
            rank: 4,
            displayName: "Jo Cleine Spinola",
            line2: "Jo Cleine Spinola",
            line3: "JC investment Group LLC",
            bracketCode: "JO SPI-A13713",
            insurance: "+$2,100.00 / -$1,000.00",
            trail: null,
            annuities: null,
            renewals: "-$25.00",
            unlicensed: null,
            commissions: "+$150.00",
            rollups: null,
            escrow: "$5.00",
            totalForPayment: "$1,230.00",
            status: "Paid",
            userStatus: "Active",
            type: "General",
            notes: NOTES_POOL[3],
            paidDate: "2026-04-06 11:03:22",
        },
    ];

    for (let i = 5; i <= 26; i++) {
        const base = 800 + (i % 7) * 120;
        const neg = 200 + (i % 5) * 40;
        rows.push({
            id: String(i),
            rank: i,
            displayName: "Jo Cleine Spinola",
            line2: "Jo Cleine Spinola",
            line3: "JC investment Group LLC",
            bracketCode: "JO SPI-A13713",
            insurance: `+$${base.toFixed(2)} / -$${neg.toFixed(2)}`,
            trail: i % 3 === 0 ? "+$25.00" : null,
            annuities: i % 4 === 0 ? "-$50.00" : null,
            renewals: i % 2 === 0 ? "-$10.00" : null,
            unlicensed: null,
            commissions: i % 5 === 0 ? "+$100.00" : null,
            rollups: null,
            escrow: i % 6 === 0 ? "$2.00" : null,
            totalForPayment: `$${(base - neg + (i % 11)).toFixed(2)}`,
            status: "Paid",
            userStatus: "Active",
            type: "General",
            notes: NOTES_POOL[i % NOTES_POOL.length],
            paidDate: `2026-04-${String((i % 28) + 1).padStart(2, "0")} 10:00:00`,
        });
    }

    return rows;
}

const ALL_ROWS = buildRows();

function emptyFilters(): DataTableFilterMeta {
    return {
        displayName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        userStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        paidDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
}

export default function PaidReportsView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [first, setFirst] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const filtered = useMemo(() => {
        return ALL_ROWS.filter((row) => {
            const n = filters.displayName as { value: string | null };
            const u = filters.userStatus as { value: string | null };
            const t = filters.type as { value: string | null };
            const p = filters.paidDate as { value: string | null };
            const blob = `${row.displayName} ${row.line2} ${row.line3} ${row.bracketCode}`.toLowerCase();
            if (n?.value && !blob.includes(String(n.value).toLowerCase())) return false;
            if (u?.value && row.userStatus !== u.value) return false;
            if (t?.value && row.type !== t.value) return false;
            if (p?.value && !row.paidDate.toLowerCase().includes(String(p.value).toLowerCase())) return false;
            return true;
        });
    }, [filters]);

    const pageRows = useMemo(() => filtered.slice(first, first + pageSize), [filtered, first, pageSize]);

    const clear = () => {
        setFilters(emptyFilters());
        setFirst(0);
    };

    const total = filtered.length;
    const start = total === 0 ? 0 : first + 1;
    const end = Math.min(first + pageSize, total);
    const summary = total === 0 ? "Showing 0 of 0 items." : `Showing ${start}–${end} of ${total} items.`;

    const nameBody = (row: PaidReportRow) => (
        <div>
            <button type="button" className="p-0 border-none bg-transparent cursor-pointer text-left text-primary font-semibold underline">
                {row.displayName}
            </button>
            <div className="text-700 text-sm">{row.line2}</div>
            <div className="text-600 text-xs">{row.line3}</div>
            <div className="text-600 text-xs">[{row.bracketCode}]</div>
        </div>
    );

    const moneyOrDash = (v: string | null) => (v ? <span className={moneyClassSingle(v)}>{v}</span> : <span className="text-500">—</span>);

    const actionsBody = () => (
        <div className="flex flex-wrap gap-2">
            <Button type="button" label="View" icon="pi pi-file" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
            <Button type="button" label="Download" icon="pi pi-download" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
        </div>
    );

    const indexBody = (_: PaidReportRow, options: { rowIndex: number }) => <span>{first + options.rowIndex + 1}</span>;

    return (
        <div className="paid-reports-view surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-3 md:p-4">
                <div className="flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-900 m-0">Reports</h1>
                    <Link
                        href="/agent/reports/pending"
                        className="p-button p-component p-button-warning font-bold no-underline inline-flex align-items-center justify-content-center px-3 py-2 border-round"
                    >
                        <span className="p-button-label">VIEW PENDING REPORTS</span>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                    <span className="text-700 text-sm font-semibold">{summary}</span>
                    <div className="flex gap-2">
                        <Button type="button" label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm font-bold" onClick={clear} />
                        <Button type="button" label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
                    </div>
                </div>

                <DataTable
                    value={pageRows}
                    dataKey="id"
                    filters={filters}
                    onFilter={(e) => {
                        setFilters(e.filters);
                        setFirst(0);
                    }}
                    filterDisplay="row"
                    scrollable
                    scrollHeight="55vh"
                    className="p-datatable-sm paid-reports-table mb-3"
                    stripedRows
                    emptyMessage="No paid reports match your filters."
                >
                    <Column header="#" body={indexBody} style={{ width: "3rem" }} filter={false} />
                    <Column
                        field="displayName"
                        header="NAME"
                        body={nameBody}
                        filter
                        filterPlaceholder="Search name"
                        showFilterMenu={false}
                        style={{ minWidth: "13rem" }}
                    />
                    <Column
                        field="insurance"
                        header="INSURANCE"
                        body={(r: PaidReportRow) => formatSignedAmounts(r.insurance)}
                        style={{ minWidth: "10rem" }}
                        filter={false}
                    />
                    <Column field="trail" header="TRAIL" body={(r) => moneyOrDash(r.trail)} style={{ minWidth: "6rem" }} filter={false} />
                    <Column field="annuities" header="ANNUITIES" body={(r) => moneyOrDash(r.annuities)} style={{ minWidth: "6rem" }} filter={false} />
                    <Column field="renewals" header="RENEWALS" body={(r) => moneyOrDash(r.renewals)} style={{ minWidth: "6rem" }} filter={false} />
                    <Column field="unlicensed" header="UNLICENSED" body={(r) => moneyOrDash(r.unlicensed)} style={{ minWidth: "7rem" }} filter={false} />
                    <Column
                        field="commissions"
                        header="COMMISSIONS"
                        body={(r) => moneyOrDash(r.commissions)}
                        style={{ minWidth: "7rem" }}
                        filter={false}
                    />
                    <Column field="rollups" header="ROLLUPS" body={(r) => moneyOrDash(r.rollups)} style={{ minWidth: "6rem" }} filter={false} />
                    <Column
                        field="escrow"
                        header="ESCROW"
                        headerStyle={{ color: "#1d4ed8" }}
                        body={(r) => moneyOrDash(r.escrow)}
                        style={{ minWidth: "6rem" }}
                        filter={false}
                    />
                    <Column
                        field="totalForPayment"
                        header="TOTAL FOR PAYMENT"
                        body={(r) => moneyOrDash(r.totalForPayment)}
                        style={{ minWidth: "8rem" }}
                        filter={false}
                    />
                    <Column field="status" header="STATUS" style={{ minWidth: "5rem" }} filter={false} />
                    <Column
                        field="userStatus"
                        header="USER STATUS"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={USER_STATUS_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                        style={{ minWidth: "7rem" }}
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
                        style={{ minWidth: "6rem" }}
                    />
                    <Column field="notes" header="NOTES" body={(r) => <span className="text-700 text-sm line-height-3">{r.notes}</span>} style={{ minWidth: "14rem" }} filter={false} />
                    <Column
                        field="paidDate"
                        header="PAID DATE"
                        filter
                        filterPlaceholder="Filter"
                        showFilterMenu={false}
                        style={{ minWidth: "10rem" }}
                    />
                    <Column header="" body={actionsBody} style={{ minWidth: "10rem" }} filter={false} />
                </DataTable>

                <div className="flex flex-wrap justify-content-between align-items-center gap-3 border-top-1 surface-border pt-3">
                    <span className="text-600 text-sm">{summary}</span>
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
                        rowsPerPageOptions={[10, 25, 50]}
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    />
                </div>

                <p className="text-600 text-xs m-0 mt-3">Sample paid runs for layout; wire to commission payouts when APIs are available.</p>
            </div>

            <style jsx global>{`
                .paid-reports-table .p-datatable-thead > tr > th {
                    background: #fde047 !important;
                    color: #1c1917 !important;
                    font-weight: 700 !important;
                    font-size: 0.72rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    border-color: #e7e5e4 !important;
                    padding: 0.55rem 0.5rem !important;
                }
                .paid-reports-table .p-column-filter-row > th {
                    background: #fffbeb !important;
                }
                .paid-reports-table .p-datatable-tbody > tr > td {
                    padding: 0.45rem 0.5rem !important;
                    font-size: 0.85rem;
                    vertical-align: top;
                }
            `}</style>
        </div>
    );
}
