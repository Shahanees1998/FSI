import Link from "next/link";
import { FORMS_NAV } from "@/lib/learn/resourcesFormsNav";

const link = "text-blue-600 font-medium no-underline hover:underline";

export default function FormsHubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Forms</h1>
                <p className="text-700 line-height-3 m-0 mb-4 text-sm md:text-base">
                    Executive Director workflows, recognition, sponsorship, and BEAM paperwork. Open a form below; downloadable PDFs
                    and live links will be added as operations publishes them.
                </p>
                <ul className="m-0 p-0 list-none border-1 surface-border border-round-lg overflow-hidden">
                    {FORMS_NAV.map(({ slug, label }, i) => (
                        <li
                            key={slug}
                            className={`surface-ground ${i < FORMS_NAV.length - 1 ? "border-bottom-1 surface-border" : ""}`}
                        >
                            <Link
                                href={`/agent/learn/resources/forms/${slug}`}
                                className={`${link} block px-3 py-3 md:px-4 line-height-3 hover:surface-hover transition-duration-150`}
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
