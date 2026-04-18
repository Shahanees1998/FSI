"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        const response = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const payload = await response.json();
        setMessage(payload.message || payload.error || "Request processed.");
    };

    return (
        <AuthSplitLayout>
            <div className="auth-form-content">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-2 text-white m-0">Reset your password</h1>
                    <span className="text-white-alpha-90 font-medium">
                        Enter the email tied to your JS Investment portal account.
                    </span>
                </div>
                <label className="block text-white mb-2">Email</label>
                <InputText
                    className="w-full mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
                {message && <p className="text-white-alpha-90">{message}</p>}
                <Button label="Send reset link" className="w-full mb-3" onClick={handleSubmit} />
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
