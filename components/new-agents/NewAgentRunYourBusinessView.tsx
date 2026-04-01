"use client";

import { Button } from "primereact/button";

const QUICK_ACCESS = [
    { title: "Reports", text: "Review paid, and debt reports. Track your commissions and case status.", link: "View Reports +" },
    { title: "My Contracts", text: "Manage carrier contracts, upload documents, and track contracting status.", link: "My Contracts +" },
    { title: "My Team", text: "See your recruited agents, track team growth, and manage your downline.", link: "View Team +" },
    { title: "Support Tickets", text: "Submit a support request or check the status of existing tickets.", link: "Submit Ticket +" },
];

const TRAINING = [
    { title: "Experior Academy", text: "Ongoing courses for product knowledge, sales skills, and business development.", link: "Access Academy +" },
    { title: "Lead Training Guides", text: "Agent-only and leader-only sales structure, objection handling, appointment setting, and door knocking tips.", link: "View Training Guides +" },
    { title: "New Business Training (NBT)", text: "Back office tutorials and case processing walkthroughs.", link: "Watch NBT Videos +" },
    { title: "Events & Training Calendar", text: "Live webinars, training sessions, and company events. View upcoming events and archive replays.", link: "View Calendar +" },
    { title: "Marketing Hub", text: "Professional marketing materials, recruiting presentations, and social media assets.", link: "Explore Marketing Hub +" },
];

const RECRUITING = [
    { title: "BTO Webinar Recordings", text: "Business building and recruiting strategies from experienced leaders.", link: "Watch BTO Webinars +" },
    { title: "Driving Your Success Webinar", text: "Leadership development and team growth training.", link: "Watch Webinar +" },
];

const MAINTAIN_LICENSE = [
    { title: "Licensing & Compliance (NIPR)", text: "Manage your licenses, track renewals, and stay compliant across all states.", link: "Visit NIPR +" },
    { title: "CE Credits Providers", text: "Find approved continuing education providers to meet your state requirements.", link: "Find CE Providers +" },
];

const COMPLIANCE = [
    { title: "Compliance Manual", text: "Complete guide to market conduct and sales practices for Experior agents.", link: "View Manual (PDF) +" },
    { title: "Compliance Incident Report", text: "Report compliance violations or incidents through this secure form.", link: "Submit Report +" },
    { title: "Compliance Best Practices", text: "Your guide to selling the right way-protect yourself, your clients, and your business.", link: "View Best Practices +" },
];

const FAQS = [
    "What days of the week does Experior pay out commissions?",
    "When will I receive my commissions for any given investment/policy?",
    "I have a question about my commission payment and/or statement?",
    "My commission level is incorrect, what should I do?",
    "I entered an NBT incorrectly, how do I fix it?",
    "Why is my report showing in red?",
    "What is a Roll Up and why does it appear on my report?",
    "The carrier stated they paid Experior on Wednesday, but it wasn't included in my Thursday pay run. What is the delay?",
    "The statement was available to you today. Why was it not included in today's pay run?",
];

function SectionHeader({ icon, title }: { icon: string; title: string }) {
    return (
        <div className="surface-0 border-1 surface-border border-round-xl p-3 mb-3" style={{ borderLeft: "4px solid #facc15" }}>
            <div className="flex align-items-center gap-2">
                <span className="inline-flex align-items-center justify-content-center border-round" style={{ width: "2rem", height: "2rem", background: "#facc15" }}>
                    <i className={icon} />
                </span>
                <h3 className="m-0 text-2xl font-semibold text-900">{title}</h3>
            </div>
        </div>
    );
}

function ResourceGrid({ items, cols = "md:col-6" }: { items: { title: string; text: string; link: string }[]; cols?: string }) {
    return (
        <div className="grid mb-4">
            {items.map((i) => (
                <div key={i.title} className={`col-12 ${cols}`}>
                    <div className="surface-0 border-1 surface-border border-round-lg p-3 h-full">
                        <h4 className="text-xl font-semibold text-900 m-0 mb-2">{i.title}</h4>
                        <p className="text-700 text-sm line-height-3 m-0 mb-2">{i.text}</p>
                        <button type="button" className="p-button-link p-0 border-none bg-transparent text-primary cursor-pointer text-sm font-medium">
                            {i.link}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function NewAgentRunYourBusinessView() {
    return (
        <div className="new-agent-run-business px-3 py-4 md:px-5 md:py-5">
            <div className="mx-auto" style={{ maxWidth: "1120px" }}>
                <h1 className="text-2xl font-bold text-900 m-0 mb-4">Run Your Business</h1>

                <section className="surface-0 border-1 surface-border border-round-xl p-4 md:p-5 text-center mb-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-900 m-0 mb-2">Run Your Business</h2>
                    <p className="text-700 text-lg m-0">Your hub for day-to-day operations, training, team building, and support.</p>
                </section>

                <SectionHeader icon="pi pi-bolt" title="Most Popular (Quick Access)" />
                <ResourceGrid items={QUICK_ACCESS} />

                <SectionHeader icon="pi pi-sync" title="Training & Development" />
                <ResourceGrid items={TRAINING} />

                <SectionHeader icon="pi pi-users" title="Recruiting & Team Building" />
                <ResourceGrid items={RECRUITING} />

                <section className="surface-50 border-1 surface-border border-round-xl p-3 mb-4">
                    <h3 className="m-0 mb-2 text-2xl font-semibold text-900">New Agent Resources</h3>
                    <div className="surface-0 border-1 surface-border border-round p-2 mb-2 text-sm">
                        <strong>Getting Started</strong> - For unlicensed or newly licensed agents
                    </div>
                    <div className="surface-0 border-1 surface-border border-round p-2 text-sm">
                        <strong>Ready To Sell</strong> - For licensed agents ready to contract
                    </div>
                </section>

                <SectionHeader icon="pi pi-sun" title="Maintain Your License" />
                <ResourceGrid items={MAINTAIN_LICENSE} />

                <SectionHeader icon="pi pi-file-edit" title="Compliance" />
                <ResourceGrid items={COMPLIANCE} cols="md:col-4" />

                <SectionHeader icon="pi pi-question-circle" title="Frequently Asked Questions" />
                <section className="surface-0 border-1 surface-border border-round-xl p-3 mb-4">
                    {FAQS.map((q) => (
                        <div key={q} className="flex justify-content-between align-items-center py-3 border-bottom-1 surface-border">
                            <span className="text-sm text-800">{q}</span>
                            <span className="text-yellow-600 font-bold">+</span>
                        </div>
                    ))}
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
        </div>
    );
}

