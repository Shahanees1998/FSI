"use client";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react";

const TOTAL_STEPS = 7;

const STEPS = [
    { title: "Contact Information", key: "contact" },
    { title: "Personal Information", key: "personal" },
    { title: "Home Address", key: "address" },
    { title: "Additional Details", key: "extra4" },
    { title: "Review", key: "extra5" },
    { title: "Confirmation", key: "extra6" },
    { title: "Complete", key: "extra7" },
];

const COUNTRY_OPTIONS = [{ label: "USA", value: "USA" }];

const RECRUITER_OPTIONS = [
    { label: "Jo Cleine Spinola (FS Code: A13713)", value: "a13713" },
    { label: "Select recruiter…", value: "" },
];

const STATE_OPTIONS = [
    { label: "Select State", value: "" },
    { label: "New York", value: "NY" },
    { label: "Florida", value: "FL" },
    { label: "California", value: "CA" },
    { label: "Texas", value: "TX" },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex justify-content-center align-items-center gap-2 md:gap-3 mt-4 flex-wrap" role="navigation" aria-label="Form steps">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                const stepNum = i + 1;
                const done = stepNum < currentStep;
                const active = stepNum === currentStep;

                if (done) {
                    return (
                        <span
                            key={i}
                            className="flex align-items-center justify-content-center border-circle bg-green-500 text-white"
                            style={{ width: "1.35rem", height: "1.35rem" }}
                            title={`Step ${stepNum} completed`}
                        >
                            <i className="pi pi-check text-xs" />
                        </span>
                    );
                }
                if (active) {
                    return (
                        <span
                            key={i}
                            className="border-circle flex-shrink-0 shadow-1"
                            style={{
                                width: "1.65rem",
                                height: "1.65rem",
                                background: "linear-gradient(180deg, #fb923c 0%, #ea580c 100%)",
                                border: "2px solid #fff",
                                boxShadow: "0 0 0 2px rgba(234, 88, 12, 0.35)",
                            }}
                            title={`Step ${stepNum} — current`}
                        />
                    );
                }
                return (
                    <span
                        key={i}
                        className="border-circle bg-gray-300 flex-shrink-0"
                        style={{ width: "0.65rem", height: "0.65rem", opacity: 0.7 }}
                        title={`Step ${stepNum}`}
                    />
                );
            })}
        </div>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return <label className="block text-sm font-bold text-700 mb-2">{children}</label>;
}

/** Responsive grid: full width on small screens, 2–3 columns on larger breakpoints. */
function FormGrid({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3 w-full">{children}</div>;
}

export default function AoaOnlineSignUpWizard() {
    const [step, setStep] = useState(1);
    const [legalAsPreferred, setLegalAsPreferred] = useState(false);
    const [splitRecruiting, setSplitRecruiting] = useState(false);
    const [country, setCountry] = useState("USA");
    const [recruiter, setRecruiter] = useState("a13713");
    const [residenceState, setResidenceState] = useState("");
    const [dob, setDob] = useState<Date | null>(null);

    const canBack = step > 1;

    const goNext = () => {
        if (step < TOTAL_STEPS) setStep((s) => s + 1);
    };
    const goBack = () => {
        if (canBack) setStep((s) => s - 1);
    };

    const cardClass =
        "surface-0 border-round-xl border-1 surface-border shadow-1 p-4 md:p-6 lg:p-8 w-full max-w-full";

    return (
        <div className="aoa-wizard surface-ground min-h-full w-full py-4 px-3 md:px-6 lg:px-8">
            <div className={cardClass}>
                <h2 className="text-center text-xl md:text-2xl font-bold text-800 m-0 mb-4">
                    {STEPS[step - 1]?.title ?? "AOA Online"}
                </h2>

                {step === 1 && (
                    <FormGrid>
                        <div>
                            <FieldLabel>First Legal Name</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="Kristin" />
                        </div>
                        <div>
                            <FieldLabel>Middle Legal Name</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="Elise" />
                        </div>
                        <div>
                            <FieldLabel>Last Legal Name</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="Simmons" />
                        </div>
                        <div className="col-span-full flex align-items-center gap-2">
                            <Checkbox
                                inputId="legal-preferred"
                                checked={legalAsPreferred}
                                onChange={(e) => setLegalAsPreferred(!!e.checked)}
                            />
                            <label htmlFor="legal-preferred" className="text-sm text-800 cursor-pointer">
                                Use my Legal Name as Preferred Name
                            </label>
                        </div>
                        <div>
                            <FieldLabel>First Preferred Name</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="Kristin" />
                        </div>
                        <div>
                            <FieldLabel>Last Preferred Name</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="Simmons" />
                        </div>
                        <div className="col-span-full md:col-span-2 xl:col-span-3">
                            <FieldLabel>Current email</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="example@experior.com" type="email" />
                        </div>
                        <div>
                            <FieldLabel>Country</FieldLabel>
                            <Dropdown
                                value={country}
                                options={COUNTRY_OPTIONS}
                                onChange={(e) => setCountry(e.value)}
                                className="w-full surface-100 border-none"
                                optionLabel="label"
                                optionValue="value"
                            />
                        </div>
                        <div className="md:col-span-1 xl:col-span-2">
                            <FieldLabel>Recruiter</FieldLabel>
                            <Dropdown
                                value={recruiter}
                                options={RECRUITER_OPTIONS.filter((o) => o.value !== "")}
                                onChange={(e) => setRecruiter(e.value)}
                                className="w-full surface-100 border-none"
                                optionLabel="label"
                                optionValue="value"
                                showClear
                                placeholder="Select recruiter"
                            />
                        </div>
                        <div className="col-span-full">
                            <FieldLabel>SSN / ITIN</FieldLabel>
                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 align-items-center">
                                <InputText className="w-full surface-100 border-none" placeholder="123123123" maxLength={9} />
                                <span className="text-600 font-semibold text-center sm:px-1">OR</span>
                                <InputText className="w-full surface-100 border-none" placeholder="123123123" maxLength={9} />
                            </div>
                        </div>
                        <div className="col-span-full flex align-items-center gap-2">
                            <Checkbox
                                inputId="split-recruiting"
                                checked={splitRecruiting}
                                onChange={(e) => setSplitRecruiting(!!e.checked)}
                            />
                            <label htmlFor="split-recruiting" className="text-sm text-800 cursor-pointer">
                                Split Recruiting
                            </label>
                        </div>
                        <p className="col-span-full text-xs text-600 line-height-3 m-0 mt-1">
                            After you click Continue, you will receive account credentials by email. You may unsubscribe from
                            future messages at any time using the link in those emails.
                        </p>
                    </FormGrid>
                )}

                {step === 2 && (
                    <FormGrid>
                        <div>
                            <FieldLabel>Phone number</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="" type="tel" />
                        </div>
                        <div>
                            <FieldLabel>Date Of Birth</FieldLabel>
                            <Calendar
                                value={dob}
                                onChange={(e) => setDob(e.value as Date | null)}
                                showIcon
                                dateFormat="mm/dd/yy"
                                placeholder="Select Date"
                                className="w-full"
                                inputClassName="w-full surface-100 border-none"
                            />
                        </div>
                    </FormGrid>
                )}

                {step === 3 && (
                    <FormGrid>
                        <div className="col-span-full md:col-span-2 xl:col-span-3">
                            <FieldLabel>Street Address</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="Enter Street" />
                        </div>
                        <div>
                            <FieldLabel>City name</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="Enter City" />
                        </div>
                        <div>
                            <FieldLabel>Residence State</FieldLabel>
                            <Dropdown
                                value={residenceState}
                                options={STATE_OPTIONS}
                                onChange={(e) => setResidenceState(e.value)}
                                className="w-full surface-100 border-none"
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Select State"
                            />
                        </div>
                        <div>
                            <FieldLabel>Zip code</FieldLabel>
                            <InputText className="w-full surface-100 border-none" placeholder="Enter Zip Code" />
                        </div>
                    </FormGrid>
                )}

                {step > 3 && (
                    <div className="text-center py-4">
                        <p className="text-600 m-0">
                            Step {step} — placeholder for remaining AOA flow. Use Continue to advance.
                        </p>
                    </div>
                )}

                <div className="flex flex-column sm:flex-row gap-2 justify-content-center mt-4">
                    {canBack && (
                        <Button
                            type="button"
                            label="Back"
                            className="p-button-outlined p-button-secondary"
                            onClick={goBack}
                        />
                    )}
                    {step < TOTAL_STEPS ? (
                        <Button
                            type="button"
                            label="Continue"
                            className={classNames("p-button-warning font-bold", !canBack ? "w-full" : "flex-grow-1")}
                            style={{ minWidth: "12rem" }}
                            onClick={goNext}
                        />
                    ) : (
                        <Button
                            type="button"
                            label="Finish"
                            className="p-button-warning font-bold w-full"
                            style={{ minWidth: "12rem" }}
                            onClick={() => {}}
                        />
                    )}
                </div>
                {step === TOTAL_STEPS && (
                    <p className="text-center text-sm text-600 mt-2 mb-0">You have reached the final step (UI only).</p>
                )}
            </div>

            <StepIndicator currentStep={step} />

            <p className="text-center text-xs text-500 mt-3 mb-0">
                Team · Recruiting · AOA (Online Sign Up) · Step {step} of {TOTAL_STEPS}
            </p>
        </div>
    );
}
