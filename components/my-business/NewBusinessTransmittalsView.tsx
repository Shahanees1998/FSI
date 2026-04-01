"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useMemo, useState } from "react";

type DealRow = {
    id: string;
    type: string;
    agent: string;
    client: string;
    state: string;
    company: string;
    product: string;
    annual: string;
    submitDate: string;
    approved: string;
    substatus: string;
    fieldsStatus: string;
    status: "completed" | "verification";
};

const TYPE_ALL = [{ label: "Any", value: null }];

const DEALS: DealRow[] = [
    {
        id: "91586",
        type: "Life, Critical and Disability Insurance",
        agent: "Jo Cleine Spinola",
        client: "Sidney Moreira",
        state: "Massachusetts",
        company: "National Life Group",
        product: "FlexLife II",
        annual: "$1,200.00",
        submitDate: "Mar 30, 2026",
        approved: "",
        substatus: "",
        fieldsStatus: "Not Matched",
        status: "verification",
    },
    {
        id: "89013",
        type: "Life, Critical and Disability Insurance",
        agent: "Jo Cleine Spinola",
        client: "Nadine Dambourli-Kishawi",
        state: "Massachusetts",
        company: "National Life Group",
        product: "FlexLife II",
        annual: "$6,600.00",
        submitDate: "Mar 13, 2026",
        approved: "",
        substatus: "",
        fieldsStatus: "Not Matched",
        status: "verification",
    },
    {
        id: "87331",
        type: "Life, Critical and Disability Insurance",
        agent: "Jo Cleine Spinola",
        client: "Albino Da Silva",
        state: "Massachusetts",
        company: "National Life Group",
        product: "FlexLife II",
        annual: "$6,000.00",
        submitDate: "Mar 11, 2026",
        approved: "",
        substatus: "",
        fieldsStatus: "Not Matched",
        status: "completed",
    },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        agent: { value: null, matchMode: FilterMatchMode.CONTAINS },
        client: { value: null, matchMode: FilterMatchMode.CONTAINS },
        state: { value: null, matchMode: FilterMatchMode.EQUALS },
        company: { value: null, matchMode: FilterMatchMode.EQUALS },
        product: { value: null, matchMode: FilterMatchMode.CONTAINS },
        annual: { value: null, matchMode: FilterMatchMode.CONTAINS },
        submitDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        approved: { value: null, matchMode: FilterMatchMode.EQUALS },
        substatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        fieldsStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
}

const SIDEBAR_BLOCKS = [
    { title: "TYPE", items: ["All Time", "LCD Insurance", "Annuities", "Health & Dent.", "Group", "Unlicensed"] },
    { title: "DATE RANGE", items: ["All Time", "Rolling 365", "Year to date"] },
    { title: "STATUS", items: ["All", "Pending action", "Verification", "Declined", "Completed"] },
    { title: "MESSAGES", items: ["All", "Unread", "Read", "More one day", "No messages"] },
    { title: "ASSOCIATE", items: ["All", "Me", "Direct DownLI...", "LUJANE TEIXE..."] },
];

export default function NewBusinessTransmittalsView() {
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [query, setQuery] = useState("");
    const [rows] = useState<DealRow[]>(DEALS);

    const filtered = useMemo(() => {
        if (!query.trim()) return rows;
        const q = query.toLowerCase();
        return rows.filter((d) =>
            [d.id, d.type, d.agent, d.client, d.state, d.company, d.product].some((x) => x.toLowerCase().includes(q))
        );
    }, [rows, query]);

    const statusBody = (row: DealRow) =>
        row.status === "completed" ? (
            <Tag value="Completed" severity="success" />
        ) : (
            <Tag value="Verification" className="bg-blue-100 text-blue-800" />
        );

    return (
        <div className="new-business-transmittals grid">
            <aside className="col-12 lg:col-2 pr-2">
                <Button label="+ New Deal" className="p-button-warning w-full mb-3" />
                {SIDEBAR_BLOCKS.map((block) => (
                    <div key={block.title} className="mb-3">
                        <div className="text-xs font-bold text-700 mb-1">{block.title}</div>
                        <div className="surface-100 border-round p-2">
                            {block.items.map((item, i) => (
                                <div key={item} className={`text-xs py-1 px-1 ${i === 0 ? "font-semibold text-900" : "text-700"}`}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </aside>

            <section className="col-12 lg:col-10">
                <div className="flex align-items-center justify-content-between mb-2">
                    <h1 className="text-2xl font-bold text-900 m-0">Deals</h1>
                    <Button type="button" label="Export" icon="pi pi-download" className="p-button-text p-button-sm" />
                </div>
                <p className="text-xs text-600 mt-0 mb-3">
                    Please note, insurance applications greater than $14,999 in annual premium and investments greater than $999,999 are manually approved and may take up to 48 hours to appear on the Company Scoreboard.
                </p>
                <span className="p-input-icon-left w-full mb-2 block">
                    <i className="pi pi-search" />
                    <InputText
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full"
                        placeholder="Search by all columns"
                    />
                </span>
                <p className="text-xs text-500 mb-2 mt-0">Showing 1 - {filtered.length} of {rows.length} items</p>

                <DataTable
                    value={filtered}
                    filters={filters}
                    onFilter={(e) => setFilters(e.filters)}
                    filterDisplay="row"
                    className="p-datatable-sm transmittals-deals-table"
                    dataKey="id"
                    paginator
                    rows={20}
                    scrollable
                    scrollHeight="70vh"
                >
                    <Column field="id" header="Deal #" filter filterPlaceholder="Filter" style={{ minWidth: "6rem" }} />
                    <Column
                        field="type"
                        header="Type"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown value={opts.value} options={TYPE_ALL} onChange={(e) => opts.filterCallback(e.value)} placeholder="Any" className="w-full" />
                        )}
                        style={{ minWidth: "11rem" }}
                    />
                    <Column field="agent" header="Agent" filter filterPlaceholder="Filter" style={{ minWidth: "9rem" }} />
                    <Column field="client" header="Client" filter filterPlaceholder="Filter" style={{ minWidth: "9rem" }} />
                    <Column
                        field="state"
                        header="State"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown value={opts.value} options={TYPE_ALL} onChange={(e) => opts.filterCallback(e.value)} placeholder="Any" className="w-full" />
                        )}
                        style={{ minWidth: "8rem" }}
                    />
                    <Column
                        field="company"
                        header="Company"
                        filter
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <Dropdown value={opts.value} options={TYPE_ALL} onChange={(e) => opts.filterCallback(e.value)} placeholder="Any" className="w-full" />
                        )}
                        style={{ minWidth: "9rem" }}
                    />
                    <Column field="product" header="Product" filter filterPlaceholder="Filter" style={{ minWidth: "8rem" }} />
                    <Column field="annual" header="Annual" filter filterPlaceholder="Filter" style={{ minWidth: "7rem" }} />
                    <Column field="submitDate" header="Submit Date" filter filterPlaceholder="Filter" style={{ minWidth: "8rem" }} />
                    <Column field="fieldsStatus" header="Fields Status" style={{ minWidth: "7rem" }} />
                    <Column field="status" header="Status" body={statusBody} style={{ minWidth: "8rem" }} />
                </DataTable>
            </section>
        </div>
    );
}

