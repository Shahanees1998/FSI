"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const LIST_TABS = ["INSURANCE", "ANNUITIES", "TRAIL", "RENEWALS", "GROUP", "HEALTH & DENTAL", "UNLICENSED", "ADDITIONAL COMMISSIONS"];
const ANY_OPTIONS = [{ label: "All", value: null }];
const TYPE_OPTIONS = [{ label: "All", value: null }, { label: "Adding", value: "Adding" }, { label: "Subtracting", value: "Subtracting" }];
const BOOL_OPTIONS = [{ label: "All", value: null }, { label: "Yes", value: "Yes" }, { label: "No", value: "No" }];
const STATE_OPTIONS = [{ label: "All", value: null }, { label: "US", value: "US" }, { label: "CA", value: "CA" }];

type CommissionRow = {
    id: number;
    user: string;
    userCode: string;
    company: string;
    amount: string;
    type: string;
    description: string;
    itemDescription: string;
    details: string;
    status: string;
    recurringPayment: string;
    quantityOfPayments: string;
    startDate: string;
    periodicity: string;
    createdAt: string;
    state: string;
};

const ROWS: CommissionRow[] = [
    {
        id: 1,
        user: "Jo Cleine Spinola",
        userCode: "JO SPI-A13713",
        company: "(not set)",
        amount: "$74.38",
        type: "Subtracting",
        description: "Subscription Debt",
        itemDescription: "Charge for subscription to Main Platform",
        details: "Paid",
        status: "Paid",
        recurringPayment: "No",
        quantityOfPayments: "1",
        startDate: "(not set)",
        periodicity: "—",
        createdAt: "Mar 23, 2026",
        state: "US",
    },
    {
        id: 2,
        user: "Jo Cleine Spinola",
        userCode: "JO SPI-A13713",
        company: "(not set)",
        amount: "$113.23",
        type: "Adding",
        description: "Escrow Transfer",
        itemDescription: "Transfer of Balance from Escrow account to pay negative balance",
        details: "Paid",
        status: "Paid",
        recurringPayment: "No",
        quantityOfPayments: "1",
        startDate: "(not set)",
        periodicity: "—",
        createdAt: "Jul 11, 2025",
        state: "US",
    },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        user: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        description: { value: null, matchMode: FilterMatchMode.EQUALS },
        itemDescription: { value: null, matchMode: FilterMatchMode.EQUALS },
        details: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        recurringPayment: { value: null, matchMode: FilterMatchMode.EQUALS },
        quantityOfPayments: { value: null, matchMode: FilterMatchMode.CONTAINS },
        startDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        periodicity: { value: null, matchMode: FilterMatchMode.EQUALS },
        createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
        state: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

export default function AdditionalCommissionListView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [activeTab, setActiveTab] = useState("ADDITIONAL COMMISSIONS");

    const clear = () => setFilters(emptyFilters());

    return (
        <div className="additional-commission-list-view">
            <h1 className="text-2xl font-bold text-900 m-0 mb-3">Additional Commission</h1>

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
                <p className="text-sm text-700 m-0">Showing 1-16 of 16 items.</p>
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
                className="p-datatable-sm additional-commission-table"
                scrollable
                scrollHeight="70vh"
            >
                <Column header="#" body={(_, o) => o.rowIndex + 1} style={{ width: "3rem" }} filter={false} />
                <Column
                    field="user"
                    header="USER"
                    filter
                    filterPlaceholder="Filter"
                    style={{ minWidth: "12rem" }}
                    body={(r: CommissionRow) => (
                        <div>
                            <div className="font-semibold text-primary">{r.user}</div>
                            <div className="text-xs text-600">{r.userCode}</div>
                        </div>
                    )}
                />
                <Column field="company" header="COMPANY" filter filterPlaceholder="Filter" style={{ minWidth: "8rem" }} />
                <Column field="amount" header="AMOUNT" filter filterPlaceholder="Filter" style={{ minWidth: "7rem" }} />
                <Column
                    field="type"
                    header="TYPE"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={TYPE_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "7rem" }}
                />
                <Column
                    field="description"
                    header="DESCRIPTION"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "8rem" }}
                />
                <Column
                    field="itemDescription"
                    header="ITEM DESCRIPTION"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "10rem" }}
                />
                <Column field="details" header="DETAILS" filter filterPlaceholder="Filter" style={{ minWidth: "8rem" }} />
                <Column
                    field="status"
                    header="STATUS"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "7rem" }}
                />
                <Column
                    field="recurringPayment"
                    header="RECURRING PAYMENT"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={BOOL_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "8rem" }}
                />
                <Column field="quantityOfPayments" header="QUANTITY OF PAYMENTS" filter filterPlaceholder="Filter" style={{ minWidth: "7rem" }} />
                <Column field="startDate" header="START DATE" filter filterPlaceholder="Filter" style={{ minWidth: "7rem" }} />
                <Column
                    field="periodicity"
                    header="PERIODICITY"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "7rem" }}
                />
                <Column field="createdAt" header="CREATED AT" filter filterPlaceholder="Filter" style={{ minWidth: "7rem" }} />
                <Column
                    field="state"
                    header="STATE"
                    filter
                    showFilterMenu={false}
                    filterElement={(opts) => <Dropdown value={opts.value} options={STATE_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                    style={{ minWidth: "6rem" }}
                />
            </DataTable>

            <style jsx global>{`
                .additional-commission-table .p-datatable-thead > tr > th {
                    background: #f4c542 !important;
                    color: #334155;
                    border-color: #dfb12a !important;
                    font-size: 0.72rem;
                    font-weight: 700;
                }
                .additional-commission-table .p-datatable-filter-row > td {
                    background: #fff;
                }
            `}</style>
        </div>
    );
}

