import Link from "next/link";

type NewPendingBusinessSubpageViewProps = {
    title: string;
};

export default function NewPendingBusinessSubpageView({ title }: NewPendingBusinessSubpageViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <p className="m-0 mb-2">
                    <Link
                        href="/agent/learn/departments/new-pending-business"
                        className="text-blue-600 font-medium no-underline hover:underline text-sm"
                    >
                        ← New &amp; Pending Business
                    </Link>
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">{title}</h1>
                <p className="text-600 line-height-3 m-0">
                    Detailed content for this page is not in the portal yet. Use NBT resources, tickets, and internal training
                    announcements for current procedures.
                </p>
            </div>
        </div>
    );
}
