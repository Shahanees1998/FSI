import type { MenuModel } from "@/types/index";

/** Internal pages under Learn → Departments → New & Pending Business (order preserved). */
export const NEW_PENDING_BUSINESS_NAV: { slug: string; label: string }[] = [
    { slug: "faq", label: "FAQ" },
    { slug: "replacement-and-disclosure-forms", label: "Replacement and Disclosure Forms" },
    { slug: "ordering-medicals", label: "Ordering Medicals" },
    { slug: "new-back-office-nbt-training", label: "New Back Office & NBT Training" },
];

export const NEW_PENDING_BUSINESS_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    NEW_PENDING_BUSINESS_NAV.map(({ slug, label }) => [`departments/new-pending-business/${slug}`, label]),
);

export function newPendingBusinessLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/departments/new-pending-business",
        },
        ...NEW_PENDING_BUSINESS_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/departments/new-pending-business/${slug}`,
        })),
    ];
}
