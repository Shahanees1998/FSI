"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useMemo, useState } from "react";

type PopUpRow = {
    id: string;
    category: string;
    title: string;
    text: string;
    date: string;
};

const CATEGORY_FILTER_OPTIONS = [
    { label: "All", value: null },
    { label: "Announcement", value: "Announcement" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Training", value: "Training" },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { value: null, matchMode: FilterMatchMode.EQUALS },
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        text: { value: null, matchMode: FilterMatchMode.CONTAINS },
        date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
}

export default function DevelopmentPopUpsView() {
    const rows = useMemo<PopUpRow[]>(() => [], []);
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());

    const clear = () => setFilters(emptyFilters());

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl font-bold text-900 m-0 mb-3">Pop-Ups</h1>
                <p className="text-700 line-height-3 m-0 mb-2 text-sm md:text-base">
                    Pop-up messages can be viewed and searched for up to one year from their initial date.
                </p>
                <p className="text-700 line-height-3 m-0 mb-4 text-sm md:text-base">
                    Messages older than one year are automatically archived and will no longer appear in search results.
                </p>

                <div className="flex justify-content-end align-items-center mb-2">
                    <div className="flex gap-2">
                        <Button label="RESET" icon="pi pi-times" className="p-button-warning p-button-sm font-bold" onClick={clear} />
                        <Button label="APPLY" icon="pi pi-filter" className="p-button-warning p-button-sm font-bold" type="button" />
                    </div>
                </div>

                <DataTable
                    value={rows}
                    filters={filters}
                    onFilter={(e) => setFilters(e.filters)}
                    filterDisplay="row"
                    className="p-datatable-sm development-popups-table"
                    emptyMessage="No results found."
                    scrollable
                >
                    <Column header="#" body={(_, o) => o.rowIndex + 1} style={{ width: "3rem" }} filter={false} />
                    <Column field="id" header="ID" filter filterPlaceholder="" style={{ minWidth: "6rem" }} />
                    <Column
                        field="category"
                        header="Category"
                        filter
                        showFilterMenu={false}
                        headerStyle={{ color: "#64748b" }}
                        filterElement={(opts) => (
                            <Dropdown
                                value={opts.value}
                                options={CATEGORY_FILTER_OPTIONS}
                                onChange={(e) => opts.filterCallback(e.value)}
                                placeholder="All"
                                className="w-full text-sm"
                            />
                        )}
                        style={{ minWidth: "10rem" }}
                    />
                    <Column field="title" header="Title" filter filterPlaceholder="" style={{ minWidth: "10rem" }} />
                    <Column field="text" header="Text" filter filterPlaceholder="" style={{ minWidth: "12rem" }} />
                    <Column field="date" header="Date" filter filterPlaceholder="" style={{ minWidth: "8rem" }} />
                </DataTable>

                <style jsx global>{`
                    .development-popups-table .p-datatable-thead > tr > th {
                        background: #f59e0b !important;
                        color: #0f172a !important;
                        border-color: #d97706 !important;
                        font-size: 0.75rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.02em;
                    }
                    .development-popups-table .p-datatable-thead > tr > th .p-column-header-content {
                        justify-content: flex-start;
                    }
                    .development-popups-table .p-datatable-filter-row > td {
                        background: #fff;
                    }
                    .development-popups-table .p-datatable-tbody > tr > td {
                        font-size: 0.875rem;
                    }
                `}</style>
            </div>
        </div>
    );
}
