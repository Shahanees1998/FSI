"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import ContractingDocumentsPageFrame from "@/components/contracts/ContractingDocumentsPageFrame";

const link = "text-blue-600 font-medium no-underline hover:underline";

type MainDocRow = {
    idx: number;
    showToggle?: boolean;
    type: string;
    documentName: string | null;
    issueDate: string | null;
    expirationDate: string | null;
    status: "Approved" | "Expired" | "Not Loaded";
    actions: string[];
};

type AdditionalDocRow = {
    idx: number;
    showToggle?: boolean;
    type: string;
    documentName: string | null;
    expirationDate: string | null;
    status: "Approved" | "Not Loaded";
    actions: string[];
};

const MAIN_DOCUMENT_ROWS: MainDocRow[] = [
    {
        idx: 1,
        showToggle: true,
        type: "E&O",
        documentName: "E&O certificate (current term)",
        issueDate: "Jul 1, 2025",
        expirationDate: "Jul 1, 2026",
        status: "Approved",
        actions: ["DELETE", "UPLOAD ANOTHER"],
    },
    {
        idx: 2,
        type: "E&O",
        documentName: "E&O certificate (expired term)",
        issueDate: null,
        expirationDate: "Jul 1, 2025",
        status: "Expired",
        actions: ["DELETE"],
    },
    {
        idx: 3,
        type: "AML Agreement",
        documentName: "AML attestation",
        issueDate: null,
        expirationDate: "Jul 23, 2026",
        status: "Approved",
        actions: ["REUPLOAD"],
    },
    {
        idx: 4,
        type: "Bank Information",
        documentName: "Banking details on file",
        issueDate: null,
        expirationDate: null,
        status: "Approved",
        actions: ["REUPLOAD"],
    },
    {
        idx: 5,
        type: "Signature Card",
        documentName: "Authorized signature card",
        issueDate: null,
        expirationDate: null,
        status: "Approved",
        actions: [],
    },
    {
        idx: 6,
        type: "Vector Debit Check/Authorization Form",
        documentName: null,
        issueDate: null,
        expirationDate: null,
        status: "Not Loaded",
        actions: ["ADD"],
    },
    {
        idx: 7,
        showToggle: true,
        type: "License",
        documentName: "Resident license (Massachusetts)",
        issueDate: "Jul 21, 2024",
        expirationDate: "Jun 30, 2027",
        status: "Approved",
        actions: ["DELETE", "UPLOAD ANOTHER"],
    },
];

const ADDITIONAL_DOCUMENT_ROWS: AdditionalDocRow[] = [
    {
        idx: 1,
        showToggle: true,
        type: "NY Reg 187",
        documentName: null,
        expirationDate: null,
        status: "Not Loaded",
        actions: ["UPLOAD"],
    },
    {
        idx: 2,
        type: "Fraternal License",
        documentName: null,
        expirationDate: null,
        status: "Not Loaded",
        actions: ["UPLOAD"],
    },
    {
        idx: 3,
        type: "Driver License or State ID",
        documentName: "Government ID (Massachusetts)",
        expirationDate: "Jun 9, 2029",
        status: "Approved",
        actions: ["REUPLOAD"],
    },
    {
        idx: 4,
        type: "Questionnaire",
        documentName: null,
        expirationDate: null,
        status: "Not Loaded",
        actions: ["ADD"],
    },
];

function statusClass(status: string) {
    if (status === "Approved") return "text-green-700 font-semibold";
    if (status === "Expired") return "text-red-600 font-semibold";
    return "text-600 font-semibold";
}

type PreContractingDocumentsViewProps = {
    npnDisplay: string | null;
};

export default function PreContractingDocumentsView({ npnDisplay }: PreContractingDocumentsViewProps) {
    const indexBody = (row: MainDocRow | AdditionalDocRow) => (
        <div className="flex align-items-center gap-2">
            {row.showToggle ? <i className="pi pi-plus text-600 text-xs cursor-pointer" aria-hidden /> : null}
            <span>{row.idx}</span>
        </div>
    );

    const docNameBodyMain = (row: MainDocRow) =>
        row.documentName ? (
            <button
                type="button"
                className="p-0 border-none bg-transparent cursor-pointer text-left text-primary font-medium underline"
                onClick={() => {}}
            >
                {row.documentName}
            </button>
        ) : (
            <span className="text-500">—</span>
        );

    const docNameBodyAdditional = (row: AdditionalDocRow) =>
        row.documentName ? (
            <button
                type="button"
                className="p-0 border-none bg-transparent cursor-pointer text-left text-primary font-medium underline"
                onClick={() => {}}
            >
                {row.documentName}
            </button>
        ) : (
            <span className="text-500">—</span>
        );

    const actionsBody = (labels: string[]) => (
        <div className="flex flex-wrap gap-1">
            {labels.map((label) => (
                <Button key={label} label={label} className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
            ))}
        </div>
    );

    return (
        <ContractingDocumentsPageFrame active="pre" headerAsideText={`Your NPN: ${npnDisplay ?? "—"}`}>
            <div
                className="border-round p-3 mb-4 line-height-3 text-sm"
                style={{ background: "#e0f2fe", border: "1px solid #bae6fd", color: "#0c4a6e" }}
            >
                Once you have uploaded all the first step contracting documents, you will receive instant access to the contracts.
            </div>

            <h2 className="text-lg font-bold text-900 m-0 mb-2">Contracting Documents</h2>
            <DataTable value={MAIN_DOCUMENT_ROWS} dataKey="idx" className="p-datatable-sm contracting-docs-table mb-5" stripedRows>
                <Column header="#" body={indexBody} style={{ width: "3.5rem" }} />
                <Column field="type" header="TYPE" style={{ minWidth: "8rem" }} />
                <Column header="DOCUMENT NAME" body={docNameBodyMain} style={{ minWidth: "12rem" }} />
                <Column
                    field="issueDate"
                    header="ISSUE DATE"
                    body={(r: MainDocRow) => (r.issueDate ? r.issueDate : "—")}
                    style={{ minWidth: "7rem" }}
                />
                <Column
                    field="expirationDate"
                    header="EXPIRATION DATE"
                    body={(r: MainDocRow) => (r.expirationDate ? r.expirationDate : "—")}
                    style={{ minWidth: "7.5rem" }}
                />
                <Column header="STATUS" body={(r: MainDocRow) => <span className={statusClass(r.status)}>{r.status}</span>} />
                <Column header="ACTION" body={(r: MainDocRow) => actionsBody(r.actions)} style={{ minWidth: "12rem" }} />
            </DataTable>

            <h2 className="text-lg font-bold text-900 m-0 mb-2">Contracting Additional Documents</h2>
            <DataTable value={ADDITIONAL_DOCUMENT_ROWS} dataKey="idx" className="p-datatable-sm contracting-docs-table mb-4" stripedRows>
                <Column header="#" body={indexBody} style={{ width: "3.5rem" }} />
                <Column field="type" header="TYPE" style={{ minWidth: "8rem" }} />
                <Column header="DOCUMENT NAME" body={docNameBodyAdditional} style={{ minWidth: "12rem" }} />
                <Column
                    field="expirationDate"
                    header="EXPIRATION DATE"
                    body={(r: AdditionalDocRow) => (r.expirationDate ? r.expirationDate : "—")}
                    style={{ minWidth: "7.5rem" }}
                />
                <Column header="STATUS" body={(r: AdditionalDocRow) => <span className={statusClass(r.status)}>{r.status}</span>} />
                <Column header="ACTION" body={(r: AdditionalDocRow) => actionsBody(r.actions)} style={{ minWidth: "10rem" }} />
            </DataTable>

            <p className="text-600 text-sm line-height-3 m-0 mb-2">
                Sample rows for layout and review; wire uploads and status to the back office when APIs are available.
            </p>
            <p className="text-700 m-0 text-sm">
                <Link href="/agent/learn/about-experior/getting-started/mandatory-documents" className={link}>
                    Mandatory documents (Learn)
                </Link>
                {" · "}
                <Link href="/agent/learn/about-experior/getting-started/contracting-faq" className={link}>
                    Contracting FAQ
                </Link>
            </p>

            <style jsx global>{`
                .contracting-docs-table .p-datatable-thead > tr > th {
                    background: #fde047 !important;
                    color: #1c1917 !important;
                    font-weight: 700 !important;
                    border-color: #e7e5e4 !important;
                    padding: 0.65rem 0.75rem !important;
                    font-size: 0.8rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }
                .contracting-docs-table .p-datatable-tbody > tr > td {
                    padding: 0.5rem 0.75rem !important;
                    vertical-align: middle;
                    font-size: 0.875rem;
                }
                .contracting-docs-table .p-datatable-tbody > tr > td .p-button {
                    font-size: 0.7rem !important;
                    padding: 0.35rem 0.5rem !important;
                }
                .contracting-docs-table .p-datatable-tbody > tr > td .p-button .p-button-label {
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                }
            `}</style>
        </ContractingDocumentsPageFrame>
    );
}
