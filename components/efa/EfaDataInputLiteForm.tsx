"use client";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { useState } from "react";

const PHONE_TYPES = [
    { label: "Cell", value: "cell" },
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
];

function PrefixField({
    prefix,
    suffixInfo,
    children,
}: {
    prefix: string;
    suffixInfo?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex align-items-stretch w-full border-1 surface-border border-round overflow-hidden">
            <span className="surface-200 flex align-items-center justify-content-center px-2 text-600 text-sm font-medium border-right-1 surface-border">
                {prefix}
            </span>
            <div className="flex-grow-1 flex align-items-center min-w-0">{children}</div>
            {suffixInfo !== false && (
                <span className="surface-100 flex align-items-center justify-content-center px-2 border-left-1 surface-border">
                    <i className="pi pi-info-circle text-500 text-sm" title="Information" />
                </span>
            )}
        </div>
    );
}

export default function EfaDataInputLiteForm() {
    const [phoneType, setPhoneType] = useState("cell");
    const [lifeExpectancy, setLifeExpectancy] = useState("82");
    const [incomeReplacement, setIncomeReplacement] = useState(true);
    const [finalExpenses, setFinalExpenses] = useState("10,000.00");

    return (
        <div className="efa-lite-form">
            <h1 className="text-3xl font-semibold text-900 m-0 mb-3">EFA LITE</h1>

            <div className="border-1 surface-border border-round p-3 mb-4 surface-50">
                <p className="text-700 m-0 line-height-3">
                    This is a quick insurance calculator. For the full data entry experience, use{" "}
                    <Link href="/agent/efa/data-input-full" className="text-primary font-semibold no-underline hover:underline">
                        EFA Data Input (full version)
                    </Link>
                    .
                </p>
            </div>

            <div className="surface-card border-round border-1 surface-border p-4 mb-4">
                <h2 className="text-xl font-semibold text-900 mt-0 mb-4">Personal Information</h2>
                <div className="flex flex-column gap-3">
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <InputText className="w-full" placeholder="" />
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">Middle Name</label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <InputText className="w-full" placeholder="" />
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <InputText className="w-full" placeholder="" />
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <div className="flex align-items-stretch gap-2">
                                <Dropdown
                                    value={phoneType}
                                    options={PHONE_TYPES}
                                    onChange={(e) => setPhoneType(e.value)}
                                    className="w-8rem"
                                    optionLabel="label"
                                    optionValue="value"
                                />
                                <InputText className="flex-grow-1" placeholder="Please enter phone" />
                                <Button icon="pi pi-plus" className="p-button-success" type="button" />
                            </div>
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Age <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <InputText className="w-full" keyfilter="int" placeholder="" />
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Life Expectancy <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <InputText
                                className="w-full"
                                value={lifeExpectancy}
                                onChange={(e) => setLifeExpectancy(e.target.value)}
                                keyfilter="int"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="surface-card border-round border-1 surface-border p-4 mb-4">
                <h2 className="text-xl font-semibold text-900 mt-0 mb-4">LIFE</h2>
                <div className="flex flex-column gap-3">
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Liability <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <PrefixField prefix="$">
                                <InputText className="w-full border-none shadow-none" placeholder="0.00" />
                            </PrefixField>
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Other Monthly Expenses <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <PrefixField prefix="$">
                                <InputText className="w-full border-none shadow-none" placeholder="0.00" />
                            </PrefixField>
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Income <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <PrefixField prefix="$">
                                <InputText className="w-full border-none shadow-none" placeholder="0.00" />
                            </PrefixField>
                        </div>
                    </div>
                    <div className="field m-0">
                        <div className="grid align-items-start">
                            <div className="col-12 md:col-4 lg:col-3">
                                <div className="flex align-items-center gap-2">
                                    <Checkbox
                                        inputId="income-replacement"
                                        checked={incomeReplacement}
                                        onChange={(e) => setIncomeReplacement(!!e.checked)}
                                    />
                                    <label htmlFor="income-replacement" className="font-medium text-900 cursor-pointer">
                                        Income Replacement
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 md:col-8 lg:col-9">
                                {incomeReplacement && (
                                    <div className="pl-0 md:pl-2 flex flex-column sm:flex-row gap-3 mt-2 md:mt-0">
                                        <div className="flex-grow-1">
                                            <PrefixField prefix="%">
                                                <InputText className="w-full border-none shadow-none" placeholder="" />
                                            </PrefixField>
                                        </div>
                                        <div className="flex-grow-1">
                                            <PrefixField prefix="YRS">
                                                <InputText className="w-full border-none shadow-none" placeholder="" />
                                            </PrefixField>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Final Expenses / Funeral Expenses <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <PrefixField prefix="$">
                                <InputText
                                    className="w-full border-none shadow-none"
                                    value={finalExpenses}
                                    onChange={(e) => setFinalExpenses(e.target.value)}
                                />
                            </PrefixField>
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">
                            Education <span className="text-red-500">*</span>
                        </label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <PrefixField prefix="$">
                                <InputText className="w-full border-none shadow-none" placeholder="0.00" />
                            </PrefixField>
                        </div>
                    </div>
                    <div className="field grid align-items-center m-0">
                        <label className="col-12 md:col-4 lg:col-3 font-medium text-900">Total for Income Replacement</label>
                        <div className="col-12 md:col-8 lg:col-9">
                            <PrefixField prefix="$">
                                <InputText
                                    readOnly
                                    value=""
                                    placeholder="—"
                                    className="w-full border-none shadow-none surface-100 opacity-90"
                                />
                            </PrefixField>
                        </div>
                    </div>
                </div>
                <div className="flex justify-content-end mt-4">
                    <Button label="CALCULATE" className="p-button-success" type="button" />
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-center text-xl font-semibold text-900 mb-3">Notes</h2>
                <div className="flex flex-column sm:flex-row justify-content-between align-items-stretch sm:align-items-center gap-2">
                    <Button label="ADD NOTE" className="p-button-success" type="button" />
                    <Button label="SAVE" className="p-button-success" type="button" />
                </div>
            </div>
        </div>
    );
}
