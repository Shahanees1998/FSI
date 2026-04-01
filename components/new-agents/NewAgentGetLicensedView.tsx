"use client";

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

const STEP_ONE = [
    {
        title: "Study for Your Exam",
        text: "Register for your exam prep course through Exam FX at a discounted rate. Complete the course and pass your state licensing exam.",
        cta: "REGISTER FOR EXAM PREP",
        icon: "pi pi-book",
    },
    {
        title: "Apply for Your State License",
        text: "Once you pass your exam, submit your state license application through NIPR. Processing times vary by state.",
        cta: "APPLY FOR STATE LICENSE",
        icon: "pi pi-id-card",
    },
];

const STEP_TWO = [
    {
        title: "Get Errors & Omissions Insurance",
        text: "E&O insurance is required before you can contract with carriers. Purchase your policy and upload the certificate to your Profile.",
        cta: "GET E&O INSURANCE",
        icon: "pi pi-shield",
    },
    {
        title: "Complete AML Certification",
        text: "US agents must complete Anti-Money Laundering (AML) certification as part of compliance requirements.",
        cta: "GET CERTIFIED",
        icon: "pi pi-user-edit",
    },
    {
        title: "Review Experior Guidelines",
        text: "Understand the standards, policies, and procedures for conducting business as an Experior agent.",
        cta: "VIEW GUIDELINES",
        icon: "pi pi-file",
    },
];

export default function NewAgentGetLicensedView() {
    const router = useRouter();

    return (
        <div className="new-agent-get-licensed px-3 py-4 md:px-5 md:py-5">
            <h1 className="text-2xl font-bold text-900 m-0 mb-4">Get Licensed</h1>

            <section className="surface-0 border-1 surface-border border-round-xl p-4 md:p-5 text-center mb-5">
                <h2 className="text-4xl md:text-5xl font-bold text-900 m-0 mb-3">Get Your License</h2>
                <p className="text-lg text-700 m-0">
                    Your step-by-step guide to becoming a licensed insurance agent and meeting all compliance requirements.
                </p>
            </section>

            <h3 className="text-2xl font-semibold text-900 mt-0 mb-3">Get Licensed</h3>
            <section className="grid mb-5">
                {STEP_ONE.map((item) => (
                    <div key={item.title} className="col-12 md:col-6">
                        <div className="surface-0 border-1 surface-border border-round-lg p-4 h-full">
                            <span
                                className="inline-flex align-items-center justify-content-center border-round text-900 mb-3"
                                style={{ width: "2rem", height: "2rem", background: "#facc15" }}
                            >
                                <i className={`${item.icon} text-sm`} />
                            </span>
                            <h4 className="text-2xl font-semibold text-900 mt-0 mb-2">{item.title}</h4>
                            <p className="text-700 line-height-3 m-0 mb-3">{item.text}</p>
                            <Button label={item.cta} className="p-button-warning font-bold p-button-sm" />
                        </div>
                    </div>
                ))}
            </section>

            <h3 className="text-2xl font-semibold text-900 mt-0 mb-3">Complete Your Licensing Requirements</h3>
            <section className="grid mb-4">
                {STEP_TWO.map((item) => (
                    <div key={item.title} className="col-12 md:col-4">
                        <div className="surface-0 border-1 surface-border border-round-lg p-4 h-full">
                            <span
                                className="inline-flex align-items-center justify-content-center border-round text-900 mb-3"
                                style={{ width: "2rem", height: "2rem", background: "#facc15" }}
                            >
                                <i className={`${item.icon} text-sm`} />
                            </span>
                            <h4 className="text-2xl font-semibold text-900 mt-0 mb-2">{item.title}</h4>
                            <p className="text-700 line-height-3 m-0 mb-3">{item.text}</p>
                            <Button label={item.cta} className="p-button-warning font-bold p-button-sm" />
                        </div>
                    </div>
                ))}
            </section>

            <section className="surface-0 border-1 surface-border border-round text-center py-3 px-3 mb-4">
                <span className="text-600">
                    Haven&apos;t finished your profile yet?{" "}
                    <button type="button" className="p-button-link text-primary p-0 border-none bg-transparent cursor-pointer">
                        Do it now.
                    </button>
                </span>
            </section>

            <section className="border-round-xl p-4 md:p-5 text-center" style={{ background: "#fdf0e3" }}>
                <h3 className="text-4xl md:text-5xl font-bold text-900 m-0 mb-2">What&apos;s Next?</h3>
                <p className="text-lg text-700 line-height-3 m-0 mb-3">
                    Once you&apos;re licensed and have completed your compliance requirements, you&apos;re ready to contract with carriers and
                    start selling.
                </p>
                <Button
                    label="READY TO CONTRACT? →"
                    className="p-button-warning font-bold p-button-sm"
                    onClick={() => router.push("/agent/new-agents/ready-to-sell")}
                />
            </section>
        </div>
    );
}

