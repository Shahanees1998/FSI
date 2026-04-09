"use client";

import React from "react";

type PortalPageLoaderProps = {
    /** Full-screen overlay (layout). Sidebar uses a compact list-item placeholder. */
    variant?: "fullpage" | "menuitem";
};

/**
 * Gold + black themed loading indicator for Suspense boundaries.
 */
export default function PortalPageLoader({ variant = "fullpage" }: PortalPageLoaderProps) {
    const isFull = variant === "fullpage";

    return (
        <>
            <style jsx global>{`
                @keyframes portalLoaderSpin {
                    to {
                        transform: rotate(360deg);
                    }
                }
                .portal-loader-ring {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 3px solid rgba(212, 175, 55, 0.2);
                    border-top-color: #d4af37;
                    animation: portalLoaderSpin 0.75s linear infinite;
                }
                .portal-loader-ring--sm {
                    width: 18px;
                    height: 18px;
                    border-width: 2px;
                }
                .portal-loader-fullpage {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(
                        ellipse at center,
                        #1a1a1a 0%,
                        #0a0a0a 55%,
                        #000000 100%
                    );
                }
                .portal-loader-fullpage::after {
                    content: "";
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: radial-gradient(
                        circle,
                        rgba(212, 175, 55, 0.08) 0%,
                        transparent 70%
                    );
                    pointer-events: none;
                }
                .portal-loader-menuitem {
                    list-style: none;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    min-height: 2.5rem;
                    padding-left: 0.5rem;
                }
            `}</style>
            {isFull ? (
                <div className="portal-loader-fullpage" role="status" aria-live="polite" aria-label="Loading">
                    <div className="portal-loader-ring" />
                </div>
            ) : (
                <li className="portal-loader-menuitem" aria-hidden>
                    <div className="portal-loader-ring portal-loader-ring--sm" />
                </li>
            )}
        </>
    );
}
