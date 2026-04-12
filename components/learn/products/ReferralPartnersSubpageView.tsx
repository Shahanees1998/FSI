import Link from "next/link";

type ReferralPartnersSubpageViewProps = {
    title: string;
};

export default function ReferralPartnersSubpageView({ title }: ReferralPartnersSubpageViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "48rem" }}>
                <p className="m-0 mb-2">
                    <Link
                        href="/agent/learn/products/referral-partners"
                        className="text-blue-600 font-medium no-underline hover:underline text-sm"
                    >
                        ← Referral Partners
                    </Link>
                </p>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">{title}</h1>
                <p className="text-600 line-height-3 m-0">
                    Detailed content for this referral partner is not in the portal yet. Use internal announcements and your upline
                    for enrollment steps and compliance requirements.
                </p>
            </div>
        </div>
    );
}
