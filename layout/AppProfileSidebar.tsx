import { Sidebar } from "primereact/sidebar";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { LayoutContext } from "./context/layoutcontext";
import { useAuth } from "@/hooks/useAuth";
import { APP_NAME } from "@/lib/appBranding";

const AppProfileSidebar = () => {
    const { layoutState, setLayoutState } = useContext(LayoutContext);
    const { user, logout } = useAuth();
    const router = useRouter();

    const hideSidebar = () => {
        setLayoutState((prevState) => ({
            ...prevState,
            profileSidebarVisible: false,
        }));
    };

    const goToProfile = () => {
        const path =
            user?.role === "ADMIN" ? "/admin/profile" : user?.role === "CARRIER" ? "/carrier/profile" : "/agent/profile";
        router.push(path);
        hideSidebar();
    };

    const handleLogout = async () => {
        await logout();
        hideSidebar();
        router.push("/auth/login");
    };

    return (
        <Sidebar
            visible={layoutState.profileSidebarVisible}
            onHide={hideSidebar}
            position="right"
            className="layout-profile-sidebar w-full sm:w-25rem"
        >
            <div className="flex flex-column gap-4">
                <div>
                    <div className="text-900 font-semibold text-xl">
                        {user ? `${user.firstName} ${user.lastName}` : `${APP_NAME} User`}
                    </div>
                    <div className="text-600 mt-2">{user?.email}</div>
                    <div className="text-600 mt-1">
                        {user?.role === "ADMIN"
                            ? `${APP_NAME} Administration`
                            : user?.role === "CARRIER"
                              ? "Carrier Partner"
                              : "Licensed Agent"}
                    </div>
                </div>

                <div className="border-1 surface-border border-round p-3">
                    <div className="font-semibold mb-2">Portal access</div>
                    <div className="text-600 line-height-3">
                        Use this workspace to manage messages, tickets, commissions, and operational updates from one dashboard.
                    </div>
                </div>

                <button
                    className="cursor-pointer flex surface-border p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150 w-full text-left"
                    onClick={goToProfile}
                >
                    <i className="pi pi-user text-xl text-primary"></i>
                    <div className="ml-3">
                        <span className="font-semibold block">Profile</span>
                        <span className="text-color-secondary">Review your account details and contact information.</span>
                    </div>
                </button>

                <button
                    className="cursor-pointer flex surface-border p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150 w-full text-left"
                    onClick={handleLogout}
                >
                    <i className="pi pi-power-off text-xl text-primary"></i>
                    <div className="ml-3">
                        <span className="font-semibold block">Sign out</span>
                        <span className="text-color-secondary">End your current JS Investment portal session.</span>
                    </div>
                </button>
            </div>
        </Sidebar>
    );
};

export default AppProfileSidebar;
