import type { MenuModel } from "@/types/index";

/** Slugs and labels match the Carriers section in the agent learn menu (order preserved). */
export const CARRIERS_NAV: { slug: string; label: string }[] = [
    { slug: "at-a-glance-guides", label: "At a Glance Guides" },
    { slug: "carrier-state-coverage", label: "Carrier State Coverage" },
    { slug: "aig-product-information", label: "AIG Product Information" },
    { slug: "foresters", label: "Foresters" },
    { slug: "f-g", label: "F&G" },
    { slug: "nlg", label: "NLG" },
    { slug: "aflac", label: "Aflac" },
    { slug: "allianz", label: "Allianz" },
    { slug: "american-amicable", label: "American Amicable" },
    { slug: "americo", label: "Americo" },
    { slug: "american-equity-products", label: "American Equity Products" },
    { slug: "anico", label: "ANICO" },
    { slug: "assurity", label: "Assurity" },
    { slug: "athene", label: "Athene" },
    { slug: "augustar", label: "AuguStar" },
    { slug: "augustar-retirement-annuities", label: "AuguStar Retirement Annuities" },
    { slug: "baltimore-life", label: "Baltimore Life" },
    { slug: "breeze-fmo", label: "Breeze FMO" },
    { slug: "cica-life", label: "CICA Life" },
    { slug: "columbus-life", label: "Columbus Life" },
    { slug: "corebridge", label: "Corebridge" },
    { slug: "ethos", label: "Ethos" },
    { slug: "gerber-life-insurance", label: "Gerber Life Insurance" },
    { slug: "great-western", label: "Great Western" },
    { slug: "john-hancock", label: "John Hancock" },
    { slug: "lafayette", label: "Lafayette" },
    { slug: "liberty-bankers", label: "Liberty Bankers" },
    { slug: "manhattan-life", label: "Manhattan Life" },
    { slug: "mass-mutual", label: "Mass Mutual" },
    { slug: "mutual-of-omaha", label: "Mutual Of Omaha" },
    { slug: "nationwide", label: "Nationwide" },
    { slug: "niw", label: "NIW" },
    { slug: "north-american", label: "North American" },
    { slug: "oneamerica", label: "OneAmerica" },
    { slug: "royal-neighbors-of-america", label: "Royal Neighbors of America" },
    { slug: "sbli", label: "SBLI" },
    { slug: "security-benefit-annuities", label: "Security Benefit Annuities" },
    { slug: "silac", label: "Silac" },
    { slug: "symetra", label: "Symetra" },
    { slug: "transamerica", label: "Transamerica" },
];

export const CARRIER_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    CARRIERS_NAV.map(({ slug, label }) => [`products/carriers/${slug}`, label]),
);

/** Submenu under Learn → Products → Carriers (parent row is toggle-only; leaves use `to`). */
export function carrierLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/products/carriers",
        },
        ...CARRIERS_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/products/carriers/${slug}`,
        })),
    ];
}
