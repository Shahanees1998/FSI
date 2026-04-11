import Link from "next/link";
import { Divider } from "primereact/divider";

const sectionTitle = "text-xl font-semibold text-orange-600 mt-0 mb-2";
const subHead = "text-900 font-semibold m-0 mb-2 mt-3";

export default function MandatoryDocumentsView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6 mx-auto" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Mandatory Documents</h1>
                <p className="text-700 line-height-3 m-0 mb-3">
                    Upload clear, complete documents in the back office so contracting and compliance can move forward without delays.
                </p>
                <Divider className="my-3" />

                <section className="mb-4">
                    <h2 className={sectionTitle}>What you must submit</h2>
                    <p className="text-700 m-0 mb-2">
                        <strong className="text-900">Mandatory:</strong> Resident license, Errors &amp; Omissions (E&amp;O), banking
                        information, Anti-Money Laundering (AML) completion, and signature card.
                    </p>
                    <p className="text-700 m-0">
                        <strong className="text-900">May be required</strong> (state or carrier dependent): Driver&apos;s license or
                        state ID, fraternal license, and NY Reg 187.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className={sectionTitle}>Resident license</h2>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        You need a state <strong>resident</strong> license with <strong>Life and Accident and Health</strong>{" "}
                        authority (or equivalent for your state). If you are not yet licensed, complete training and apply through
                        your state&apos;s process — see{" "}
                        <Link href="/agent/learn/about-experior/getting-started/register-for-the-online-course" className="text-blue-600 no-underline hover:underline font-medium">
                            Register for the Online Course
                        </Link>{" "}
                        and{" "}
                        <a href="https://www.nipr.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 no-underline hover:underline font-medium">
                            NIPR
                        </a>{" "}
                        for state-specific rules.
                    </p>
                    <h3 className={subHead}>Back office requirements</h3>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-0">
                        <li className="mb-2">Legal name on the license must match the back office <strong>exactly</strong>.</li>
                        <li className="mb-2">The state on the license must match your residential state in the back office.</li>
                        <li className="mb-2">License must be active (not expired).</li>
                        <li className="mb-2">License number in the document must match what you entered in the back office.</li>
                        <li className="mb-2">Upload the <strong>official certificate</strong> — no screenshots or casual photos.</li>
                        <li className="mb-2">Coverage must include <strong>life</strong> authority where applicable.</li>
                        <li className="mb-2">Documents must not promote or bind you to a <strong>competing IMO</strong>.</li>
                        <li className="mb-2">
                            <strong>Format:</strong> PDF only, not password protected.
                        </li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className={sectionTitle}>Errors &amp; omissions (E&amp;O)</h2>
                    <h3 className={subHead}>Back office requirements</h3>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-2">
                        <li className="mb-2">Legal name and state must match the back office.</li>
                        <li className="mb-2">Policy must be in force — not expired.</li>
                        <li className="mb-2">
                            <strong>Minimum limits:</strong> at least <strong>$1 million per claim</strong> and{" "}
                            <strong>$1 million aggregate</strong> (or higher if your state requires).
                        </li>
                        <li className="mb-2">Certificate should show carrier stamp / signature where issued.</li>
                        <li className="mb-2">
                            If a <strong>competitor</strong> appears on the certificate, it may be approved for up to{" "}
                            <strong>two months</strong> while you replace it with neutral or Experior-acceptable coverage.
                        </li>
                        <li className="mb-2">
                            The <strong>named insured</strong> section must list <strong>your legal name and address</strong>.
                        </li>
                        <li className="mb-2">
                            <strong>Format:</strong> PDF only, not password protected.
                        </li>
                    </ul>
                    <p className="text-600 text-sm line-height-3 m-0 surface-100 border-round p-3 border-1 surface-border">
                        <strong>Note:</strong> The program is moving toward requiring E&amp;O placed through approved administrators such
                        as <strong>Daniel &amp; Henry</strong>. Confirm current rules with contracting before you bind replacement
                        coverage.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className={sectionTitle}>Banking information</h2>
                    <h3 className={subHead}>Back office requirements</h3>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-0">
                        <li className="mb-2">Acceptable proof includes a <strong>voided check</strong> or a letter from your bank on letterhead.</li>
                        <li className="mb-2">Must clearly show <strong>your name</strong>, <strong>account number</strong>, and{" "}
                            <strong>routing number</strong>.
                        </li>
                        <li className="mb-2">
                            <strong>Format:</strong> PDF only, not password protected.
                        </li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className={sectionTitle}>Anti-money laundering (AML)</h2>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        Submit proof of completion from an approved provider (for example <strong>LIMRA</strong> or{" "}
                        <strong>RegEd</strong>).
                    </p>
                    <h3 className={subHead}>Back office requirements</h3>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-0">
                        <li className="mb-2">Legal name must match the back office.</li>
                        <li className="mb-2">
                            Set the <strong>expiry date in the back office</strong> to <strong>two years</strong> from the certificate
                            issue date unless the course defines a different term.
                        </li>
                        <li className="mb-2">
                            The certificate must explicitly reference <strong>AML</strong> in the course title or body.
                        </li>
                        <li className="mb-2">
                            <strong>Format:</strong> PDF only, not password protected.
                        </li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className={sectionTitle}>Signature card</h2>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        Required for application signatures. Use the <strong>official Experior template</strong> from the back office
                        when you prepare your upload.
                    </p>
                    <h3 className={subHead}>Back office requirements — your signature must</h3>
                    <ul className="text-700 line-height-3 m-0 pl-4 mb-2">
                        <li className="mb-2">Be clearly visible in <strong>black ink</strong>.</li>
                        <li className="mb-2">Stay <strong>inside the printed box</strong> with minimal empty margin.</li>
                        <li className="mb-2">Appear on a <strong>white background</strong> (the Experior template — no colored paper).</li>
                        <li className="mb-2">Be dark enough to reproduce legibly on carrier forms.</li>
                        <li className="mb-2">Be a <strong>handwritten</strong> signature — not typed, stamped, or auto-generated.</li>
                        <li className="mb-2">
                            <strong>DocuSign is not accepted</strong> — we need a reusable image for future applications, not a one-off
                            envelope.
                        </li>
                        <li className="mb-2">
                            For best results, scan with a dedicated scanner or a quality scanning app (many teams use{" "}
                            <strong>CamScanner</strong> or similar) to avoid shadows and blur.
                        </li>
                        <li className="mb-2">
                            <strong>Format:</strong> PDF only, not password protected.
                        </li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className={sectionTitle}>Driver&apos;s license or state ID</h2>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        Some carriers (for example <strong>Foresters</strong> and <strong>Mutual Trust</strong>) require government
                        photo ID to verify identity before appointment.
                    </p>
                    <p className="text-700 line-height-3 m-0">
                        Accepted forms typically include a current <strong>driver&apos;s license</strong>, <strong>state ID</strong>, or{" "}
                        <strong>passport</strong>. Follow the carrier&apos;s instructions for color vs. black-and-white and full
                        spreads vs. single side.
                    </p>
                </section>

                <section className="mb-0">
                    <h2 className={sectionTitle}>Fraternal license &amp; NY Reg 187</h2>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        <strong>Fraternal license:</strong> required when you sell fraternal products in states that issue a separate
                        fraternal credential — upload the same way as your resident license (PDF, not password protected, name matches
                        back office).
                    </p>
                    <p className="text-700 line-height-3 m-0">
                        <strong>NY Regulation 187:</strong> if you conduct business in New York, carriers may require proof of Reg 187
                        training compliance. Upload the certificate issued by your approved provider in PDF format unless the carrier
                        specifies otherwise.
                    </p>
                </section>
            </div>
        </div>
    );
}
