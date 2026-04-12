"use client";

import Link from "next/link";

export type ContractingDocumentsTab = "pre" | "contracting" | "corporate";

type ContractingDocumentsPageFrameProps = {
    active: ContractingDocumentsTab;
    /** Right side of the tab bar (e.g. “Your NPN: …” or “Your FundServ code is: …”). */
    headerAsideText: string;
    /** Optional text color / weight (e.g. red FundServ line on Contracting). */
    headerAsideClassName?: string;
    children: React.ReactNode;
};

const tabBase =
    "inline-flex align-items-center justify-content-center px-3 py-2 md:px-4 text-sm font-semibold no-underline border-1 border-bottom-none border-round-top transition-duration-150";
const tabInactive = "surface-ground text-primary border-transparent";
const tabActive = "bg-primary text-white border-primary";

function TabLink({
    href,
    label,
    isActive,
}: {
    href: string;
    label: string;
    isActive: boolean;
}) {
    return (
        <Link href={href} className={`${tabBase} ${isActive ? tabActive : tabInactive}`} style={{ marginBottom: "-1px" }}>
            {label}
        </Link>
    );
}

export default function ContractingDocumentsPageFrame({
    active,
    headerAsideText,
    headerAsideClassName,
    children,
}: ContractingDocumentsPageFrameProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden contracting-documents-frame">
            <div className="p-3 md:p-4 lg:p-5">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">Contracting Documents</h1>

                <div className="flex flex-wrap justify-content-between align-items-center gap-3 mb-0 border-bottom-1 surface-border">
                    <div className="flex flex-wrap align-items-end gap-0">
                        <TabLink
                            href="/agent/contracts/pre-contracting-documents"
                            label="Pre-Contracting Documents"
                            isActive={active === "pre"}
                        />
                        <TabLink href="/agent/contracts/my-contracts" label="Contracting" isActive={active === "contracting"} />
                        <TabLink
                            href="/agent/contracts/corporate"
                            label="Corporate Pre-Contracting"
                            isActive={active === "corporate"}
                        />
                    </div>
                    <p
                        className={`text-sm md:text-base m-0 mb-2 md:mb-3 whitespace-nowrap font-semibold ${
                            headerAsideClassName ?? "text-700"
                        }`}
                    >
                        {headerAsideText}
                    </p>
                </div>

                <div className="pt-3 md:pt-4">{children}</div>
            </div>
        </div>
    );
}
