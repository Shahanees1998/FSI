import Link from "next/link";

const GS = "/agent/learn/about-experior/getting-started";

const linkClass = "no-underline font-medium hover:underline";
const linkBlue = `${linkClass} text-blue-600`;
const sectionTitle = "text-xl font-semibold text-orange-600 mt-4 mb-2";

export default function UsaOnboardingProcessView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">USA Onboarding Process</h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-4 relative overflow-hidden"
                    style={{
                        background: "linear-gradient(115deg, #ea580c 0%, #f97316 35%, #fbbf24 72%, #fcd34d 100%)",
                        boxShadow: "0 8px 24px rgba(234, 88, 12, 0.25)",
                    }}
                >
                    <div className="flex justify-content-between align-items-start gap-3">
                        <h2
                            className="m-0 text-white font-bold line-height-3"
                            style={{
                                fontSize: "clamp(1.35rem, 4vw, 2.25rem)",
                                letterSpacing: "0.06em",
                            }}
                        >
                            USA ONBOARDING PROCESS
                        </h2>
                        <i
                            className="pi pi-file-check text-white flex-shrink-0"
                            style={{ fontSize: "1.75rem", opacity: 0.95 }}
                            aria-hidden
                        />
                    </div>
                </div>

                <p className="text-orange-600 font-semibold text-lg m-0 mb-2">
                    Experior is excited to have you join our team!
                </p>
                <ul className="text-700 line-height-3 m-0 mb-4 pl-4">
                    <li>Please review the steps below and follow them in order so we can get you contracted and ready to sell.</li>
                </ul>

                <h3 className="text-xl font-semibold text-orange-600 mt-0 mb-2">Before you start;</h3>
                <ul className="text-700 line-height-3 m-0 mb-4 pl-4">
                    <li className="mb-2">
                        Confirm you have received your Experior invite and can sign in to this portal.
                    </li>
                    <li className="mb-2">
                        You must be legally entitled to work in the United States (for example, a valid SSN or appropriate work
                        authorization).
                    </li>
                    <li className="mb-2">
                        <a
                            href="/documents/usa-onboarding-process.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkBlue}
                        >
                            Download the USA onboarding process document
                        </a>{" "}
                        for your records.
                    </li>
                    <li>Complete each step fully before moving on to the next.</li>
                </ul>

                <div className="grid m-0 mb-4 border-1 surface-border border-round-lg overflow-hidden">
                    <div
                        className="col-12 md:col-6 p-4 border-bottom-1 md:border-bottom-none md:border-right-1 surface-border"
                        style={{ background: "var(--surface-50, #fafafa)" }}
                    >
                        <h4 className="text-orange-600 font-semibold text-lg mt-0 mb-3 text-center md:text-left">
                            Unlicensed Agent
                        </h4>
                        <ul className="list-none m-0 p-0 flex flex-column gap-2">
                            <li>
                                <Link href={`${GS}/register-for-the-online-course`} className={linkBlue}>
                                    Register for the ExamFX course
                                </Link>
                            </li>
                            <li>
                                <Link href={`${GS}/errors-and-omissions-insurance`} className={linkBlue}>
                                    Register for the Errors &amp; Omissions course
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`${GS}/getting-started-with-experior-checklist-unlicensed`}
                                    className={linkBlue}
                                >
                                    Getting started with Experior Checklist – Unlicensed
                                </Link>
                            </li>
                            <li>
                                <Link href={`${GS}/submit-your-license-application`} className={linkBlue}>
                                    Submit your license application
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 md:col-6 p-4" style={{ background: "var(--surface-50, #fafafa)" }}>
                        <h4 className="text-orange-600 font-semibold text-lg mt-0 mb-3 text-center md:text-left">
                            Licensed Agent
                        </h4>
                        <ul className="list-none m-0 p-0 flex flex-column gap-2">
                            <li>
                                <Link
                                    href={`${GS}/getting-started-with-experior-checklist-licensed`}
                                    className={linkBlue}
                                >
                                    Getting started with Experior Checklist - Licensed
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 className={sectionTitle}>Complete and upload your mandatory documents</h3>
                <p className="text-700 line-height-3 m-0 mb-3">
                    Have the following ready in clear, legible format. Uploads may be required during contracting.
                </p>
                <p className="text-900 font-semibold m-0 mb-1">Mandatory</p>
                <ul className="text-700 line-height-3 m-0 mb-3 pl-4">
                    <li>Resident License</li>
                    <li>E&amp;O</li>
                    <li>Banking Information</li>
                    <li>AML</li>
                    <li>Signature cards</li>
                    <li>Vector Form</li>
                </ul>
                <p className="text-900 font-semibold m-0 mb-1">May be required</p>
                <ul className="text-700 line-height-3 m-0 mb-4 pl-4">
                    <li>Driver&apos;s License / State ID</li>
                    <li>Fraternal License</li>
                    <li>NY Reg 187</li>
                </ul>

                <div
                    className="border-top-1 surface-border pt-4 mt-2 flex flex-column gap-2"
                    style={{ fontSize: "1.05rem" }}
                >
                    <p className="text-600 text-sm m-0 mb-2">Quick links</p>
                    <div className="flex flex-column gap-2">
                        <Link href={`${GS}/getting-appointed`} className={`${linkClass} text-orange-600`}>
                            Getting appointed
                        </Link>
                        <Link href={`${GS}/contracting-faq`} className={`${linkClass} text-orange-600`}>
                            Review the Contracting FAQ section
                        </Link>
                        <Link href={`${GS}/tutorials-in-spanish`} className={`${linkClass} text-orange-600`}>
                            Tutorials in Spanish
                        </Link>
                        <Link href={`${GS}/keep-your-license-up-to-date-with-nipr`} className={`${linkClass} text-orange-600`}>
                            Keep your License up to date with NIPR
                        </Link>
                        <Link href={`${GS}/ce-credits-providers`} className={`${linkClass} text-orange-600`}>
                            CE Credits Providers
                        </Link>
                        <Link href={`${GS}/back-office-fees`} className={`${linkClass} text-orange-600`}>
                            Back Office Fees
                        </Link>
                        <Link href={`${GS}/mandatory-documents`} className={`${linkClass} text-orange-600`}>
                            Mandatory Documents
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
