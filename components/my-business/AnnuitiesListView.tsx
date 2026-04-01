"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const LIST_TABS = ["INSURANCE", "ANNUITIES", "TRAIL", "RENEWALS", "GROUP", "HEALTH & DENTAL", "UNLICENSED", "ADDITIONAL COMMISSIONS"];
const ANY_OPTIONS = [{ label: "Any", value: null }];

type AnnuityRow = {
    id: number;
    clientName: string;
    clientPolicy: string;
    associate: string;
    shareAssociate: string;
    createdAt: string;
    paidDate: string;
    company: string;
    premium: string;
    relatedDscDeal: string;
    hasSubDeal: string;
    paid: string;
};

function emptyFilters(): DataTableFilterMeta {
    return {
        clientName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        clientPolicy: { value: null, matchMode: FilterMatchMode.CONTAINS },
        associate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        shareAssociate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
        paidDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        premium: { value: null, matchMode: FilterMatchMode.CONTAINS },
        relatedDscDeal: { value: null, matchMode: FilterMatchMode.EQUALS },
        hasSubDeal: { value: null, matchMode: FilterMatchMode.EQUALS },
        paid: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

export default function AnnuitiesListView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [activeTab, setActiveTab] = useState("ANNUITIES");
    const rows: AnnuityRow[] = [];

    const clear = () => setFilters(emptyFilters());

    return (
        <div className="annuities-list-view">
            <div className="flex justify-content-between align-items-center mb-2">
                <h1 className="text-2xl font-bold text-900 m-0">Annuities List</h1>
                <Button label="EXPORT ANNUITIES" className="p-button-warning p-button-sm" />
            </div>
            <p className="m-0 mb-3 text-sm text-800">
                <span className="text-red-700 font-bold mr-1">■</span>
                The Agent&apos;s Name is highlighted with red as the Agent is not currently licensed.
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
                {LIST_TABS.map((tab) => (
                    <Button
                        key={tab}
                        label={tab}
                        type="button"
                        className={`p-button-sm ${activeTab === tab ? "p-button-warning" : "p-button-outlined p-button-warning"}`}
                        onClick={() => setActiveTab(tab)}
                    />
                ))}
            </div>

            <div className="flex justify-content-end align-items-center mb-2">
                <div className="flex gap-2">
                    <Button label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm" onClick={clear} />
                    <Button label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm" />
                </div>
            </div>

            <DataTable
                value={rows}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                filterDisplay="row"
                className="p-datatable-sm annuities-list-table"
                emptyMessage="No results found."
                scrollable
            >
                <Column header="#" body={(_, o) => o.rowIndex + 1} style={{ width: "3rem" }} filter={false} />
                <Column field="clientName" header="CLIENT NAME" filter filterPlaceholder="Filter" style={{ minWidth: "10rem" }} />
                <Column field="clientPolicy" header="CLIENT POLICY" filter filterPlaceholder="Filter" style={{ minWidth: "10rem" }} />
                <Column field="associate" header="ASSOCIATE" filter filterPlaceholder="Filter" style={{ minWidth: "9rem" }} />
                <Column field="shareAssociate" header="SHARE ASSOCIATE" filter filterPlaceholder="Filter" style={{ minWidth: "10rem" }} />
                <Column field="createdAt" header="CREATED AT" filter filterPlaceholder="Filter" style={{ minWidth: "8rem" }} />
                <Column field="paidDate" header="PAID DATE" filter filterPlaceholder="Filter" style={{ minWidth: "8rem" }} />
                <Column field="company" header="COMPANY" filter filterPlaceholder="Filter" style={{ minWidth: "9rem" }} />
                <Column field="premium" header="PREMIUM" filter filterPlaceholder="Filter" style={{ minWidth: "7rem" }} />
                <Column
                    field="relatedDscDeal"
                    header="HAS RELATED DSC DEAL"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="Any" className="w-full" />}
                    style={{ minWidth: "8rem" }}
                />
                <Column
                    field="hasSubDeal"
                    header="HAS SUB DEAL"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="Any" className="w-full" />}
                    style={{ minWidth: "8rem" }}
                />
                <Column
                    field="paid"
                    header="PAID"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="Any" className="w-full" />}
                    style={{ minWidth: "6rem" }}
                />
            </DataTable>

            <style jsx global>{`
                .annuities-list-table .p-datatable-thead > tr > th {
                    background: #f4c542 !important;
                    color: #334155;
                    border-color: #dfb12a !important;
                    font-size: 0.72rem;
                    font-weight: 700;
                }
                .annuities-list-table .p-datatable-filter-row > td {
                    background: #fff;
                }
            `}</style>
        </div>
    );
}

