import type { MenuModel } from "@/types/index";

/** Internal pages under Learn → Departments → Contracting (order preserved). */
export const CONTRACTING_NAV: { slug: string; label: string }[] = [
    { slug: "licensing-xcel-solutions", label: "Licensing Xcel Solutions" },
    { slug: "licensing-exam-fx", label: "Licensing Exam FX" },
    { slug: "getting-appointed-contracted", label: "Getting Appointed/Contracted" },
    { slug: "aml-guide-to-carrier-contracting", label: "AML Guide to Carrier Contracting" },
    { slug: "aml-training", label: "AML Training" },
    { slug: "obtaining-itin", label: "Obtaining ITIN" },
    { slug: "training", label: "Training" },
    { slug: "immigration-guidelines", label: "Immigration Guidelines" },
    { slug: "ny-contracts-available", label: "NY Contracts Available" },
    { slug: "nlg-training-requirement-for-ny", label: "NLG Training Requirement for NY" },
    { slug: "transfer-forms", label: "Transfer Forms" },
    { slug: "niw-kaizen", label: "NIW Kaizen" },
    { slug: "faq", label: "FAQ" },
    { slug: "code-collectors", label: "Code Collectors" },
];

export const CONTRACTING_LEARN_TITLES: Record<string, string> = Object.fromEntries(
    CONTRACTING_NAV.map(({ slug, label }) => [`departments/contracting/${slug}`, label]),
);

export function contractingLearnMenuItems(): MenuModel[] {
    return [
        {
            label: "Overview",
            icon: "pi pi-fw pi-th-large",
            to: "/agent/learn/departments/contracting",
        },
        ...CONTRACTING_NAV.map(({ slug, label }) => ({
            label,
            icon: "pi pi-fw pi-file",
            to: `/agent/learn/departments/contracting/${slug}`,
        })),
    ];
}
