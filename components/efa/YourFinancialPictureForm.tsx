"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { useId } from "react";

function NativeCheckbox({ id }: { id: string }) {
    return <input id={id} type="checkbox" className="w-1rem h-1rem cursor-pointer align-middle" />;
}

function DollarInput({ id, className }: { id?: string; className?: string }) {
    return (
        <div className={`flex align-items-stretch border-1 surface-border border-round overflow-hidden ${className ?? ""}`}>
            <span className="surface-200 px-2 flex align-items-center text-600 text-sm font-medium border-right-1 surface-border">$</span>
            <InputText id={id} className="w-full border-none shadow-none" />
        </div>
    );
}

function YesNoPair({ baseId, label }: { baseId: string; label: string }) {
    return (
        <div className="flex align-items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-900">{label}</span>
            <div className="flex align-items-center gap-2">
                <NativeCheckbox id={`${baseId}-yes`} />
                <label htmlFor={`${baseId}-yes`} className="text-sm cursor-pointer">
                    YES
                </label>
            </div>
            <div className="flex align-items-center gap-2">
                <NativeCheckbox id={`${baseId}-no`} />
                <label htmlFor={`${baseId}-no`} className="text-sm cursor-pointer">
                    NO
                </label>
            </div>
        </div>
    );
}

function Watermark({
    children,
    className,
    style,
}: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <span
            className={`select-none pointer-events-none text-900 opacity-10 font-bold ${className ?? ""}`}
            style={{ fontSize: "clamp(3rem, 12vw, 6rem)", ...style }}
        >
            {children}
        </span>
    );
}

export default function YourFinancialPictureForm() {
    const uid = useId();

    return (
        <div className="your-financial-picture">
            <div className="surface-800 border-round-top p-3 flex flex-column sm:flex-row justify-content-between align-items-stretch sm:align-items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-white m-0 tracking-wide">YOUR FINANCIAL PICTURE</h1>
                <div className="flex align-items-center gap-2 justify-content-between sm:justify-content-end">
                    <div className="flex align-items-end gap-2 mr-2">
                        <label className="text-white text-sm font-semibold white-space-nowrap">AGENT #</label>
                        <InputText className="w-8rem" placeholder="" />
                    </div>
                    <div className="flex gap-1">
                        <Button type="button" icon="pi pi-pencil" rounded text className="text-white" aria-label="Edit" />
                        <Button type="button" icon="pi pi-download" rounded text className="text-white" aria-label="Download" />
                        <Button type="button" icon="pi pi-print" rounded text className="text-white" aria-label="Print" />
                    </div>
                </div>
            </div>

            <div
                className="border-1 surface-border border-top-none border-round-bottom p-3 md:p-4"
                style={{ background: "linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)" }}
            >
                {/* YOU + SPOUSE */}
                <div className="grid relative mb-4">
                    <div className="col-12 md:col-6 relative overflow-hidden">
                        <div className="absolute top-4 left-2 z-0">
                            <Watermark>YOU</Watermark>
                        </div>
                        <div className="relative z-1 surface-0 border-round border-1 surface-border p-3 shadow-1">
                            <h2 className="text-sm font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">YOU</h2>
                            <PersonColumn prefix={`${uid}-you`} />
                        </div>
                    </div>
                    <div className="col-12 md:col-6 relative overflow-hidden">
                        <div className="absolute top-4 left-2 z-0">
                            <Watermark>YOUR SPOUSE</Watermark>
                        </div>
                        <div className="relative z-1 surface-0 border-round border-1 surface-border p-3 shadow-1">
                            <h2 className="text-sm font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">YOUR SPOUSE</h2>
                            <PersonColumn prefix={`${uid}-spouse`} />
                        </div>
                    </div>
                </div>

                {/* FINANCIAL */}
                <div className="relative mb-4">
                    <div className="absolute bottom-2 left-2 z-0">
                        <Watermark style={{ opacity: 0.06 }}>FINANCIAL</Watermark>
                    </div>
                    <div className="relative z-1 surface-0 border-round border-1 surface-border p-3 md:p-4 shadow-1">
                        <h2 className="text-lg font-bold text-900 mt-0 mb-3">FINANCIAL</h2>
                        <div className="grid">
                            <div className="col-12 lg:col-4">
                                <YesNoPair baseId={`${uid}-home-owner`} label="HOME OWNER?" />
                                <div className="mt-2 mb-2">
                                    <label className="text-sm font-semibold block mb-1">LENDER</label>
                                    <InputText className="w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">HOMEOWNER INSURANCE PROVIDER</label>
                                    <InputText className="w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">VALUE OF HOME</label>
                                    <DollarInput />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">MORTGAGE AMOUNT</label>
                                    <DollarInput />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">MORTGAGE MONTHLY PAYMENT</label>
                                    <DollarInput />
                                </div>
                            </div>
                            <div className="col-12 lg:col-4">
                                <YesNoPair baseId={`${uid}-auto-loan`} label="AUTO LOAN?" />
                                <div className="mt-2 mb-2">
                                    <label className="text-sm font-semibold block mb-1">LENDER</label>
                                    <InputText className="w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">AUTO INSURANCE PROVIDER</label>
                                    <InputText className="w-full" />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">PAYMENT AMOUNT</label>
                                    <DollarInput />
                                </div>
                            </div>
                            <div className="col-12 lg:col-4">
                                <p className="text-sm text-900 line-height-3 mt-0 mb-3">
                                    Other Assets that you have available to offset the mortgage if something happens to you?
                                </p>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">SAVINGS / CDs</label>
                                    <DollarInput />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">MUTUAL FUNDS / STOCKS</label>
                                    <DollarInput />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">401K / IRA / ANNUITIES</label>
                                    <DollarInput />
                                </div>
                                <div className="mb-2">
                                    <label className="text-sm font-semibold block mb-1">NET WORTH</label>
                                    <DollarInput />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PERSONAL */}
                <div className="relative">
                    <div className="absolute bottom-2 left-2 z-0">
                        <Watermark style={{ opacity: 0.06 }}>PERSONAL</Watermark>
                    </div>
                    <div className="relative z-1 surface-0 border-round border-1 surface-border p-3 md:p-4 shadow-1">
                        <h2 className="text-lg font-bold text-900 mt-0 mb-2">PERSONAL</h2>
                        <p className="text-sm font-semibold text-900 line-height-3 mb-3">
                            Any Health Concerns? Major Operations? Hospitalization last 5 yrs? Medications?
                        </p>
                        <div className="grid">
                            <div className="col-12 lg:col-6">
                                <label className="text-sm font-semibold block mb-2">What Type of Health Issue:</label>
                                {[0, 1, 2, 3].map((i) => (
                                    <InputText key={i} className="w-full mb-2" />
                                ))}
                            </div>
                            <div className="col-12 lg:col-6">
                                <label className="text-sm font-semibold block mb-2">Medications</label>
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div key={i} className="grid mb-2">
                                        <div className="col-12 md:col-5">
                                            <span className="text-xs text-600">Med:</span>
                                            <InputText className="w-full" placeholder="" />
                                        </div>
                                        <div className="col-12 md:col-7">
                                            <span className="text-xs text-600">Reason for taking:</span>
                                            <InputText className="w-full" placeholder="" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-3 mb-3">
                            <label className="text-sm font-semibold block mb-1">Children:</label>
                            <InputText className="w-full" />
                        </div>
                        <div className="flex flex-column gap-3">
                            <YesNoPair baseId={`${uid}-criminal`} label="Any criminal or driving record concerns?" />
                            <YesNoPair baseId={`${uid}-application`} label="Would you like us to complete Application?" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 p-3 surface-0 border-round border-1 surface-border">
                    <p className="text-sm text-900 line-height-3 m-0 mb-3">
                        We will talk more about retirement in detail later. The reason I ask is I have a partner that helps my
                        clients meet their goals. All I ask is that when he calls you, please give him the same courteous
                        attention that you gave me. Can you do that for me?
                    </p>
                    <div className="flex align-items-center gap-2 flex-wrap">
                        {[0, 1, 2, 3].map((i) => (
                            <span key={i} className="flex align-items-center gap-2">
                                <InputText className="w-4rem text-center" maxLength={4} inputMode="numeric" />
                                {i < 3 && <span className="text-600">—</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-3 px-1">
                <Link href="#" className="text-primary font-semibold no-underline hover:underline" onClick={(e) => e.preventDefault()}>
                    Download Fillable PDF
                </Link>
                <Link href="#" className="text-primary font-semibold no-underline hover:underline" onClick={(e) => e.preventDefault()}>
                    Download Spanish Version PDF
                </Link>
            </div>
        </div>
    );
}

function PersonColumn({ prefix }: { prefix: string }) {
    return (
        <div className="flex flex-column gap-2">
            <div>
                <label className="text-xs font-semibold text-900 block mb-1">NAME</label>
                <InputText className="w-full" />
            </div>
            <div className="grid">
                <div className="col-12 md:col-4">
                    <label className="text-xs block mb-1">DOB</label>
                    <InputText className="w-full" />
                </div>
                <div className="col-12 md:col-4">
                    <label className="text-xs block mb-1">HEIGHT</label>
                    <InputText className="w-full" />
                </div>
                <div className="col-12 md:col-4">
                    <label className="text-xs block mb-1">WEIGHT</label>
                    <InputText className="w-full" />
                </div>
            </div>
            <YesNoPair baseId={`${prefix}-tobacco`} label="TOBACCO" />
            <div>
                <label className="text-xs font-semibold block mb-1">ADDRESS</label>
                <InputText className="w-full" />
            </div>
            <div className="grid">
                <div className="col-12 md:col-6">
                    <label className="text-xs block mb-1">CITY</label>
                    <InputText className="w-full" />
                </div>
                <div className="col-6 md:col-3">
                    <label className="text-xs block mb-1">STATE</label>
                    <InputText className="w-full" />
                </div>
                <div className="col-6 md:col-3">
                    <label className="text-xs block mb-1">ZIP</label>
                    <InputText className="w-full" />
                </div>
            </div>
            <div>
                <label className="text-xs font-semibold block mb-1">EMPLOYER</label>
                <InputText className="w-full" />
            </div>
            <div>
                <label className="text-xs font-semibold block mb-1">LENGTH</label>
                <InputText className="w-full" placeholder="yrs" />
            </div>
            <div>
                <label className="text-xs font-semibold block mb-1">INCOME</label>
                <DollarInput />
            </div>
            <YesNoPair baseId={`${prefix}-retired`} label="RETIRED" />
            <div>
                <label className="text-xs font-semibold block mb-1">LIFE POLICIES (FACE VALUE)</label>
                <DollarInput />
            </div>
            <div>
                <p className="text-xs font-semibold m-0 mb-1">Policy Type (CHECK ALL THAT APPLY)</p>
                <div className="flex flex-wrap gap-3">
                    <div className="flex align-items-center gap-2">
                        <NativeCheckbox id={`${prefix}-term`} />
                        <label htmlFor={`${prefix}-term`} className="text-sm cursor-pointer">
                            TERM
                        </label>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <NativeCheckbox id={`${prefix}-whole`} />
                        <label htmlFor={`${prefix}-whole`} className="text-sm cursor-pointer">
                            WHOLE
                        </label>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <NativeCheckbox id={`${prefix}-iul`} />
                        <label htmlFor={`${prefix}-iul`} className="text-sm cursor-pointer">
                            IUL
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <label className="text-xs font-semibold block mb-1">HEALTH INSURANCE PROVIDER</label>
                <InputText className="w-full" />
            </div>
        </div>
    );
}
