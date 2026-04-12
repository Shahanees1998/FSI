import Link from "next/link";

const link = "text-blue-600 font-medium no-underline hover:underline text-sm line-height-3";

type HubLink = { label: string; href: string; external?: boolean; badge?: "new" };

type MarketingHubViewProps = {
    experiorFactorTicketsUrl: string | null;
    promotionsCompensationGuideUrl: string | null;
    promotionTrackUrl: string | null;
};

function IconTile({ iconClass }: { iconClass: string }) {
    return (
        <div
            className="flex align-items-center justify-content-center border-round mb-3 w-3rem h-3rem flex-shrink-0"
            style={{ background: "#facc15" }}
        >
            <i className={`pi ${iconClass} text-xl text-900`} aria-hidden />
        </div>
    );
}

function HubCard({
    iconClass,
    title,
    description,
    links,
}: {
    iconClass: string;
    title: string;
    description?: string;
    links: HubLink[];
}) {
    return (
        <div className="surface-card border-round border-1 surface-border p-4 h-full shadow-1 flex flex-column">
            <IconTile iconClass={iconClass} />
            <h3 className="text-lg font-bold text-900 m-0 mb-2">{title}</h3>
            {description ? (
                <p className="text-700 text-sm line-height-3 m-0 mb-3 flex-grow-0">{description}</p>
            ) : null}
            <ul className="list-none m-0 p-0 flex flex-column gap-2 mt-auto">
                {links.map((item) => (
                    <li key={item.label} className="flex flex-wrap align-items-center gap-2">
                        {item.external || item.href.startsWith("http") ? (
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className={link}>
                                {item.label}
                            </a>
                        ) : (
                            <Link href={item.href} className={link}>
                                {item.label}
                            </Link>
                        )}
                        {item.badge === "new" ? (
                            <span
                                className="text-xs font-bold px-2 py-0 border-round white-space-nowrap"
                                style={{ background: "#facc15", color: "#422006" }}
                            >
                                NEW
                            </span>
                        ) : null}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CtaButton({ href, label, external }: { href: string | null; label: string; external?: boolean }) {
    const className =
        "inline-flex align-items-center justify-content-center gap-2 px-4 py-3 border-round font-bold text-sm md:text-base no-underline shadow-2 text-900 w-full sm:w-auto";
    const style = { background: "#facc15", maxWidth: "22rem" };
    if (href) {
        return external || href.startsWith("http") ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
                {label}
                <span aria-hidden>→</span>
            </a>
        ) : (
            <Link href={href} className={className} style={style}>
                {label}
                <span aria-hidden>→</span>
            </Link>
        );
    }
    return (
        <span className={`${className} opacity-70 cursor-default`} style={style} title="Configure URL in environment variables">
            {label}
            <span aria-hidden>→</span>
        </span>
    );
}

export default function MarketingHubView({
    experiorFactorTicketsUrl,
    promotionsCompensationGuideUrl,
    promotionTrackUrl,
}: MarketingHubViewProps) {
    const tickets = experiorFactorTicketsUrl?.trim() || null;
    const promoGuide = promotionsCompensationGuideUrl?.trim() || null;
    const promoTrack = promotionTrackUrl?.trim() || null;

    const buildMyBrandLinks: HubLink[] = [
        { label: "Professional branding tips and best practices", href: "#" },
        { label: "Marketing & social media tutorials", href: "#" },
        { label: "Social media graphics", href: "#" },
        { label: "Social media links", href: "#" },
        { label: "Agent website request", href: "#" },
        { label: "Agent videos for sharing", href: "#" },
        { label: "Virtual backgrounds", href: "#" },
    ];

    const marketingResourcesLinks: HubLink[] = [
        { label: "Marketing FAQ", href: "#" },
        { label: "Ad creation assistance", href: "#" },
        { label: "Business cards & pro shop items", href: "#" },
        { label: "Press releases", href: "#" },
        { label: "Experior logos", href: "#" },
        { label: "Product partner logos", href: "#" },
        { label: "Rules of engagement", href: "#" },
    ];

    const recruitLinks: HubLink[] = [
        { label: "Recruiting intro to Experior", href: "#" },
        { label: "BTO company overview", href: "/agent/learn/about-experior/training/bto" },
        { label: "Kitchen table presentation", href: "#" },
        { label: "Prospecting email template", href: "#" },
        { label: "Recruitment ad sample", href: "#" },
        { label: "Legacy qualification: English | Spanish", href: "#" },
        { label: "Ecosystem fees", href: "#" },
    ];

    const newToExperiorLinks: HubLink[] = [
        { label: "Agent website request", href: "#" },
        { label: "BTO company overview", href: "/agent/learn/about-experior/training/bto" },
        { label: "Social media graphics", href: "#" },
        { label: "Marketing FAQ", href: "#" },
        {
            label: "Spanish intro to Experior",
            href: "/agent/learn/about-experior/getting-started/tutorials-in-spanish",
        },
    ];

    const mostPopularLinks: HubLink[] = [
        { label: "Convention promotion toolkit", href: "#", badge: "new" },
        { label: "Social media graphics", href: "#" },
        { label: "BTO company overview", href: "/agent/learn/about-experior/training/bto" },
        { label: "Kitchen table presentation", href: "#" },
        { label: "Experior logos", href: "#" },
        { label: "Marketing FAQ", href: "#" },
    ];

    const eventsLinks: HubLink[] = [
        {
            label: "Upcoming trainings",
            href: "/agent/learn/about-experior/training/us-product-partner-webinars/weekly-webinar-schedule",
        },
        { label: "Experior Factor & in-person events", href: "/agent/learn/about-experior/whats-new/news-events" },
    ];

    return (
        <div className="surface-ground border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <p className="text-600 text-sm font-semibold m-0 mb-3">Marketing Hub</p>

                <div className="surface-card border-round-xl border-1 surface-border shadow-2 p-5 md:p-6 mb-5 mx-auto text-center" style={{ maxWidth: "44rem" }}>
                    <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">Marketing Hub</h1>
                    <p className="text-700 line-height-3 m-0 text-base md:text-lg">
                        Professional tools, recruiting resources, and expert training—everything you need to grow your Experior business.
                    </p>
                </div>

                <div className="grid">
                    <div className="col-12 lg:col-4 flex flex-column gap-4 mb-4 lg:mb-0">
                        <HubCard
                            iconClass="pi-megaphone"
                            title="Build my brand"
                            description="Social media assets, videos, and your online presence—build your brand with confidence."
                            links={buildMyBrandLinks}
                        />
                        <HubCard
                            iconClass="pi-bolt"
                            title="Marketing resources & training"
                            description="Logos, collateral, and training—everything you need to market with confidence."
                            links={marketingResourcesLinks}
                        />
                    </div>
                    <div className="col-12 lg:col-4 flex flex-column gap-4 mb-4 lg:mb-0">
                        <HubCard
                            iconClass="pi-user-plus"
                            title="Recruit & build"
                            description="Show the Experior opportunity with confidence—presentations and recruiting tools."
                            links={recruitLinks}
                        />
                        <HubCard
                            iconClass="pi-compass"
                            title="New to Experior? Start here"
                            description="Get set up fast with the essentials every new agent needs."
                            links={newToExperiorLinks}
                        />
                    </div>
                    <div className="col-12 lg:col-4 flex flex-column gap-4">
                        <HubCard iconClass="pi-star" title="Most popular" links={mostPopularLinks} />
                        <div className="surface-card border-round border-1 surface-border p-4 h-full shadow-1 flex flex-column">
                            <h3 className="text-lg font-bold text-900 m-0 mb-3">Events, training & replays</h3>
                            <ul className="list-none m-0 p-0 flex flex-column gap-2 mb-4">
                                {eventsLinks.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className={link}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div
                                className="border-round-xl overflow-hidden border-1 surface-border mt-auto"
                                style={{
                                    background: "linear-gradient(125deg, #312e81 0%, #5b21b6 40%, #7c3aed 100%)",
                                    minHeight: "11rem",
                                }}
                            >
                                <div className="p-4 text-center">
                                    <p className="text-white text-xs font-bold m-0 mb-2 tracking-wide opacity-90">
                                        EXPERIOR FACTOR ANNUAL CONVENTION
                                    </p>
                                    <p className="text-white text-sm md:text-base font-semibold m-0 mb-1">Join us in Orlando</p>
                                    <p className="text-indigo-100 text-sm m-0 mb-4">April 29 – May 1</p>
                                    {tickets ? (
                                        <a
                                            href={tickets}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex align-items-center justify-content-center px-4 py-2 border-round font-bold text-sm no-underline text-900 shadow-2"
                                            style={{ background: "#facc15" }}
                                        >
                                            Get tickets
                                        </a>
                                    ) : (
                                        <span
                                            className="inline-flex align-items-center justify-content-center px-4 py-2 border-round font-bold text-sm text-900 opacity-80 cursor-default shadow-1"
                                            style={{ background: "#facc15" }}
                                            title="Set NEXT_PUBLIC_EXPERIOR_FACTOR_TICKETS_URL"
                                        >
                                            Get tickets
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section
                    className="border-round-xl p-4 md:p-5 mt-4 text-center border-1 surface-border"
                    style={{ background: "#fff0e6" }}
                >
                    <div className="flex justify-content-center mb-3">
                        <span className="inline-flex align-items-center justify-content-center w-3rem h-3rem border-circle bg-white shadow-1">
                            <i className="pi pi-trophy text-900 text-xl" aria-hidden />
                        </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-900 m-0 mb-2">Growth &amp; earnings roadmap</h2>
                    <p className="text-700 line-height-3 m-0 mb-4 mx-auto text-sm md:text-base" style={{ maxWidth: "32rem" }}>
                        Master your path to higher earnings and leadership recognition.
                    </p>
                    <div className="flex flex-column sm:flex-row gap-3 align-items-center justify-content-center flex-wrap">
                        <CtaButton href={promoGuide} label="Promotions & compensation guide" />
                        <CtaButton href={promoTrack} label="Promotion track" />
                    </div>
                </section>
            </div>
        </div>
    );
}
