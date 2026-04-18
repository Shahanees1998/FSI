"use client";

import type { AppTopbarRef } from "@/types/index";
import Link from "next/link";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import AppBreadcrumb from "./AppBreadCrumb";
import { LayoutContext } from "./context/layoutcontext";
import { useAuth } from "@/hooks/useAuth";
import { APP_NAME } from "@/lib/appBranding";

const AppTopbar = forwardRef<AppTopbarRef>((_props, ref) => {
    const { onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const { user, logout } = useAuth();
    const router = useRouter();
    const menubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
    }));

    const initials = `${user?.firstName?.[0] ?? "J"}${user?.lastName?.[0] ?? "S"}`;

    const dashboardPath =
        user?.role === "ADMIN" ? "/admin" : user?.role === "CARRIER" ? "/carrier" : "/agent";

    const handleLogout = async () => {
        await logout();
        router.push("/auth/login");
    };

    return (
        <div className="layout-topbar">
            <div className="topbar-start">
                <button
                    ref={menubuttonRef}
                    type="button"
                    className="topbar-menubutton p-link p-trigger"
                    onClick={onMenuToggle}
                >
                    <i className="pi pi-bars"></i>
                </button>

                <AppBreadcrumb className="topbar-breadcrumb" />
            </div>

            <div className="topbar-end">
                <div className="flex align-items-center gap-3">
                    <div className="hidden md:block text-right">
                        <div className="font-semibold text-sm">
                            {user ? `${user.firstName} ${user.lastName}` : `${APP_NAME} User`}
                        </div>
                        <div className="text-600 text-xs">
                            {user?.role === "ADMIN"
                                ? `${APP_NAME} Administration`
                                : user?.role === "CARRIER"
                                  ? "Carrier Partner"
                                  : "Licensed Agent"}
                        </div>
                    </div>
                    <button
                        type="button"
                        style={{ border: "none", background: "transparent", cursor: "pointer" }}
                        onClick={showProfileSidebar}
                    >
                        <Avatar label={initials} size="large" shape="circle" className="bg-primary" />
                    </button>
                    <Button
                        label="Logout"
                        icon="pi pi-sign-out"
                        className="p-button-text"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
