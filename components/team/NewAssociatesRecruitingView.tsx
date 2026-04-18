"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { useEffect } from "react";

const DUMMY_PDF = "/documents/new-associates-dummy.pdf";
const OPEN_DEBOUNCE_MS = 800;

export default function NewAssociatesRecruitingView() {
    useEffect(() => {
        const key = "JS Investment-new-associates-pdf-open";
        const now = Date.now();
        const last = Number(sessionStorage.getItem(key) || 0);
        if (now - last < OPEN_DEBOUNCE_MS) return;
        sessionStorage.setItem(key, String(now));
        window.open(DUMMY_PDF, "_blank", "noopener,noreferrer");
    }, []);

    const openAgain = () => {
        window.open(DUMMY_PDF, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="p-3 md:p-5" style={{ maxWidth: "42rem" }}>
            <h1 className="text-2xl font-bold text-900 mt-0 mb-2">New Associates</h1>
            <p className="text-600 line-height-3 m-0 mb-4">
                A sample PDF should open in a new browser tab. If your browser blocked the pop-up, use the button below.
            </p>
            <div className="flex flex-wrap gap-2 align-items-center">
                <Button type="button" label="Open PDF in new tab" icon="pi pi-external-link" className="p-button-outlined" onClick={openAgain} />
                <Link href={DUMMY_PDF} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium">
                    Or open PDF directly
                </Link>
            </div>
        </div>
    );
}
