"use client";

import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";

const FAQS = [
    "I am new to Experior, what do I need to do to start submitting contracts?",
    "I have uploaded my license(s), but it was declined, why?",
    "How long should I wait for my documents or contract to be approved?",
    "I have uploaded my Errors & Omissions (E&O), but it was declined, why?",
    "My contract was declined by Experior and not the insurance company, why?",
    "My contract was submitted a while ago, but I still have not been approved, why?",
    "Where is my agent code?",
    "How can I learn about provider/carrier products?",
    "Who should I reach out to for Quantum questions?",
    "How do I register for LIMRA?",
    "What do I do if I have a National Producer Number (NPN) and I can't add it to the Back Office in my agent profile?",
];

export default function NewAgentReadyToSellView() {
    return (
        <div className="new-agent-ready px-3 py-4 md:px-5 md:py-5">
            <h1 className="text-2xl font-bold text-900 m-0 mb-4">Get Ready To Sell</h1>
            <p className="text-center text-700 m-0 mb-4">
                Great! You&apos;re licensed and ready to get started. Now let&apos;s get you contracted with the right carriers.
            </p>

            <section className="surface-0 border-1 surface-border border-round-lg p-3 mb-4">
                <p className="m-0 text-sm text-800 font-semibold mb-2">Coming from Another IMO or MGA?</p>
                <p className="m-0 text-sm text-700 mb-2">Transfer your existing contracts to Experior first. This transfers your book over while keeping your agents and clients relationships.</p>
                <button type="button" className="p-button-link p-0 border-none bg-transparent text-primary cursor-pointer">
                    Review Transfer Process →
                </button>
            </section>

            <section className="surface-0 border-1 surface-border border-round-xl p-4 mb-4" style={{ borderLeft: "4px solid #facc15" }}>
                <h2 className="text-2xl font-semibold text-900 mt-0 mb-3">1&nbsp;&nbsp;Choose Your Starting Carriers</h2>
                <div className="surface-50 border-round p-3 mb-3 text-sm text-800">Carrier Limit Notice: New agents can contract with up to 5 carriers. Once you&apos;ve written business, you&apos;ll be eligible to add more.</div>
                <div className="grid mb-3">
                    <div className="col-12 md:col-4">
                        <div className="surface-0 border-1 surface-border border-round p-3 h-full">
                            <h4 className="m-0 mb-2 text-lg">Young Families (20s-40s)</h4>
                            <p className="m-0 text-sm text-700 line-height-3">Affordable protection and income replacement needs.</p>
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="surface-0 border-1 surface-border border-round p-3 h-full">
                            <h4 className="m-0 mb-2 text-lg">Pre-Retirees & Wealth Builders (40s-60s)</h4>
                            <p className="m-0 text-sm text-700 line-height-3">Retirement accumulation, long-term care strategies.</p>
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="surface-0 border-1 surface-border border-round p-3 h-full">
                            <h4 className="m-0 mb-2 text-lg">Seniors & Retirees (60+)</h4>
                            <p className="m-0 text-sm text-700 line-height-3">Final expense, guaranteed issue life, annuities and legacy planning.</p>
                        </div>
                    </div>
                </div>
                <div className="surface-50 border-round p-3 text-sm text-800">Talk to your Executive Director before submitting new carrier contracts. They&apos;ll help you choose the top fit carriers that best fit your market and goals.</div>
            </section>

            <section className="surface-0 border-1 surface-border border-round-xl p-4 mb-4" style={{ borderLeft: "4px solid #facc15" }}>
                <h2 className="text-2xl font-semibold text-900 mt-0 mb-3">2&nbsp;&nbsp;Upload Your Required Documents</h2>
                <p className="text-sm text-700 m-0 mb-3">Submit all necessary compliance documents. Upon approval, you&apos;ll be able to submit your carrier contracts.</p>
                <div className="grid">
                    {["State License(s)", "E&O insurance certificate", "Signature card", "AML agreement", "Background information", "Debt checklist/obligation form", "Driver's license", "Additional documents as needed"].map((d) => (
                        <div key={d} className="col-12 md:col-6">
                            <div className="surface-0 border-1 surface-border border-round p-2 text-sm">{d}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-3">
                    <Button label="UPLOAD DOCUMENTS" className="p-button-warning p-button-sm font-bold" />
                </div>
            </section>

            <section className="surface-0 border-1 surface-border border-round-xl p-4 mb-4" style={{ borderLeft: "4px solid #facc15" }}>
                <h2 className="text-2xl font-semibold text-900 mt-0 mb-3">3&nbsp;&nbsp;Submit Your Contract Applications</h2>
                <p className="text-sm text-700 m-0 mb-3">Complete the contracting process and get appointed with your chosen carriers.</p>
                <div className="surface-50 border-round p-3 mb-3 text-sm text-800">
                    <p className="m-0 mb-1 font-semibold">Watch the Tutorial First</p>
                    <p className="m-0">Contracting training videos walk you through the process step-by-step.</p>
                </div>
                <Button label="GO TO MY CONTRACTS" className="p-button-warning p-button-sm font-bold" />
            </section>

            <section className="surface-0 border-1 surface-border border-round-xl p-4 mb-4" style={{ borderLeft: "4px solid #facc15" }}>
                <h2 className="text-4xl font-bold text-900 text-center mt-0 mb-2">Contracting FAQs</h2>
                <p className="text-center text-700 m-0 mb-3">Common questions about the contracting process and requirements</p>
                <Accordion multiple activeIndex={[0]}>
                    {FAQS.map((q) => (
                        <AccordionTab key={q} header={q}>
                            <p className="m-0 text-700">Answer content can be added here.</p>
                        </AccordionTab>
                    ))}
                </Accordion>
            </section>

            <section className="border-round-xl p-4 md:p-5 text-center" style={{ background: "#020617" }}>
                <h3 className="text-4xl md:text-5xl font-bold text-white m-0 mb-2">What&apos;s Next?</h3>
                <p className="text-white-alpha-80 text-lg line-height-3 m-0 mb-3">
                    Excellent! You&apos;re licensed and your contracting is in place. Now you&apos;re ready to run your business, build your team,
                    and grow your success with Experior.
                </p>
                <Button label="RUN YOUR BUSINESS →" className="p-button-warning font-bold p-button-sm" />
            </section>
        </div>
    );
}

