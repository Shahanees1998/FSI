"use client";

import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useState } from "react";

const GENDER = [
    { label: "", value: "" },
    { label: "M", value: "M" },
    { label: "F", value: "F" },
];

const MARITAL = [
    { label: "", value: "" },
    { label: "Single", value: "Single" },
    { label: "Married", value: "Married" },
    { label: "Divorced", value: "Divorced" },
    { label: "Separated", value: "Separated" },
    { label: "Widow", value: "Widow" },
];

const YES_NO = [
    { label: "—", value: "" },
    { label: "Y", value: "Y" },
    { label: "N", value: "N" },
];

function Labeled({
    label,
    className,
    children,
}: {
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={classNames("field mb-2", className)}>
            <label className="block text-xs font-semibold text-800 mb-1">{label}</label>
            {children}
        </div>
    );
}

function TextField({ id, placeholder, type }: { id: string; placeholder?: string; type?: string }) {
    return <InputText id={id} type={type} className="w-full p-inputtext-sm" placeholder={placeholder} />;
}

export default function PreApplicationInfoForm() {
    const [ownerSame, setOwnerSame] = useState<string | null>(null);
    const [usCitizen, setUsCitizen] = useState<string | null>(null);
    const [ownerUsCitizen, setOwnerUsCitizen] = useState<string | null>(null);
    const [smoker, setSmoker] = useState<string | null>(null);
    const [replacement, setReplacement] = useState<string | null>(null);
    const [exchange1035, setExchange1035] = useState<string | null>(null);
    const [criminal, setCriminal] = useState<string | null>(null);
    const [primaryDob, setPrimaryDob] = useState<Date | null>(null);
    const [ownerDob, setOwnerDob] = useState<Date | null>(null);

    return (
        <div className="pre-application-info-form max-w-screen-xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-900 text-center m-0 mb-4 pb-3 border-bottom-2 surface-border">
                PRE-APPLICATION INFORMATION
            </h1>

            {/* Primary insured */}
            <section className="surface-card border-1 surface-border border-round p-3 md:p-4 mb-3">
                <h2 className="text-lg font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">Primary insured</h2>
                <div className="grid">
                    <Labeled label="First name" className="col-12 md:col-4">
                        <TextField id="pi-fn" />
                    </Labeled>
                    <Labeled label="Middle name" className="col-12 md:col-4">
                        <TextField id="pi-mn" />
                    </Labeled>
                    <Labeled label="Last name" className="col-12 md:col-4">
                        <TextField id="pi-ln" />
                    </Labeled>
                    <Labeled label="DOB" className="col-12 md:col-4">
                        <Calendar
                            value={primaryDob}
                            onChange={(e) => setPrimaryDob(e.value as Date | null)}
                            showIcon
                            className="w-full"
                            inputClassName="p-inputtext-sm w-full"
                            dateFormat="mm/dd/yy"
                        />
                    </Labeled>
                    <Labeled label="Age" className="col-12 md:col-4">
                        <TextField id="pi-age" />
                    </Labeled>
                    <Labeled label="Gender" className="col-12 md:col-4">
                        <select id="pi-gender" className="p-inputtext p-inputtext-sm w-full border-round" defaultValue="">
                            {GENDER.map((o) => (
                                <option key={o.value || "empty"} value={o.value}>
                                    {o.label || "M/F"}
                                </option>
                            ))}
                        </select>
                    </Labeled>
                    <Labeled label="SSN" className="col-12 md:col-4">
                        <TextField id="pi-ssn" placeholder="###-##-####" />
                    </Labeled>
                    <Labeled label="Is the owner the same" className="col-12 md:col-6">
                        <div className="flex align-items-center gap-3 flex-wrap">
                            <span className="text-sm">(Y) / (N)</span>
                            <div className="flex align-items-center gap-2">
                                <input id="owner-same-y" name="ownerSame" type="radio" value="Y" checked={ownerSame === "Y"} onChange={(e) => setOwnerSame(e.target.value)} />
                                <label htmlFor="owner-same-y" className="text-sm">
                                    Y
                                </label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <input id="owner-same-n" name="ownerSame" type="radio" value="N" checked={ownerSame === "N"} onChange={(e) => setOwnerSame(e.target.value)} />
                                <label htmlFor="owner-same-n" className="text-sm">
                                    N
                                </label>
                            </div>
                        </div>
                    </Labeled>
                    <Labeled label="Height" className="col-12 md:col-4">
                        <TextField id="pi-height" />
                    </Labeled>
                    <Labeled label="Weight" className="col-12 md:col-4">
                        <TextField id="pi-weight" />
                    </Labeled>
                    <Labeled label="Driver license #" className="col-12 md:col-4">
                        <TextField id="pi-dl" />
                    </Labeled>
                    <Labeled label="Exp date" className="col-12 md:col-4">
                        <TextField id="pi-dl-exp" />
                    </Labeled>
                    <Labeled label="Type of visa" className="col-12 md:col-4">
                        <TextField id="pi-visa-type" />
                    </Labeled>
                    <Labeled label="Visa number" className="col-12 md:col-4">
                        <TextField id="pi-visa" />
                    </Labeled>
                    <Labeled label="U.S. Citizen" className="col-12 md:col-6">
                        <div className="flex align-items-center gap-3 flex-wrap">
                            <div className="flex align-items-center gap-2">
                                <input id="usc-y" name="usc" type="radio" value="Y" checked={usCitizen === "Y"} onChange={(e) => setUsCitizen(e.target.value)} />
                                <label htmlFor="usc-y" className="text-sm">
                                    Y
                                </label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <input id="usc-n" name="usc" type="radio" value="N" checked={usCitizen === "N"} onChange={(e) => setUsCitizen(e.target.value)} />
                                <label htmlFor="usc-n" className="text-sm">
                                    N
                                </label>
                            </div>
                        </div>
                    </Labeled>
                    <Labeled label="How long in the country" className="col-12 md:col-4">
                        <TextField id="pi-country-time" />
                    </Labeled>
                    <Labeled label="Place of birth" className="col-12 md:col-4">
                        <TextField id="pi-pob" />
                    </Labeled>
                    <Labeled label="Smoker status" className="col-12 md:col-6">
                        <div className="flex align-items-center gap-3">
                            <div className="flex align-items-center gap-2">
                                <input id="sm-s" name="smoker" type="radio" value="smoker" checked={smoker === "smoker"} onChange={(e) => setSmoker(e.target.value)} />
                                <label htmlFor="sm-s" className="text-sm">
                                    Smoker
                                </label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <input id="sm-ns" name="smoker" type="radio" value="non" checked={smoker === "non"} onChange={(e) => setSmoker(e.target.value)} />
                                <label htmlFor="sm-ns" className="text-sm">
                                    Non-Smoker
                                </label>
                            </div>
                        </div>
                    </Labeled>
                    <Labeled label="Home address (cannot be a P.O. Box)" className="col-12">
                        <TextField id="pi-addr" />
                    </Labeled>
                    <Labeled label="How long at address" className="col-12 md:col-4">
                        <TextField id="pi-addr-time" />
                    </Labeled>
                    <Labeled label="Status" className="col-12 md:col-4">
                        <select id="pi-status" className="p-inputtext p-inputtext-sm w-full border-round" defaultValue="">
                            {MARITAL.map((o) => (
                                <option key={o.value || "m0"} value={o.value}>
                                    {o.label || "Select"}
                                </option>
                            ))}
                        </select>
                    </Labeled>
                    <Labeled label="Phone #" className="col-12 md:col-4">
                        <TextField id="pi-phone" />
                    </Labeled>
                    <Labeled label="Email" className="col-12 md:col-6">
                        <TextField id="pi-email" type="email" />
                    </Labeled>
                </div>
            </section>

            {/* Policy owner */}
            <section className="surface-card border-1 surface-border border-round p-3 md:p-4 mb-3">
                <h2 className="text-lg font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">
                    POLICY OWNER INFO: (IF NOT THE SAME)
                </h2>
                <div className="grid">
                    <Labeled label="First name" className="col-12 md:col-4">
                        <TextField id="po-fn" />
                    </Labeled>
                    <Labeled label="Middle name" className="col-12 md:col-4">
                        <TextField id="po-mn" />
                    </Labeled>
                    <Labeled label="Last name" className="col-12 md:col-4">
                        <TextField id="po-ln" />
                    </Labeled>
                    <Labeled label="DOB" className="col-12 md:col-4">
                        <Calendar
                            value={ownerDob}
                            onChange={(e) => setOwnerDob(e.value as Date | null)}
                            showIcon
                            className="w-full"
                            inputClassName="p-inputtext-sm w-full"
                            dateFormat="mm/dd/yy"
                        />
                    </Labeled>
                    <Labeled label="Age" className="col-12 md:col-4">
                        <TextField id="po-age" />
                    </Labeled>
                    <Labeled label="Gender (M/F)" className="col-12 md:col-4">
                        <select id="po-gender" className="p-inputtext p-inputtext-sm w-full border-round" defaultValue="">
                            {GENDER.map((o) => (
                                <option key={`po-${o.value}`} value={o.value}>
                                    {o.label || "—"}
                                </option>
                            ))}
                        </select>
                    </Labeled>
                    <Labeled label="SSN" className="col-12 md:col-4">
                        <TextField id="po-ssn" />
                    </Labeled>
                    <Labeled label="Place of birth" className="col-12 md:col-4">
                        <TextField id="po-pob" />
                    </Labeled>
                    <Labeled label="Driver license #" className="col-12 md:col-4">
                        <TextField id="po-dl" />
                    </Labeled>
                    <Labeled label="Exp date" className="col-12 md:col-4">
                        <TextField id="po-dl-exp" />
                    </Labeled>
                    <Labeled label="U.S. Citizen (Y) / (N)" className="col-12 md:col-6">
                        <div className="flex align-items-center gap-2">
                            <input id="po-usc-y" name="poUsc" type="radio" value="Y" checked={ownerUsCitizen === "Y"} onChange={(e) => setOwnerUsCitizen(e.target.value)} />
                            <label htmlFor="po-usc-y" className="text-sm mr-3">
                                Y
                            </label>
                            <input id="po-usc-n" name="poUsc" type="radio" value="N" checked={ownerUsCitizen === "N"} onChange={(e) => setOwnerUsCitizen(e.target.value)} />
                            <label htmlFor="po-usc-n" className="text-sm">
                                N
                            </label>
                        </div>
                    </Labeled>
                    <Labeled label="How long in the country" className="col-12 md:col-4">
                        <TextField id="po-country" />
                    </Labeled>
                    <Labeled label="Visa #" className="col-12 md:col-4">
                        <TextField id="po-visa" />
                    </Labeled>
                    <Labeled label="Email" className="col-12 md:col-4">
                        <TextField id="po-email" />
                    </Labeled>
                    <Labeled label="Phone #" className="col-12 md:col-4">
                        <TextField id="po-phone" />
                    </Labeled>
                    <Labeled label="Home address (cannot be a P.O. Box)" className="col-12">
                        <TextField id="po-addr" />
                    </Labeled>
                    <Labeled label="Relationship to the proposed primary insured" className="col-12 md:col-6">
                        <TextField id="po-rel" />
                    </Labeled>
                    <Labeled label="Annual income" className="col-12 md:col-4">
                        <TextField id="po-inc" />
                    </Labeled>
                    <Labeled label="Net worth" className="col-12 md:col-4">
                        <TextField id="po-nw" />
                    </Labeled>
                </div>
            </section>

            {/* Existing insurance */}
            <section className="surface-card border-1 surface-border border-round p-3 md:p-4 mb-3">
                <h2 className="text-lg font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">EXISTING INSURANCE</h2>
                <div className="grid">
                    <Labeled label="Carrier" className="col-12 md:col-4">
                        <TextField id="ex-carrier" />
                    </Labeled>
                    <Labeled label="Product type" className="col-12 md:col-4">
                        <TextField id="ex-product" />
                    </Labeled>
                    <Labeled label="Year issued" className="col-12 md:col-4">
                        <TextField id="ex-year" />
                    </Labeled>
                    <Labeled label="Replacement" className="col-12 md:col-6">
                        <div className="flex align-items-center gap-2">
                            <span className="text-sm mr-2">yes or no</span>
                            <input id="rep-y" name="rep" type="radio" value="yes" checked={replacement === "yes"} onChange={(e) => setReplacement(e.target.value)} />
                            <label htmlFor="rep-y" className="text-sm mr-2">
                                Yes
                            </label>
                            <input id="rep-n" name="rep" type="radio" value="no" checked={replacement === "no"} onChange={(e) => setReplacement(e.target.value)} />
                            <label htmlFor="rep-n" className="text-sm">
                                No
                            </label>
                        </div>
                    </Labeled>
                    <Labeled label="1035 Exchange — yes or no; if yes, list amount below" className="col-12">
                        <div className="flex flex-column gap-2">
                            <div className="flex align-items-center gap-2 flex-wrap">
                                <input id="ex1035-y" name="ex1035" type="radio" value="yes" checked={exchange1035 === "yes"} onChange={(e) => setExchange1035(e.target.value)} />
                                <label htmlFor="ex1035-y" className="text-sm">
                                    Yes
                                </label>
                                <input id="ex1035-n" name="ex1035" type="radio" value="no" checked={exchange1035 === "no"} onChange={(e) => setExchange1035(e.target.value)} />
                                <label htmlFor="ex1035-n" className="text-sm">
                                    No
                                </label>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-800 mb-1">If yes, please list amount</label>
                                <TextField id="ex1035-amt" />
                            </div>
                        </div>
                    </Labeled>
                </div>
            </section>

            {/* Employment */}
            <section className="surface-card border-1 surface-border border-round p-3 md:p-4 mb-3">
                <h2 className="text-lg font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">EMPLOYMENT INFORMATION</h2>
                <div className="grid">
                    <Labeled label="Employer name" className="col-12 md:col-6">
                        <TextField id="emp-name" />
                    </Labeled>
                    <Labeled label="Phone #" className="col-12 md:col-4">
                        <TextField id="emp-phone" />
                    </Labeled>
                    <Labeled label="Employer address" className="col-12">
                        <TextField id="emp-addr" />
                    </Labeled>
                    <Labeled label="City" className="col-12 md:col-4">
                        <TextField id="emp-city" />
                    </Labeled>
                    <Labeled label="State" className="col-12 md:col-4">
                        <TextField id="emp-state" />
                    </Labeled>
                    <Labeled label="Zip code" className="col-12 md:col-4">
                        <TextField id="emp-zip" />
                    </Labeled>
                    <Labeled label="How long (at job)" className="col-12 md:col-4">
                        <TextField id="emp-time" />
                    </Labeled>
                    <Labeled label="Type of business" className="col-12 md:col-4">
                        <TextField id="emp-biz" />
                    </Labeled>
                    <Labeled label="Position" className="col-12 md:col-4">
                        <TextField id="emp-pos" />
                    </Labeled>
                    <Labeled label="Annual income" className="col-12 md:col-4">
                        <TextField id="emp-inc" />
                    </Labeled>
                    <Labeled label="Net worth" className="col-12 md:col-4">
                        <TextField id="emp-nw" />
                    </Labeled>
                </div>
            </section>

            {/* Doctor */}
            <section className="surface-card border-1 surface-border border-round p-3 md:p-4 mb-3">
                <h2 className="text-lg font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">DOCTOR INFORMATION</h2>
                <div className="grid">
                    <Labeled label="Primary doctor name" className="col-12 md:col-6">
                        <TextField id="doc-name" />
                    </Labeled>
                    <Labeled label="Phone #" className="col-12 md:col-4">
                        <TextField id="doc-phone" />
                    </Labeled>
                    <Labeled label="Doctor address" className="col-12">
                        <TextField id="doc-addr" />
                    </Labeled>
                    <Labeled label="City" className="col-12 md:col-4">
                        <TextField id="doc-city" />
                    </Labeled>
                    <Labeled label="State" className="col-12 md:col-4">
                        <TextField id="doc-state" />
                    </Labeled>
                    <Labeled label="Zip code" className="col-12 md:col-4">
                        <TextField id="doc-zip" />
                    </Labeled>
                    <Labeled label="Any medical conditions" className="col-12">
                        <InputTextarea id="doc-cond" className="w-full p-inputtext-sm" rows={3} />
                    </Labeled>
                    <Labeled label="Medications" className="col-12">
                        <InputTextarea id="doc-med" className="w-full p-inputtext-sm" rows={2} />
                    </Labeled>
                    <Labeled label="Date last visit" className="col-12 md:col-4">
                        <TextField id="doc-last" />
                    </Labeled>
                    <Labeled label="Results" className="col-12 md:col-8">
                        <InputTextarea id="doc-res" className="w-full p-inputtext-sm" rows={2} />
                    </Labeled>
                </div>
            </section>

            {/* Criminal */}
            <section className="surface-card border-1 surface-border border-round p-3 md:p-4 mb-3">
                <h2 className="text-lg font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">CRIMINAL BACKGROUND</h2>
                <p className="text-sm text-800 m-0 mb-2">
                    Any felonies, misdemeanors, DUI&apos;s, or license suspensions ever: Circle: (Y) OR (N)
                </p>
                <div className="flex align-items-center gap-3 mb-3">
                    <input id="crim-y" name="crim" type="radio" value="Y" checked={criminal === "Y"} onChange={(e) => setCriminal(e.target.value)} />
                    <label htmlFor="crim-y" className="text-sm">
                        Y
                    </label>
                    <input id="crim-n" name="crim" type="radio" value="N" checked={criminal === "N"} onChange={(e) => setCriminal(e.target.value)} />
                    <label htmlFor="crim-n" className="text-sm">
                        N
                    </label>
                </div>
                <Labeled label="If yes, please explain">
                    <InputTextarea id="crim-exp" className="w-full p-inputtext-sm" rows={4} placeholder="" />
                </Labeled>
            </section>

            {/* Beneficiaries */}
            <section className="surface-card border-1 surface-border border-round p-3 md:p-4 mb-3 overflow-x-auto">
                <h2 className="text-lg font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">BENEFICIARIES</h2>
                <table className="w-full text-sm border-collapse" style={{ minWidth: "640px" }}>
                    <thead>
                        <tr className="surface-100">
                            <th className="text-left p-2 border-1 surface-border">Full name</th>
                            <th className="text-left p-2 border-1 surface-border w-6rem">%</th>
                            <th className="text-left p-2 border-1 surface-border">Relationship</th>
                            <th className="text-left p-2 border-1 surface-border">DOB</th>
                            <th className="text-left p-2 border-1 surface-border">Primary or secondary</th>
                            <th className="text-left p-2 border-1 surface-border">Address</th>
                            <th className="text-left p-2 border-1 surface-border">SSN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 1].map((row) => (
                            <tr key={row}>
                                <td className="p-1 border-1 surface-border">
                                    <InputText className="w-full p-inputtext-sm" />
                                </td>
                                <td className="p-1 border-1 surface-border">
                                    <InputText className="w-full p-inputtext-sm" />
                                </td>
                                <td className="p-1 border-1 surface-border">
                                    <InputText className="w-full p-inputtext-sm" />
                                </td>
                                <td className="p-1 border-1 surface-border">
                                    <InputText className="w-full p-inputtext-sm" placeholder="mm/dd/yyyy" />
                                </td>
                                <td className="p-1 border-1 surface-border">
                                    <InputText className="w-full p-inputtext-sm" />
                                </td>
                                <td className="p-1 border-1 surface-border">
                                    <InputText className="w-full p-inputtext-sm" />
                                </td>
                                <td className="p-1 border-1 surface-border">
                                    <InputText className="w-full p-inputtext-sm" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Bank */}
            <section className="surface-card border-1 surface-border border-round p-3 md:p-4 mb-3">
                <h2 className="text-lg font-bold text-900 mt-0 mb-3 border-bottom-1 surface-border pb-2">BANK INFORMATION</h2>
                <div className="grid">
                    <Labeled label="Bank name" className="col-12 md:col-4">
                        <TextField id="bank-name" />
                    </Labeled>
                    <Labeled label="Routing #" className="col-12 md:col-4">
                        <TextField id="bank-route" />
                    </Labeled>
                    <Labeled label="Draft date" className="col-12 md:col-4">
                        <TextField id="bank-draft" />
                    </Labeled>
                </div>
            </section>
        </div>
    );
}
