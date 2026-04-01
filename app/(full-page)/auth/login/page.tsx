"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultRedirectPath } from "@/lib/rolePermissions";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading: authLoading, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && user) {
            router.replace(searchParams.get("callbackUrl") || getDefaultRedirectPath(user.role));
        }
    }, [authLoading, user, router, searchParams]);

    const handleSubmit = async () => {
        setError(null);
        setSubmitting(true);
        try {
            const loggedInUser = await login(email, password);
            router.replace(searchParams.get("callbackUrl") || getDefaultRedirectPath(loggedInUser.role));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to sign in.");
            setSubmitting(false);
        }
    };

    return (
        <AuthSplitLayout>
            <div className="auth-form-content">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-2 text-white m-0">Sign in to FSI</h1>
                    <span className="text-white-alpha-90 font-medium">
                        Access your back-office dashboard, commissions, and support tools.
                    </span>
                </div>
                <label className="block text-white mb-2">Email</label>
                <InputText
                    className="w-full mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                />
                <label className="block text-white mb-2">Password</label>
                <Password
                    feedback={false}
                    toggleMask
                    className="w-full mb-3"
                    inputClassName="w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-300 mt-0 mb-3">{error}</p>}
                <Button label="Sign in" className="w-full mb-3" loading={submitting} onClick={handleSubmit} />
                <div className="grid mt-2">
                    <div className="col-12">
                        <Button
                            label="Forgot password?"
                            outlined
                            className="w-full auth-btn-outlined"
                            onClick={() => router.push("/auth/forgotpassword")}
                        />
                    </div>
                    {/* <div className="col-12 md:col-6">
                        <Button
                            label="Create account"
                            text
                            className="w-full auth-btn-outlined"
                            onClick={() => router.push("/auth/register")}
                        />
                    </div> */}
                </div>
            </div>
        </AuthSplitLayout>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div />}>
            <LoginContent />
        </Suspense>
    );
}
