"use client";

import Link from "next/link";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { useMemo, useState } from "react";

export type PendingReportRow = {
    id: string;
    displayName: string;
    secondaryLine: string;
    bracketCode: string;
    insurance: string | null;
    insuranceInfo?: boolean;
    trail: string | null;
    annuities: string | null;
    renewals: string | null;
    unlicensed: string | null;
    commissions: string | null;
    rollups: string | null;
    escrow: string | null;
    totalGrossNet: string | null;
    status: string;
    userStatus: string;
    type: string;
    profileRisk: boolean;
    notPaidReason?: string;
};

const STATUS_OPTIONS = [
    { label: "All", value: null },
    { label: "Subscription Debt", value: "Subscription Debt" },
    { label: "In Chargeback", value: "In Chargeback" },
];

const USER_STATUS_OPTIONS = [
    { label: "All", value: null },
    { label: "Active", value: "Active" },
    { label: "Terminated", value: "Terminated" },
];

const TYPE_OPTIONS = [
    { label: "All", value: null },
    { label: "General", value: "General" },
];

const SEED_ROWS: PendingReportRow[] = [
    {
        id: "1",
        displayName: "Carlos Gomez",
        secondaryLine: "Carlos Gomez",
        bracketCode: "CARGOM-A18250",
        insurance: null,
        trail: null,
        annuities: null,
        renewals: null,
        unlicensed: null,
        commissions: "-$210.00",
        rollups: null,
        escrow: null,
        totalGrossNet: "-$210.00",
        status: "Subscription Debt",
        userStatus: "Active",
        type: "General",
        profileRisk: true,
        notPaidReason: "Not paid due to",
    },
    {
        id: "2",
        displayName: "Jo Cleine Spinola",
        secondaryLine: "Jo Cleine Spinola",
        bracketCode: "JO SPI-A13713",
        insurance: "-$3,177.89",
        insuranceInfo: true,
        trail: null,
        annuities: null,
        renewals: null,
        unlicensed: null,
        commissions: null,
        rollups: null,
        escrow: null,
        totalGrossNet: "-$3,177.89",
        status: "In Chargeback",
        userStatus: "Active",
        type: "General",
        profileRisk: true,
    },
    {
        id: "3",
        displayName: "Liliane Teixeira Da Costa",
        secondaryLine: "Liliane Teixeira Da Costa",
        bracketCode: "LILTEI-A22407",
        insurance: "$3.31",
        insuranceInfo: true,
        trail: null,
        annuities: null,
        renewals: null,
        unlicensed: null,
        commissions: "-$143.43",
        rollups: null,
        escrow: null,
        totalGrossNet: "-$140.12",
        status: "In Chargeback",
        userStatus: "Terminated",
        type: "General",
        profileRisk: true,
        notPaidReason: "Not paid due to",
    },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        displayName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        userStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

function moneyClass(s: string | null) {
    if (!s) return "text-500";
    const t = s.trim();
    if (t.startsWith("-") || t.startsWith("$-")) return "text-red-600 font-semibold";
    if (t.startsWith("$") && !t.slice(1).includes("-")) return "text-green-700 font-semibold";
    return "text-900";
}

export default function PendingReportsView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());

    const filtered = useMemo(() => {
        return SEED_ROWS.filter((row) => {
            const n = filters.displayName as { value: string | null };
            const s = filters.status as { value: string | null };
            const u = filters.userStatus as { value: string | null };
            const t = filters.type as { value: string | null };
            if (n?.value && !row.displayName.toLowerCase().includes(String(n.value).toLowerCase())) return false;
            if (s?.value && row.status !== s.value) return false;
            if (u?.value && row.userStatus !== u.value) return false;
            if (t?.value && row.type !== t.value) return false;
            return true;
        });
    }, [filters]);

    const clear = () => setFilters(emptyFilters());

    const nameBody = (row: PendingReportRow) => (
        <div>
            <button type="button" className="p-0 border-none bg-transparent cursor-pointer text-left text-primary font-semibold underline">
                {row.displayName}
            </button>
            <div className="text-600 text-xs">{row.secondaryLine}</div>
            <div className="text-600 text-xs">[{row.bracketCode}]</div>
        </div>
    );

    const moneyCell = (value: string | null, opts?: { info?: boolean }) => (
        <div className="flex align-items-center gap-1">
            <span className={moneyClass(value)}>{value ?? "—"}</span>
            {opts?.info ? (
                <Button type="button" icon="pi pi-info-circle" className="p-button-text p-button-sm p-0 w-2rem h-2rem" aria-label="Info" />
            ) : null}
        </div>
    );

    const actionsBody = (row: PendingReportRow) => (
        <div className="flex flex-wrap align-items-center gap-2">
            {row.notPaidReason ? (
                <Tag value={row.notPaidReason} severity="danger" className="text-xs font-semibold" />
            ) : null}
            <Button type="button" label="View" icon="pi pi-eye" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
            <Button type="button" label="Download" icon="pi pi-download" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
        </div>
    );

    const total = SEED_ROWS.length;
    const n = filtered.length;
    const summary = n === 0 ? `Showing 0 of ${total} items.` : `Showing 1–${n} of ${total} items.`;

    return (
        <div className="pending-reports-view surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-3 md:p-4">
                <div className="flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-900 m-0">Reports</h1>
                    <Link
                        href="/agent/reports/paid"
                        className="p-button p-component p-button-warning font-bold no-underline inline-flex align-items-center justify-content-center px-3 py-2 border-round"
                    >
                        <span className="p-button-label">VIEW PAID REPORTS</span>
                    </Link>
                </div>

                <div className="flex flex-wrap align-items-center gap-2 mb-2">
                    <span className="inline-block w-1rem h-1rem border-round-sm flex-shrink-0" style={{ background: "#fbcfe8" }} aria-hidden />
                    <p className="text-700 text-sm line-height-3 m-0">
                        The user is marked red if E&amp;O, License, or Banking Information has not been updated in the profile.
                    </p>
                </div>

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
                    className="p-datatable-sm pending-reports-table"
                    stripedRows
                    rowClassName={(row) => (row.profileRisk ? "pending-report-row--risk" : "")}
                    emptyMessage="No pending reports match your filters."
                >
                    <Column
                        field="displayName"
                        header="NAME"
                        body={nameBody}
                        filter
                        filterPlaceholder="Agent Name"
                        showFilterMenu={false}
                        style={{ minWidth: "12rem" }}
                    />
                    <Column
                        field="insurance"
                        header="INSURANCE"
                        body={(r: PendingReportRow) => moneyCell(r.insurance, { info: r.insuranceInfo })}
                        style={{ minWidth: "7rem" }}
                        filter={false}
                    />
                    <Column field="trail" header="TRAIL" body={(r) => r.trail ?? "—"} style={{ minWidth: "5rem" }} filter={false} />
                    <Column field="annuities" header="ANNUITIES" body={(r) => r.annuities ?? "—"} style={{ minWidth: "6rem" }} filter={false} />
                    <Column field="renewals" header="RENEWALS" body={(r) => r.renewals ?? "—"} style={{ minWidth: "6rem" }} filter={false} />
                    <Column field="unlicensed" header="UNLICENSED" body={(r) => r.unlicensed ?? "—"} style={{ minWidth: "7rem" }} filter={false} />
                    <Column
                        field="commissions"
                        header="COMMISSIONS"
                        body={(r: PendingReportRow) => <span className={moneyClass(r.commissions)}>{r.commissions ?? "—"}</span>}
                        style={{ minWidth: "7rem" }}
                        filter={false}
                    />
                    <Column field="rollups" header="ROLLUPS" body={(r) => r.rollups ?? "—"} style={{ minWidth: "6rem" }} filter={false} />
                    <Column field="escrow" header="ESCROW" body={(r) => r.escrow ?? "—"} style={{ minWidth: "6rem" }} filter={false} />
                    <Column
                        field="totalGrossNet"
                        header="TOTAL GROSS/NET"
                        headerStyle={{ color: "#1d4ed8" }}
                        body={(r: PendingReportRow) => <span className={moneyClass(r.totalGrossNet)}>{r.totalGrossNet ?? "—"}</span>}
                        style={{ minWidth: "8rem" }}
                        filter={false}
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
                    <Column header="" body={actionsBody} style={{ minWidth: "14rem" }} filter={false} />
                </DataTable>

                <p className="text-600 text-xs m-0 mt-3">
                    Sample pending rows for layout; connect to commission services for live balances and payout holds.
                </p>
            </div>

            <style jsx global>{`
                .pending-reports-table .p-datatable-thead > tr > th {
                    background: #fde047 !important;
                    color: #1c1917 !important;
                    font-weight: 700 !important;
                    font-size: 0.72rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    border-color: #e7e5e4 !important;
                    padding: 0.55rem 0.5rem !important;
                }
                .pending-reports-table .p-column-filter-row > th {
                    background: #fffbeb !important;
                }
                .pending-reports-table .p-datatable-tbody > tr > td {
                    padding: 0.45rem 0.5rem !important;
                    font-size: 0.85rem;
                    vertical-align: middle;
                }
                .pending-reports-table .pending-report-row--risk > td {
                    background: #fce7f3 !important;
                }
            `}</style>
        </div>
    );
}
