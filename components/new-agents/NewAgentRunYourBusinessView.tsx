"use client";

import Link from "next/link";

type ResourceItem = { title: string; text: string; link: string; href: string };

const QUICK_ACCESS: ResourceItem[] = [
    { title: "Reports", text: "Review paid, and debt reports. Track your commissions and case status.", link: "View Reports +", href: "/agent/reports" },
    { title: "My Contracts", text: "Manage carrier contracts, upload documents, and track contracting status.", link: "My Contracts +", href: "/agent/contracts/my-contracts" },
    { title: "My Team", text: "See your recruited agents, track team growth, and manage your downline.", link: "View Team +", href: "/agent/team/visual-network" },
    { title: "Support Tickets", text: "Submit a support request or check the status of existing tickets.", link: "Submit Ticket +", href: "/agent/tickets" },
];

const TRAINING: ResourceItem[] = [
    { title: "Experior Academy", text: "Ongoing courses for product knowledge, sales skills, and business development.", link: "Access Academy +", href: "/agent/learn/about-experior/experior-academy" },
    { title: "Lead Training Guides", text: "Agent-only and leader-only sales structure, objection handling, appointment setting, and door knocking tips.", link: "View Training Guides +", href: "/agent/learn/about-experior/lead-training-guides" },
    { title: "New Business Training (NBT)", text: "Back office tutorials and case processing walkthroughs.", link: "Watch NBT Videos +", href: "/agent/learn/departments/new-pending-business" },
    { title: "Events & Training Calendar", text: "Live webinars, training sessions, and company events. View upcoming events and archive replays.", link: "View Calendar +", href: "/agent/learn/about-experior/whats-new/experior-events" },
    { title: "Marketing Hub", text: "Professional marketing materials, recruiting presentations, and social media assets.", link: "Explore Marketing Hub +", href: "/agent/learn/departments/marketing" },
];

const RECRUITING: ResourceItem[] = [
    { title: "BTO Webinar Recordings", text: "Business building and recruiting strategies from experienced leaders.", link: "Watch BTO Webinars +", href: "/agent/learn/about-experior/training/bto" },
    { title: "Driving Your Success Webinar", text: "Leadership development and team growth training.", link: "Watch Webinar +", href: "/agent/learn/about-experior/training/driving-your-success-webinar" },
];

const MAINTAIN_LICENSE: ResourceItem[] = [
    { title: "Licensing & Compliance (NIPR)", text: "Manage your licenses, track renewals, and stay compliant across all states.", link: "Visit NIPR +", href: "/agent/learn/about-experior/getting-started/keep-your-license-up-to-date-with-nipr" },
    { title: "CE Credits Providers", text: "Find approved continuing education providers to meet your state requirements.", link: "Find CE Providers +", href: "/agent/learn/about-experior/getting-started/ce-credits-providers" },
];

const COMPLIANCE: ResourceItem[] = [
    { title: "Compliance Manual", text: "Complete guide to market conduct and sales practices for Experior agents.", link: "View Manual (PDF) +", href: "/agent/learn/departments/compliance" },
    { title: "Compliance Incident Report", text: "Report compliance violations or incidents through this secure form.", link: "Submit Report +", href: "/agent/tickets" },
    { title: "Compliance Best Practices", text: "Your guide to selling the right way-protect yourself, your clients, and your business.", link: "View Best Practices +", href: "/agent/learn/departments/compliance" },
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

function ResourceGrid({ items, cols = "md:col-6" }: { items: ResourceItem[]; cols?: string }) {
    return (
        <div className="grid mb-4">
            {items.map((i) => (
                <div key={i.title} className={`col-12 ${cols}`}>
                    <div className="surface-0 border-1 surface-border border-round-lg p-3 h-full">
                        <h4 className="text-xl font-semibold text-900 m-0 mb-2">{i.title}</h4>
                        <p className="text-700 text-sm line-height-3 m-0 mb-2">{i.text}</p>
                        <Link href={i.href} className="text-primary text-sm font-medium no-underline hover:underline">
                            {i.link}
                        </Link>
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
                    <Link href="/agent/new-agents/getting-started" className="surface-0 border-1 surface-border border-round p-2 mb-2 text-sm block no-underline text-800 hover:surface-50">
                        <strong>Getting Started</strong> - For unlicensed or newly licensed agents
                    </Link>
                    <Link href="/agent/new-agents/ready-to-sell" className="surface-0 border-1 surface-border border-round p-2 text-sm block no-underline text-800 hover:surface-50">
                        <strong>Ready To Sell</strong> - For licensed agents ready to contract
                    </Link>
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
                            <Link href="/agent/reports" className="text-yellow-600 font-bold no-underline hover:underline">
                                +
                            </Link>
                        </div>
                    ))}
                    <p className="text-sm text-600 m-0 mt-3">
                        Commission and reporting answers live in{" "}
                        <Link href="/agent/reports" className="text-primary">
                            Reports
                        </Link>
                        . Contracting questions are covered in the{" "}
                        <Link href="/agent/learn/about-experior/getting-started/contracting-faq" className="text-primary">
                            Contracting FAQ
                        </Link>
                        .
                    </p>
                </section>

                <section className="border-round-xl p-4 md:p-5 text-center" style={{ background: "#020617" }}>
                    <h3 className="text-4xl md:text-5xl font-bold text-white m-0 mb-2">What&apos;s Next?</h3>
                    <p className="text-white-alpha-80 text-lg line-height-3 m-0 mb-3">
                        Excellent! You&apos;re licensed and your contracting is in place. Now you&apos;re ready to run your business, build your team,
                        and grow your success with Experior.
                    </p>
                    <Link href="/agent/team/recruiting" className="p-button p-button-warning font-bold p-button-sm no-underline inline-flex align-items-center">
                        EXPLORE RECRUITING →
                    </Link>
                </section>
            </div>
        </div>
    );
}
