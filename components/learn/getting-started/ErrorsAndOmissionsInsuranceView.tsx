"use client";

import type { ReactNode } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";

type ErrorsAndOmissionsInsuranceViewProps = {
    signUpUrl: string;
    pricingGuidePdfUrl: string;
    viewRatesPdfUrl: string;
    programComparisonPdfUrl: string;
};

function InfoCard({
    icon,
    title,
    children,
}: {
    icon: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <div className="surface-50 border-1 surface-border border-round-lg p-3 md:p-4 h-full">
            <div className="flex align-items-start gap-3">
                <span
                    className="inline-flex align-items-center justify-content-center border-round flex-shrink-0 text-orange-600"
                    style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        background: "rgba(234, 88, 12, 0.12)",
                    }}
                >
                    <i className={`pi ${icon} text-xl`} aria-hidden />
                </span>
                <div>
                    <p className="text-900 font-semibold m-0 mb-1">{title}</p>
                    <div className="text-700 text-sm line-height-3 m-0">{children}</div>
                </div>
            </div>
        </div>
    );
}

function RatesTable({
    title,
    subtitle,
    opt1Each,
    opt2Each,
    aggregate,
    opt1OneTime,
    opt2OneTime,
    opt1Monthly,
    opt2Monthly,
}: {
    title: string;
    subtitle: string;
    opt1Each: string;
    opt2Each: string;
    aggregate: string;
    opt1OneTime: string;
    opt2OneTime: string;
    opt1Monthly: string;
    opt2Monthly: string;
}) {
    return (
        <div className="mb-4">
            <h4 className="text-lg font-semibold text-900 mt-0 mb-1">{title}</h4>
            <p className="text-600 text-sm m-0 mb-3">{subtitle}</p>
            <div className="overflow-x-auto border-1 surface-border border-round-lg">
                <table className="w-full border-collapse text-sm" style={{ minWidth: "280px" }}>
                    <thead>
                        <tr className="surface-100">
                            <th className="text-left border-1 surface-border p-2 md:p-3">Coverage item</th>
                            <th className="text-center border-1 surface-border p-2 md:p-3">Option I</th>
                            <th className="text-center border-1 surface-border p-2 md:p-3">Option II</th>
                        </tr>
                    </thead>
                    <tbody className="text-700">
                        <tr>
                            <td className="border-1 surface-border p-2 md:p-3 font-medium">Each claim limit</td>
                            <td className="border-1 surface-border p-2 md:p-3 text-center">{opt1Each}</td>
                            <td className="border-1 surface-border p-2 md:p-3 text-center">{opt2Each}</td>
                        </tr>
                        <tr>
                            <td className="border-1 surface-border p-2 md:p-3 font-medium">Aggregate limit</td>
                            <td className="border-1 surface-border p-2 md:p-3 text-center" colSpan={2}>
                                {aggregate}
                            </td>
                        </tr>
                        <tr>
                            <td className="border-1 surface-border p-2 md:p-3 font-medium">One-time payment</td>
                            <td className="border-1 surface-border p-2 md:p-3 text-center">{opt1OneTime}</td>
                            <td className="border-1 surface-border p-2 md:p-3 text-center">{opt2OneTime}</td>
                        </tr>
                        <tr>
                            <td className="border-1 surface-border p-2 md:p-3 font-medium">Monthly installment</td>
                            <td className="border-1 surface-border p-2 md:p-3 text-center text-sm">{opt1Monthly}</td>
                            <td className="border-1 surface-border p-2 md:p-3 text-center text-sm">{opt2Monthly}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function ErrorsAndOmissionsInsuranceView({
    signUpUrl,
    pricingGuidePdfUrl,
    viewRatesPdfUrl,
    programComparisonPdfUrl,
}: ErrorsAndOmissionsInsuranceViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Errors and Omissions Insurance</h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-4"
                    style={{
                        background: "linear-gradient(115deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
                        boxShadow: "0 8px 24px rgba(234, 88, 12, 0.25)",
                    }}
                >
                    <h2
                        className="m-0 text-white font-bold text-center line-height-3"
                        style={{
                            fontSize: "clamp(1.1rem, 3.2vw, 1.85rem)",
                            letterSpacing: "0.06em",
                        }}
                    >
                        ERRORS &amp; OMISSIONS COURSE
                    </h2>
                </div>

                <div className="grid mb-4">
                    <div className="col-12 md:col-6">
                        <div className="surface-0 border-1 surface-border border-round-lg p-4 h-full flex align-items-center justify-content-center text-center">
                            <div>
                                <p className="text-900 font-bold text-lg m-0 mb-1">Daniel &amp; Henry</p>
                                <p className="text-600 text-sm m-0">Insurance and Risk Management</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="surface-0 border-1 surface-border border-round-lg p-4 h-full flex align-items-center justify-content-center text-center">
                            <div>
                                <p className="text-900 font-bold text-lg m-0 mb-1">Experior Financial Group Inc.</p>
                                <p className="text-600 text-sm m-0">Partner program</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p
                    className="text-xl md:text-2xl font-semibold m-0 mb-4 text-center md:text-left line-height-3"
                    style={{ color: "#92400e" }}
                >
                    Experior Financial Group Agents — Professional Liability (E&amp;O) Insurance Program
                </p>

                <div className="flex flex-column lg:flex-row flex-wrap gap-2 mb-5">
                    <Button
                        label="Sign Up Here"
                        className="p-button-warning font-bold"
                        title={
                            signUpUrl.trim()
                                ? undefined
                                : "Configure NEXT_PUBLIC_EO_SIGNUP_URL with your enrollment link."
                        }
                        onClick={() => {
                            if (signUpUrl.trim()) window.open(signUpUrl.trim(), "_blank", "noopener,noreferrer");
                        }}
                        disabled={!signUpUrl.trim()}
                    />
                    <Button
                        label="E&O Pricing Guide (PDF)"
                        className="p-button-outlined"
                        onClick={() => window.open(pricingGuidePdfUrl, "_blank", "noopener,noreferrer")}
                    />
                    <Button
                        label="View Rates (PDF)"
                        className="p-button-outlined"
                        onClick={() => window.open(viewRatesPdfUrl, "_blank", "noopener,noreferrer")}
                    />
                    <Button
                        label="Insurance Program Comparison"
                        className="p-button-outlined font-medium"
                        onClick={() => window.open(programComparisonPdfUrl, "_blank", "noopener,noreferrer")}
                    />
                </div>

                <div className="grid mb-5">
                    <div className="col-12 md:col-6 mb-3 md:mb-0">
                        <InfoCard icon="pi-building" title="Insured">
                            <span className="font-medium text-900">Markel American Insurance Company</span> (A-rated carrier).
                        </InfoCard>
                    </div>
                    <div className="col-12 md:col-6 mb-3 md:mb-0">
                        <InfoCard icon="pi-calendar" title="Common renewal">
                            <span className="font-medium text-900">July 1</span> — annual program renewal date for most
                            participants.
                        </InfoCard>
                    </div>
                    <div className="col-12 md:col-6">
                        <InfoCard icon="pi-desktop" title="Enroll online">
                            Complete enrollment electronically for <span className="font-medium text-900">instant proof of coverage</span>{" "}
                            when eligible.
                        </InfoCard>
                    </div>
                    <div className="col-12 md:col-6">
                        <InfoCard icon="pi-phone" title="Program administration">
                            The Daniel and Henry Co. supports questions, changes, and servicing for this group program.
                        </InfoCard>
                    </div>
                </div>

                <section className="mb-4">
                    <h3 className="text-xl font-semibold text-900 mt-0 mb-3">Program overview</h3>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        This professional liability (E&amp;O) program is available to Experior Financial Group agents, with coverage
                        placed through <strong>Markel American Insurance Company</strong>. New enrollment periods and rate sheets are
                        published by the program administrator; effective dates and eligibility are governed by the master policy
                        and your enrollment agreement.
                    </p>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        The program is designed to begin enrolling agents with coverage effective{" "}
                        <strong>July 1, 2025</strong>, subject to carrier and administrator approval.
                    </p>
                    <div
                        className="border-round-lg p-4 mb-0"
                        style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
                    >
                        <p className="text-800 font-semibold m-0 mb-2">Common renewal date — July 1</p>
                        <p className="text-700 line-height-3 m-0 text-sm">
                            If you enroll after the annual renewal, you may receive a short-term policy through the next July 1
                            renewal, with premium typically <strong>prorated</strong> for that shortened term. Your certificate and
                            administrator communications will confirm your term and premium.
                        </p>
                    </div>
                </section>

                <section className="mb-4">
                    <h3 className="text-xl font-semibold text-orange-600 mt-0 mb-3">Rates &amp; coverage levels</h3>
                    <RatesTable
                        title="New agent"
                        subtitle="License &lt; 2 years • Revenue &lt; $100,000"
                        opt1Each="$1,000,000"
                        opt2Each="$2,000,000"
                        aggregate="$2,000,000 (each option)"
                        opt1OneTime="$334.00"
                        opt2OneTime="$563.00"
                        opt1Monthly="$21.75/mo (installment plan per program terms)"
                        opt2Monthly="$39.37/mo (installment plan per program terms)"
                    />
                    <RatesTable
                        title="Experienced agent"
                        subtitle="License &gt; 2 years • or revenue &gt; $100,000"
                        opt1Each="$1,000,000"
                        opt2Each="$2,000,000"
                        aggregate="$2,000,000 (each option)"
                        opt1OneTime="$420.00"
                        opt2OneTime="$725.00"
                        opt1Monthly="$28.97/mo (installment plan per program terms)"
                        opt2Monthly="$52.44/mo (installment plan per program terms)"
                    />
                    <p className="text-600 text-xs line-height-3 m-0">
                        Figures shown are representative of the published program design; down payments, service fees, and taxes may
                        apply. Confirm current rates, limits, and payment options with the official PDFs above or with Daniel &amp;
                        Henry before you bind coverage.
                    </p>
                </section>

                <Accordion multiple className="mb-0">
                    <AccordionTab header="How to Enroll">
                        <ol className="text-700 line-height-3 m-0 pl-3 text-sm">
                            <li className="mb-2">
                                Review the <strong>E&amp;O Pricing Guide</strong> and <strong>View Rates</strong> PDFs so you understand
                                limits and premium options.
                            </li>
                            <li className="mb-2">
                                Click <strong>Sign Up Here</strong> when you are ready (link must be configured for your environment).
                            </li>
                            <li className="mb-2">
                                Complete the online application truthfully, including revenue estimates and licensing details.
                            </li>
                            <li className="mb-2">
                                Download and retain your evidence of coverage after enrollment is approved.
                            </li>
                            <li>
                                For help, contact the program administrator at Daniel &amp; Henry using the channels provided in your
                                enrollment materials.
                            </li>
                        </ol>
                    </AccordionTab>
                    <AccordionTab header="Insurance Program Comparison">
                        <p className="text-700 line-height-3 m-0 text-sm">
                            Use the <strong>Insurance Program Comparison</strong> PDF in the button row above for a side-by-side view
                            of benefits, limits, and features versus other market options. If you are unsure which option (I or II)
                            fits your practice, discuss with your upline or a licensed insurance professional before purchasing.
                        </p>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    );
}
