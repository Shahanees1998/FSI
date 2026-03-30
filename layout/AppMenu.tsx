import type { MenuModel } from "@/types/index";
import AppSubMenu from "./AppSubMenu";
import { useAuth } from "@/hooks/useAuth";
import { canAccessSection } from "@/lib/rolePermissions";

const AppMenu = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const model: MenuModel[] = [
        {
            label: "Workspace",
            icon: "pi pi-home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to:
                        user.role === "ADMIN"
                            ? "/admin"
                            : user.role === "CARRIER"
                              ? "/carrier"
                              : "/agent",
                },
            ],
        },
    ];

    if (canAccessSection(user.role, "messages")) {
        model.push({
            label: "Communication",
            icon: "pi pi-comments",
            items: [
                {
                    label: "Messages",
                    icon: "pi pi-fw pi-comments",
                    to: user.role === "CARRIER" ? "/carrier/messages" : user.role === "ADMIN" ? "/admin/messages" : "/agent/messages",
                },
            ],
        });
    }

    if (canAccessSection(user.role, "commissions")) {
        model.push({
            label: "Commissions",
            icon: "pi pi-wallet",
            items: [
                {
                    label: user.role === "ADMIN" ? "Commission Management" : "Commission Tracker",
                    icon: "pi pi-fw pi-wallet",
                    to: user.role === "ADMIN" ? "/admin/commissions" : "/agent/commissions",
                },
            ],
        });
    }

    if (canAccessSection(user.role, "tickets")) {
        model.push({
            label: "Support",
            icon: "pi pi-ticket",
            items: [
                {
                    label: user.role === "ADMIN" ? "Ticket Queue" : "My Tickets",
                    icon: "pi pi-fw pi-ticket",
                    to: user.role === "CARRIER" ? "/carrier/tickets" : user.role === "ADMIN" ? "/admin/tickets" : "/agent/tickets",
                },
            ],
        });
    }

    if (canAccessSection(user.role, "agents") || canAccessSection(user.role, "carriers")) {
        model.push({
            label: "Administration",
            icon: "pi pi-cog",
            items: [
                { label: "Agents", icon: "pi pi-fw pi-users", to: "/admin/agents" },
                { label: "Carriers", icon: "pi pi-fw pi-building", to: "/admin/carriers" },
                { label: "Insurer Stats", icon: "pi pi-fw pi-chart-line", to: "/admin/insurer-stats" },
                { label: "Settings", icon: "pi pi-fw pi-cog", to: "/admin/settings" },
            ],
        });
    }

    model.push({
        label: "Account",
        icon: "pi pi-user",
        items: [
            {
                label: "Profile",
                icon: "pi pi-fw pi-user",
                to: user.role === "CARRIER" ? "/carrier/profile" : user.role === "ADMIN" ? "/admin/profile" : "/agent/profile",
            },
        ],
    });

    return <AppSubMenu model={model} />;
};

export default AppMenu;

