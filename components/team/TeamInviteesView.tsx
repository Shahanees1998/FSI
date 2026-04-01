"use client";

import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useMemo, useState } from "react";

const RECRUITING_STATUS_OPTIONS = [
    { label: "All", value: null },
    { label: "AOA Step 3. Home Address", value: "AOA Step 3. Home Address" },
    { label: "Pending", value: "Pending" },
    { label: "Accepted", value: "Accepted" },
];

const UNSUBSCRIBED_OPTIONS = [
    { label: " ", value: null },
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
];

const INVITATION_TYPE_OPTIONS = [
    { label: "All", value: null },
    { label: "AOA Online Sign up", value: "AOA Online Sign up" },
    { label: "Email", value: "email" },
    { label: "Link", value: "link" },
];

type InviteRow = {
    id: number;
    name: string;
    recruiter: string;
    email: string;
    recruitingStatus: string;
    date: string;
    unsubscribed: string;
    invitationType: string;
    note: string;
};

const SAMPLE_ROWS: InviteRow[] = [
    {
        id: 1,
        name: "asd asd Sadas D Sad [Awaiting AOA] [SADSAD-A61227]",
        recruiter: "Jo Cleine Spinola Jo Cleine Spinola [JO SPI-A13713]",
        email: "asd@GMAIL.COM",
        recruitingStatus: "AOA Step 3. Home Address",
        date: "2026-03-30",
        unsubscribed: "no",
        invitationType: "AOA Online Sign up",
        note: "",
    },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        recruiter: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        recruitingStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        date: { value: null, matchMode: FilterMatchMode.CONTAINS },
        unsubscribed: { value: null, matchMode: FilterMatchMode.EQUALS },
        invitationType: { value: null, matchMode: FilterMatchMode.EQUALS },
        note: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
}

type Props = {
    embedded?: boolean;
};

export default function TeamInviteesView({ embedded = false }: Props) {
    const [records, setRecords] = useState<InviteRow[]>(SAMPLE_ROWS);
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [first, setFirst] = useState(0);
    const rows = 10;
    const [noteDialogRow, setNoteDialogRow] = useState<InviteRow | null>(null);
    const [noteDraft, setNoteDraft] = useState("");

    const rangeText = useMemo(() => {
        const total = records.length;
        const start = total === 0 ? 0 : first + 1;
        const end = Math.min(first + rows, total);
        return `Showing ${start} - ${end} of ${total} items`;
    }, [first, records.length]);

    const indexBody = (_: InviteRow, options: { rowIndex: number }) => <span>{options.rowIndex + 1}</span>;

    const nameBody = (row: InviteRow) => {
        if (row.id === 1) {
            return (
                <div className="text-sm line-height-3">
                    <div>asd asd</div>
                    <a href="#" className="text-primary" onClick={(e) => e.preventDefault()}>
                        Sadas D Sad
                    </a>
                    <div>[Awaiting AOA]</div>
                    <div>[SADSAD-A61227]</div>
                </div>
            );
        }
        return <span className="text-sm">{row.name}</span>;
    };

    const recruiterBody = (row: InviteRow) => {
        if (row.id === 1) {
            return (
                <div className="text-sm line-height-3">
                    <div>Jo Cleine Spinola</div>
                    <a href="#" className="text-primary" onClick={(e) => e.preventDefault()}>
                        Jo Cleine Spinola
                    </a>
                    <div>[JO SPI-A13713]</div>
                </div>
            );
        }
        return <span className="text-sm">{row.recruiter}</span>;
    };

    const emailBody = (row: InviteRow) => (
        <a href={`mailto:${row.email}`} className="text-primary text-sm">
            {row.email}
        </a>
    );

    const unsubscribedBody = (row: InviteRow) => (
        <span className="text-sm">{row.unsubscribed === "yes" ? "Yes" : row.unsubscribed === "no" ? "No" : row.unsubscribed}</span>
    );

    const saveNote = () => {
        if (!noteDialogRow) return;
        setRecords((prev) =>
            prev.map((r) => (r.id === noteDialogRow.id ? { ...r, note: noteDraft } : r))
        );
        setNoteDialogRow(null);
    };

    const actionsBody = (row: InviteRow) => (
        <Button
            type="button"
            label="Edit Note"
            className="p-button-sm"
            style={{ background: "#f97316", borderColor: "#f97316" }}
            onClick={() => {
                setNoteDraft(row.note);
                setNoteDialogRow(row);
            }}
        />
    );

    const tableBlock = (
        <>
            {embedded ? (
                <div className="flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                    <h1 className="text-2xl font-bold text-900 m-0">Invitees</h1>
                    <span className="text-600 text-sm">{rangeText}</span>
                </div>
            ) : (
                <div className="flex justify-content-end mb-2">
                    <span className="text-600 text-sm">{rangeText}</span>
                </div>
            )}

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
                emptyMessage="No results found."
                className="p-datatable-sm team-invitees-datatable"
                dataKey="id"
            >
                <Column header="#" body={indexBody} style={{ width: "3rem" }} filter={false} />
                <Column
                    field="name"
                    header={<span className="text-primary font-semibold">NAME</span>}
                    body={nameBody}
                    filter
                    filterPlaceholder=""
                    style={{ minWidth: "9rem" }}
                    showFilterMenu={false}
                />
                <Column
                    field="recruiter"
                    header={<span className="text-primary font-semibold">RECRUITER</span>}
                    body={recruiterBody}
                    filter
                    filterPlaceholder=""
                    style={{ minWidth: "9rem" }}
                    showFilterMenu={false}
                />
                <Column
                    field="email"
                    header={<span className="text-primary font-semibold">EMAIL</span>}
                    body={emailBody}
                    filter
                    filterPlaceholder=""
                    style={{ minWidth: "11rem" }}
                    showFilterMenu={false}
                />
                <Column
                    field="recruitingStatus"
                    header={<span className="text-primary font-semibold">RECRUITING STATUS</span>}
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "11rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={RECRUITING_STATUS_OPTIONS}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column
                    field="date"
                    header={<span className="text-primary font-semibold">DATE</span>}
                    filter
                    filterPlaceholder=""
                    style={{ minWidth: "8rem" }}
                    showFilterMenu={false}
                />
                <Column
                    field="unsubscribed"
                    header={<span className="text-900 font-semibold">UNSUBSCRIBED</span>}
                    body={unsubscribedBody}
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "9rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={UNSUBSCRIBED_OPTIONS}
                            onChange={(e) => opts.filterCallback(e.value)}
                            className="w-full text-sm"
                            placeholder=" "
                        />
                    )}
                />
                <Column
                    field="invitationType"
                    header={<span className="text-900 font-semibold">INVITATION TYPE</span>}
                    filter
                    showFilterMenu={false}
                    style={{ minWidth: "10rem" }}
                    filterElement={(opts) => (
                        <Dropdown
                            value={opts.value}
                            options={INVITATION_TYPE_OPTIONS}
                            onChange={(e) => opts.filterCallback(e.value)}
                            placeholder="All"
                            className="w-full text-sm"
                            showClear
                        />
                    )}
                />
                <Column
                    field="note"
                    header={<span className="text-900 font-semibold">NOTE</span>}
                    filter
                    filterPlaceholder=""
                    style={{ minWidth: "8rem" }}
                    showFilterMenu={false}
                />
                <Column header="" body={actionsBody} style={{ minWidth: "7rem" }} filter={false} />
            </DataTable>

            <Dialog
                header="Edit note"
                visible={noteDialogRow !== null}
                style={{ width: "min(420px, 95vw)" }}
                onHide={() => setNoteDialogRow(null)}
                footer={
                    <div className="flex justify-content-end gap-2">
                        <Button type="button" label="Cancel" className="p-button-text" onClick={() => setNoteDialogRow(null)} />
                        <Button type="button" label="Save" onClick={saveNote} />
                    </div>
                }
            >
                <InputTextarea
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    rows={5}
                    className="w-full"
                    autoResize
                />
            </Dialog>
        </>
    );

    if (embedded) {
        return (
            <div className="team-invitees-view team-invitees-view--embedded">
                {tableBlock}
                <style jsx global>{`
                    .team-invitees-datatable .p-datatable-thead > tr > th {
                        background: #ffcc4d !important;
                        border-color: #e8c84a !important;
                        color: #1e40af;
                        font-size: 0.75rem;
                        letter-spacing: 0.02em;
                        padding: 0.65rem 0.5rem;
                        vertical-align: middle;
                    }
                    .team-invitees-datatable .p-datatable-filter-row > td {
                        background: #ffffff !important;
                        border-color: var(--surface-border);
                        padding: 0.5rem;
                    }
                    .team-invitees-datatable .p-datatable-tbody > tr > td {
                        background: #ffffff;
                        border-color: var(--surface-border);
                    }
                    .team-invitees-datatable .p-datatable-emptymessage > td {
                        background: #ffffff !important;
                        padding: 2rem 1rem !important;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="team-invitees-view">
            <div className="surface-200 border-bottom-1 surface-border px-3 py-3 md:px-4">
                <h1 className="text-xl md:text-2xl font-semibold text-700 m-0">Invitees</h1>
            </div>

            <div className="p-3 md:p-4 surface-0">{tableBlock}</div>

            <style jsx global>{`
                .team-invitees-datatable .p-datatable-thead > tr > th {
                    background: #ffcc4d !important;
                    border-color: #e8c84a !important;
                    color: #1e40af;
                    font-size: 0.75rem;
                    letter-spacing: 0.02em;
                    padding: 0.65rem 0.5rem;
                    vertical-align: middle;
                }
                .team-invitees-datatable .p-datatable-filter-row > td {
                    background: #ffffff !important;
                    border-color: var(--surface-border);
                    padding: 0.5rem;
                }
                .team-invitees-datatable .p-datatable-tbody > tr > td {
                    background: #ffffff;
                    border-color: var(--surface-border);
                }
                .team-invitees-datatable .p-datatable-emptymessage > td {
                    background: #ffffff !important;
                    padding: 2rem 1rem !important;
                }
            `}</style>
        </div>
    );
}
