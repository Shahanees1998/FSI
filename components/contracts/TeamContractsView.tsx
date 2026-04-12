"use client";

import Link from "next/link";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useMemo, useState } from "react";

const link = "text-blue-600 font-medium no-underline hover:underline";

export type TeamContractRow = {
    id: string;
    idx: number;
    associate: string;
    carrier: string;
    contractName: string;
    submittedDate: string | null;
    contractStatus: string;
    contractCodePrimary: string | null;
    contractCodeSecondary?: string | null;
    showNotAdded: boolean;
};

const ALL_ROWS: TeamContractRow[] = [
    {
        id: "1",
        idx: 1,
        associate: "Jo Cleine Spinola",
        carrier: "AIG",
        contractName: "AIG GWIL/SWIL",
        submittedDate: "Aug 9, 2024",
        contractStatus: "Pending Associate",
        contractCodePrimary: null,
        showNotAdded: true,
    },
    {
        id: "2",
        idx: 2,
        associate: "Jo Cleine Spinola",
        carrier: "American Amicable/Occidental",
        contractName: "American Amicable/Occidental Contract",
        submittedDate: null,
        contractStatus: "Pending Associate",
        contractCodePrimary: null,
        showNotAdded: true,
    },
    {
        id: "3",
        idx: 3,
        associate: "Jo Cleine Spinola",
        carrier: "Americo",
        contractName: "Americo Contract",
        submittedDate: "Aug 9, 2024",
        contractStatus: "Approved",
        contractCodePrimary: "IN USAZJM",
        showNotAdded: true,
    },
    {
        id: "4",
        idx: 4,
        associate: "Jo Cleine Spinola",
        carrier: "Ameritas",
        contractName: "Ameritas Contract",
        submittedDate: "Aug 16, 2024",
        contractStatus: "Not accepted: Please see notes",
        contractCodePrimary: null,
        showNotAdded: true,
    },
    {
        id: "5",
        idx: 5,
        associate: "Jo Cleine Spinola",
        carrier: "Fidelity & Guaranty",
        contractName: "Fidelity & Guaranty Contract",
        submittedDate: "Aug 8, 2024",
        contractStatus: "Approved",
        contractCodePrimary: "IN 000646840",
        showNotAdded: true,
    },
    {
        id: "6",
        idx: 6,
        associate: "Jo Cleine Spinola",
        carrier: "Mutual of Omaha",
        contractName: "Mutual of Omaha",
        submittedDate: "Aug 9, 2024",
        contractStatus: "Not accepted: Please see notes",
        contractCodePrimary: null,
        showNotAdded: true,
    },
    {
        id: "7",
        idx: 7,
        associate: "Jo Cleine Spinola",
        carrier: "National Life Group",
        contractName: "National Life Group Contract",
        submittedDate: null,
        contractStatus: "Approved",
        contractCodePrimary: "IN 403A0-01",
        contractCodeSecondary: "AN 5500336607-01",
        showNotAdded: false,
    },
];

const CARRIER_OPTIONS = [
    { label: "All", value: null },
    ...Array.from(new Set(ALL_ROWS.map((r) => r.carrier))).map((c) => ({ label: c, value: c })),
];

const STATUS_OPTIONS = [
    { label: "All", value: null },
    ...Array.from(new Set(ALL_ROWS.map((r) => r.contractStatus))).map((s) => ({ label: s, value: s })),
];

function emptyFilters(): DataTableFilterMeta {
    return {
        associate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        carrier: { value: null, matchMode: FilterMatchMode.EQUALS },
        contractName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        submittedDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        contractStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

function contractCodeBody(row: TeamContractRow) {
    return (
        <div className="text-sm line-height-3">
            {row.contractCodePrimary ? <div className="text-900">{row.contractCodePrimary}</div> : null}
            {row.contractCodeSecondary ? <div className="text-900">{row.contractCodeSecondary}</div> : null}
            {row.showNotAdded ? <div className="text-600">Not added</div> : null}
            {!row.contractCodePrimary && !row.contractCodeSecondary && !row.showNotAdded ? <span className="text-500">—</span> : null}
        </div>
    );
}

function submittedDateBody(row: TeamContractRow) {
    return row.submittedDate ? row.submittedDate : "—";
}

function statusBody(row: TeamContractRow) {
    if (row.contractStatus === "Approved") {
        return <span className="text-green-700 font-semibold">{row.contractStatus}</span>;
    }
    if (row.contractStatus.startsWith("Not accepted")) {
        return <span className="text-orange-700 font-medium">{row.contractStatus}</span>;
    }
    return <span className="text-700">{row.contractStatus}</span>;
}

export default function TeamContractsView() {
    const [showDeletedTerminated, setShowDeletedTerminated] = useState(false);
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());

    const filtered = useMemo(() => {
        return ALL_ROWS.filter((row) => {
            const a = filters.associate as { value: string | null };
            const c = filters.carrier as { value: string | null };
            const n = filters.contractName as { value: string | null };
            const d = filters.submittedDate as { value: string | null };
            const s = filters.contractStatus as { value: string | null };

            if (a?.value && !row.associate.toLowerCase().includes(String(a.value).toLowerCase())) return false;
            if (c?.value && row.carrier !== c.value) return false;
            if (n?.value && !row.contractName.toLowerCase().includes(String(n.value).toLowerCase())) return false;
            if (d?.value) {
                const needle = String(d.value).toLowerCase();
                const hay = (row.submittedDate || "—").toLowerCase();
                if (!hay.includes(needle)) return false;
            }
            if (s?.value && row.contractStatus !== s.value) return false;
            return true;
        });
    }, [filters]);

    const clear = () => setFilters(emptyFilters());
    const total = ALL_ROWS.length;
    const rangeEnd = filtered.length;
    const rangeStart = rangeEnd === 0 ? 0 : 1;

    const associateBanner = filtered.length > 0 ? filtered[0].associate : null;
    const countSummary =
        filtered.length === 0 ? `Showing 0 of ${total} items.` : `Showing ${rangeStart}–${rangeEnd} of ${total} items.`;

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden team-contracts-view">
            <div className="p-3 md:p-4 lg:p-5">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">Team Contracts</h1>

                <div className="flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                    <div className="flex align-items-center gap-2">
                        <Checkbox
                            inputId="team-contracts-deleted"
                            checked={showDeletedTerminated}
                            onChange={(e) => setShowDeletedTerminated(Boolean(e.checked))}
                        />
                        <label htmlFor="team-contracts-deleted" className="text-800 text-sm cursor-pointer">
                            Activate Deleted/Terminated Users
                        </label>
                    </div>
                    <div className="flex flex-wrap align-items-center gap-3">
                        <span className="text-700 text-sm font-semibold whitespace-nowrap">{countSummary}</span>
                        <div className="flex gap-2">
                            <Button label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm font-bold" onClick={clear} />
                            <Button label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
                        </div>
                    </div>
                </div>

                {associateBanner ? (
                    <div
                        className="surface-200 text-900 font-bold text-sm md:text-base px-3 py-2 border-1 border-bottom-none surface-border"
                        style={{ borderRadius: "6px 6px 0 0" }}
                    >
                        {associateBanner}
                    </div>
                ) : null}

                <DataTable
                    value={filtered}
                    dataKey="id"
                    filters={filters}
                    onFilter={(e) => setFilters(e.filters)}
                    filterDisplay="row"
                    className={`p-datatable-sm team-contracts-datatable ${associateBanner ? "team-contracts-datatable--joined" : ""}`}
                    stripedRows
                    scrollable
                    scrollHeight="min(65vh, 560px)"
                >
                    <Column header="#" field="idx" style={{ width: "3rem" }} filter={false} />
                    <Column field="associate" header="ASSOCIATE" filter filterPlaceholder="Filter" showFilterMenu={false} />
                    <Column
                        field="carrier"
                        header="CARRIER"
                        showFilterMenu={false}
                        filter
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={CARRIER_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                                showClear
                            />
                        )}
                    />
                    <Column field="contractName" header="CONTRACT NAME" filter filterPlaceholder="Filter" showFilterMenu={false} />
                    <Column
                        field="submittedDate"
                        header="SUBMITTED DATE"
                        body={submittedDateBody}
                        filter
                        filterPlaceholder="Filter"
                        showFilterMenu={false}
                    />
                    <Column
                        field="contractStatus"
                        header="CONTRACT STATUS"
                        body={statusBody}
                        showFilterMenu={false}
                        filter
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
                    />
                    <Column header="CONTRACT CODE" body={contractCodeBody} filter={false} style={{ minWidth: "10rem" }} />
                </DataTable>

                {showDeletedTerminated ? (
                    <p className="text-600 text-xs mt-2 mb-0">
                        Deleted/terminated users are not loaded in this preview; connect to the back office to apply this filter.
                    </p>
                ) : null}

                <p className="text-600 text-xs line-height-3 mt-3 mb-2">
                    Sample team rows for layout. Row count and filters will reflect live data when the integration is ready.
                </p>
                <p className="text-700 m-0 text-sm">
                    <Link href="/agent/contracts" className={link}>
                        Contracts hub
                    </Link>
                    {" · "}
                    <Link href="/agent/contracts/my-contracts" className={link}>
                        My contracts
                    </Link>
                    {" · "}
                    <Link href="/agent/learn/departments/contracting" className={link}>
                        Contracting training
                    </Link>
                </p>
            </div>

            <style jsx global>{`
                .team-contracts-datatable .p-datatable-thead > tr > th {
                    background: #fde047 !important;
                    color: #1c1917 !important;
                    font-weight: 700 !important;
                    border-color: #e7e5e4 !important;
                    padding: 0.55rem 0.65rem !important;
                    font-size: 0.72rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }
                .team-contracts-datatable .p-datatable-tbody > tr > td {
                    padding: 0.5rem 0.65rem !important;
                    vertical-align: top;
                    font-size: 0.875rem;
                }
                .team-contracts-datatable .p-column-filter-row > th {
                    background: #fffbeb !important;
                    border-color: #e7e5e4 !important;
                }
                .team-contracts-datatable--joined .p-datatable-wrapper,
                .team-contracts-datatable--joined .p-datatable-scrollable-wrapper {
                    border-radius: 0 0 6px 6px;
                }
                .team-contracts-datatable--joined table {
                    border-top: none;
                }
            `}</style>
        </div>
    );
}
