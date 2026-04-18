"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { APP_NAME } from "@/lib/appBranding";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const response = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });
        const payload = await response.json();
        setMessage(payload.error || "Password updated successfully.");
        if (response.ok) {
            setTimeout(() => router.push("/auth/login"), 1200);
        }
    };

    return (
        <AuthSplitLayout>
            <div className="auth-form-content">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-2 text-white m-0">Choose a new password</h1>
                    <span className="text-white-alpha-90 font-medium">
                        Secure your {APP_NAME} account with a fresh password.
                    </span>
                </div>
                <label className="block text-white mb-2">New password</label>
                <Password
                    feedback={false}
                    toggleMask
                    className="w-full mb-3"
                    inputClassName="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="block text-white mb-2">Confirm password</label>
                <Password
                    feedback={false}
                    toggleMask
                    className="w-full mb-3"
                    inputClassName="w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {message && <p className="text-white-alpha-90">{message}</p>}
                <Button label="Update password" className="w-full mb-3" onClick={handleSubmit} />
            </div>
        </AuthSplitLayout>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div />}>
            <ResetPasswordContent />
        </Suspense>
    );
}
