"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const HEADER_BG = "#ffcc4d";
const BTN_BG = "#f5d565";
const BTN_BORDER = "#e8c84a";

const DROPDOWN_ALL = [{ label: "All", value: null }];

const PREVIOUS_ASSOCIATE_OPTIONS = [{ label: "Agent:", value: null }];

type ReassignedRow = {
    id: string;
    clientName: string;
    clientInformation: string;
    clientPolicies: string;
    state: string;
    company: string;
    previousAssociateName: string;
    clientEfa: string;
    clientEfaLite: string;
    message: string;
};

function emptyFilters(): DataTableFilterMeta {
    return {
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        clientName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        clientInformation: { value: null, matchMode: FilterMatchMode.CONTAINS },
        clientPolicies: { value: null, matchMode: FilterMatchMode.CONTAINS },
        state: { value: null, matchMode: FilterMatchMode.EQUALS },
        company: { value: null, matchMode: FilterMatchMode.EQUALS },
        previousAssociateName: { value: null, matchMode: FilterMatchMode.EQUALS },
        message: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

export default function TeamReassignedClientsView() {
    const [records] = useState<ReassignedRow[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());

    const clearFilters = () => {
        setFilters(emptyFilters());
    };

    const indexBody = (_: ReassignedRow, options: { rowIndex: number }) => <span>{options.rowIndex + 1}</span>;

    const actionsBody = () => (
        <div className="flex gap-1 justify-content-end">
            <span className="text-500 text-sm">—</span>
        </div>
    );

    return (
        <div className="team-reassigned-clients-view">
            <div className="flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                <h1 className="text-2xl font-bold text-900 m-0">Reassigned Clients</h1>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        label="RESET"
                        icon="pi pi-times"
                        className="font-bold border-none"
                        style={{ background: BTN_BG, borderColor: BTN_BORDER, color: "#1a1a1a" }}
                        onClick={clearFilters}
                    />
                    <Button
                        type="button"
                        label="APPLY"
                        icon="pi pi-filter"
                        className="font-bold border-none"
                        style={{ background: BTN_BG, borderColor: BTN_BORDER, color: "#1a1a1a" }}
                        onClick={() => {}}
                    />
                </div>
            </div>

            <DataTable
                value={records}
                filters={filters}
                filterDisplay="row"
                onFilter={(e) => setFilters(e.filters)}
                emptyMessage="No results found."
                className="p-datatable-sm reassigned-clients-datatable"
                dataKey="id"
            >
                <Column
                    field="id"
                    header="#"
                    body={indexBody}
                    filter
                    showFilterMenu={false}
                    style={{ width: "3.5rem" }}
                    filterElement={(opts) => (
                        <InputText
                            value={opts.value ?? ""}
                            onChange={(e) => opts.filterCallback(e.target.value)}
                            className="w-full p-inputtext-sm"
                            placeholder="Filter"
                        />
                    )}
                />
                <Column
                    field="clientName"
                    header={<span className="text-primary font-bold">CLIENT NAME</span>}
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "10rem" }}
                    filterElement={(opts) => (
                        <InputText
                            value={opts.value ?? ""}
                            onChange={(e) => opts.filterCallback(e.target.value)}
                            className="w-full p-inputtext-sm"
                        />
                    )}
                />
                <Column
                    field="clientInformation"
                    header="CLIENT INFORMATION"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "11rem" }}
                    filterElement={(opts) => (
                        <InputText
                            value={opts.value ?? ""}
                            onChange={(e) => opts.filterCallback(e.target.value)}
                            className="w-full p-inputtext-sm"
                        />
                    )}
                />
                <Column
                    field="clientPolicies"
                    header="CLIENT POLICIES"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "10rem" }}
                    filterElement={(opts) => (
                        <InputText
                            value={opts.value ?? ""}
                            onChange={(e) => opts.filterCallback(e.target.value)}
                            className="w-full p-inputtext-sm"
                        />
                    )}
                />
                <Column
                    field="state"
                    header="STATE"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "8rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={DROPDOWN_ALL}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column
                    field="company"
                    header="COMPANY"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "8rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={DROPDOWN_ALL}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column
                    field="previousAssociateName"
                    header={<span className="text-primary font-bold">PREVIOUS ASSOCIATE NAME</span>}
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "12rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={PREVIOUS_ASSOCIATE_OPTIONS}
                            onChange={(e) => opts.filterCallback(e.value)}
                            className="w-full text-sm"
                            placeholder="Agent:"
                        />
                    )}
                />
                <Column field="clientEfa" header="CLIENT EFA" style={{ minWidth: "8rem" }} filter={false} />
                <Column field="clientEfaLite" header="CLIENT EFA LITE" style={{ minWidth: "9rem" }} filter={false} />
                <Column
                    field="message"
                    header="MESSAGE"
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "8rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={DROPDOWN_ALL}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column header="ACTIONS" body={actionsBody} style={{ minWidth: "6rem" }} filter={false} />
            </DataTable>

            <style jsx global>{`
                .reassigned-clients-datatable .p-datatable-thead > tr > th {
                    background: ${HEADER_BG} !important;
                    border-color: #e8c84a !important;
                    color: #1e293b;
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    vertical-align: top;
                    text-transform: uppercase;
                }
                .reassigned-clients-datatable .p-datatable-filter-row > td {
                    background: #ffffff !important;
                    border-color: var(--surface-border);
                    padding: 0.5rem;
                }
                .reassigned-clients-datatable .p-datatable-tbody > tr > td {
                    background: #ffffff;
                    border-color: var(--surface-border);
                    font-size: 0.875rem;
                }
                .reassigned-clients-datatable .p-datatable-emptymessage > td {
                    background: #ffffff !important;
                    padding: 2rem 1rem !important;
                }
            `}</style>
        </div>
    );
}
