import Link from "next/link";
import { useContext } from "react";
import AppMenu from "./AppMenu";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { LayoutState } from "../types/layout";
import { useAuth } from "@/hooks/useAuth";
import { APP_NAME } from "@/lib/appBranding";

const AppSidebar = () => {
    const { setLayoutState } = useContext(LayoutContext);
    const { user } = useAuth();
    
    const anchor = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            anchored: !prevLayoutState.anchored,
        }));
    };

    const dashboardPath =
        user?.role === "ADMIN" ? "/admin" : user?.role === "CARRIER" ? "/carrier" : "/agent";

    return (
        <>
            <div className="sidebar-header">
                <Link
                    href={dashboardPath}
                    className="app-logo flex align-items-center justify-content-center px-2 py-2 no-underline text-center"
                    style={{ color: "#ffffff" }}
                >
                    <span className="text-xl font-bold line-height-3 white-space-nowrap">{APP_NAME}</span>
                </Link>
                <button
                    className="layout-sidebar-anchor p-link z-2 mb-2"
                    type="button"
                    onClick={anchor}
                    style={{ color: '#ffffff' }}
                ></button>
            </div>

            <div className="layout-menu-container">
                <MenuProvider>
                    <AppMenu />
                </MenuProvider>
            </div>
        </>
    );
};

export default AppSidebar;
