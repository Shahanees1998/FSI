import type { MenuModel } from "@/types/index";

/** Slugs and labels match the Referral Partners section in the agent learn menu (order preserved). */
export const REFERRAL_PARTNERS_NAV: { slug: string; label: string }[] = [
    { slug: "debt-relief", label: "Debt Relief" },
    { slug: "excel-empire", label: "Excel Empire" },
    { slug: "medicare-back-office", label: "Medicare Back Office" },
    { slug: "trusteefriend", label: "TrusteeFriend" },
    { slug: "scorenavigator", label: "ScoreNavigator" },
    { slug: "eos-medicare-referral", label: "EOS - Medicare Referral" },
];

export const REFERRAL_PARTNER_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    REFERRAL_PARTNERS_NAV.map(({ slug, label }) => [`products/referral-partners/${slug}`, label]),
);

export function referralPartnersLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/products/referral-partners",
        },
        ...REFERRAL_PARTNERS_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/products/referral-partners/${slug}`,
        })),
    ];
}
