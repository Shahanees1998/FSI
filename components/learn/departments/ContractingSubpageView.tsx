import Link from "next/link";

type ContractingSubpageViewProps = {
    title: string;
};

export default function ContractingSubpageView({ title }: ContractingSubpageViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <p className="m-0 mb-2">
                    <Link
                        href="/agent/learn/departments/contracting"
                        className="text-blue-600 font-medium no-underline hover:underline text-sm"
                    >
                        ← Contracting
                    </Link>
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">{title}</h1>
                <p className="text-600 line-height-3 m-0">
                    Detailed content for this page is not in the portal yet. Use the contracting department, back office, and your
                    upline for forms, training links, and carrier-specific steps.
                </p>
            </div>
        </div>
    );
}
