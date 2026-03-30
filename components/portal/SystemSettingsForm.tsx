"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

interface SystemSettingsFormProps {
    settings: {
        siteName: string;
        siteDescription?: string | null;
        supportEmail: string;
        supportPhone?: string | null;
        commissionDisclaimer?: string | null;
        notificationsEnabled: boolean;
    };
}

export default function SystemSettingsForm({ settings }: SystemSettingsFormProps) {
    const [form, setForm] = useState({
        siteName: settings.siteName,
        siteDescription: settings.siteDescription ?? "",
        supportEmail: settings.supportEmail,
        supportPhone: settings.supportPhone ?? "",
        commissionDisclaimer: settings.commissionDisclaimer ?? "",
        notificationsEnabled: settings.notificationsEnabled,
    });
    const [message, setMessage] = useState<string | null>(null);

    const save = async () => {
        setMessage(null);
        const response = await fetch("/api/admin/settings", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const payload = await response.json();
        setMessage(response.ok ? "Settings saved." : payload.error || "Unable to save settings.");
    };

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <h3 className="mt-0">Portal settings</h3>
            <div className="grid align-items-stretch">
                <div className="col-12 md:col-6 flex flex-column">
                    <label className="block mb-2">Site name</label>
                    <InputText
                        className="w-full"
                        value={form.siteName}
                        onChange={(e) => setForm((prev) => ({ ...prev, siteName: e.target.value }))}
                    />
                </div>
                <div className="col-12 md:col-6 flex flex-column">
                    <label className="block mb-2">Support email</label>
                    <InputText
                        className="w-full"
                        value={form.supportEmail}
                        onChange={(e) => setForm((prev) => ({ ...prev, supportEmail: e.target.value }))}
                    />
                </div>
                <div className="col-12 md:col-6 flex flex-column">
                    <label className="block mb-2">Support phone</label>
                    <InputText
                        className="w-full"
                        value={form.supportPhone}
                        onChange={(e) => setForm((prev) => ({ ...prev, supportPhone: e.target.value }))}
                    />
                </div>
                <div className="col-12 md:col-6 flex flex-column">
                    <label className="block mb-2">Notifications enabled</label>
                    <div className="flex align-items-center flex-grow-1">
                        <InputSwitch
                            checked={form.notificationsEnabled}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, notificationsEnabled: Boolean(e.value) }))
                            }
                        />
                    </div>
                </div>
                <div className="col-12">
                    <label className="block mb-2">Site description</label>
                    <InputTextarea
                        rows={3}
                        className="w-full"
                        value={form.siteDescription}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, siteDescription: e.target.value }))
                        }
                    />
                </div>
                <div className="col-12">
                    <label className="block mb-2">Commission disclaimer</label>
                    <InputTextarea
                        rows={4}
                        className="w-full"
                        value={form.commissionDisclaimer}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, commissionDisclaimer: e.target.value }))
                        }
                    />
                </div>
            </div>
            <Button label="Save settings" className="mt-3" onClick={save} />
            {message && <p className="mt-3 mb-0 font-medium">{message}</p>}
        </div>
    );
}
