"use client";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useMemo, useState } from "react";

export type EscrowTransactionRow = {
    id: string;
    at: Date;
    description: string;
    outstandingBalance: number;
    recommendedSize: number;
    deposit: number;
};

function money(n: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);
}

function formatDateTime(d: Date) {
    return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}

function buildTransactions(): EscrowTransactionRow[] {
    const rows: EscrowTransactionRow[] = [];
    const newest = new Date(2026, 3, 9, 12, 7, 12);
    const startOutstanding = 953.13;
    const endOutstanding = 1.36;
    const startRec = 1232.53;
    const endRec = 500;

    for (let i = 0; i < 32; i++) {
        const t = new Date(newest);
        t.setHours(t.getHours() - i * 5 - (i % 3) * 2);
        t.setDate(t.getDate() - Math.floor(i / 2));

        const progress = i / 31;
        const outstanding = startOutstanding - (startOutstanding - endOutstanding) * progress + (i % 2 === 0 ? 0.02 : -0.01);
        const recommended = startRec - (startRec - endRec) * progress + (i % 3 === 0 ? 15 : i % 3 === 1 ? -8 : 0);
        const isPayment = i % 2 === 0;
        const deposit = isPayment ? Math.max(0, 5 + (i % 7) * 12.37 + (i % 4) * 3.1) : 0;

        rows.push({
            id: `esc-${i}`,
            at: t,
            description: isPayment
                ? "Percentage of the payment of the report."
                : "After recounting the recommended amount, it was increased.",
            outstandingBalance: Math.round(outstanding * 100) / 100,
            recommendedSize: Math.round(recommended * 100) / 100,
            deposit: Math.round(deposit * 100) / 100,
        });
    }

    return rows;
}

const ALL_TRANSACTIONS = buildTransactions();

const SUMMARY = {
    userName: "Jo Cleine Spinola",
    userCode: "JO SPI-A13713",
    monthlyPct: "1%",
    recommendedSize: 1232.53,
    balance: 953.13,
};

export default function EscrowAccountView() {
    const [first, setFirst] = useState(0);
    const [pageSize, setPageSize] = useState(20);

    const total = ALL_TRANSACTIONS.length;
    const pageRows = useMemo(() => ALL_TRANSACTIONS.slice(first, first + pageSize), [first, pageSize]);

    const start = total === 0 ? 0 : first + 1;
    const end = Math.min(first + pageSize, total);
    const rangeLabel = total === 0 ? "Showing 0 of 0 items." : `Showing ${start}–${end} of ${total} items.`;

    const depositBody = (row: EscrowTransactionRow) =>
        row.deposit > 0 ? (
            <span className="text-green-700 font-semibold">{money(row.deposit)}</span>
        ) : (
            <span className="text-700">{money(0)}</span>
        );

    const indexBody = (_: EscrowTransactionRow, options: { rowIndex: number }) => <span>{first + options.rowIndex + 1}</span>;

    return (
        <div className="escrow-account-view surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-3 md:p-4 lg:p-5">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Escrow Account</h1>

                <div className="border-1 surface-border border-round-lg overflow-hidden mb-4" style={{ maxWidth: "36rem" }}>
                    <div className="flex border-bottom-1 surface-border">
                        <div className="w-12rem md:w-14rem p-3 font-bold text-sm" style={{ background: "#fde047" }}>
                            USER
                        </div>
                        <div className="flex-1 p-3 bg-white">
                            <div className="font-semibold text-900">{SUMMARY.userName}</div>
                            <div className="text-700 text-sm">{SUMMARY.userName}</div>
                            <div className="text-600 text-sm">[{SUMMARY.userCode}]</div>
                        </div>
                    </div>
                    <div className="flex border-bottom-1 surface-border">
                        <div className="w-12rem md:w-14rem p-3 font-bold text-sm" style={{ background: "#fde047" }}>
                            MONTHLY PERCENTAGE PAYMENT
                        </div>
                        <div className="flex-1 p-3 bg-white font-medium text-900">{SUMMARY.monthlyPct}</div>
                    </div>
                    <div className="flex border-bottom-1 surface-border">
                        <div className="w-12rem md:w-14rem p-3 font-bold text-sm" style={{ background: "#fde047" }}>
                            RECOMMENDED SIZE
                        </div>
                        <div className="flex-1 p-3 bg-white font-medium text-900">{money(SUMMARY.recommendedSize)}</div>
                    </div>
                    <div className="flex">
                        <div className="w-12rem md:w-14rem p-3 font-bold text-sm" style={{ background: "#fde047" }}>
                            BALANCE
                        </div>
                        <div className="flex-1 p-3 bg-white font-semibold text-900">{money(SUMMARY.balance)}</div>
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-900 m-0 mb-2">Total {total} items.</h2>
                <p className="text-600 text-sm m-0 mb-2">{rangeLabel}</p>

                <DataTable value={pageRows} dataKey="id" className="p-datatable-sm escrow-transactions-table mb-3" stripedRows scrollable scrollHeight="55vh">
                    <Column header="#" body={indexBody} style={{ width: "3rem" }} />
                    <Column field="at" header="DATE" body={(r: EscrowTransactionRow) => formatDateTime(r.at)} style={{ minWidth: "11rem" }} />
                    <Column field="description" header="DESCRIPTION" style={{ minWidth: "16rem" }} />
                    <Column
                        field="outstandingBalance"
                        header="OUTSTANDING BALANCE"
                        body={(r) => money(r.outstandingBalance)}
                        style={{ minWidth: "9rem" }}
                    />
                    <Column field="recommendedSize" header="RECOMMENDED SIZE" body={(r) => money(r.recommendedSize)} style={{ minWidth: "9rem" }} />
                    <Column field="deposit" header="DEPOSIT" body={depositBody} style={{ minWidth: "7rem" }} />
                </DataTable>

                <div className="flex flex-wrap justify-content-between align-items-center gap-3 border-top-1 surface-border pt-3">
                    <span className="text-600 text-sm">{rangeLabel}</span>
                    <Paginator
                        first={first}
                        rows={pageSize}
                        totalRecords={total}
                        onPageChange={(e) => {
                            if (e.rows !== pageSize) {
                                setPageSize(e.rows);
                                setFirst(0);
                            } else {
                                setFirst(e.first);
                            }
                        }}
                        rowsPerPageOptions={[10, 20, 32]}
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    />
                </div>

                <p className="text-600 text-xs m-0 mt-3">
                    Sample escrow activity for layout; connect to ledger services for live balances and audit history.
                </p>
            </div>

            <style jsx global>{`
                .escrow-transactions-table .p-datatable-thead > tr > th {
                    background: #fde047 !important;
                    color: #1c1917 !important;
                    font-weight: 700 !important;
                    font-size: 0.72rem !important;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                    border-color: #e7e5e4 !important;
                    padding: 0.55rem 0.65rem !important;
                }
                .escrow-transactions-table .p-datatable-tbody > tr > td {
                    padding: 0.5rem 0.65rem !important;
                    font-size: 0.875rem;
                    vertical-align: top;
                }
            `}</style>
        </div>
    );
}
