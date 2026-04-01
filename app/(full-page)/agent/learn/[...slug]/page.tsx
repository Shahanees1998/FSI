import { requireCurrentUser } from "@/lib/serverAuth";

const LEARN_TITLES: Record<string, string> = {
    "about-experior/experior-academy": "Experior Academy",
    "about-experior/hpn-university": "HPN University",
    "about-experior/experior-schedule": "Experior Schedule",
    "about-experior/getting-started": "Getting Started",
    "about-experior/training": "Training",
    "about-experior/purchase-leads": "Purchase Leads",
    "about-experior/lead-training-guides": "Lead Training Guides",
    "about-experior/contests": "Contests",
    "about-experior/whats-new": "What's New",
    "about-experior/contacts": "Contacts",
    "products/life-insurance-products": "Life Insurance Products",
    "products/health-insurance-products": "Health Insurance Products",
    "products/annuities-quantum": "Annuities/Quantum",
    "products/global-view-investment-platform": "Global View Investment Platform",
    "products/new-insurance-snapview-isv": "NEW Insurance SnapView (ISV)",
    "products/carriers": "Carriers",
    "products/referral-partners": "Referral Partners",
    "products/puerto-rico": "Puerto Rico",
    "departments/broker-support": "Broker Support",
    "departments/commissions": "Commissions",
    "departments/contracting": "Contracting",
    "departments/compliance": "Compliance",
    "departments/marketing": "Marketing",
    "departments/new-pending-business": "New & Pending Business",
    "development/releases": "Releases",
    "development/coming-soon": "Coming Soon",
    "development/pop-ups": "Pop-Ups",
    "resources/resources": "Resources",
    "resources/forms": "Forms",
    "resources/my-crm": "My CRM",
    "resources/experior-connect-workvivo": "Experior Connect - Workvivo",
    "resources/experior-connect-workvivo-getting-started": "Experior Connect - Workvivo Getting Started",
};

function toTitleCaseFromSlug(value: string): string {
    return value
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export default async function AgentLearnDetailPage({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    await requireCurrentUser("AGENT");
    const { slug } = await params;
    const key = slug.join("/");
    const title = LEARN_TITLES[key] ?? toTitleCaseFromSlug(slug[slug.length - 1] ?? "Learn");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <h1 className="mt-0 mb-2">{title}</h1>
            <p className="text-600 m-0">Dummy content for now.</p>
        </div>
    );
}

