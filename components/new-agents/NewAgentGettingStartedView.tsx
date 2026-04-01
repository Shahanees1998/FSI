"use client";

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

const BENEFITS = [
    {
        title: "Work Your Way",
        text: "Build your business part-time or full-time. You control your schedule and your income potential.",
        icon: "pi pi-calendar",
    },
    {
        title: "Best Compensation in the Industry",
        text: "Enjoy competitive commissions and attractive bonus structures that reward your hard work.",
        icon: "pi pi-dollar",
    },
    {
        title: "Fastest Growing IMO in North America",
        text: "Join a dynamic, expanding organization with proven systems and momentum on your side.",
        icon: "pi pi-chart-line",
    },
    {
        title: "Own Your Business from Day One",
        text: "Build real equity in your book of business. Your clients are yours to keep and serve.",
        icon: "pi pi-briefcase",
    },
    {
        title: "World-Class Tools & Training",
        text: "Access professional resources and hands-on mentorship from top-performing leaders.",
        icon: "pi pi-cog",
    },
    {
        title: "Legacy for Future Generations",
        text: "Pass your business to your family, creating long-term financial security.",
        icon: "pi pi-users",
    },
];

export default function NewAgentGettingStartedView() {
    const router = useRouter();

    return (
        <div className="new-agent-started px-3 py-4 md:px-5 md:py-5">
            <h1 className="text-2xl font-bold text-900 m-0 mb-4">Getting Started</h1>

            <section className="border-round-xl p-4 md:p-5 text-center mb-5" style={{ background: "#fdf0e3" }}>
                <h2 className="text-4xl md:text-5xl font-bold text-900 m-0 mb-3">Welcome to Experior</h2>
                <p className="text-lg md:text-xl text-700 m-0">Congratulations on joining the fastest growing IMO in North America.</p>
            </section>

            <h3 className="text-center text-2xl font-semibold text-900 m-0 mb-4">You&apos;ve Made a Great Decision</h3>

            <section className="grid mb-5">
                {BENEFITS.map((b) => (
                    <div key={b.title} className="col-12 md:col-6">
                        <div className="surface-0 border-1 surface-border border-round-lg p-3 h-full">
                            <div className="flex align-items-start gap-3">
                                <span
                                    className="inline-flex align-items-center justify-content-center border-round text-900 flex-shrink-0"
                                    style={{ width: "2rem", height: "2rem", background: "#facc15" }}
                                >
                                    <i className={`${b.icon} text-sm`} />
                                </span>
                                <div>
                                    <h4 className="text-lg font-semibold text-900 mt-0 mb-1">{b.title}</h4>
                                    <p className="text-700 line-height-3 m-0">{b.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <h3 className="text-center text-2xl font-semibold text-900 m-0 mb-4">Get Started Today</h3>

            <section className="surface-0 border-1 surface-border border-round-xl p-4 text-center mx-auto mb-5" style={{ maxWidth: "580px" }}>
                <h4 className="text-2xl font-semibold text-900 m-0 mb-2">Complete Your Back Office Profile</h4>
                <p className="text-700 m-0 mb-3">Set up your agent profile with contact information, licensing details, and preferences.</p>
                <Button label="COMPLETE YOUR PROFILE" className="p-button-warning font-bold px-4 py-2" />
            </section>

            <section
                className="border-round-xl p-5 text-center mx-auto"
                style={{
                    maxWidth: "1000px",
                    background: "radial-gradient(circle at 50% 10%, #172554 0%, #0f172a 55%, #020617 100%)",
                    boxShadow: "0 12px 24px rgba(2, 6, 23, 0.25)",
                }}
            >
                <h3 className="text-4xl md:text-5xl font-bold text-white m-0 mb-2">Your Next Step: Get Licensed</h3>
                <p className="text-white-alpha-80 text-lg line-height-3 m-0 mb-4">
                    Ready to become a licensed insurance agent? Follow our step-by-step guide to get your license and complete all
                    compliance requirements.
                </p>
                <Button
                    label="START YOUR LICENSING JOURNEY →"
                    className="p-button-warning font-bold px-5 py-2"
                    onClick={() => router.push("/agent/new-agents/get-licensed")}
                />
                <p className="text-blue-200 text-sm mt-3 mb-0">Already licensed? Get ready to sell →</p>
            </section>
        </div>
    );
}

