import Link from "next/link";

const GS = "/agent/learn/about-experior/getting-started";

const footerLink = "no-underline font-medium hover:underline text-orange-600";

export default function ChecklistUnlicensedView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">
                    Getting Started With Experior Checklist - Unlicensed
                </h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-4 flex justify-content-between align-items-center gap-3"
                    style={{
                        background: "linear-gradient(115deg, #ca8a04 0%, #eab308 45%, #fde047 100%)",
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

                <h3 className="text-xl font-semibold text-orange-600 mt-0 mb-3">If you are unlicensed:</h3>

                <ol className="text-700 line-height-3 m-0 pl-3 md:pl-4" style={{ listStyle: "decimal" }}>
                    <li className="mb-3 pl-2">
                        <strong>Plug in to everything you can.</strong> Check the{" "}
                        <Link
                            href="/agent/learn/about-experior/experior-schedule/event-calendar"
                            className="text-blue-600 font-medium no-underline hover:underline"
                        >
                            Experior schedule
                        </Link>{" "}
                        on the back office for training times. Also subscribe to our{" "}
                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-medium no-underline hover:underline"
                        >
                            YouTube channels
                        </a>{" "}
                        for valuable information shared every week.
                    </li>
                    <li className="mb-3 pl-2">
                        <Link href={`${GS}/register-for-the-online-course`} className="text-blue-600 font-medium no-underline hover:underline">
                            Register for the Online Course
                        </Link>{" "}
                        — study for your license.
                    </li>
                    <li className="mb-3 pl-2">
                        <strong>Click on your state</strong> — read state specifics carefully. (If your state is not listed, refer to
                        your state&apos;s department of insurance website.)
                    </li>
                    <li className="mb-3 pl-2">
                        <strong>Choose the correct license type</strong> — full Life and Health producer license. This is important:
                        choosing only a life license can limit your options later.
                    </li>
                    <li className="mb-3 pl-2">
                        <strong>Purchase your study material.</strong> Some states require physical classroom time — read their
                        requirements carefully.
                    </li>
                    <li className="mb-3 pl-2">
                        <strong>Schedule your exam</strong> — ideally about two weeks out. Do this sooner rather than later: classes
                        fill up, it reduces procrastination, and you can start helping clients and earning sooner.
                    </li>
                    <li className="mb-3 pl-2">
                        <strong>Get fingerprinting done right away</strong> if your state requires it; delays here can hold up your
                        license.
                    </li>
                    <li className="mb-3 pl-2">
                        <strong>Pass your test!</strong>
                    </li>
                </ol>

                <div className="border-top-1 surface-border pt-4 mt-2 flex flex-column gap-2">
                    <Link href={`${GS}/submit-your-license-application`} className={footerLink}>
                        Submit Your License Application
                    </Link>
                    <Link href={`${GS}/register-for-the-online-course`} className={footerLink}>
                        Licensing Exam FX
                    </Link>
                    <Link href={`${GS}/getting-appointed`} className={footerLink}>
                        Getting Appointed/Contracted
                    </Link>
                    <a
                        href="/documents/experior-guidelines.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLink}
                    >
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
                </div>
            </div>
        </div>
    );
}
