"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { APP_NAME } from "@/lib/appBranding";

export default function AccessDeniedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex justify-content-center align-items-center p-4">
            <div className="surface-card border-round border-1 surface-border p-5 text-center" style={{ maxWidth: 560 }}>
                <h1 className="mt-0 mb-3">Access Restricted</h1>
                <p className="text-600 line-height-3">
                    Your account does not have permission to view this area of the {APP_NAME} portal.
                </p>
                <Button label="Return to workspace" onClick={() => router.push("/")} />
            </div>
        </div>
    );
}
