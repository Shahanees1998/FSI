"use client";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";

const RECRUITER_OPTIONS = [
    { label: "Jo Cleine Spinola (FS Code: A13713)", value: "a13713" },
    { label: "Another Recruiter (FS Code: B20001)", value: "b20001" },
];

type Props = {
    visible: boolean;
    onHide: () => void;
};

export default function InviteAssociatesDialog({ visible, onHide }: Props) {
    const [aoaLanguage, setAoaLanguage] = useState<"english" | "spanish">("english");
    const [splitRecruiting, setSplitRecruiting] = useState(false);
    const [recruiter, setRecruiter] = useState<string | null>("a13713");
    const [message, setMessage] = useState("");

    const footer = (
        <div className="flex justify-content-end gap-2">
            <Button label="CANCEL" className="p-button-warning font-bold" type="button" onClick={onHide} />
            <Button
                label="SEND"
                className="p-button-warning font-bold"
                type="button"
                onClick={() => {
                    onHide();
                }}
            />
        </div>
    );

    return (
        <Dialog
            header="Invite Associates"
            visible={visible}
            onHide={onHide}
            footer={footer}
            modal
            dismissableMask
            className="invite-associates-dialog w-full max-w-30rem"
            style={{ width: "95vw", maxWidth: "32rem" }}
            blockScroll
        >
            <div className="flex flex-column gap-3">
                <div>
                    <span className="block text-sm font-bold text-800 mb-2">Language</span>
                    <div className="flex align-items-center gap-4 flex-wrap">
                        <div className="flex align-items-center gap-2">
                            <RadioButton
                                inputId="invite-lang-en"
                                name="aoaLang"
                                value="english"
                                onChange={(e) => setAoaLanguage(e.value)}
                                checked={aoaLanguage === "english"}
                            />
                            <label htmlFor="invite-lang-en" className="text-sm cursor-pointer">
                                English AOA
                            </label>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <RadioButton
                                inputId="invite-lang-es"
                                name="aoaLang"
                                value="spanish"
                                onChange={(e) => setAoaLanguage(e.value)}
                                checked={aoaLanguage === "spanish"}
                            />
                            <label htmlFor="invite-lang-es" className="text-sm cursor-pointer">
                                Spanish AOA
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <label className="block text-sm font-bold text-800 mb-1">First Name</label>
                        <InputText className="w-full surface-100 border-none" />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="block text-sm font-bold text-800 mb-1">Middle Name</label>
                        <InputText className="w-full surface-100 border-none" />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="block text-sm font-bold text-800 mb-1">Last Name</label>
                        <InputText className="w-full surface-100 border-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-800 mb-1">Email</label>
                    <InputText className="w-full surface-100 border-none" type="email" />
                </div>

                <div className="flex align-items-center gap-2">
                    <Checkbox
                        inputId="split-recruiting"
                        checked={splitRecruiting}
                        onChange={(e) => setSplitRecruiting(!!e.checked)}
                    />
                    <label htmlFor="split-recruiting" className="text-sm cursor-pointer">
                        Split Recruiting
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-bold text-800 mb-1">Recruiter</label>
                    <Dropdown
                        value={recruiter}
                        options={RECRUITER_OPTIONS}
                        onChange={(e) => setRecruiter(e.value)}
                        optionLabel="label"
                        optionValue="value"
                        filter
                        filterBy="label"
                        showClear
                        placeholder="Select recruiter"
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-800 mb-1">Message to user</label>
                    <InputTextarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message to user"
                        className="w-full"
                        rows={5}
                    />
                </div>
            </div>
        </Dialog>
    );
}
