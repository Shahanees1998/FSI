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
            <Button
                label="Cancel"
                type="button"
                severity="secondary"
                outlined
                size="small"
                onClick={onHide}
                disabled={submitting}
            />
            <Button
                label={submitting ? "Sending…" : "Send invite"}
                type="button"
                icon="pi pi-send"
                size="small"
                className="p-button-warning"
                onClick={handleSend}
                loading={submitting}
            />
        </div>
    );

    const handleHide = () => {
        if (submitting) return;
        onHide();
    };

    return (
        <Dialog
            header="Invite Associates"
            visible={visible}
            onHide={handleHide}
            footer={footer}
            modal
            dismissableMask
            className="invite-associates-dialog"
            style={{ width: "min(52rem, 95vw)" }}
            blockScroll
        >
            <p className="invite-associates-intro m-0 mb-4 text-600 line-height-3">
                Send an AOA invite to a new associate. Required fields are marked with an asterisk.
            </p>

            <div className="flex flex-column gap-4">
                <div>
                    <span className="invite-associates-label">Language</span>
                    <div className="invite-associates-lang-options" role="radiogroup" aria-label="AOA language">
                        {(
                            [
                                { id: "invite-lang-en", value: "english" as const, label: "English AOA" },
                                { id: "invite-lang-es", value: "spanish" as const, label: "Spanish AOA" },
                            ] as const
                        ).map((option) => (
                            <label
                                key={option.value}
                                htmlFor={option.id}
                                className={classNames("invite-associates-lang-option", {
                                    "invite-associates-lang-option--active": aoaLanguage === option.value,
                                })}
                            >
                                <input
                                    id={option.id}
                                    name="aoaLang"
                                    type="radio"
                                    value={option.value}
                                    checked={aoaLanguage === option.value}
                                    onChange={(e) => setAoaLanguage(e.target.value as "english" | "spanish")}
                                    className="invite-associates-lang-input"
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-4">
                        <label className="invite-associates-label" htmlFor="invite-first-name">
                            First name <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="invite-first-name"
                            className={classNames("w-full", { "p-invalid": errors.firstName })}
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
                        <label className="invite-associates-label" htmlFor="invite-middle-name">
                            Middle name
                        </label>
                        <InputText
                            id="invite-middle-name"
                            className="w-full"
                            placeholder="Enter middle name"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <label className="invite-associates-label" htmlFor="invite-last-name">
                            Last name <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            id="invite-last-name"
                            className={classNames("w-full", { "p-invalid": errors.lastName })}
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
                    <label className="invite-associates-label" htmlFor="invite-email">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <InputText
                        id="invite-email"
                        className={classNames("w-full", { "p-invalid": errors.email })}
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

                <div className="grid align-items-end">
                    <div className="col-12 md:col-4 flex align-items-center gap-2 pb-2">
                        <Checkbox
                            inputId="split-recruiting"
                            checked={splitRecruiting}
                            onChange={(e) => setSplitRecruiting(!!e.checked)}
                        />
                        <label htmlFor="split-recruiting" className="text-sm text-700 cursor-pointer m-0">
                            Split recruiting
                        </label>
                    </div>
                    <div className="col-12 md:col-8">
                        <label className="invite-associates-label" htmlFor="invite-recruiter">
                            Recruiter
                        </label>
                        <Dropdown
                            inputId="invite-recruiter"
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
                </div>

                <div>
                    <label className="invite-associates-label" htmlFor="invite-message">
                        Message to user
                    </label>
                    <InputTextarea
                        id="invite-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Add a personal note for the invitee (optional)"
                        className="w-full"
                        rows={4}
                        autoResize
                    />
                </div>
            </div>
        </Dialog>
    );
}
