"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

export default function AuthErrorPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex justify-content-center align-items-center p-4">
            <div className="surface-card border-round border-1 surface-border p-5 text-center" style={{ maxWidth: 560 }}>
                <h1 className="mt-0 mb-3">Authentication Error</h1>
                <p className="text-600 line-height-3">
                    Something went wrong while processing your sign-in request. Please try again.
                </p>
                <Button label="Back to login" onClick={() => router.push("/auth/login")} />
            </div>
        </div>
    );
}
