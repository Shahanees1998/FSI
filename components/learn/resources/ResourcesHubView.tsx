import Link from "next/link";
import { RESOURCES_HUB_NAV } from "@/lib/learn/resourcesHubNav";

const link = "text-blue-600 font-medium no-underline hover:underline";

export default function ResourcesHubView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Resources</h1>
                <p className="text-700 line-height-3 m-0 mb-4">
                    Quoting tools, calculators, compliance forms, and agent development material. Open a topic below; full content will
                    be added as marketing and operations publish it.
                </p>
                <ul className="m-0 p-0 list-none border-1 surface-border border-round-lg overflow-hidden">
                    {RESOURCES_HUB_NAV.map(({ slug, label }, i) => (
                        <li
                            key={slug}
                            className={`surface-ground ${i < RESOURCES_HUB_NAV.length - 1 ? "border-bottom-1 surface-border" : ""}`}
                        >
                            <Link
                                href={`/agent/learn/resources/resources/${slug}`}
                                className={`${link} flex align-items-center justify-content-between gap-2 px-3 py-3 md:px-4 line-height-3 hover:surface-hover transition-duration-150 w-full`}
                            >
                                <span>{label}</span>
                                {slug === "quoting-tools" || slug === "tools" ? (
                                    <i className="pi pi-angle-down text-600 flex-shrink-0 text-sm" aria-hidden />
                                ) : null}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
