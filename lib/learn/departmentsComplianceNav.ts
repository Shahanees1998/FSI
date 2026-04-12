import type { MenuModel } from "@/types/index";

/** Internal pages under Learn → Departments → Compliance (order preserved). */
export const COMPLIANCE_NAV: { slug: string; label: string }[] = [
    { slug: "compliance-best-practices", label: "Compliance Best Practices" },
    { slug: "experior-compliance-manual", label: "Experior Compliance Manual" },
    {
        slug: "compliance-violation-incident-report-form",
        label: "Compliance Violation / Incident Report Form",
    },
];

export const COMPLIANCE_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    COMPLIANCE_NAV.map(({ slug, label }) => [`departments/compliance/${slug}`, label]),
);

export function complianceLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/departments/compliance",
        },
        ...COMPLIANCE_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/departments/compliance/${slug}`,
        })),
    ];
}
