"use client";

import { Accordion, AccordionTab } from "primereact/accordion";

const ORANGE = "#f97316";
const ORANGE_DEEP = "#ea580c";

type Category = {
    header: string;
    /** Product / carrier rows shown when expanded */
    items: string[];
};

const SNAPVIEW_CATEGORIES: Category[] = [
    {
        header: "Whole Life",
        items: [
            "National Life Group / LSW Total Secure WL",
            "Americo Advantage WL",
            "Foresters Advantage Plus II",
            "GTL (Guarantee Trust Life)",
        ],
    },
    { header: "Term Simplified issue", items: [] },
    { header: "Term", items: [] },
    { header: "IUL", items: [] },
    { header: "IUL & UL Simplified Issue", items: [] },
    { header: "Final Expense", items: [] },
];

function IsvLogo() {
    return (
        <div className="flex flex-column align-items-center mb-4 py-2">
            <svg width="100" height="78" viewBox="0 0 100 78" aria-hidden className="mb-2">
                <path d="M50 10 Q18 28 12 34 L88 34 Q82 28 50 10 Z" fill={ORANGE} />
                <rect x="48" y="32" width="4" height="14" rx="1" fill={ORANGE_DEEP} />
                <path
                    d="M50 50 C44 44 34 44 34 52 C34 60 50 74 50 74 C50 74 66 60 66 52 C66 44 56 44 50 50 Z"
                    fill={ORANGE_DEEP}
                />
            </svg>
            <span className="font-bold line-height-1 m-0 mb-1" style={{ color: ORANGE, fontSize: "2.75rem", letterSpacing: "0.02em" }}>
                ISV
            </span>
            <span
                className="text-lg m-0"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: ORANGE_DEEP }}
            >
                Insurance Snap View
            </span>
        </div>
    );
}

function CategoryBody({ items }: { items: string[] }) {
    if (!items.length) {
        return (
            <p className="text-600 text-sm line-height-3 m-0">
                Carrier and product options in SnapView change by market and appointment. Open{" "}
                <strong className="text-700">Insurance SnapView</strong> in your workflow for the current list in this category, or
                confirm with your upline.
            </p>
        );
    }

    return (
        <ul className="list-none m-0 p-0 flex flex-column gap-2">
            {items.map((label) => (
                <li
                    key={label}
                    className="surface-100 border-round-lg p-3 text-700 text-sm md:text-base flex align-items-center justify-content-between gap-3 border-1 surface-border"
                >
                    <span className="line-height-3">{label}</span>
                    <i className="pi pi-angle-left text-600 flex-shrink-0" aria-hidden />
                </li>
            ))}
        </ul>
    );
}

export default function InsuranceSnapViewIsvView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "40rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">NEW Insurance SnapView (ISV)</h1>

                <div
                    className="border-round-xl p-3 md:p-4 surface-ground"
                    style={{ border: "2px solid #fde047" }}
                >
                    <IsvLogo />
                    <Accordion multiple activeIndex={[0]} className="isv-snapview-accordion m-0">
                        {SNAPVIEW_CATEGORIES.map((cat) => (
                            <AccordionTab key={cat.header} header={cat.header}>
                                <CategoryBody items={cat.items} />
                            </AccordionTab>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
