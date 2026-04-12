"use client";

import { useRouter } from "next/navigation";

type MyCrmViewProps = {
    crmUrl: string | null;
};

export default function MyCrmView({ crmUrl }: MyCrmViewProps) {
    const router = useRouter();
    const url = crmUrl?.trim() || null;

    const btnBase =
        "inline-flex align-items-center justify-content-center px-4 py-3 border-round font-bold text-sm uppercase no-underline border-none cursor-pointer transition-duration-150";
    const primaryStyle = { background: "#f59e0b", color: "#fff", minWidth: "8rem" };
    const secondaryStyle = { background: "#fbbf24", color: "#1c1917", minWidth: "8rem" };

    return (
        <div className="surface-ground flex align-items-center justify-content-center p-4 py-6">
            <div style={{ maxWidth: "36rem" }} className="w-full">
                <div className="surface-card border-round border-1 surface-border shadow-2 p-4 md:p-5 mb-4 bg-white">
                    <p className="text-900 line-height-3 m-0 mb-3 text-base md:text-lg">
                        You are now leaving the main platform and executing the <strong>Experior CRM</strong>.
                    </p>
                    <p className="text-900 line-height-3 m-0 text-base md:text-lg">Please confirm to continue.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {url ? (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${btnBase} shadow-2 hover:opacity-90`}
                            style={primaryStyle}
                        >
                            Confirm
                        </a>
                    ) : (
                        <span
                            className={`${btnBase} opacity-70 cursor-default shadow-1`}
                            style={primaryStyle}
                            title="Set NEXT_PUBLIC_EXPERIOR_CRM_URL"
                        >
                            Confirm
                        </span>
                    )}
                    <button
                        type="button"
                        className={`${btnBase} shadow-1 hover:opacity-90`}
                        style={secondaryStyle}
                        onClick={() => {
                            if (typeof window !== "undefined" && window.history.length > 1) {
                                router.back();
                            } else {
                                router.push("/agent");
                            }
                        }}
                    >
                        Back
                    </button>
                </div>
                {!url ? (
                    <p className="text-600 text-xs m-0 mt-3">
                        Add <code className="text-xs">NEXT_PUBLIC_EXPERIOR_CRM_URL</code> to enable the Confirm link.
                    </p>
                ) : null}
            </div>
        </div>
    );
}
