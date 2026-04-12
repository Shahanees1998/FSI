import Link from "next/link";

type FormsSubpageViewProps = {
    title: string;
};

export default function FormsSubpageView({ title }: FormsSubpageViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <p className="m-0 mb-2">
                    <Link
                        href="/agent/learn/resources/forms"
                        className="text-blue-600 font-medium no-underline hover:underline text-sm"
                    >
                        ← Forms
                    </Link>
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">{title}</h1>
                <p className="text-600 line-height-3 m-0 text-sm md:text-base">
                    This form page is not published in the portal yet. EDs should use internal back-office instructions and the
                    latest PDFs from head office until links are wired here.
                </p>
            </div>
        </div>
    );
}
