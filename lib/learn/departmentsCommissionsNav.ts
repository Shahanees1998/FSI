import type { MenuModel } from "@/types/index";

/** Internal pages under Learn → Departments → Commissions (order preserved). */
export const COMMISSIONS_NAV: { slug: string; label: string }[] = [
    { slug: "faq", label: "FAQ" },
    { slug: "compensation", label: "Compensation" },
    { slug: "commission-calculators", label: "Commission Calculators" },
    { slug: "chargeback-recovery-options", label: "Chargeback Recovery Options" },
];

export const COMMISSIONS_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    COMMISSIONS_NAV.map(({ slug, label }) => [`departments/commissions/${slug}`, label]),
);

export function commissionsLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/departments/commissions",
        },
        ...COMMISSIONS_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/departments/commissions/${slug}`,
        })),
    ];
}
