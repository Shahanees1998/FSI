"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import Link from "next/link";
import { useMemo, useState } from "react";

const link = "text-blue-600 font-medium no-underline hover:underline";
const CONTRACTING_EMAIL = "contracting@experiorheadoffice.com";

const NOTICE_DEFAULT =
    "Important: Please submit a contracting request ONLY if you have business ready to submit to the carrier.";
const NOTICE_FIDELITY = `${NOTICE_DEFAULT} Processing time may take up to 3 weeks.`;

export type CarrierContractRow = {
    id: string;
    rowNum: number;
    rank: string;
    carrier: string;
    noticeAbove?: string;
    contractSubtext?: string;
    fpbStatus: string;
    fpbCode: string;
    contractName: string;
    contractNameIsLink?: boolean;
    contractStatus: string;
    contractCode: string;
    states: string;
};

const RANK_OPTIONS = [{ label: "All", value: null }, { label: "PLATINUM", value: "PLATINUM" }];
const FPB_STATUS_OPTIONS = [
    { label: "All", value: null },
    { label: "No FPB Needed", value: "No FPB Needed" },
    { label: "Need FPB", value: "Need FPB" },
];
const CONTRACT_STATUS_OPTIONS = [
    { label: "All", value: null },
    { label: "Not Loaded", value: "Not Loaded" },
    { label: "Approved", value: "Approved" },
];

const BASE_ROWS: Omit<CarrierContractRow, "id" | "rowNum">[] = [
    {
        rank: "PLATINUM",
        carrier: "Aflac",
        noticeAbove: NOTICE_DEFAULT,
        fpbStatus: "No FPB Needed",
        fpbCode: "",
        contractName: "Aflac",
        contractStatus: "Not Loaded",
        contractCode: "",
        states: "",
    },
    {
        rank: "PLATINUM",
        carrier: "Aflac Group Health",
        noticeAbove: NOTICE_DEFAULT,
        contractSubtext: "The contract requires an active license from at least one of the following states: TX",
        fpbStatus: "Need FPB",
        fpbCode: "",
        contractName: "Aflac Group Health",
        contractStatus: "Not Loaded",
        contractCode: "",
        states: "",
    },
    {
        rank: "PLATINUM",
        carrier: "American National",
        noticeAbove: NOTICE_DEFAULT,
        fpbStatus: "No FPB Needed",
        fpbCode: "",
        contractName: "American National",
        contractStatus: "Not Loaded",
        contractCode: "",
        states: "",
    },
    {
        rank: "PLATINUM",
        carrier: "Ameritas",
        noticeAbove: NOTICE_DEFAULT,
        fpbStatus: "No FPB Needed",
        fpbCode: "",
        contractName: "Ameritas",
        contractStatus: "Not Loaded",
        contractCode: "",
        states: "",
    },
    {
        rank: "PLATINUM",
        carrier: "Assurity",
        noticeAbove: NOTICE_DEFAULT,
        fpbStatus: "Need FPB",
        fpbCode: "",
        contractName: "Assurity",
        contractStatus: "Not Loaded",
        contractCode: "",
        states: "",
    },
    {
        rank: "PLATINUM",
        carrier: "Corebridge",
        noticeAbove: NOTICE_DEFAULT,
        fpbStatus: "No FPB Needed",
        fpbCode: "",
        contractName: "Corebridge",
        contractStatus: "Not Loaded",
        contractCode: "",
        states: "",
    },
    {
        rank: "PLATINUM",
        carrier: "Equitable",
        noticeAbove: NOTICE_DEFAULT,
        fpbStatus: "No FPB Needed",
        fpbCode: "",
        contractName: "Equitable",
        contractStatus: "Not Loaded",
        contractCode: "",
        states: "",
    },
    {
        rank: "PLATINUM",
        carrier: "Fidelity & Guaranty",
        noticeAbove: NOTICE_FIDELITY,
        fpbStatus: "No FPB Needed",
        fpbCode: "",
        contractName: "Fidelity & Guaranty Contract",
        contractNameIsLink: true,
        contractStatus: "Approved",
        contractCode: "IN 000646840",
        states: "MA",
    },
];

function buildRows(): CarrierContractRow[] {
    const total = 64;
    return Array.from({ length: total }, (_, i) => {
        const base = BASE_ROWS[i % BASE_ROWS.length];
        const cycle = Math.floor(i / BASE_ROWS.length);
        const suffix = cycle > 0 ? ` (${cycle + 1})` : "";
        return {
            id: `carrier-${i}`,
            rowNum: i + 1,
            ...base,
            carrier: `${base.carrier}${suffix}`,
            contractName: `${base.contractName}${suffix}`,
            noticeAbove: i % BASE_ROWS.length === 0 ? base.noticeAbove : undefined,
            contractSubtext: base.contractSubtext,
            contractNameIsLink: base.contractNameIsLink && cycle === 0,
        };
    });
}

function emptyFilters(): DataTableFilterMeta {
    return {
        rank: { value: null, matchMode: FilterMatchMode.EQUALS },
        carrier: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fpbStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        contractName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        contractStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        contractCode: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
}

export default function MyContractsCarrierTable() {
    const [allRows] = useState<CarrierContractRow[]>(() => buildRows());
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());

    const filtered = useMemo(() => {
        return allRows.filter((row) => {
            const rankF = filters.rank as { value: string | null };
            const carrierF = filters.carrier as { value: string | null };
            const fpbF = filters.fpbStatus as { value: string | null };
            const nameF = filters.contractName as { value: string | null };
            const statusF = filters.contractStatus as { value: string | null };
            const codeF = filters.contractCode as { value: string | null };

            if (rankF?.value && row.rank !== rankF.value) return false;
            if (carrierF?.value && !row.carrier.toLowerCase().includes(String(carrierF.value).toLowerCase())) return false;
            if (fpbF?.value && row.fpbStatus !== fpbF.value) return false;
            if (nameF?.value && !row.contractName.toLowerCase().includes(String(nameF.value).toLowerCase())) return false;
            if (statusF?.value && row.contractStatus !== statusF.value) return false;
            if (codeF?.value && !row.contractCode.toLowerCase().includes(String(codeF.value).toLowerCase())) return false;
            return true;
        });
    }, [allRows, filters]);

    const clear = () => setFilters(emptyFilters());

    const carrierBody = (row: CarrierContractRow) => (
        <div>
            {row.noticeAbove ? <div className="text-red-600 text-xs line-height-3 mb-2">{row.noticeAbove}</div> : null}
            <div className="font-semibold text-900">{row.carrier}</div>
            {row.contractSubtext ? <div className="text-600 text-xs mt-1 line-height-3">{row.contractSubtext}</div> : null}
        </div>
    );

    const contractNameBody = (row: CarrierContractRow) =>
        row.contractNameIsLink ? (
            <button
                type="button"
                className="p-0 border-none bg-transparent cursor-pointer text-left text-primary font-medium underline"
                onClick={() => {}}
            >
                {row.contractName}
            </button>
        ) : (
            <span>{row.contractName}</span>
        );

    const statesBody = (row: CarrierContractRow) => {
        if (!row.states?.trim()) return <span className="text-500">—</span>;
        return (
            <div className="flex flex-wrap gap-1">
                {row.states.split(",").map((s) => (
                    <Tag key={s.trim()} value={s.trim()} severity="success" className="text-xs" />
                ))}
            </div>
        );
    };

    const statusBody = (row: CarrierContractRow) => {
        if (row.contractStatus === "Approved") {
            return <span className="text-green-700 font-semibold">{row.contractStatus}</span>;
        }
        return <span className="text-700 font-medium">{row.contractStatus}</span>;
    };

    return (
        <div className="my-contracts-carrier-table">
            <div className="flex flex-wrap align-items-center gap-2 mb-2">
                <span className="inline-block w-1rem h-1rem border-round-sm flex-shrink-0" style={{ background: "#f97316" }} aria-hidden />
                <span className="text-800 font-semibold text-sm">FPB (First Piece of Business)</span>
            </div>
            <div className="flex flex-wrap align-items-center gap-2 mb-2">
                <p className="text-green-700 text-sm font-medium m-0 line-height-3">
                    Please check the Information button to see the states in which an FPB is needed.
                </p>
                <Button
                    type="button"
                    icon="pi pi-info-circle"
                    className="p-button-text p-button-sm"
                    aria-label="Information"
                    onClick={() => {}}
                />
            </div>
            <p className="text-red-600 text-sm font-semibold m-0 mb-3 line-height-3">
                All functionality on this page is restricted to view-only access. To enable full functionality, please upload
                pre-contracting documents.
            </p>

            <div className="flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                <span className="text-700 text-sm font-semibold">Total {filtered.length} items.</span>
                <div className="flex gap-2">
                    <Button label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm font-bold" onClick={clear} />
                    <Button label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
                </div>
            </div>

            <DataTable
                value={filtered}
                dataKey="id"
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                filterDisplay="row"
                className="p-datatable-sm my-contracts-datatable"
                stripedRows
                scrollable
                scrollHeight="min(70vh, 720px)"
            >
                <Column header="#" body={(row: CarrierContractRow) => row.rowNum} style={{ width: "3rem" }} filter={false} />
                <Column
                    field="rank"
                    header="RANK"
                    showFilterMenu={false}
                    filter
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={RANK_OPTIONS}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                    style={{ minWidth: "7rem" }}
                />
                <Column
                    field="carrier"
                    header="CARRIER"
                    body={carrierBody}
                    filter
                    filterPlaceholder="Search"
                    showFilterMenu={false}
                    style={{ minWidth: "14rem" }}
                />
                <Column
                    field="fpbStatus"
                    header="FPB STATUS"
                    showFilterMenu={false}
                    filter
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={FPB_STATUS_OPTIONS}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                    style={{ minWidth: "8rem" }}
                />
                <Column field="fpbCode" header="FPB CODE" body={(r) => r.fpbCode || "—"} style={{ minWidth: "6rem" }} />
                <Column
                    field="contractName"
                    header="CONTRACT NAME"
                    body={contractNameBody}
                    filter
                    filterPlaceholder="Search"
                    showFilterMenu={false}
                    style={{ minWidth: "11rem" }}
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
                            options={CONTRACT_STATUS_OPTIONS}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                    style={{ minWidth: "8rem" }}
                />
                <Column
                    field="contractCode"
                    header="CONTRACT CODE"
                    filter
                    filterPlaceholder="Search"
                    showFilterMenu={false}
                    body={(r) => r.contractCode || "—"}
                    style={{ minWidth: "8rem" }}
                />
                <Column field="states" header="STATES" body={statesBody} filter={false} style={{ minWidth: "6rem" }} />
            </DataTable>

            <p className="text-600 text-xs line-height-3 mt-3 mb-2">
                Sample carrier rows for layout (64 rows generated from templates). Connect filters and actions to the back office when
                APIs are ready.
            </p>
            <p className="text-700 m-0 text-sm">
                <Link href="/agent/contracts/pre-contracting-documents" className={link}>
                    Pre-contracting documents
                </Link>
                {" · "}
                <Link href="/agent/learn/about-experior/getting-started/getting-appointed" className={link}>
                    Getting appointed
                </Link>
                {" · "}
                <Link href="/agent/learn/about-experior/getting-started/contracting-faq" className={link}>
                    Contracting FAQ
                </Link>
                {" · "}
                <a href={`mailto:${CONTRACTING_EMAIL}`} className={link}>
                    {CONTRACTING_EMAIL}
                </a>
            </p>

            <style jsx global>{`
                .my-contracts-datatable .p-datatable-thead > tr > th {
                    background: #fb923c !important;
                    color: #1c1917 !important;
                    font-weight: 700 !important;
                    border-color: #e7e5e4 !important;
                    padding: 0.55rem 0.65rem !important;
                    font-size: 0.72rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }
                .my-contracts-datatable .p-datatable-tbody > tr > td {
                    padding: 0.5rem 0.65rem !important;
                    vertical-align: top;
                    font-size: 0.85rem;
                }
                .my-contracts-datatable .p-column-filter-row > th {
                    background: #fff7ed !important;
                    border-color: #e7e5e4 !important;
                }
            `}</style>
        </div>
    );
}
