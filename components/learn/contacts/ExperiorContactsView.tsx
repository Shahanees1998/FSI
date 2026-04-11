const link = "text-blue-600 font-medium no-underline hover:underline";

export default function ExperiorContactsView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Experior Contacts &amp; Escalation Flow</h1>

                <div
                    className="border-round-lg p-4 mb-5 border-left-3 surface-border surface-50"
                    style={{ borderLeftWidth: "4px", borderLeftColor: "var(--yellow-500, #eab308)" }}
                >
                    <p className="text-900 font-semibold m-0 mb-2">Important</p>
                    <p className="text-700 line-height-3 m-0">
                        Always start with <strong>Step 1</strong>. This builds confidence, saves time, and supports Head Office
                        efficiency.
                    </p>
                </div>

                <ol className="text-700 line-height-3 m-0 pl-0 list-none">
                    <li className="mb-4 pb-4 border-bottom-1 surface-border">
                        <span className="text-900 font-bold">1. Start with self-serve resources</span>
                        <p className="m-0 mt-2">Before escalating, check:</p>
                        <ul className="mt-2 mb-0 pl-4">
                            <li className="mb-1">Department page in the back office</li>
                            <li className="mb-1">FAQ section for common questions</li>
                            <li>Experior Academy LMS for training and process guides</li>
                        </ul>
                    </li>
                    <li className="mb-4 pb-4 border-bottom-1 surface-border">
                        <span className="text-900 font-bold">2. Connect with your Executive Director</span>
                        <p className="m-0 mt-2">
                            If self-serve resources don&apos;t resolve it, reach out to your Executive Director. They are field experts
                            and may answer the question without a formal ticket.
                        </p>
                    </li>
                    <li className="mb-4 pb-4 border-bottom-1 surface-border">
                        <span className="text-900 font-bold">3. Submit a ticket to the right department</span>
                        <p className="m-0 mt-2">
                            If your Executive Director cannot resolve the issue, open a ticket with the appropriate department.
                        </p>
                        <ul className="mt-2 mb-0 pl-4">
                            <li className="mb-1">Include all relevant details and what you have already tried.</li>
                            <li>Clearly mark the ticket as urgent if required.</li>
                        </ul>
                    </li>
                    <li className="mb-4 pb-4 border-bottom-1 surface-border">
                        <span className="text-900 font-bold">4. Executive Director escalates</span>
                        <p className="m-0 mt-2">
                            If a ticket is not answered in a reasonable timeframe, your Executive Director (not the agent) emails the
                            Department Manager.
                        </p>
                        <ul className="mt-2 mb-0 pl-4">
                            <li className="mb-1">Do not submit multiple tickets or repeat emails for the same issue.</li>
                            <li>From this point forward, use <strong>Reply All</strong> so everyone stays informed.</li>
                        </ul>
                    </li>
                    <li className="mb-4 pb-4 border-bottom-1 surface-border">
                        <span className="text-900 font-bold">5. Still no response? Contact Sr. Ops Manager</span>
                        <p className="m-0 mt-2">
                            If there is no response after <strong>two business days</strong>, the Executive Director escalates to the
                            Sr. Ops Manager.
                        </p>
                    </li>
                    <li className="mb-4 pb-4 border-bottom-1 surface-border">
                        <span className="text-900 font-bold">6. Escalate to Director of Ops</span>
                        <p className="m-0 mt-2">
                            If the Sr. Ops Manager does not respond, or the issue needs broader operational oversight, the Executive
                            Director escalates to the <strong>Director of Operations</strong>.
                        </p>
                    </li>
                    <li className="mb-0">
                        <span className="text-900 font-bold">7. Escalate to VP of Ops</span>
                        <p className="m-0 mt-2">
                            If the Director does not respond, or the issue is extremely urgent with high risk to the field or
                            reputational risk for Experior, the Executive Director escalates to the <strong>VP of Operations</strong>.
                        </p>
                    </li>
                </ol>

                <section className="mt-5 pt-4 border-top-2 surface-border">
                    <h2 className="text-lg font-semibold text-900 m-0 mb-3">Head Office — USA</h2>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        <strong>Address:</strong> 300 Airborne Pkwy W, STE 210, Cheektowaga, NY 14225
                    </p>
                    <p className="text-700 m-0 mb-0">
                        <strong>Phone:</strong>{" "}
                        <a href="tel:+18889090696" className={link}>
                            1-888-909-0696
                        </a>
                    </p>
                </section>

                <details className="mt-5 border-1 surface-border border-round-lg overflow-hidden">
                    <summary className="p-3 cursor-pointer font-semibold text-900 surface-100 hover:surface-200 transition-colors transition-duration-150 user-select-none">
                        US Head Office Directory — expand to view contacts
                    </summary>
                    <div className="p-4 border-top-1 surface-border surface-0">
                        <p className="text-700 line-height-3 m-0 mb-3 text-sm">
                            Department-level phone and email listings can be pasted here or linked from a PDF. Until marketing
                            supplies the full directory, use department pages in the back office and the{" "}
                            <a href="/agent/learn/departments/broker-support" className={link}>
                                Learn → Departments
                            </a>{" "}
                            section for team contacts.
                        </p>
                        <p className="text-600 text-sm m-0">
                            Optional: set <code className="text-xs">NEXT_PUBLIC_US_HEAD_OFFICE_DIRECTORY_URL</code> to a PDF or
                            intranet page and we can surface a primary link here.
                        </p>
                    </div>
                </details>
            </div>
        </div>
    );
}
