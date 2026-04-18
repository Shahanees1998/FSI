"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { getDefaultRedirectPath } from "@/lib/rolePermissions";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
        jobTitle: "",
        location: "",
        agencyName: "",
        carrierName: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const renderLabel = (label: string, required = false) => (
        <label className="block text-white mb-2">
            {required && <span className="text-red-400 mr-1">*</span>}
            {label}
        </label>
    );

    const handleSubmit = async () => {
        if (!form.role) {
            setMessage("Please select a role.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setSubmitting(true);
        setMessage(null);

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone || undefined,
                password: form.password,
                role: form.role,
                jobTitle: form.jobTitle || undefined,
                location: form.location || undefined,
                agencyName: form.role === "AGENT" ? form.agencyName || undefined : undefined,
                carrierName: form.role === "CARRIER" ? form.carrierName || undefined : undefined,
            }),
        });

        const payload = await response.json();
        if (!response.ok) {
            setMessage(payload.error || "Unable to create account.");
            setSubmitting(false);
            return;
        }

        router.replace(getDefaultRedirectPath(payload.user.role));
        router.refresh();
    };

    return (
        <AuthSplitLayout>
            <div className="auth-form-content">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-2 text-white m-0">Create your JS Investment account</h1>
                    <span className="text-white-alpha-90 font-medium">
                        Join the portal as an agent or carrier and start working immediately.
                    </span>
                </div>
                <div className="grid">
                    <div className="col-12 md:col-6">
                        {renderLabel("First name", true)}
                        <InputText
                            className="w-full mb-3"
                            value={form.firstName}
                            onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel("Last name", true)}
                        <InputText
                            className="w-full mb-3"
                            value={form.lastName}
                            onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel("Email address", true)}
                        <InputText
                            className="w-full mb-3"
                            value={form.email}
                            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your work email"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel("Phone number")}
                        <InputText
                            className="w-full mb-3"
                            value={form.phone}
                            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel("Role", true)}
                        <Dropdown
                            className="w-full mb-3 auth-dropdown"
                            value={form.role}
                            options={[
                                { label: "Agent", value: "AGENT" },
                                { label: "Carrier", value: "CARRIER" },
                            ]}
                            onChange={(e) => setForm((prev) => ({ ...prev, role: e.value }))}
                            placeholder="Select your role"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel(
                            form.role === "AGENT"
                                ? "Agency name"
                                : form.role === "CARRIER"
                                    ? "Carrier name"
                                    : "Organization name"
                        )}
                        <InputText
                            className="w-full mb-3"
                            value={form.role === "AGENT" ? form.agencyName : form.carrierName}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    [form.role === "AGENT" ? "agencyName" : "carrierName"]: e.target.value,
                                }))
                            }
                            placeholder={
                                form.role === "AGENT"
                                    ? "Enter your agency name"
                                    : form.role === "CARRIER"
                                        ? "Enter your carrier name"
                                        : "Enter your organization name"
                            }
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel("Job title")}
                        <InputText
                            className="w-full mb-3"
                            value={form.jobTitle}
                            onChange={(e) => setForm((prev) => ({ ...prev, jobTitle: e.target.value }))}
                            placeholder="Enter your job title"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel("Location")}
                        <InputText
                            className="w-full mb-3"
                            value={form.location}
                            onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                            placeholder="Enter your city or region"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel("Password", true)}
                        <Password
                            feedback={false}
                            toggleMask
                            className="w-full mb-3"
                            inputClassName="w-full"
                            value={form.password}
                            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Create a password"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        {renderLabel("Confirm password", true)}
                        <Password
                            feedback={false}
                            toggleMask
                            className="w-full mb-3"
                            inputClassName="w-full"
                            value={form.confirmPassword}
                            onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                            placeholder="Re-enter your password"
                        />
                    </div>
                </div>
                {message && <p className="text-red-300 mt-0 mb-3">{message}</p>}
                <Button
                    label="Create account"
                    className="w-full mb-3"
                    loading={submitting}
                    onClick={handleSubmit}
                />
                <Button
                    label="Back to login"
                    outlined
                    className="w-full auth-btn-outlined"
                    onClick={() => router.push("/auth/login")}
                />
            </div>
        </AuthSplitLayout>
    );
}
