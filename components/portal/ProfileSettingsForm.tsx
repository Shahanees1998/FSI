"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

interface ProfileSettingsFormProps {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string | null;
        jobTitle?: string | null;
        location?: string | null;
    };
}

export default function ProfileSettingsForm({ user }: ProfileSettingsFormProps) {
    const [form, setForm] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone ?? "",
        jobTitle: user.jobTitle ?? "",
        location: user.location ?? "",
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async () => {
        setMessage(null);
        setError(null);
        const response = await fetch("/api/users/edit-profile", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const payload = await response.json();
        if (!response.ok) {
            setError(payload.error || "Unable to save profile.");
            return;
        }
        setMessage("Profile updated successfully.");
    };

    const updatePassword = async () => {
        setMessage(null);
        setError(null);
        const response = await fetch("/api/users/change-password", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(passwordForm),
        });
        const payload = await response.json();
        if (!response.ok) {
            setError(payload.error || "Unable to change password.");
            return;
        }
        setPasswordForm({ currentPassword: "", newPassword: "" });
        setMessage("Password changed successfully.");
    };

    return (
        <div className="grid align-items-stretch">
            <div className="col-12 lg:col-7 flex">
                <div className="surface-card border-round border-1 surface-border p-4 flex flex-column flex-grow-1 w-full">
                    <h3 className="mt-0">Profile details</h3>
                    <div className="grid flex-grow-1">
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">First name</label>
                            <InputText
                                className="w-full"
                                value={form.firstName}
                                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Last name</label>
                            <InputText
                                className="w-full"
                                value={form.lastName}
                                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Email</label>
                            <InputText className="w-full" value={user.email} disabled />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Phone</label>
                            <InputText
                                className="w-full"
                                value={form.phone}
                                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Job title</label>
                            <InputText
                                className="w-full"
                                value={form.jobTitle}
                                onChange={(e) => setForm((prev) => ({ ...prev, jobTitle: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <label className="block mb-2">Location</label>
                            <InputText
                                className="w-full"
                                value={form.location}
                                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="mt-auto pt-3">
                        <Button label="Save profile" onClick={updateProfile} />
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-5 flex">
                <div className="surface-card border-round border-1 surface-border p-4 flex flex-column flex-grow-1 w-full">
                    <h3 className="mt-0">Change password</h3>
                    <div className="flex-grow-1 flex flex-column">
                        <label className="block mb-2">Current password</label>
                        <Password
                            feedback={false}
                            toggleMask
                            className="w-full mb-3"
                            inputClassName="w-full"
                            value={passwordForm.currentPassword}
                            onChange={(e) =>
                                setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                            }
                        />
                        <label className="block mb-2">New password</label>
                        <Password
                            feedback={false}
                            toggleMask
                            className="w-full mb-3"
                            inputClassName="w-full"
                            value={passwordForm.newPassword}
                            onChange={(e) =>
                                setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                            }
                        />
                    </div>
                    <div className="mt-auto pt-3">
                        <Button label="Update password" outlined onClick={updatePassword} />
                    </div>
                </div>
            </div>
            {message && <div className="col-12 text-green-600 font-medium">{message}</div>}
            {error && <div className="col-12 text-red-600 font-medium">{error}</div>}
        </div>
    );
}
