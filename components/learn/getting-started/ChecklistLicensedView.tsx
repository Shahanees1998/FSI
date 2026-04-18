import Link from "next/link";

const GS = "/agent/learn/about-experior/getting-started";

const footerLink = "no-underline font-medium hover:underline text-orange-600";

export default function ChecklistLicensedView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">
                    Getting Started With Experior Checklist - Licensed
                </h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-4 flex justify-content-between align-items-center gap-3"
                    style={{
                        background: "linear-gradient(115deg, #ca8a04 0%, #eab308 38%, #f59e0b 72%, #fde047 100%)",
                        boxShadow: "0 8px 24px rgba(202, 138, 4, 0.28)",
                    }}
                >
                    <h2
                        className="m-0 text-white font-bold line-height-3"
                        style={{
                            fontSize: "clamp(1.35rem, 4vw, 2.25rem)",
                            letterSpacing: "0.08em",
                        }}
                    >
                        GETTING STARTED
                    </h2>
                    <span
                        className="inline-flex align-items-center justify-content-center border-circle bg-white bg-opacity-30 flex-shrink-0"
                        style={{ width: "3rem", height: "3rem" }}
                        aria-hidden
                    >
                        <i className="pi pi-file-edit text-white" style={{ fontSize: "1.5rem" }} />
                    </span>
                </div>

                <h3 className="text-xl font-semibold text-orange-600 mt-0 mb-3">Now that you are licensed!</h3>

                <ol className="text-700 line-height-3 m-0 pl-3 md:pl-4" style={{ listStyle: "decimal" }}>
                    <li className="mb-3 pl-2">Set your goals.</li>
                    <li className="mb-3 pl-2">Create a business plan.</li>
                    <li className="mb-3 pl-2">Make a schedule.</li>
                    <li className="mb-3 pl-2">Watch the training videos on the back office.</li>
                    <li className="mb-3 pl-2">
                        Complete your Experior back office profile, uploading your documents such as licenses, E&amp;O, banking,
                        AML, Advisor Survey, and signature card. Start from your{" "}
                        <Link href="/agent/profile" className="text-blue-600 font-medium no-underline hover:underline">
                            profile
                        </Link>
                        .
                    </li>
                    <li className="mb-3 pl-2">
                        Meet with your mentor and submit contracting for the carriers most suitable for your business. We recommend
                        starting with <strong>Foresters</strong>, <strong>Corebridge</strong>, <strong>Protective Life</strong>, and{" "}
                        <strong>F&amp;G</strong>.
                    </li>
                    <li className="mb-3 pl-2">
                        Learn how to do a discovery for clients — see the{" "}
                        <Link href="/agent/learn" className="text-blue-600 font-medium no-underline hover:underline">
                            Learn
                        </Link>{" "}
                        hub or add a{" "}
                        <Link href="/agent/clients/create" className="text-blue-600 font-medium no-underline hover:underline">
                            client profile
                        </Link>
                        .
                    </li>
                    <li className="mb-3 pl-2">
                        Make a prospect list. Start with your phone and social media. Don&apos;t prejudge!
                    </li>
                    <li className="mb-3 pl-2">
                        Own your introduction. When someone asks what you do, what do you say? <strong>Confidence is key.</strong>
                    </li>
                    <li className="mb-3 pl-2">
                        Pick up the phone and start dialing to set up appointments. Use your mentor for your first few appointments
                        while you build skills and knowledge.
                    </li>
                    <li className="mb-3 pl-2">
                        Once contracted, find the training tools on each carrier&apos;s website.
                    </li>
                    <li className="mb-3 pl-2">Learn how to do a presentation.</li>
                    <li className="mb-3 pl-2">Learn how to present the opportunity.</li>
                    <li className="mb-3 pl-2">
                        Learn how to run an illustration (most carriers illustrate on their website).
                    </li>
                </ol>

                <div className="border-top-1 surface-border pt-4 mt-2 flex flex-column gap-2">
                    <a
                        href="https://www.sircon.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLink}
                    >
                        Keep Your License Up to Date with Sircon
                    </a>
                    <Link href={`${GS}/ce-credits-providers`} className={footerLink}>
                        CE Credits Providers
                    </Link>
                    <a href="/documents/transfer-forms.pdf" target="_blank" rel="noopener noreferrer" className={footerLink}>
                        Transfer Forms
                    </a>
                    <Link href="/agent/learn/departments/contracting" className={footerLink}>
                        Contracting Training
                    </Link>
                    <a
                        href="/documents/contracting-applications.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLink}
                    >
                        Contracting Applications
                    </a>
                    <a href="/documents/experior-guidelines.pdf" target="_blank" rel="noopener noreferrer" className={footerLink}>
                        Experior Guidelines
                    </a>
                    <a
                        href="/documents/experior-compliance-manual.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLink}
                    >
                        Experior Compliance Manual
                    </a>
                    <a
                        href="https://www.experiorfinancialgroup.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLink}
                    >
                        Contracting Portal
                    </a>
                    <Link href="/agent/learn/departments/new-pending-business" className={footerLink}>
                        NBT Training
                    </Link>
                    <a
                        href="/documents/getting-started-checklist-licensed.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLink}
                    >
                        Download your own version of the getting started checklist here
                    </a>
                </div>
            </div>
        </div>
    );
}
