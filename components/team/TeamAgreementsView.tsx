"use client";

import { FilterMatchMode } from "primereact/api";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import AgreementsLegendDialog from "@/components/team/AgreementsLegendDialog";
import InviteAssociatesDialog from "@/components/team/InviteAssociatesDialog";
import TeamInviteesView from "@/components/team/TeamInviteesView";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const DROPDOWN_ALL = [{ label: "All", value: null }];

type AgreementRow = {
    id: number;
    rowTone: "pink" | "green";
    agentName: string;
    agentId: string;
    recruiters: string;
    recruiterId: string;
    fieldDirector: string;
    fieldDirectorId: string;
    contactLines: string[];
    /** Combined for column filter / field binding */
    addresses: string;
    addressOffice: string;
    addressHomeState: string;
    docsLines: string[];
    /** Combined for column filter */
    docsStatus: string;
    docsMore: boolean;
    agentStatus: string;
    agreementLabel: string;
    agreementDate: string;
};

const ROWS: AgreementRow[] = [
    {
        id: 1,
        rowTone: "pink",
        agentName: "Carlos Gomez",
        agentId: "AGT-10482",
        recruiters: "Jo Cleine Spinola",
        recruiterId: "REC-2201",
        fieldDirector: "Jo Cleine Spinola",
        fieldDirectorId: "FD-2201",
        contactLines: ["Back Office Email: carlos.g@example.com", "CRM Email: cgomez.crm@example.com", "Phone: +1 (716) 555-0142"],
        addressOffice: "Office: 123 Main St, Cheektowaga, NY 14225",
        addressHomeState: "Home state: Florida",
        addresses: "Office: 123 Main St, Cheektowaga, NY 14225 Home state: Florida",
        docsLines: ["Residence License: FL License", "Additional Licenses: NY License"],
        docsStatus: "Residence License: FL License Additional Licenses: NY License",
        docsMore: true,
        agentStatus: "Active",
        agreementLabel: "Completed ADA",
        agreementDate: "2024-12-12",
    },
    {
        id: 2,
        rowTone: "green",
        agentName: "Jo Cleine Spinola",
        agentId: "AGT-08991",
        recruiters: "Elgi Gomea Semedo Inocencio",
        recruiterId: "REC-1188",
        fieldDirector: "Leonor Carvalho",
        fieldDirectorId: "FD-3302",
        contactLines: ["Back Office Email: jo.spinola@example.com", "CRM Email: jspinola.crm@example.com", "Phone: +1 (716) 555-0199"],
        addressOffice: "Office: 123 Main St, Cheektowaga, NY 14225",
        addressHomeState: "Home state: Massachusetts",
        addresses: "Office: 123 Main St, Cheektowaga, NY 14225 Home state: Massachusetts",
        docsLines: [
            "Documentation Status: R&D, Bank Information, AML Agreement",
            "Residence License: MA License",
            "Additional Licenses: NY License",
        ],
        docsStatus:
            "Documentation Status: R&D, Bank Information, AML Agreement Residence License: MA License Additional Licenses: NY License",
        docsMore: false,
        agentStatus: "Active",
        agreementLabel: "Completed ADA",
        agreementDate: "2024-07-23",
    },
];

function emptyFilters(): DataTableFilterMeta {
    return {
        agentName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        recruiters: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fieldDirector: { value: null, matchMode: FilterMatchMode.CONTAINS },
        addresses: { value: null, matchMode: FilterMatchMode.CONTAINS },
        docsStatus: { value: null, matchMode: FilterMatchMode.CONTAINS },
        agentStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
        agreementStatus: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
}

export default function TeamAgreementsView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [mainView, setMainView] = useState<"agreements" | "invitees">("agreements");
    const [inviteOpen, setInviteOpen] = useState(false);
    const [legendOpen, setLegendOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [globalSearch, setGlobalSearch] = useState("");
    const [records] = useState<AgreementRow[]>(ROWS);
    const [filters, setFilters] = useState<DataTableFilterMeta>(() => emptyFilters());
    const [first, setFirst] = useState(0);
    const rows = 10;

    useEffect(() => {
        if (searchParams.get("inviteAssociate") === "1") {
            setMainView("agreements");
            setInviteOpen(true);
            router.replace("/agent/team/agreements", { scroll: false });
        }
    }, [searchParams, router]);

    const filteredBySearch = useMemo(() => {
        if (!globalSearch.trim()) return records;
        const q = globalSearch.toLowerCase();
        return records.filter(
            (r) =>
                r.agentName.toLowerCase().includes(q) ||
                r.agentId.toLowerCase().includes(q) ||
                r.recruiters.toLowerCase().includes(q) ||
                r.fieldDirector.toLowerCase().includes(q)
        );
    }, [records, globalSearch]);

    const rangeText = useMemo(() => {
        const total = filteredBySearch.length;
        const start = total === 0 ? 0 : first + 1;
        const end = Math.min(first + rows, total);
        return `Showing ${start}-${end} of ${total} items.`;
    }, [first, filteredBySearch.length]);

    const rowClass = (data: AgreementRow) =>
        data.rowTone === "pink" ? "team-agreements-row-pink" : "team-agreements-row-green";

    const agentBody = (row: AgreementRow) => (
        <div className="flex flex-column gap-2 py-1">
            <div className="flex align-items-start gap-2">
                <Avatar
                    label={row.agentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    size="large"
                    shape="circle"
                    className="bg-primary text-white flex-shrink-0"
                />
                <div className="min-w-0">
                    <div className="font-semibold text-900">{row.agentName}</div>
                    <div className="text-600 text-sm">{row.agentId}</div>
                </div>
            </div>
            <div className="flex align-items-center gap-1 flex-wrap">
                <Button type="button" icon="pi pi-phone" rounded text className="p-0 w-2rem h-2rem text-600" aria-label="Phone" />
                <Button type="button" icon="pi pi-comments" rounded text className="p-0 w-2rem h-2rem text-600" aria-label="Message" />
                <Button type="button" icon="pi pi-envelope" rounded text className="p-0 w-2rem h-2rem text-600" aria-label="Email" />
                <Button type="button" icon="pi pi-user" rounded text className="p-0 w-2rem h-2rem text-600" aria-label="Profile" />
                <Button type="button" icon="pi pi-file" rounded text className="p-0 w-2rem h-2rem text-600" aria-label="File" />
            </div>
        </div>
    );

    const recruiterBody = (row: AgreementRow) => (
        <div>
            <div className="font-medium text-900">{row.recruiters}</div>
            <div className="text-600 text-sm">{row.recruiterId}</div>
        </div>
    );

    const fdBody = (row: AgreementRow) => (
        <div>
            <div className="font-medium text-900">{row.fieldDirector}</div>
            <div className="text-600 text-sm">{row.fieldDirectorId}</div>
        </div>
    );

    const contactBody = (row: AgreementRow) => (
        <ul className="m-0 pl-3 text-sm line-height-3">
            {row.contactLines.map((line, i) => (
                <li key={i} className="text-800">
                    {line}
                </li>
            ))}
        </ul>
    );

    const addressBody = (row: AgreementRow) => (
        <div className="text-sm line-height-3">
            <div>{row.addressOffice}</div>
            <div className="text-600">{row.addressHomeState}</div>
        </div>
    );

    const docsBody = (row: AgreementRow) => (
        <div className="text-sm">
            {row.docsLines.map((line, i) => (
                <div key={i} className="mb-1 line-height-3">
                    {line}
                </div>
            ))}
            {row.docsMore && (
                <Button label="MORE" size="small" className="p-button-outlined p-button-sm mt-1" type="button" />
            )}
        </div>
    );

    const agreementBody = (row: AgreementRow) => (
        <div>
            <div className="font-semibold text-900">{row.agreementLabel}</div>
            <div className="text-600 text-sm">Signed: {row.agreementDate}</div>
        </div>
    );

    const actionsBody = () => (
        <div className="flex gap-1 justify-content-end">
            <Button type="button" icon="pi pi-user" rounded text className="text-600" aria-label="User" />
            <Button type="button" icon="pi pi-file" rounded text className="text-600" aria-label="Document" />
        </div>
    );

    const docsHeader = (
        <div className="flex flex-column align-items-start gap-1">
            <span>DOCS STATUS</span>
            <Button label="Advanced Filter" size="small" className="p-button-outlined p-button-secondary text-xs py-1" type="button" />
        </div>
    );

    return (
        <div className="team-agreements-view flex gap-0 align-items-stretch">
            <InviteAssociatesDialog visible={inviteOpen} onHide={() => setInviteOpen(false)} />
            <AgreementsLegendDialog visible={legendOpen} onHide={() => setLegendOpen(false)} />
            <button
                type="button"
                className="p-button p-button-text p-1 flex align-items-center justify-content-center border-right-1 surface-border surface-100"
                style={{ width: "1.5rem", minWidth: "1.5rem" }}
                onClick={() => setSidebarOpen((o) => !o)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
                <i className={classNames("pi", sidebarOpen ? "pi-chevron-left" : "pi-chevron-right")} />
            </button>

            {sidebarOpen && (
                <aside
                    className="surface-0 border-right-1 surface-border flex flex-column gap-3 p-3"
                    style={{ width: "220px", minWidth: "220px" }}
                >
                    <Button
                        label="+ New Associate"
                        className="w-full p-button-warning font-bold"
                        type="button"
                        onClick={() => setInviteOpen(true)}
                    />
                    <nav className="flex flex-column gap-2">
                        <button
                            type="button"
                            className={`text-left text-sm bg-transparent border-none cursor-pointer p-0 no-underline hover:underline ${
                                mainView === "agreements" ? "text-900 font-semibold" : "text-primary"
                            }`}
                            onClick={() => setMainView("agreements")}
                        >
                            Agreements
                        </button>
                        <Link href="#" className="text-primary text-sm no-underline hover:underline" onClick={(e) => e.preventDefault()}>
                            Export associate request
                        </Link>
                        <button
                            type="button"
                            className={`text-left text-sm bg-transparent border-none cursor-pointer p-0 no-underline hover:underline ${
                                mainView === "invitees" ? "text-900 font-semibold" : "text-primary"
                            }`}
                            onClick={() => setMainView("invitees")}
                        >
                            Invitees
                        </button>
                        <button
                            type="button"
                            className="text-left text-sm bg-transparent border-none cursor-pointer p-0 text-primary no-underline hover:underline"
                            onClick={() => setLegendOpen(true)}
                        >
                            Legend
                        </button>
                    </nav>
                </aside>
            )}

            <div className="flex-grow-1 min-w-0 p-3 md:p-4 surface-ground">
                {mainView === "invitees" ? (
                    <TeamInviteesView embedded />
                ) : (
                    <>
                        <h1 className="text-2xl font-bold text-900 m-0 mb-3">Agreements</h1>

                        <span className="p-input-icon-left p-input-icon-right w-full mb-2 block">
                            <i className="pi pi-search" />
                            <InputText
                                value={globalSearch}
                                onChange={(e) => {
                                    setGlobalSearch(e.target.value);
                                    setFirst(0);
                                }}
                                placeholder="Agent Search..."
                                className="w-full"
                            />
                            <i className="pi pi-filter cursor-pointer text-600" />
                        </span>

                        <p className="text-600 text-sm m-0 mb-2">{rangeText}</p>

                        <DataTable
                    value={filteredBySearch}
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
                    rowClassName={rowClass}
                    className="p-datatable-sm team-agreements-datatable"
                    emptyMessage="No agreements found."
                    dataKey="id"
                    scrollable
                    scrollHeight="70vh"
                >
                    <Column
                        field="agentName"
                        header="Agent"
                        body={agentBody}
                        filter
                        filterPlaceholder="Search"
                        style={{ minWidth: "14rem" }}
                        showFilterMenu={false}
                    />
                    <Column
                        field="recruiters"
                        header="RECRUITER(S)"
                        body={recruiterBody}
                        filter
                        filterPlaceholder="Filter"
                        style={{ minWidth: "11rem" }}
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <div className="flex align-items-center gap-1 w-full">
                                <Dropdown
                                    value={opts.value}
                                    options={[...DROPDOWN_ALL]}
                                    onChange={(e) => opts.filterCallback(e.value)}
                                    className="w-full text-sm"
                                    placeholder="All"
                                    showClear
                                />
                                <i className="pi pi-filter text-500" />
                            </div>
                        )}
                    />
                    <Column
                        field="fieldDirector"
                        header="FIELD DIRECTOR"
                        body={fdBody}
                        filter
                        style={{ minWidth: "11rem" }}
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <div className="flex align-items-center gap-1 w-full">
                                <Dropdown
                                    value={opts.value}
                                    options={[...DROPDOWN_ALL]}
                                    onChange={(e) => opts.filterCallback(e.value)}
                                    className="w-full text-sm"
                                    placeholder="All"
                                    showClear
                                />
                                <i className="pi pi-filter text-500" />
                            </div>
                        )}
                    />
                    <Column header="CONTACT INFO" body={contactBody} style={{ minWidth: "12rem" }} filter={false} />
                    <Column
                        field="addresses"
                        header="ADDRESSES"
                        body={addressBody}
                        filter
                        filterPlaceholder="Filter"
                        style={{ minWidth: "12rem" }}
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <div className="flex align-items-center gap-1 w-full">
                                <InputText
                                    value={opts.value ?? ""}
                                    onChange={(e) => opts.filterCallback(e.target.value)}
                                    className="w-full p-inputtext-sm"
                                    placeholder="Filter"
                                />
                                <i className="pi pi-filter text-500" />
                            </div>
                        )}
                    />
                    <Column
                        field="docsStatus"
                        header={docsHeader}
                        body={docsBody}
                        filter
                        style={{ minWidth: "14rem" }}
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <div className="flex flex-column gap-1 w-full">
                                <Button label="Advanced Filter" size="small" className="p-button-outlined w-full text-xs py-1" type="button" />
                                <div className="flex align-items-center gap-1">
                                    <Dropdown
                                        value={opts.value}
                                        options={[...DROPDOWN_ALL]}
                                        onChange={(e) => opts.filterCallback(e.value)}
                                        className="flex-grow-1 text-sm"
                                        placeholder="All"
                                        showClear
                                    />
                                    <i className="pi pi-filter text-500" />
                                </div>
                            </div>
                        )}
                    />
                    <Column
                        field="agentStatus"
                        header="AGENT STATUS"
                        filter
                        style={{ minWidth: "9rem" }}
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <div className="flex align-items-center gap-1 w-full">
                                <Dropdown
                                    value={opts.value}
                                    options={[...DROPDOWN_ALL, { label: "Active", value: "Active" }]}
                                    onChange={(e) => opts.filterCallback(e.value)}
                                    className="w-full text-sm"
                                    placeholder="All"
                                    showClear
                                />
                                <i className="pi pi-filter text-500" />
                            </div>
                        )}
                    />
                    <Column
                        field="agreementLabel"
                        header="AGREEMENT STATUS"
                        body={agreementBody}
                        filter
                        filterPlaceholder="Filter"
                        style={{ minWidth: "11rem" }}
                        showFilterMenu={false}
                        filterElement={(opts) => (
                            <div className="flex align-items-center gap-1 w-full">
                                <Dropdown
                                    value={opts.value}
                                    options={[...DROPDOWN_ALL]}
                                    onChange={(e) => opts.filterCallback(e.value)}
                                    className="w-full text-sm"
                                    placeholder="All"
                                    showClear
                                />
                                <i className="pi pi-filter text-500" />
                            </div>
                        )}
                    />
                    <Column header="ACTIONS" body={actionsBody} style={{ width: "6rem" }} filter={false} />
                </DataTable>
                    </>
                )}
            </div>

            <style jsx global>{`
                .team-agreements-row-pink td {
                    background-color: #fce7f3 !important;
                }
                .team-agreements-row-green td {
                    background-color: #dcfce7 !important;
                }
                .team-agreements-datatable .p-datatable-thead > tr > th {
                    background: #1e3a5f;
                    color: #fff;
                    font-weight: 600;
                    font-size: 0.7rem;
                    letter-spacing: 0.04em;
                    vertical-align: top;
                }
                .team-agreements-datatable .p-datatable-filter-row > td {
                    background: var(--surface-50);
                    vertical-align: middle;
                }
                .team-agreements-datatable.p-datatable .p-datatable-tbody > tr > td {
                    padding: 0.75rem 0.65rem;
                    vertical-align: top;
                }
            `}</style>
        </div>
    );
}
