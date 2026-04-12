import type { MenuModel } from "@/types/index";

/** Slugs and labels match the Puerto Rico section in the agent learn menu (order preserved). */
export const PUERTO_RICO_NAV: { slug: string; label: string }[] = [
    { slug: "puerto-rico-tax-reporting", label: "Puerto Rico Tax Reporting" },
    { slug: "licensing-guide", label: "Licensing Guide" },
    { slug: "provisional-license-guide", label: "Provisional License Guide" },
    { slug: "universal-life-insurance-company", label: "Universal Life Insurance Company" },
    { slug: "anico", label: "ANICO" },
    { slug: "augustar", label: "AuguStar" },
    { slug: "transamerica-puerto-rico", label: "Transamerica Puerto Rico" },
    { slug: "tolic", label: "TOLIC" },
];

export const PUERTO_RICO_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    PUERTO_RICO_NAV.map(({ slug, label }) => [`products/puerto-rico/${slug}`, label]),
);

export function puertoRicoLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/products/puerto-rico",
        },
        ...PUERTO_RICO_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/products/puerto-rico/${slug}`,
        })),
    ];
}
