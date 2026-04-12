import type { MenuModel } from "@/types/index";

/** Internal pages under Learn → Resources → Forms (order preserved). */
export const FORMS_NAV: { slug: string; label: string }[] = [
    {
        slug: "executive-director-promotion-request",
        label: "Executive Director Promotion Request (ED Access Only)",
    },
    {
        slug: "ring-earner-recognition-request",
        label: "Ring Earner Recognition Request (ED Access Only)",
    },
    {
        slug: "grandfathered-ed-shares-legacy-qualification",
        label: "Grandfathered ED Shares & Legacy Qualification (ED Access ONLY)",
    },
    { slug: "ed-event-sponsorship-requests", label: "ED Event Sponsorship Requests" },
    {
        slug: "recommendation-for-termination",
        label: "Recommendation for Termination (ED Access Only)",
    },
    { slug: "beam-forms", label: "BEAM Forms" },
];

export const FORMS_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    FORMS_NAV.map(({ slug, label }) => [`resources/forms/${slug}`, label]),
);

export function formsLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/resources/forms",
        },
        ...FORMS_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/resources/forms/${slug}`,
        })),
    ];
}
