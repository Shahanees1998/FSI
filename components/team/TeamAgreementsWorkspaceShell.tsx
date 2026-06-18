"use client";

import AgreementsLegendDialog from "@/components/team/AgreementsLegendDialog";
import InviteAssociatesDialog from "@/components/team/InviteAssociatesDialog";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { ReactNode, useEffect, useState } from "react";

export default function TeamAgreementsWorkspaceShell({ children }: { children: ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inviteOpen, setInviteOpen] = useState(false);
    const [legendOpen, setLegendOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (searchParams.get("inviteAssociate") === "1") {
            setInviteOpen(true);
            router.replace("/agent/team/agreements", { scroll: false });
        }
    }, [searchParams, router]);

    return (
        <div className="flex min-h-0 border-round overflow-hidden surface-card border-1 surface-border">
            <button
                type="button"
                className="hidden md:flex align-items-center justify-content-center border-none cursor-pointer surface-100 hover:surface-200 text-600 flex-shrink-0"
                style={{ width: "1.25rem" }}
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
                <i className={`pi ${sidebarOpen ? "pi-chevron-left" : "pi-chevron-right"}`} />
            </button>

            {sidebarOpen ? (
                <aside
                    className="surface-0 border-right-1 surface-border flex flex-column gap-3 p-3 flex-shrink-0"
                    style={{ width: "220px", minWidth: "220px" }}
                >
                    <Button
                        label="+ New Associate"
                        className="w-full p-button-warning font-bold"
                        type="button"
                        onClick={() => setInviteOpen(true)}
                    />
                    <nav className="flex flex-column gap-2">
                        <span className="text-900 font-semibold text-sm">Agreements</span>
                        <Link href="/agent/team/invitees" className="text-primary text-sm no-underline hover:underline">
                            Invitees
                        </Link>
                        <Link href="/agent/team/invites" className="text-primary text-sm no-underline hover:underline">
                            Open invites
                        </Link>
                        <button
                            type="button"
                            className="text-left text-sm bg-transparent border-none cursor-pointer p-0 text-primary no-underline hover:underline"
                            onClick={() => setLegendOpen(true)}
                        >
                            Legend
                        </button>
                    </nav>
                </aside>
            ) : null}

            <div className="flex-grow-1 min-w-0 p-3 md:p-4">{children}</div>

            <InviteAssociatesDialog visible={inviteOpen} onHide={() => setInviteOpen(false)} />
            <AgreementsLegendDialog visible={legendOpen} onHide={() => setLegendOpen(false)} />
        </div>
    );
}
