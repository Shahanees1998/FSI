import Link from "next/link";

const CONTRACTING_EMAIL = "contracting@experiorheadoffice.com";
const QUANTUM_EMAIL = "contracting@thequantum.com";

const qClass = "text-orange-600 font-semibold text-lg m-0 mb-2";
const aClass = "text-700 line-height-3 m-0 mb-0";

function Mail({ address }: { address: string }) {
    return (
        <a href={`mailto:${address}`} className="text-blue-600 font-medium no-underline hover:underline">
            {address}
        </a>
    );
}

export default function ContractingFaqView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Contracting FAQ</h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-5 text-center"
                    style={{
                        background: "linear-gradient(115deg, #ca8a04 0%, #eab308 45%, #fde047 100%)",
                        boxShadow: "0 8px 24px rgba(202, 138, 4, 0.28)",
                    }}
                >
                    <p
                        className="m-0 text-white font-bold line-height-3"
                        style={{ fontSize: "clamp(1rem, 2.8vw, 1.5rem)", letterSpacing: "0.04em" }}
                    >
                        CONTRACTING
                    </p>
                    <p className="m-0 mt-2 text-white font-semibold text-lg md:text-xl" style={{ letterSpacing: "0.02em" }}>
                        Frequently Asked Questions
                    </p>
                </div>

                <section className="mb-5">
                    <h2 className={qClass}>I am new to Experior; what do I need to do to start submitting contracts?</h2>
                    <p className={aClass}>
                        After you have completed your <strong>AOA</strong> (Associate Agreement with Experior), use your{" "}
                        <Link href="/agent/team/agreements" className="text-blue-600 no-underline hover:underline font-medium">
                            agreements
                        </Link>{" "}
                        area and back-office contracting steps to finish each requirement in order. Your upline can confirm when you
                        are cleared to submit carrier paperwork.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>I uploaded my license(s), but they were declined. Why?</h2>
                    <p className={aClass}>
                        Most declines are format or data mismatches. Upload a <strong>PDF</strong> (not a JPEG or photo), and ensure
                        the <strong>expiration date in the back office</strong> matches the certificate. If it still fails, review the{" "}
                        <Link
                            href="/agent/learn/about-experior/getting-started/mandatory-documents"
                            className="text-blue-600 no-underline hover:underline font-medium"
                        >
                            mandatory documents
                        </Link>{" "}
                        guide with your Executive Director. For persistent issues, email <Mail address={CONTRACTING_EMAIL} />.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>How long should I wait for my documents or contract to be approved?</h2>
                    <p className={aClass}>
                        <strong>Documents in review:</strong> typically <strong>1–2 business days</strong>.<br />
                        <strong>Contracts:</strong> allow up to <strong>5 business days</strong> for Experior contracting review, then
                        up to <strong>3 weeks</strong> for the carrier to finish appointment after Experior submits the package.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>I uploaded my Errors &amp; Omissions (E&amp;O), but it was declined. Why?</h2>
                    <p className={aClass}>
                        Use a <strong>PDF</strong> (not a JPEG), confirm the <strong>expiry date</strong> in the back office matches
                        the dec page, and verify limits and named insured meet program rules. Review the E&amp;O section under{" "}
                        <Link
                            href="/agent/learn/about-experior/getting-started/mandatory-documents"
                            className="text-blue-600 no-underline hover:underline font-medium"
                        >
                            mandatory documents
                        </Link>{" "}
                        or ask your Executive Director. Still stuck? Email <Mail address={CONTRACTING_EMAIL} />.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>My contract was declined by Experior—not the insurance company. Why?</h2>
                    <p className={aClass}>
                        Experior reviews for completeness before the carrier sees the file. Declines usually mean a carrier question
                        was answered incorrectly, a required field is blank, or a <strong>business address</strong> is missing. Fix the
                        flagged items in <strong>My Contracts</strong> and resubmit.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>My contract was submitted a while ago, but I am still not approved. Why?</h2>
                    <p className={aClass}>
                        Allow <strong>5 business days</strong> for Experior review first. After the carrier receives the package, allow
                        up to <strong>3 weeks</strong> before escalating. Delays often happen when the carrier requests more
                        information and it is not returned quickly—watch your email and the back office for tasks.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>Where is my agent code?</h2>
                    <p className={aClass}>
                        Writing numbers are issued <strong>after the carrier approves</strong> your appointment, which can take up to
                        about <strong>three weeks</strong>. If Experior declined something, a team member will explain what to fix. If
                        Experior approved and you are waiting on the carrier, you may contact the carrier&apos;s agent support line for
                        status.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>How can I learn about provider / carrier products?</h2>
                    <p className={aClass}>
                        In this portal, open <strong>Learn</strong> → <strong>Products</strong> →{" "}
                        <Link href="/agent/learn/products/carriers" className="text-blue-600 no-underline hover:underline font-medium">
                            Carriers
                        </Link>
                        . Your Executive Director and upline are also great resources for positioning and illustrations.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>Who should I reach out to for Quantum questions?</h2>
                    <p className={aClass}>
                        Contact Quantum contracting directly at <Mail address={QUANTUM_EMAIL} />.
                    </p>
                </section>

                <section className="mb-5">
                    <h2 className={qClass}>How do I register for LIMRA?</h2>
                    <p className={aClass}>
                        AML completion through LIMRA is tied to certain carrier contracting paths. You must hold a current{" "}
                        <strong>AML</strong> certificate (through RegEd, WebCE, Kaplan, ExamFX, or another approved provider){" "}
                        <strong>before</strong> you apply for contracting with carriers that require it. Upload the certificate to the
                        back office as soon as it is issued.
                    </p>
                </section>

                <section className="mb-0">
                    <h2 className={qClass}>
                        What if I have a National Producer Number (NPN) and cannot add it to my agent profile in the back office?
                    </h2>
                    <p className={aClass}>
                        Email <Mail address={CONTRACTING_EMAIL} /> and the contracting team can add or correct your NPN manually.
                    </p>
                </section>
            </div>
        </div>
    );
}
