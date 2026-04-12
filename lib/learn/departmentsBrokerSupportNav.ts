import type { MenuModel } from "@/types/index";

/** Internal pages under Learn → Departments → Broker Support (order preserved). */
export const BROKER_SUPPORT_NAV: { slug: string; label: string }[] = [
    { slug: "faq", label: "FAQ" },
    { slug: "2-step-verification-faq", label: "2-Step Verification FAQ" },
    { slug: "office-address-request", label: "Office Address Request" },
    { slug: "tutorials", label: "Tutorials" },
];

export const BROKER_SUPPORT_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    BROKER_SUPPORT_NAV.map(({ slug, label }) => [`departments/broker-support/${slug}`, label]),
);

export function brokerSupportLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/departments/broker-support",
        },
        ...BROKER_SUPPORT_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/departments/broker-support/${slug}`,
        })),
    ];
}
