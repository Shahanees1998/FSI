import Link from "next/link";
import { COMPLIANCE_NAV } from "@/lib/learn/departmentsComplianceNav";

const link = "text-blue-600 font-medium no-underline hover:underline";

export default function ComplianceHubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Compliance</h1>
                <p className="text-700 line-height-3 m-0 mb-4">
                    Best practices, the compliance manual, and how to report incidents. Open a topic below; full content will be added
                    as compliance publishes it.
                </p>
                <ul className="m-0 p-0 list-none border-1 surface-border border-round-lg overflow-hidden">
                    {COMPLIANCE_NAV.map(({ slug, label }, i) => (
                        <li
                            key={slug}
                            className={`surface-ground ${i < COMPLIANCE_NAV.length - 1 ? "border-bottom-1 surface-border" : ""}`}
                        >
                            <Link
                                href={`/agent/learn/departments/compliance/${slug}`}
                                className={`${link} flex align-items-center px-3 py-3 md:px-4 line-height-3 hover:surface-hover transition-duration-150`}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
