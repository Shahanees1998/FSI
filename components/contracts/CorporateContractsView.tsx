"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import ContractingDocumentsPageFrame from "@/components/contracts/ContractingDocumentsPageFrame";

const link = "text-blue-600 font-medium no-underline hover:underline";
const CONTRACTING_EMAIL = "contracting@experiorheadoffice.com";

type MainDocRow = {
    id: string;
    idx: number;
    type: string;
    documentName: string | null;
    issueDate: string | null;
    expirationDate: string | null;
    status: string;
};

type AdditionalDocRow = {
    id: string;
    idx: number;
    type: string;
    documentName: string | null;
    expirationDate: string | null;
    status: string;
};

const MAIN_DOCUMENT_ROWS: MainDocRow[] = [
    {
        id: "corp-eo",
        idx: 1,
        type: "Corporate E&O",
        documentName: null,
        issueDate: null,
        expirationDate: null,
        status: "Not Loaded",
    },
    {
        id: "corp-lic",
        idx: 2,
        type: "Corporate License",
        documentName: null,
        issueDate: null,
        expirationDate: null,
        status: "Not Loaded",
    },
];

const ADDITIONAL_DOCUMENT_ROWS: AdditionalDocRow[] = [];

type CorporateContractsViewProps = {
    npnDisplay: string | null;
};

export default function CorporateContractsView({ npnDisplay }: CorporateContractsViewProps) {
    const [corporationName, setCorporationName] = useState("JC investment Group LLC");
    const [ein, setEin] = useState("99-4489030");
    const [selectedMain, setSelectedMain] = useState<MainDocRow[]>([]);
    const [selectedAdditional, setSelectedAdditional] = useState<AdditionalDocRow[]>([]);

    const uploadBody = () => (
        <Button label="UPLOAD" className="p-button-warning p-button-sm font-bold" onClick={() => {}} />
    );

    const dash = (v: string | null) => (v ? v : "—");

    return (
        <ContractingDocumentsPageFrame active="corporate" headerAsideText={`Your NPN: ${npnDisplay ?? "—"}`}>
            <h2 className="text-2xl font-bold text-900 m-0 mb-3">Corporate Pre-Contracting</h2>

            <div
                className="border-round p-3 mb-4 line-height-3 text-sm"
                style={{ background: "#e0f2fe", border: "1px solid #bae6fd", color: "#0c4a6e" }}
            >
                Once you have uploaded all the first step contracting documents, you will receive instant access to the contracts.
            </div>

            <section className="mb-5">
                <h3 className="text-lg font-semibold text-900 m-0 mb-3">Corporation Information</h3>
                <div className="flex flex-wrap align-items-end gap-3">
                    <div className="flex flex-column gap-1" style={{ minWidth: "12rem" }}>
                        <label htmlFor="corp-name" className="text-700 text-sm font-medium">
                            Corporation Name
                        </label>
                        <InputText
                            id="corp-name"
                            value={corporationName}
                            onChange={(e) => setCorporationName(e.target.value)}
                            className="w-full"
                            style={{ maxWidth: "22rem" }}
                        />
                    </div>
                    <div className="flex flex-column gap-1" style={{ minWidth: "12rem" }}>
                        <label htmlFor="corp-ein" className="text-700 text-sm font-medium">
                            Associate EIN code
                        </label>
                        <InputText
                            id="corp-ein"
                            value={ein}
                            onChange={(e) => setEin(e.target.value)}
                            className="w-full"
                            style={{ maxWidth: "14rem" }}
                        />
                    </div>
                    <Button label="SAVE" className="p-button-warning font-bold" onClick={() => {}} />
                </div>
                <p className="text-600 text-xs m-0 mt-2">
                    Corporation details will persist to your profile when the back office integration is connected.
                </p>
            </section>

            <h3 className="text-lg font-semibold text-900 m-0 mb-2">Total {MAIN_DOCUMENT_ROWS.length} items.</h3>
            <DataTable
                value={MAIN_DOCUMENT_ROWS}
                dataKey="id"
                selectionMode="multiple"
                selection={selectedMain}
                onSelectionChange={(e) => setSelectedMain((e.value as MainDocRow[]) ?? [])}
                className="p-datatable-sm contracting-docs-table mb-5"
                stripedRows
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                <Column field="idx" header="#" style={{ width: "3rem" }} />
                <Column field="type" header="TYPE" style={{ minWidth: "10rem" }} />
                <Column field="documentName" header="DOCUMENT NAME" body={(r: MainDocRow) => dash(r.documentName)} />
                <Column field="issueDate" header="ISSUE DATE" body={(r: MainDocRow) => dash(r.issueDate)} />
                <Column field="expirationDate" header="EXPIRATION DATE" body={(r: MainDocRow) => dash(r.expirationDate)} />
                <Column
                    field="status"
                    header="STATUS"
                    body={(r: MainDocRow) => <span className="text-600 font-medium">{r.status}</span>}
                />
                <Column header="ACTION" body={uploadBody} style={{ minWidth: "7rem" }} />
            </DataTable>

            <h3 className="text-lg font-semibold text-900 m-0 mb-2">Contracting Additional Documents</h3>
            <DataTable
                value={ADDITIONAL_DOCUMENT_ROWS}
                dataKey="id"
                selectionMode="multiple"
                selection={selectedAdditional}
                onSelectionChange={(e) => setSelectedAdditional((e.value as AdditionalDocRow[]) ?? [])}
                className="p-datatable-sm contracting-docs-table mb-4"
                stripedRows
                emptyMessage="No results found."
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                <Column field="idx" header="#" style={{ width: "3rem" }} />
                <Column field="type" header="TYPE" />
                <Column field="documentName" header="DOCUMENT NAME" />
                <Column field="expirationDate" header="EXPIRATION DATE" />
                <Column field="status" header="STATUS" />
                <Column header="ACTION" />
            </DataTable>

            <p className="text-700 line-height-3 m-0 mb-3 text-sm">
                Questions about corporate packets? Email{" "}
                <a href={`mailto:${CONTRACTING_EMAIL}`} className={link}>
                    {CONTRACTING_EMAIL}
                </a>
                .
            </p>
            <p className="text-700 m-0 text-sm">
                <Link href="/agent/learn/about-experior/getting-started/contracting-faq" className={link}>
                    Contracting FAQ
                </Link>
                {" · "}
                <Link href="/agent/learn/departments/contracting" className={link}>
                    Learn → Contracting
                </Link>
                {" · "}
                <Link href="/agent/contracts/pre-contracting-documents" className={link}>
                    Pre-contracting documents
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
