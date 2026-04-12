import Link from "next/link";
import { NEW_PENDING_BUSINESS_NAV } from "@/lib/learn/departmentsNewPendingBusinessNav";

const link = "text-blue-600 font-medium no-underline hover:underline";

export default function NewPendingBusinessHubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">New &amp; Pending Business</h1>
                <p className="text-700 line-height-3 m-0 mb-4">
                    FAQs, forms, medical ordering, and back-office training. Open a topic below; full content will be added as
                    operations publishes it.
                </p>
                <ul className="m-0 p-0 list-none border-1 surface-border border-round-lg overflow-hidden">
                    {NEW_PENDING_BUSINESS_NAV.map(({ slug, label }, i) => (
                        <li
                            key={slug}
                            className={`surface-ground ${i < NEW_PENDING_BUSINESS_NAV.length - 1 ? "border-bottom-1 surface-border" : ""}`}
                        >
                            <Link
                                href={`/agent/learn/departments/new-pending-business/${slug}`}
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
