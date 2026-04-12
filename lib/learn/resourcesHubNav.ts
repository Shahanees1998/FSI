import type { MenuModel } from "@/types/index";

/** Internal pages under Learn → Resources → Resources (order preserved). */
export const RESOURCES_HUB_NAV: { slug: string; label: string }[] = [
    { slug: "quoting-tools", label: "Quoting Tools" },
    { slug: "financial-calculators", label: "Financial Calculators" },
    { slug: "non-solicitation-form", label: "Non-Solicitation Form" },
    { slug: "motivational-messages", label: "Motivational Messages" },
    { slug: "recommended-reading-list", label: "Recommended Reading List" },
    { slug: "naic-resources", label: "NAIC Resources" },
    { slug: "immigration-guidelines", label: "Immigration Guidelines" },
    { slug: "legacy-ownership-qualification", label: "Legacy Ownership Qualification" },
    { slug: "tools", label: "Tools" },
    { slug: "fellow", label: "Fellow" },
];

export const RESOURCES_HUB_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    RESOURCES_HUB_NAV.map(({ slug, label }) => [`resources/resources/${slug}`, label]),
);

export function resourcesHubLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/resources/resources",
        },
        ...RESOURCES_HUB_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/resources/resources/${slug}`,
        })),
    ];
}
