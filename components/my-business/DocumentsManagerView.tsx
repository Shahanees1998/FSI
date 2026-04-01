"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";

const STATE_OPTIONS = [{ label: "All", value: null }, { label: "MA", value: "MA" }, { label: "NY", value: "NY" }];
const STATUS_OPTIONS = [{ label: "All", value: null }, { label: "Submitted to Experior", value: "Submitted to Experior" }, { label: "Sent to Insurance Company", value: "Sent to Insurance Company" }, { label: "Approved (1)", value: "Approved (1)" }];
const ANY_OPTIONS = [{ label: "All", value: null }];

type DocumentRow = {
    id: number;
    associate: string;
    company: string;
    state: string;
    clientName: string;
    date: string;
    applicationNumber: string;
    policyNumber: string;
    status: string;
    associateWrote: string;
    message: string;
    feedsStatus: string;
    hasFeedsUpdate?: boolean;
};

const ROWS: DocumentRow[] = [
    {
        id: 1,
        associate: "Jo Cleine Spinola",
        company: "National Life Group",
        state: "MA",
        clientName: "Sidney Moreira",
        date: "2026-03-30",
        applicationNumber: "LS227860300",
        policyNumber: "",
        status: "Submitted to Experior",
        associateWrote: "",
        message: "Send Message",
        feedsStatus: "Not Matched",
    },
    {
        id: 2,
        associate: "Jo Cleine Spinola",
        company: "National Life Group",
        state: "MA",
        clientName: "Nadine Damourli-Kishawi",
        date: "2026-03-13",
        applicationNumber: "LS226241300",
        policyNumber: "",
        status: "Sent to Insurance Company",
        associateWrote: "",
        message: "More one day - (1) / (1)",
        feedsStatus: "Not Matched",
    },
    {
        id: 3,
        associate: "Jo Cleine Spinola",
        company: "National Life Group",
        state: "MA",
        clientName: "Johsue Castillo",
        date: "2026-03-13",
        applicationNumber: "LS226297000",
        policyNumber: "L2262970",
        status: "Approved (1)",
        associateWrote: "",
        message: "More one day - (3) / (3)",
        feedsStatus: "Not Matched",
    },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        associate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.EQUALS },
        state: { value: null, matchMode: FilterMatchMode.EQUALS },
        clientName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.CONTAINS },
        applicationNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
        policyNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        message: { value: null, matchMode: FilterMatchMode.EQUALS },
        feedsStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

export default function DocumentsManagerView() {
    const [activeTab, setActiveTab] = useState(0);
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());

    const clear = () => setFilters(emptyFilters());

    const actionBody = (row: DocumentRow) => (
        <div className="flex flex-column gap-1 align-items-start">
            <Button label="VIEW DEAL" className="p-button-warning p-button-sm" />
            {row.hasFeedsUpdate && <Button label="FEEDS UPDATES" className="p-button-warning p-button-sm" />}
            <Button label="LOG" className="p-button-warning p-button-sm" />
        </div>
    );

    const messageBody = (row: DocumentRow) => (
        <span className="text-primary text-sm">
            <span className="text-red-500 mr-1">●</span>
            {row.message}
        </span>
    );

    return (
        <div className="documents-manager-view">
            <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)} className="nbt-tabs">
                <TabPanel header="NBT Documents">
                    <div className="flex justify-content-between align-items-center mb-2">
                        <h1 className="text-3xl font-bold text-900 m-0">NBT Documents</h1>
                        <p className="text-sm text-700 m-0 font-semibold">Showing 1-20 of 64 items.</p>
                    </div>
                    <p className="m-0 text-sm text-800 mb-1"><span className="font-semibold">ⓘ</span> Click for details</p>
                    <p className="m-0 text-sm text-800 mb-3"><span className="font-semibold">◽</span> NBTs for company without contract.</p>
                    <div className="flex justify-content-end gap-2 mb-2">
                        <Button label="LEGEND" className="p-button-warning p-button-sm" />
                    </div>
                    <div className="flex justify-content-end gap-2 mb-2">
                        <Button label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm" onClick={clear} />
                        <Button label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm" />
                    </div>

                    <DataTable
                        value={ROWS}
                        filters={filters}
                        onFilter={(e) => setFilters(e.filters)}
                        filterDisplay="row"
                        className="p-datatable-sm nbt-documents-table"
                        scrollable
                        scrollHeight="70vh"
                    >
                        <Column header="#" body={(_, o) => o.rowIndex + 1} style={{ width: "3rem" }} filter={false} />
                        <Column field="associate" header="ASSOCIATE" filter filterPlaceholder="Filter" style={{ minWidth: "10rem" }} body={(r: DocumentRow) => <div><div className="font-semibold text-primary">{r.associate}</div><div className="text-xs text-600">{r.associate}</div></div>} />
                        <Column
                            field="company"
                            header="COMPANY"
                            filter
                            showFilterMenu={false}
                            filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                            style={{ minWidth: "8rem" }}
                        />
                        <Column
                            field="state"
                            header="STATE"
                            filter
                            showFilterMenu={false}
                            filterElement={(opts) => <Dropdown value={opts.value} options={STATE_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                            style={{ minWidth: "6rem" }}
                        />
                        <Column field="clientName" header="CLIENT NAME" filter filterPlaceholder="Filter" style={{ minWidth: "9rem" }} />
                        <Column field="date" header="DATE" filter filterPlaceholder="Filter" style={{ minWidth: "7rem" }} />
                        <Column field="applicationNumber" header="APPLICATION NUMBER" filter filterPlaceholder="Filter" style={{ minWidth: "8rem" }} />
                        <Column field="policyNumber" header="POLICY NUMBER" filter filterPlaceholder="Filter" style={{ minWidth: "7rem" }} />
                        <Column
                            field="status"
                            header="STATUS"
                            filter
                            showFilterMenu={false}
                            filterElement={(opts) => <Dropdown value={opts.value} options={STATUS_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                            style={{ minWidth: "9rem" }}
                        />
                        <Column field="associateWrote" header="ASSOCIATE WROTE" style={{ minWidth: "8rem" }} />
                        <Column
                            field="message"
                            header="MESSAGE"
                            body={messageBody}
                            filter
                            showFilterMenu={false}
                            filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                            style={{ minWidth: "8rem" }}
                        />
                        <Column
                            field="feedsStatus"
                            header="FEEDS STATUS"
                            filter
                            showFilterMenu={false}
                            filterElement={(opts) => <Dropdown value={opts.value} options={ANY_OPTIONS} onChange={(e) => opts.filterCallback(e.value)} placeholder="All" className="w-full" />}
                            style={{ minWidth: "8rem" }}
                        />
                        <Column header="" body={actionBody} style={{ minWidth: "8rem" }} filter={false} />
                    </DataTable>
                </TabPanel>
                <TabPanel header="My Carrier Updates (0)">
                    <div className="p-3 text-600">No updates available.</div>
                </TabPanel>
                <TabPanel header="My Team's Carrier Updates (0)">
                    <div className="p-3 text-600">No team updates available.</div>
                </TabPanel>
            </TabView>

            <style jsx global>{`
                .nbt-tabs .p-tabview-nav {
                    list-style: none !important;
                    margin: 0;
                    padding: 0;
                    border: 0;
                }
                .nbt-tabs .p-tabview-nav > li::marker {
                    content: none;
                }
                .nbt-documents-table .p-datatable-thead > tr > th {
                    background: #f4c542 !important;
                    color: #334155;
                    border-color: #dfb12a !important;
                    font-size: 0.72rem;
                    font-weight: 700;
                }
                .nbt-documents-table .p-datatable-filter-row > td {
                    background: #fff;
                }
            `}</style>
        </div>
    );
}

