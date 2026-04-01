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
const STATE_OPTIONS = [{ label: "All", value: null }, { label: "MA", value: "MA" }, { label: "NY", value: "NY" }, { label: "CA", value: "CA" }];
const PAID_OPTIONS = [{ label: "All", value: null }, { label: "Yes", value: "Yes" }, { label: "No", value: "No" }];

type UnlicensedRow = {
    id: number;
    clientName: string;
    state: string;
    associate: string;
    createdAt: string;
    paidDate: string;
    company: string;
    paid: string;
};

function emptyFilters(): DataTableFilterMeta {
    return {
        clientName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        state: { value: null, matchMode: FilterMatchMode.EQUALS },
        associate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
        paidDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        paid: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

export default function UnlicensedListView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [activeTab, setActiveTab] = useState("UNLICENSED");
    const rows: UnlicensedRow[] = [];

    const clear = () => setFilters(emptyFilters());

    return (
        <div className="unlicensed-list-view">
            <div className="flex justify-content-between align-items-center mb-3">
                <h1 className="text-2xl font-bold text-900 m-0">Unlicensed</h1>
                <Button label="EXPORT UNLICENSED" className="p-button-warning p-button-sm" />
            </div>

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
                className="p-datatable-sm unlicensed-list-table"
                emptyMessage="No results found."
                scrollable
            >
                <Column header="#" body={(_, o) => o.rowIndex + 1} style={{ width: "3rem" }} filter={false} />
                <Column field="clientName" header="CLIENT NAME" filter filterPlaceholder="Filter" style={{ minWidth: "10rem" }} />
                <Column
                    field="state"
                    header="STATE"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={STATE_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "6rem" }}
                />
                <Column field="associate" header="ASSOCIATE" filter filterPlaceholder="Filter" style={{ minWidth: "10rem" }} />
                <Column field="createdAt" header="CREATED AT" filter filterPlaceholder="Filter" style={{ minWidth: "9rem" }} />
                <Column field="paidDate" header="PAID DATE" filter filterPlaceholder="Filter" style={{ minWidth: "9rem" }} />
                <Column field="company" header="COMPANY" filter filterPlaceholder="Filter" style={{ minWidth: "10rem" }} />
                <Column
                    field="paid"
                    header="PAID"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={PAID_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "6rem" }}
                />
            </DataTable>

            <style jsx global>{`
                .unlicensed-list-table .p-datatable-thead > tr > th {
                    background: #f4c542 !important;
                    color: #334155;
                    border-color: #dfb12a !important;
                    font-size: 0.72rem;
                    font-weight: 700;
                }
                .unlicensed-list-table .p-datatable-filter-row > td {
                    background: #fff;
                }
            `}</style>
        </div>
    );
}

