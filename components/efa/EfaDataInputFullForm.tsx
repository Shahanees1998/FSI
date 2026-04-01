"use client";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import { useCallback, useId, useMemo, useState } from "react";

const PHONE_TYPES = [
    { label: "Cell", value: "cell" },
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
];

const COUNTRIES = [{ label: "USA", value: "USA" }];

const US_STATES = [
    { label: "Select State", value: "" },
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "California", value: "CA" },
    { label: "Texas", value: "TX" },
    { label: "New York", value: "NY" },
];

function IconInput({
    icon,
    children,
    className,
}: {
    icon: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span className={classNames("p-input-icon-left w-full", className)}>
            <i className={classNames("pi", icon)} />
            {children}
        </span>
    );
}

type PersonMiniFormProps = {
    formId: string;
    title: string;
    showRemove?: boolean;
    onRemove?: () => void;
};

function PersonMiniForm({ formId, title, showRemove, onRemove }: PersonMiniFormProps) {
    const [sex, setSex] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const ageDisplay = useMemo(() => {
        if (!birthDate) return "";
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age >= 0 ? String(age) : "";
    }, [birthDate]);

    return (
        <div className="surface-card border-round border-1 surface-border p-4 mb-3 relative">
            <div className="flex justify-content-between align-items-center mb-3">
                <span className="font-semibold text-900">{title}</span>
                {showRemove && (
                    <button
                        type="button"
                        className="p-button p-button-text p-button-danger p-0"
                        onClick={onRemove}
                        aria-label="Remove"
                    >
                        <i className="pi pi-times text-xl" />
                    </button>
                )}
            </div>

            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="field grid align-items-center mb-2">
                        <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="col">
                            <IconInput icon="pi-user">
                                <InputText className="w-full" placeholder="Please enter first name" />
                            </IconInput>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="field grid align-items-center mb-2">
                        <label className="col-fixed w-12rem md:w-14rem text-right pr-2">Middle Name</label>
                        <div className="col">
                            <IconInput icon="pi-user">
                                <InputText className="w-full" placeholder="Please enter middle name" />
                            </IconInput>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="field grid align-items-center mb-2">
                        <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="col">
                            <IconInput icon="pi-user">
                                <InputText className="w-full" placeholder="Please enter last name" />
                            </IconInput>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="field grid align-items-center mb-2">
                        <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
                            Preferred First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="col">
                            <IconInput icon="pi-gift">
                                <InputText className="w-full" placeholder="Please enter first name" />
                            </IconInput>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="field grid align-items-center mb-2">
                        <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
                            Sex <span className="text-red-500">*</span>
                        </label>
                        <div className="col flex align-items-center gap-4">
                            <div className="flex align-items-center gap-2">
                                <RadioButton
                                    inputId={`${formId}-male`}
                                    name={`sex-${formId}`}
                                    value="male"
                                    onChange={(e) => setSex(e.value)}
                                    checked={sex === "male"}
                                />
                                <label htmlFor={`${formId}-male`}>Male</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <RadioButton
                                    inputId={`${formId}-female`}
                                    name={`sex-${formId}`}
                                    value="female"
                                    onChange={(e) => setSex(e.value)}
                                    checked={sex === "female"}
                                />
                                <label htmlFor={`${formId}-female`}>Female</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="field grid align-items-center mb-2">
                        <label className="col-fixed w-12rem md:w-14rem text-right pr-2">
                            Birth Date <span className="text-red-500">*</span>
                        </label>
                        <div className="col flex align-items-center gap-2 flex-wrap">
                            <Calendar
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.value as Date | null)}
                                showIcon
                                dateFormat="mm/dd/yy"
                                className="flex-grow-1"
                                inputClassName="w-full"
                                placeholder="mm/dd/yyyy"
                            />
                            <span className="p-input-icon-right">
                                <InputText
                                    value={ageDisplay}
                                    readOnly
                                    placeholder="Age"
                                    className="w-6rem surface-100"
                                    style={{ opacity: 0.9 }}
                                />
                                <i className="pi pi-question-circle text-500" title="Age from birth date" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EfaDataInputFullForm() {
    const baseId = useId();
    const [clientSex, setClientSex] = useState<string | null>(null);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [phoneType, setPhoneType] = useState("cell");
    const [country, setCountry] = useState("USA");
    const [state, setState] = useState("");
    const [showSpouse, setShowSpouse] = useState(false);
    const [childIds, setChildIds] = useState<number[]>([]);
    const [nextChildId, setNextChildId] = useState(1);

    const clientAge = useMemo(() => {
        if (!birthDate) return "";
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age >= 0 ? String(age) : "";
    }, [birthDate]);

    const addChild = useCallback(() => {
        setChildIds((prev) => [...prev, nextChildId]);
        setNextChildId((n) => n + 1);
    }, [nextChildId]);

    const removeChild = useCallback((id: number) => {
        setChildIds((prev) => prev.filter((x) => x !== id));
    }, []);

    const headerActions = (
        <div className="flex gap-2">
            <Button label="SAVE" className="p-button-success" type="button" />
            <Button label="NEXT" className="p-button-success" type="button" />
        </div>
    );

    return (
        <div className="efa-data-input-full">
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3 mb-4">
                <h1 className="text-2xl font-semibold m-0 text-900">Personal Information</h1>
                {headerActions}
            </div>

            <div className="surface-card border-round border-1 surface-border p-4 mb-3">
                <div className="font-semibold text-900 mb-3">Client:</div>
                <div className="grid">
                    <div className="col-12 md:col-3">
                        <div
                            className="border-1 surface-border border-round p-3 text-center cursor-pointer hover:surface-hover transition-colors transition-duration-150"
                            style={{ minHeight: "200px" }}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="flex flex-column align-items-center justify-content-center gap-2 h-full text-600">
                                <i className="pi pi-user text-4xl" />
                                <span className="font-medium text-900">Image</span>
                                <span className="text-sm line-height-3">
                                    Please click on the field to select the picture section.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-9">
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <div className="field mb-3">
                                    <label className="block mb-1">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <IconInput icon="pi-user">
                                        <InputText className="w-full" placeholder="Please enter first name" />
                                    </IconInput>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">Middle Name</label>
                                    <IconInput icon="pi-user">
                                        <InputText className="w-full" placeholder="Please enter middle name" />
                                    </IconInput>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <IconInput icon="pi-user">
                                        <InputText className="w-full" placeholder="Please enter last name" />
                                    </IconInput>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">
                                        Preferred First Name <span className="text-red-500">*</span>
                                    </label>
                                    <IconInput icon="pi-gift">
                                        <InputText className="w-full" placeholder="Please enter first name" />
                                    </IconInput>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">
                                        Sex <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex align-items-center gap-4">
                                        <div className="flex align-items-center gap-2">
                                            <RadioButton
                                                inputId={`${baseId}-client-male`}
                                                name="client-sex"
                                                value="male"
                                                onChange={(e) => setClientSex(e.value)}
                                                checked={clientSex === "male"}
                                            />
                                            <label htmlFor={`${baseId}-client-male`}>Male</label>
                                        </div>
                                        <div className="flex align-items-center gap-2">
                                            <RadioButton
                                                inputId={`${baseId}-client-female`}
                                                name="client-sex"
                                                value="female"
                                                onChange={(e) => setClientSex(e.value)}
                                                checked={clientSex === "female"}
                                            />
                                            <label htmlFor={`${baseId}-client-female`}>Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">
                                        Birth Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex align-items-center gap-2 flex-wrap">
                                        <Calendar
                                            value={birthDate}
                                            onChange={(e) => setBirthDate(e.value as Date | null)}
                                            showIcon
                                            dateFormat="mm/dd/yy"
                                            className="flex-grow-1"
                                            inputClassName="w-full"
                                        />
                                        <span className="p-input-icon-right">
                                            <InputText
                                                value={clientAge}
                                                readOnly
                                                placeholder="Age"
                                                className="w-6rem surface-100"
                                            />
                                            <i className="pi pi-question-circle text-500" />
                                        </span>
                                    </div>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">Email</label>
                                    <IconInput icon="pi-envelope">
                                        <InputText className="w-full" type="email" placeholder="Please enter email" />
                                    </IconInput>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex align-items-stretch gap-2">
                                        <Dropdown
                                            value={phoneType}
                                            options={PHONE_TYPES}
                                            onChange={(e) => setPhoneType(e.value)}
                                            className="w-8rem"
                                            optionLabel="label"
                                            optionValue="value"
                                        />
                                        <IconInput icon="pi-phone" className="flex-grow-1">
                                            <InputText className="w-full" placeholder="Please enter phone" />
                                        </IconInput>
                                        <Button icon="pi pi-plus" className="p-button-success" type="button" />
                                    </div>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">Address</label>
                                    <IconInput icon="pi-home">
                                        <InputText className="w-full" placeholder="Please enter address" />
                                    </IconInput>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">Country</label>
                                    <Dropdown
                                        value={country}
                                        options={COUNTRIES}
                                        onChange={(e) => setCountry(e.value)}
                                        className="w-full"
                                        optionLabel="label"
                                        optionValue="value"
                                    />
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">Zip Code</label>
                                    <IconInput icon="pi-globe">
                                        <InputText className="w-full" placeholder="Please enter postal code / zip code" />
                                    </IconInput>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="field mb-3">
                                    <label className="block mb-1">City</label>
                                    <IconInput icon="pi-building">
                                        <InputText className="w-full" placeholder="Please enter city" />
                                    </IconInput>
                                </div>
                                <div className="field mb-3">
                                    <label className="block mb-1">State</label>
                                    <Dropdown
                                        value={state}
                                        options={US_STATES}
                                        onChange={(e) => setState(e.value)}
                                        className="w-full"
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Select State"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <Button
                    label="ADD CHILD"
                    className="p-button-success"
                    type="button"
                    onClick={addChild}
                />
                <Button
                    label="ADD SPOUSE"
                    className="p-button-success"
                    type="button"
                    onClick={() => setShowSpouse(true)}
                />
            </div>

            {showSpouse && (
                <PersonMiniForm formId="spouse" title="Spouse:" showRemove onRemove={() => setShowSpouse(false)} />
            )}

            {childIds.map((id, index) => (
                <PersonMiniForm
                    key={id}
                    formId={`child-${id}`}
                    title={`Child ${index + 1}:`}
                    showRemove
                    onRemove={() => removeChild(id)}
                />
            ))}

            <div className="text-center my-4">
                <div className="text-xl font-semibold text-900 mb-3">Notes</div>
                <Button label="ADD NOTE" className="p-button-success" type="button" />
            </div>

            <div className="flex justify-content-end gap-2 mt-4 pt-3 border-top-1 surface-border">
                <Button label="SAVE" className="p-button-success" type="button" />
                <Button label="NEXT" className="p-button-success" type="button" />
            </div>
        </div>
    );
}
