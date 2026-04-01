"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const LIST_TABS = ["INSURANCE", "ANNUITIES", "TRAIL", "RENEWALS", "GROUP", "HEALTH & DENTAL", "UNLICENSED", "ADDITIONAL COMMISSIONS"];

type RenewalRow = {
    id: number;
    associate: string;
    associateSub: string;
    client: string;
    company: string;
    amount: string;
    date: string;
};

const ROWS: RenewalRow[] = [
    { id: 1, associate: "Jo Cleine Spinola", associateSub: "JO SPI-A13713", client: "Leia C Silva-Fernandes", company: "National Life Group", amount: "$1.09", date: "Mar 31, 2026" },
    { id: 2, associate: "Jo Cleine Spinola", associateSub: "JO SPI-A13713", client: "Sergio Lopes Estrela", company: "National Life Group", amount: "$0.80", date: "Mar 10, 2026" },
    { id: 3, associate: "Jo Cleine Spinola", associateSub: "JO SPI-A13713", client: "Nivaldo Baptista Monteiro", company: "National Life Group", amount: "$1.60", date: "Mar 10, 2026" },
    { id: 4, associate: "Jo Cleine Spinola", associateSub: "JO SPI-A13713", client: "Keiva Fernandes", company: "National Life Group", amount: "$1.92", date: "Mar 10, 2026" },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        associate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        client: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
}

export default function RenewalsListView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [activeTab, setActiveTab] = useState("RENEWALS");

    const clear = () => setFilters(emptyFilters());

    return (
        <div className="renewals-list-view">
            <div className="flex justify-content-between align-items-center mb-2">
                <h1 className="text-2xl font-bold text-900 m-0">Renewals</h1>
                <Button label="EXPORT RENEWALS" className="p-button-warning p-button-sm" />
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

            <div className="flex justify-content-between align-items-center mb-2">
                <p className="text-sm text-700 m-0">Showing 1-12 of 12 items.</p>
                <div className="flex gap-2">
                    <Button label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm" onClick={clear} />
                    <Button label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm" />
                </div>
            </div>

            <DataTable
                value={ROWS}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                filterDisplay="row"
                className="p-datatable-sm renewals-list-table"
                scrollable
                scrollHeight="70vh"
            >
                <Column header="#" body={(_, o) => o.rowIndex + 1} style={{ width: "3rem" }} filter={false} />
                <Column field="associate" header="ASSOCIATE" filter filterPlaceholder="Filter" style={{ minWidth: "12rem" }} body={(r: RenewalRow) => <div><div className="font-semibold text-primary">{r.associate}</div><div className="text-xs text-600">{r.associateSub}</div></div>} />
                <Column field="client" header="CLIENT" filter filterPlaceholder="Filter" style={{ minWidth: "12rem" }} />
                <Column field="company" header="COMPANY" filter filterPlaceholder="Filter" style={{ minWidth: "12rem" }} />
                <Column field="amount" header="AMOUNT" filter filterPlaceholder="Filter" style={{ minWidth: "8rem" }} />
                <Column field="date" header="DATE" filter filterPlaceholder="Filter" style={{ minWidth: "9rem" }} />
            </DataTable>

            <style jsx global>{`
                .renewals-list-table .p-datatable-thead > tr > th {
                    background: #f4c542 !important;
                    color: #334155;
                    border-color: #dfb12a !important;
                    font-size: 0.72rem;
                    font-weight: 700;
                }
                .renewals-list-table .p-datatable-filter-row > td {
                    background: #fff;
                }
            `}</style>
        </div>
    );
}

