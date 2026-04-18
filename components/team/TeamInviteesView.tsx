"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import {
  PORTAL_FILTER_ACTIONS_CLASS,
  PORTAL_FILTER_FORM_CLASS,
  PORTAL_FILTER_LABEL_CLASS,
  PortalListTable,
  PortalListTableWrap,
  PortalListTd,
  PortalListTdActions,
  PortalListTh,
  PortalListThActions,
  PortalListTheadRow,
  PortalListTr,
} from "@/components/portal/PortalListLayout";
import { FormEvent, useEffect, useMemo, useState } from "react";

const RECRUITING_STATUS_FILTER = [
    { label: "Any status", value: "" },
    { label: "AOA Step 3. Home Address", value: "AOA Step 3. Home Address" },
    { label: "Pending", value: "Pending" },
    { label: "Accepted", value: "Accepted" },
];

const INVITATION_TYPE_FILTER = [
    { label: "Any type", value: "" },
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
        name: "Sadas D Sad [Awaiting AOA] [SADSAD-A61227]",
        recruiter: "Jo Cleine Spinola [JO SPI-A13713]",
        email: "asd@GMAIL.COM",
        recruitingStatus: "AOA Step 3. Home Address",
        date: "2026-03-30",
        unsubscribed: "no",
        invitationType: "AOA Online Sign up",
        note: "",
    },
    {
        id: 2,
        name: "Maria Chen [MCHE-A10402]",
        recruiter: "Jo Cleine Spinola [JO SPI-A13713]",
        email: "maria.chen@example.com",
        recruitingStatus: "Pending",
        date: "2026-04-02",
        unsubscribed: "no",
        invitationType: "Email",
        note: "Follow up next week.",
    },
    {
        id: 3,
        name: "James Okafor [JOKA-A88231]",
        recruiter: "Leonor Carvalho [LEO CAR-A2201]",
        email: "j.okafor@example.com",
        recruitingStatus: "Accepted",
        date: "2026-03-18",
        unsubscribed: "no",
        invitationType: "Link",
        note: "",
    },
    {
        id: 4,
        name: "Priya Nair [PNIR-A55190]",
        recruiter: "Jo Cleine Spinola [JO SPI-A13713]",
        email: "priya.nair@example.com",
        recruitingStatus: "AOA Step 3. Home Address",
        date: "2026-04-10",
        unsubscribed: "yes",
        invitationType: "AOA Online Sign up",
        note: "Unsubscribed from marketing.",
    },
    {
        id: 5,
        name: "Alex Rivera [ARIV-A77300]",
        recruiter: "Elgi Gomea Semedo [ELG SEM-A0091]",
        email: "alex.rivera@example.com",
        recruitingStatus: "Pending",
        date: "2026-04-12",
        unsubscribed: "no",
        invitationType: "Email",
        note: "",
    },
    {
        id: 6,
        name: "Taylor Brooks [TBRO-A66112]",
        recruiter: "Leonor Carvalho [LEO CAR-A2201]",
        email: "t.brooks@example.com",
        recruitingStatus: "Accepted",
        date: "2026-02-28",
        unsubscribed: "no",
        invitationType: "Link",
        note: "Completed onboarding call.",
    },
];

type AppliedFilters = {
    q: string;
    recruitingStatus: string;
    invitationType: string;
};

const emptyFilters = (): AppliedFilters => ({
    q: "",
    recruitingStatus: "",
    invitationType: "",
});

type Props = {
    embedded?: boolean;
};

export default function TeamInviteesView({ embedded = false }: Props) {
    const [records, setRecords] = useState<InviteRow[]>(SAMPLE_ROWS);
    const [draft, setDraft] = useState<AppliedFilters>(() => emptyFilters());
    const [applied, setApplied] = useState<AppliedFilters>(() => emptyFilters());
    const [first, setFirst] = useState(0);
    const rows = 10;
    const [noteDialogRow, setNoteDialogRow] = useState<InviteRow | null>(null);
    const [noteDraft, setNoteDraft] = useState("");

    const filtered = useMemo(() => {
        const q = applied.q.trim().toLowerCase();
        return records.filter((r) => {
            if (applied.recruitingStatus && r.recruitingStatus !== applied.recruitingStatus) return false;
            if (applied.invitationType && r.invitationType !== applied.invitationType) return false;
            if (!q) return true;
            const blob = `${r.name} ${r.recruiter} ${r.email}`.toLowerCase();
            return blob.includes(q);
        });
    }, [records, applied]);

    const pageRows = useMemo(() => filtered.slice(first, first + rows), [filtered, first, rows]);

    useEffect(() => {
        if (filtered.length > 0 && first >= filtered.length) {
            setFirst(0);
        }
    }, [filtered.length, first]);

    const rangeText = useMemo(() => {
        const total = filtered.length;
        const start = total === 0 ? 0 : first + 1;
        const end = Math.min(first + rows, total);
        return `Showing ${start}–${end} of ${total} items`;
    }, [first, filtered.length, rows]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rows) || 1);
    const currentPage = Math.floor(first / rows) + 1;

    const applyFilters = (e: FormEvent) => {
        e.preventDefault();
        setApplied({ ...draft });
        setFirst(0);
    };

    const resetFilters = () => {
        const z = emptyFilters();
        setDraft(z);
        setApplied(z);
        setFirst(0);
    };

    const unsubscribedLabel = (row: InviteRow) =>
        row.unsubscribed === "yes" ? "Yes" : row.unsubscribed === "no" ? "No" : row.unsubscribed;

    const saveNote = () => {
        if (!noteDialogRow) return;
        setRecords((prev) => prev.map((r) => (r.id === noteDialogRow.id ? { ...r, note: noteDraft } : r)));
        setNoteDialogRow(null);
    };

    const searchId = embedded ? "invites-search-embedded" : "invites-search";

    const filterForm = (
        <form className={PORTAL_FILTER_FORM_CLASS} onSubmit={applyFilters}>
            <div className="col-12 md:col-4">
                <label className={PORTAL_FILTER_LABEL_CLASS} htmlFor={searchId}>
                    Search
                </label>
                <input
                    id={searchId}
                    type="search"
                    placeholder="Name, recruiter, email…"
                    value={draft.q}
                    onChange={(e) => setDraft((d) => ({ ...d, q: e.target.value }))}
                    className="p-inputtext p-component w-full"
                />
            </div>
            <div className="col-12 md:col-4">
                <label className={PORTAL_FILTER_LABEL_CLASS}>Recruiting status</label>
                <select
                    className="w-full p-inputtext p-component"
                    value={draft.recruitingStatus}
                    onChange={(e) => setDraft((d) => ({ ...d, recruitingStatus: e.target.value }))}
                >
                    {RECRUITING_STATUS_FILTER.map((o) => (
                        <option key={o.label} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-12 md:col-4">
                <label className={PORTAL_FILTER_LABEL_CLASS}>Invitation type</label>
                <select
                    className="w-full p-inputtext p-component"
                    value={draft.invitationType}
                    onChange={(e) => setDraft((d) => ({ ...d, invitationType: e.target.value }))}
                >
                    {INVITATION_TYPE_FILTER.map((o) => (
                        <option key={o.label} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className={PORTAL_FILTER_ACTIONS_CLASS}>
                <button type="submit" className="p-button p-component">
                    <span className="p-button-label">Apply filters</span>
                </button>
                <button type="button" className="p-button p-component p-button-text" onClick={resetFilters}>
                    <span className="p-button-label">Reset</span>
                </button>
            </div>
        </form>
    );

    const hasActiveFilters = Boolean(applied.q || applied.recruitingStatus || applied.invitationType);

    return (
        <div className={embedded ? "team-invitees-view team-invitees-view--embedded" : "team-invitees-view"}>
            {embedded ? (
                    <div className="flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                        <h2 className="text-xl font-semibold text-900 m-0">Invitees</h2>
                        <span className="text-600 text-sm">{rangeText}</span>
                    </div>
                ) : (
                    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3 mb-4">
                        <div>
                            <h1 className="text-2xl font-semibold m-0 text-900">Invites</h1>
                            <p className="m-0 mt-2 text-600">Pending invitations and recruiting status for your team.</p>
                        </div>
                    </div>
                )}

                {filterForm}

                {!embedded ? <p className="text-600 text-sm m-0 mb-3">{rangeText}</p> : null}

                {filtered.length === 0 ? (
                    <p className="text-600 mb-0">
                        {hasActiveFilters ? "No invitees match your filters." : "No invitees yet."}
                    </p>
                ) : (
                    <>
                        <PortalListTableWrap>
                            <PortalListTable>
                                <thead>
                                    <PortalListTheadRow>
                                        <PortalListTh>#</PortalListTh>
                                        <PortalListTh>Name</PortalListTh>
                                        <PortalListTh>Recruiter</PortalListTh>
                                        <PortalListTh>Email</PortalListTh>
                                        <PortalListTh>Recruiting status</PortalListTh>
                                        <PortalListTh>Date</PortalListTh>
                                        <PortalListTh>Unsubscribed</PortalListTh>
                                        <PortalListTh>Invitation type</PortalListTh>
                                        <PortalListTh>Note</PortalListTh>
                                        <PortalListThActions>Actions</PortalListThActions>
                                    </PortalListTheadRow>
                                </thead>
                                <tbody>
                                    {pageRows.map((row, idx) => (
                                        <PortalListTr key={row.id}>
                                            <PortalListTd className="text-600">{first + idx + 1}</PortalListTd>
                                            <PortalListTd>
                                                <span className="line-height-3">{row.name}</span>
                                            </PortalListTd>
                                            <PortalListTd>
                                                <span className="line-height-3">{row.recruiter}</span>
                                            </PortalListTd>
                                            <PortalListTd>
                                                <a href={`mailto:${row.email}`} className="text-primary">
                                                    {row.email}
                                                </a>
                                            </PortalListTd>
                                            <PortalListTd>{row.recruitingStatus}</PortalListTd>
                                            <PortalListTd className="text-600">{row.date}</PortalListTd>
                                            <PortalListTd>{unsubscribedLabel(row)}</PortalListTd>
                                            <PortalListTd>{row.invitationType}</PortalListTd>
                                            <PortalListTd className="text-600" style={{ maxWidth: "14rem", whiteSpace: "normal" }}>
                                                {row.note || "—"}
                                            </PortalListTd>
                                            <PortalListTdActions>
                                                <Button
                                                    type="button"
                                                    label="Edit note"
                                                    className="p-button-sm"
                                                    style={{ background: "#f97316", borderColor: "#f97316" }}
                                                    onClick={() => {
                                                        setNoteDraft(row.note);
                                                        setNoteDialogRow(row);
                                                    }}
                                                />
                                            </PortalListTdActions>
                                        </PortalListTr>
                                    ))}
                                </tbody>
                            </PortalListTable>
                        </PortalListTableWrap>

                        {filtered.length > rows && (
                            <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
                                <div className="text-600 text-sm">
                                    Page {currentPage} of {totalPages} ({filtered.length} total records)
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        className={`p-button p-component p-button-outlined ${
                                            first === 0 ? "p-disabled pointer-events-none opacity-50" : ""
                                        }`}
                                        disabled={first === 0}
                                        onClick={() => setFirst(Math.max(0, first - rows))}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        className={`p-button p-component ${
                                            first + rows >= filtered.length ? "p-disabled pointer-events-none opacity-50" : ""
                                        }`}
                                        disabled={first + rows >= filtered.length}
                                        onClick={() => setFirst(first + rows)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

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
        </div>
    );
}
