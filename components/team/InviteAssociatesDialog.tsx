"use client";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { classNames } from "primereact/utils";
import { useToast } from "@/store/toast.context";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RecruiterOption = { label: string; value: string };

type Props = {
    visible: boolean;
    onHide: () => void;
};

export default function InviteAssociatesDialog({ visible, onHide }: Props) {
    const router = useRouter();
    const { showToast } = useToast();
    const [aoaLanguage, setAoaLanguage] = useState<"english" | "spanish">("english");
    const [splitRecruiting, setSplitRecruiting] = useState(false);
    const [recruiterProfileId, setRecruiterProfileId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [recruiters, setRecruiters] = useState<RecruiterOption[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!visible) return;
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch("/api/agent/recruiting/aoa");
                if (!res.ok) return;
                const data = (await res.json()) as { recruiters?: RecruiterOption[] };
                if (!cancelled && data.recruiters?.length) {
                    setRecruiters(data.recruiters);
                    setRecruiterProfileId((current) => current ?? data.recruiters![0].value);
                }
            } catch {
                /* optional recruiters list */
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [visible]);

    const resetForm = () => {
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setErrors({});
        setAoaLanguage("english");
        setSplitRecruiting(false);
    };

    const handleSend = async () => {
        const nextErrors: Record<string, string> = {};
        if (!firstName.trim()) nextErrors.firstName = "First name is required.";
        if (!lastName.trim()) nextErrors.lastName = "Last name is required.";
        if (!email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!EMAIL_RE.test(email.trim())) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            showToast("warn", "Check required fields", Object.values(nextErrors)[0]);
            return;
        }

        setErrors({});
        setSubmitting(true);
        try {
            const res = await fetch("/api/agent/team/invites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    middleName: middleName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    recruiterProfileId,
                    message,
                    aoaLanguage,
                    splitRecruiting,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                showToast("error", data.error || "Failed to send invite.");
                return;
            }
            showToast("success", "Invite sent successfully.");
            resetForm();
            onHide();
            router.refresh();
        } catch {
            showToast("error", "Failed to send invite.");
        } finally {
            setSubmitting(false);
        }
    };

    const footer = (
        <div className="flex justify-content-end gap-2">
            <Button label="CANCEL" className="p-button-warning font-bold" type="button" onClick={onHide} disabled={submitting} />
            <Button
                label={submitting ? "SENDING…" : "SEND"}
                className="p-button-warning font-bold"
                type="button"
                onClick={handleSend}
                loading={submitting}
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
                            <input
                                id="invite-lang-en"
                                name="aoaLang"
                                type="radio"
                                value="english"
                                checked={aoaLanguage === "english"}
                                onChange={(e) => setAoaLanguage(e.target.value as "english" | "spanish")}
                                className="m-0"
                            />
                            <label htmlFor="invite-lang-en" className="text-sm cursor-pointer">
                                English AOA
                            </label>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <input
                                id="invite-lang-es"
                                name="aoaLang"
                                type="radio"
                                value="spanish"
                                checked={aoaLanguage === "spanish"}
                                onChange={(e) => setAoaLanguage(e.target.value as "english" | "spanish")}
                                className="m-0"
                            />
                            <label htmlFor="invite-lang-es" className="text-sm cursor-pointer">
                                Spanish AOA
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <label className="block text-sm font-bold text-800 mb-1">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            className={classNames("w-full surface-100 border-none", { "p-invalid": errors.firstName })}
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                if (errors.firstName) {
                                    setErrors((prev) => {
                                        const next = { ...prev };
                                        delete next.firstName;
                                        return next;
                                    });
                                }
                            }}
                        />
                        {errors.firstName ? <small className="p-error block mt-1">{errors.firstName}</small> : null}
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="block text-sm font-bold text-800 mb-1">Middle Name</label>
                        <InputText
                            className="w-full surface-100 border-none"
                            placeholder="Enter middle name"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="block text-sm font-bold text-800 mb-1">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            className={classNames("w-full surface-100 border-none", { "p-invalid": errors.lastName })}
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                if (errors.lastName) {
                                    setErrors((prev) => {
                                        const next = { ...prev };
                                        delete next.lastName;
                                        return next;
                                    });
                                }
                            }}
                        />
                        {errors.lastName ? <small className="p-error block mt-1">{errors.lastName}</small> : null}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-800 mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <InputText
                        className={classNames("w-full surface-100 border-none", { "p-invalid": errors.email })}
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) {
                                setErrors((prev) => {
                                    const next = { ...prev };
                                    delete next.email;
                                    return next;
                                });
                            }
                        }}
                    />
                    {errors.email ? <small className="p-error block mt-1">{errors.email}</small> : null}
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
                        value={recruiterProfileId}
                        options={recruiters}
                        onChange={(e) => setRecruiterProfileId(e.value)}
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
