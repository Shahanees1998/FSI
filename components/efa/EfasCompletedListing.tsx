"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useCallback, useMemo, useState } from "react";

export type EfaCompletedRecord = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    sex: string;
    birthDate: string;
    createdAt: string;
};

export type EfasCompletedListingProps = {
    /** Full list vs lighter Lite experience (fewer dummy rows). */
    variant?: "full" | "lite";
};

const VIEW_OPTIONS = [{ label: "My Clients", value: "my-clients" }];

const SEX_FILTER = [
    { label: "All", value: null },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
];

function formatDisplayDate(iso: string): string {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(d);
}

const FIRST_NAMES = [
    "Nadine",
    "Johsue",
    "Maria",
    "James",
    "Sarah",
    "Michael",
    "Emily",
    "David",
    "Lisa",
    "Robert",
    "Jennifer",
    "William",
    "Ashley",
    "Daniel",
    "Jessica",
    "Matthew",
    "Amanda",
    "Christopher",
    "Melissa",
    "Andrew",
    "Stephanie",
    "Joshua",
    "Nicole",
    "Ryan",
    "Michelle",
    "Kevin",
    "Laura",
    "Brian",
    "Kimberly",
    "Jason",
    "Amy",
    "Justin",
    "Angela",
    "Eric",
    "Helen",
    "Stephen",
    "Deborah",
    "Paul",
    "Rachel",
    "Mark",
    "Carol",
    "Donald",
    "Rebecca",
    "George",
    "Sharon",
    "Kenneth",
    "Cynthia",
    "Steven",
    "Kathleen",
    "Edward",
];

const LAST_NAMES = [
    "Damouni-Kishawi",
    "Castillo",
    "Rodriguez",
    "Wilson",
    "Martinez",
    "Anderson",
    "Taylor",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Robinson",
    "Clark",
    "Lewis",
    "Lee",
    "Walker",
    "Hall",
    "Allen",
    "Young",
    "King",
    "Wright",
    "Scott",
    "Green",
    "Baker",
    "Nelson",
    "Carter",
    "Mitchell",
    "Perez",
    "Roberts",
    "Turner",
    "Phillips",
    "Campbell",
    "Parker",
    "Evans",
    "Edwards",
    "Collins",
    "Stewart",
    "Sanchez",
    "Morris",
    "Rogers",
    "Reed",
    "Cook",
    "Morgan",
    "Bell",
    "Murphy",
    "Bailey",
];

function buildDummyRecords(count: number): EfaCompletedRecord[] {
    const rows: EfaCompletedRecord[] = [];
    for (let i = 0; i < count; i++) {
        const fn = FIRST_NAMES[i % FIRST_NAMES.length];
        const ln = LAST_NAMES[Math.floor(i / 2) % LAST_NAMES.length];
        const y = 1970 + (i % 40);
        const m = 1 + (i % 12);
        const day = 1 + (i % 28);
        const birth = new Date(y, m - 1, day).toISOString();
        const created = new Date(2026, (i % 12), 1 + (i % 27)).toISOString();
        rows.push({
            id: i + 1,
            firstName: fn,
            lastName: `${ln}${i > 25 ? ` ${i}` : ""}`,
            email: `${fn.toLowerCase()}.${ln.toLowerCase().replace(/\s/g, "")}${i}@example.com`,
            phone: `+1 (555) ${100 + (i % 900)}-${String(1000 + i).slice(-4)}`,
            sex: i % 3 === 0 ? "Female" : "Male",
            birthDate: birth,
            createdAt: created,
        });
    }
    return rows;
}

function emptyFilters(): DataTableFilterMeta {
    return {
        firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
        sex: { value: null, matchMode: FilterMatchMode.EQUALS },
        birthDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
}

function cloneRecord(r: EfaCompletedRecord): EfaCompletedRecord {
    return { ...r };
}

export default function EfasCompletedListing({ variant = "full" }: EfasCompletedListingProps) {
    const initialCount = variant === "lite" ? 15 : 49;
    const [view, setView] = useState("my-clients");
    const [records, setRecords] = useState<EfaCompletedRecord[]>(() => buildDummyRecords(initialCount));
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [first, setFirst] = useState(0);
    const rows = 20;

    const [viewRecord, setViewRecord] = useState<EfaCompletedRecord | null>(null);
    const [editRecord, setEditRecord] = useState<EfaCompletedRecord | null>(null);
    const [efaRecord, setEfaRecord] = useState<EfaCompletedRecord | null>(null);

    const rangeText = useMemo(() => {
        const total = records.length;
        const start = total === 0 ? 0 : first + 1;
        const end = Math.min(first + rows, total);
        return `Showing ${start}-${end} of ${total} items.`;
    }, [first, records.length]);

    const resetFilters = () => {
        setFilters(emptyFilters());
        setFirst(0);
    };

    const deleteRecord = useCallback((id: number) => {
        setRecords((prev) => prev.filter((r) => r.id !== id));
        setFirst(0);
    }, []);

    const saveEdit = useCallback(() => {
        if (!editRecord) return;
        setRecords((prev) => prev.map((r) => (r.id === editRecord.id ? cloneRecord(editRecord) : r)));
        setEditRecord(null);
    }, [editRecord]);

    const confirmDelete = (row: EfaCompletedRecord) => {
        confirmDialog({
            message: `Delete completed EFA for ${row.firstName} ${row.lastName}? This cannot be undone.`,
            header: "Delete confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-danger",
            accept: () => deleteRecord(row.id),
        });
    };

    const phoneBody = (row: EfaCompletedRecord) => (
        <span className="flex align-items-center gap-2">
            <i className="pi pi-phone text-600" />
            <span>{row.phone}</span>
        </span>
    );

    const dateBody = (field: "birthDate" | "createdAt") => (row: EfaCompletedRecord) => (
        <span>{formatDisplayDate(field === "birthDate" ? row.birthDate : row.createdAt)}</span>
    );

    const actionsBody = (row: EfaCompletedRecord) => (
        <div className="flex align-items-center justify-content-end gap-1 flex-wrap">
            <Button
                icon="pi pi-eye"
                rounded
                text
                className="text-blue-500"
                type="button"
                aria-label="View"
                onClick={() => setViewRecord(row)}
            />
            <Button
                icon="pi pi-pencil"
                rounded
                text
                className="text-blue-500"
                type="button"
                aria-label="Edit"
                onClick={() => setEditRecord(cloneRecord(row))}
            />
            <Button
                icon="pi pi-trash"
                rounded
                text
                className="text-blue-500"
                type="button"
                aria-label="Delete"
                onClick={() => confirmDelete(row)}
            />
            <Button
                icon="pi pi-file"
                rounded
                text
                className="text-blue-500"
                type="button"
                aria-label="Open EFA"
                onClick={() => setEfaRecord(row)}
            />
        </div>
    );

    const indexBody = (_: EfaCompletedRecord, options: { rowIndex: number }) => (
        <span className="text-700">{first + options.rowIndex + 1}</span>
    );

    const viewFooter = (
        <Button label="Close" icon="pi pi-times" onClick={() => setViewRecord(null)} className="p-button-text" />
    );

    const editFooter = (
        <div className="flex justify-content-end gap-2">
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setEditRecord(null)} />
            <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={saveEdit} />
        </div>
    );

    return (
        <div className="efas-completed-listing">
            <ConfirmDialog />

            <Dialog
                header="View record"
                visible={!!viewRecord}
                style={{ width: "min(32rem, 95vw)" }}
                onHide={() => setViewRecord(null)}
                footer={viewFooter}
                modal
                dismissableMask
            >
                {viewRecord && (
                    <div className="grid m-0">
                        {[
                            ["First name", viewRecord.firstName],
                            ["Last name", viewRecord.lastName],
                            ["Email", viewRecord.email],
                            ["Phone", viewRecord.phone],
                            ["Sex", viewRecord.sex],
                            ["Birth date", formatDisplayDate(viewRecord.birthDate)],
                            ["Created at", formatDisplayDate(viewRecord.createdAt)],
                        ].map(([label, val]) => (
                            <div key={String(label)} className="col-12 flex border-bottom-1 surface-border py-2">
                                <span className="text-600 font-semibold w-10rem flex-shrink-0">{label}</span>
                                <span className="text-900">{val}</span>
                            </div>
                        ))}
                    </div>
                )}
            </Dialog>

            <Dialog
                header="Edit record"
                visible={!!editRecord}
                style={{ width: "min(32rem, 95vw)" }}
                onHide={() => setEditRecord(null)}
                footer={editFooter}
                modal
                dismissableMask
            >
                {editRecord && (
                    <div className="flex flex-column gap-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">First name</label>
                            <InputText
                                className="w-full"
                                value={editRecord.firstName}
                                onChange={(e) => setEditRecord({ ...editRecord, firstName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last name</label>
                            <InputText
                                className="w-full"
                                value={editRecord.lastName}
                                onChange={(e) => setEditRecord({ ...editRecord, lastName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <InputText
                                className="w-full"
                                type="email"
                                value={editRecord.email}
                                onChange={(e) => setEditRecord({ ...editRecord, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <InputText
                                className="w-full"
                                value={editRecord.phone}
                                onChange={(e) => setEditRecord({ ...editRecord, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Sex</label>
                            <Dropdown
                                value={editRecord.sex}
                                options={[
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                ]}
                                onChange={(e) => setEditRecord({ ...editRecord, sex: e.value })}
                                className="w-full"
                                placeholder="Select"
                            />
                        </div>
                    </div>
                )}
            </Dialog>

            <Dialog
                header="EFA document"
                visible={!!efaRecord}
                style={{ width: "min(28rem, 95vw)" }}
                onHide={() => setEfaRecord(null)}
                footer={<Button label="Close" className="p-button-text" onClick={() => setEfaRecord(null)} />}
                modal
            >
                {efaRecord && (
                    <p className="text-600 m-0 line-height-3">
                        EFA document preview for <strong>{efaRecord.firstName} {efaRecord.lastName}</strong> (ID: {efaRecord.id}
                        ). Connect a real document viewer or PDF when backend is ready.
                    </p>
                )}
            </Dialog>

            <div className="flex flex-column lg:flex-row justify-content-between align-items-stretch lg:align-items-start gap-3 mb-3">
                <div>
                    <Dropdown
                        value={view}
                        options={VIEW_OPTIONS}
                        onChange={(e) => setView(e.value)}
                        className="w-full md:w-15rem mb-2"
                        optionLabel="label"
                        optionValue="value"
                    />
                    <p className="text-600 m-0 text-sm">{rangeText}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-content-end">
                    <Button
                        label="RESET"
                        icon="pi pi-times"
                        className="p-button-warning"
                        type="button"
                        onClick={resetFilters}
                    />
                    <Button label="APPLY" icon="pi pi-filter" className="p-button-warning" type="button" />
                    <Button
                        label="CREATE"
                        type="button"
                        style={{ background: "#0f172a", borderColor: "#0f172a", color: "#fff" }}
                    />
                </div>
            </div>

            <DataTable
                value={records}
                filters={filters}
                filterDisplay="row"
                onFilter={(e) => {
                    setFilters(e.filters);
                    setFirst(0);
                }}
                paginator
                rows={rows}
                first={first}
                onPage={(e) => setFirst(e.first)}
                rowsPerPageOptions={[10, 20, 50]}
                stripedRows
                className={classNames("p-datatable-sm efas-completed-datatable")}
                emptyMessage="No records found."
                dataKey="id"
            >
                <Column header="#" body={indexBody} style={{ width: "3.5rem" }} filter={false} />
                <Column
                    field="firstName"
                    header="FIRST NAME"
                    filter
                    filterPlaceholder="Filter"
                    style={{ minWidth: "9rem" }}
                />
                <Column
                    field="lastName"
                    header="LAST NAME"
                    filter
                    filterPlaceholder="Filter"
                    style={{ minWidth: "9rem" }}
                />
                <Column field="email" header="EMAIL" filter filterPlaceholder="Filter" style={{ minWidth: "12rem" }} />
                <Column
                    field="phone"
                    header="PHONE"
                    body={phoneBody}
                    filter
                    filterPlaceholder="Filter"
                    style={{ minWidth: "11rem" }}
                />
                <Column
                    field="sex"
                    header="SEX"
                    filter
                    showFilterMenu={false}
                    filterElement={(options) => (
                        <Dropdown
                            value={options.value}
                            options={SEX_FILTER}
                            onChange={(e) => options.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full"
                            showClear
                        />
                    )}
                    style={{ minWidth: "7rem" }}
                />
                <Column
                    field="birthDate"
                    header="BIRTH DATE"
                    body={dateBody("birthDate")}
                    filter
                    filterPlaceholder="Filter"
                    style={{ minWidth: "10rem" }}
                />
                <Column
                    field="createdAt"
                    header="CREATED AT"
                    body={dateBody("createdAt")}
                    filter
                    filterPlaceholder="Filter"
                    style={{ minWidth: "10rem" }}
                />
                <Column header="" body={actionsBody} style={{ width: "11rem" }} filter={false} />
            </DataTable>

            <style jsx global>{`
                .efas-completed-datatable .p-datatable-thead > tr > th {
                    background: #1e3a5f;
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 0.75rem;
                    letter-spacing: 0.02em;
                    border-color: #1e3a5f;
                }
                .efas-completed-datatable .p-datatable-thead > tr > th .p-column-header-content {
                    justify-content: flex-start;
                }
                .efas-completed-datatable.p-datatable .p-datatable-tbody > tr > td {
                    padding: 0.65rem 0.75rem;
                }
                .efas-completed-datatable .p-datatable-filter-row > td {
                    background: var(--surface-50);
                }
            `}</style>
        </div>
    );
}
