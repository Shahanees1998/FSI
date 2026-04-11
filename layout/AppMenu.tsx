import type { MenuModel } from "@/types/index";
import AppSubMenu from "./AppSubMenu";
import { useAuth } from "@/hooks/useAuth";
import { canAccessSection } from "@/lib/rolePermissions";

const AppMenu = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const model: MenuModel[] = [
        {
            label: "Workspace",
            icon: "pi pi-home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to:
                        user.role === "ADMIN"
                            ? "/admin"
                            : user.role === "CARRIER"
                              ? "/carrier"
                              : "/agent",
                },
            ],
        },
    ];

    if (user.role === "AGENT") {
        model.push({
            label: "Agent",
            icon: "pi pi-compass",
            items: [
                {
                    label: "New Agents",
                    icon: "pi pi-fw pi-user-plus",
                    items: [
                        { label: "Getting Started", icon: "pi pi-fw pi-play", to: "/agent/new-agents/getting-started" },
                        { label: "Get Licensed", icon: "pi pi-fw pi-id-card", to: "/agent/new-agents/get-licensed" },
                        { label: "Ready To Sell", icon: "pi pi-fw pi-shopping-cart", to: "/agent/new-agents/ready-to-sell" },
                        { label: "Run Your Business", icon: "pi pi-fw pi-briefcase", to: "/agent/new-agents/run-your-business" },
                        { label: "Spanish Tutorials", icon: "pi pi-fw pi-globe", to: "/agent/new-agents/spanish-tutorials" },
                    ],
                },
                {
                    label: "My Business",
                    icon: "pi pi-fw pi-briefcase",
                    items: [
                        { label: "New Business Transmittals", icon: "pi pi-fw pi-send", to: "/agent/my-business/new-business-transmittals" },
                        { label: "Insurance", icon: "pi pi-fw pi-shield", to: "/agent/my-business/insurance" },
                        { label: "Annuities", icon: "pi pi-fw pi-wallet", to: "/agent/my-business/annuities" },
                        { label: "Trail", icon: "pi pi-fw pi-chart-line", to: "/agent/my-business/trail" },
                        { label: "Renewals", icon: "pi pi-fw pi-refresh", to: "/agent/my-business/renewals" },
                        { label: "Health & Dental", icon: "pi pi-fw pi-heart", to: "/agent/my-business/health-dental" },
                        { label: "Group", icon: "pi pi-fw pi-users", to: "/agent/my-business/group" },
                        { label: "Unlicensed", icon: "pi pi-fw pi-ban", to: "/agent/my-business/unlicensed" },
                        { label: "Additional Commission", icon: "pi pi-fw pi-plus-circle", to: "/agent/my-business/additional-commission" },
                        { label: "Documents Manager", icon: "pi pi-fw pi-folder", to: "/agent/my-business/documents-manager" },
                    ],
                },
                {
                    label: "EFA",
                    icon: "pi pi-fw pi-file",
                    items: [
                        { label: "★EFA Training★", icon: "pi pi-fw pi-star", to: "/agent/efa/training" },
                        { label: "EFA Data Sheets", icon: "pi pi-fw pi-file", to: "/agent/efa/data-sheets" },
                        { label: "EFA Data Input (full version)", icon: "pi pi-fw pi-pencil", to: "/agent/efa/data-input-full" },
                        { label: "EFA Data Input (Lite)", icon: "pi pi-fw pi-pencil", to: "/agent/efa/data-input-lite" },
                        { label: "EFAs Completed", icon: "pi pi-fw pi-check", to: "/agent/efa/efas-completed" },
                        { label: "EFA Completed (Lite)", icon: "pi pi-fw pi-check-circle", to: "/agent/efa/efa-completed-lite" },
                        { label: "Your Financial Picture", icon: "pi pi-fw pi-chart-pie", to: "/agent/efa/your-financial-picture" },
                        { label: "Green Sheet", icon: "pi pi-fw pi-book", to: "/agent/efa/green-sheet" },
                        { label: "Pre-Application Info Gather", icon: "pi pi-fw pi-list", to: "/agent/efa/pre-application-info-gather" },
                    ],
                },
                {
                    label: "Team",
                    icon: "pi pi-fw pi-users",
                    items: [
                        { label: "Agreements", icon: "pi pi-fw pi-file", to: "/agent/team/agreements" },
                        { label: "Invites", icon: "pi pi-fw pi-user-plus", to: "/agent/team/invites" },
                        { label: "Visual Network", icon: "pi pi-fw pi-sitemap", to: "/agent/team/visual-network" },
                        {
                            label: "Recruiting",
                            icon: "pi pi-fw pi-megaphone",
                            items: [
                                { label: "AOA (Online Sign Up)", icon: "pi pi-fw pi-globe", to: "/agent/team/recruiting/aoa-online-sign-up" },
                                { label: "AOA pdf (for viewing only)", icon: "pi pi-fw pi-file-pdf", to: "/agent/team/recruiting/aoa-pdf-viewing-only" },
                                { label: "Compound Recruiting", icon: "pi pi-fw pi-users", to: "/agent/team/recruiting/compound-recruiting" },
                                { label: "New Associates", icon: "pi pi-fw pi-user-plus", to: "/agent/team/recruiting/new-associates" },
                                { label: "ED Ownership Program", icon: "pi pi-fw pi-briefcase", to: "/agent/team/recruiting/ed-ownership-program" },
                                { label: "BEAM", icon: "pi pi-fw pi-bolt", to: "/agent/team/recruiting/beam" },
                                { label: "USA Recruiting Video", icon: "pi pi-fw pi-video", to: "/agent/team/recruiting/usa-recruiting-video" },
                                { label: "The IMO of the Future", icon: "pi pi-fw pi-chart-line", to: "/agent/team/recruiting/the-imo-of-the-future" },
                                { label: "Graphics", icon: "pi pi-fw pi-image", to: "/agent/team/recruiting/graphics" },
                                {
                                    label: "CFRB Newstalk 1010 Interview with CEO, Jamie Prickett",
                                    icon: "pi pi-fw pi-microphone",
                                    to: "/agent/team/recruiting/cfrb-newstalk-1010-interview-ceo-jamie-prickett",
                                },
                                { label: "Why Choose Experior Corporate Video", icon: "pi pi-fw pi-play", to: "/agent/team/recruiting/why-choose-experior-corporate-video" },
                                { label: "Why Choose Experior | Spanish Subtitles", icon: "pi pi-fw pi-globe", to: "/agent/team/recruiting/why-choose-experior-spanish-subtitles" },
                            ],
                        },
                        { label: "Invite link", icon: "pi pi-fw pi-link", to: "/agent/team/invite-link" },
                        { label: "Promotion", icon: "pi pi-fw pi-bolt", to: "/agent/team/promotion", badge: 0 },
                        { label: "Reassigned Clients", icon: "pi pi-fw pi-users", to: "/agent/team/reassigned-clients", badge: 0 },
                    ],
                },
                {
                    label: "Reports",
                    icon: "pi pi-fw pi-chart-bar",
                    items: [
                        { label: "Pending Reports", icon: "pi pi-fw pi-clock", to: "/agent/reports/pending" },
                        { label: "Paid Reports", icon: "pi pi-fw pi-check", to: "/agent/reports/paid" },
                        { label: "Escrow Account", icon: "pi pi-fw pi-wallet", to: "/agent/reports/escrow-account" },
                        { label: "Roll Ups", icon: "pi pi-fw pi-sort-alt", to: "/agent/reports/roll-ups" },
                        { label: "Debts", icon: "pi pi-fw pi-exclamation-triangle", to: "/agent/reports/debts" },
                    ],
                },
                {
                    label: "Scoreboard",
                    icon: "pi pi-fw pi-chart-line",
                    items: [
                        { label: "Company Scoreboard", icon: "pi pi-fw pi-building", to: "/agent/scoreboard/company" },
                        { label: "Personal Scoreboard", icon: "pi pi-fw pi-user", to: "/agent/scoreboard/personal" },
                        { label: "Scoreboard Training", icon: "pi pi-fw pi-book", to: "/agent/scoreboard/training" },
                        { label: "Settled Investments FAQ", icon: "pi pi-fw pi-question-circle", to: "/agent/scoreboard/settled-investments-faq" },
                    ],
                },
                {
                    label: "Contracts",
                    icon: "pi pi-fw pi-book",
                    items: [
                        { label: "Pre-contracting Documents", icon: "pi pi-fw pi-file", to: "/agent/contracts/pre-contracting-documents" },
                        { label: "My Contracts", icon: "pi pi-fw pi-book", to: "/agent/contracts/my-contracts" },
                        { label: "Team Contracts", icon: "pi pi-fw pi-users", to: "/agent/contracts/team-contracts" },
                        { label: "Corporate", icon: "pi pi-fw pi-building", to: "/agent/contracts/corporate" },
                    ],
                },
                {
                    label: "Learn",
                    icon: "pi pi-fw pi-bookmark",
                    items: [
                        {
                            label: "About Experior",
                            icon: "pi pi-fw pi-info-circle",
                            items: [
                                { label: "Experior Academy", icon: "pi pi-fw pi-file", to: "/agent/learn/about-experior/experior-academy" },
                                { label: "HPN University", icon: "pi pi-fw pi-file", to: "/agent/learn/about-experior/hpn-university" },
                                {
                                    label: "Experior Schedule",
                                    icon: "pi pi-fw pi-calendar",
                                    items: [
                                        {
                                            label: "Calendar Integration Explainer Video",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/experior-schedule/calendar-integration-explainer-video",
                                        },
                                        {
                                            label: "Upcoming Meetings",
                                            icon: "pi pi-fw pi-clock",
                                            to: "/agent/learn/about-experior/experior-schedule/upcoming-meetings",
                                        },
                                        {
                                            label: "Event Calendar",
                                            icon: "pi pi-fw pi-calendar",
                                            to: "/agent/learn/about-experior/experior-schedule/event-calendar",
                                        },
                                    ],
                                },
                                {
                                    label: "Getting Started",
                                    icon: "pi pi-fw pi-arrow-circle-right",
                                    items: [
                                        {
                                            label: "USA Onboarding Process",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/usa-onboarding-process",
                                        },
                                        {
                                            label: "Register for the Online Course",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/register-for-the-online-course",
                                        },
                                        {
                                            label: "Errors and Omissions Insurance",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/errors-and-omissions-insurance",
                                        },
                                        {
                                            label: "Getting Started With Experior Checklist - Unlicensed",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/getting-started-with-experior-checklist-unlicensed",
                                        },
                                        {
                                            label: "Submit Your License Application",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/submit-your-license-application",
                                        },
                                        {
                                            label: "Getting Started With Experior Checklist - Licensed",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/getting-started-with-experior-checklist-licensed",
                                        },
                                        {
                                            label: "Mandatory Documents",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/mandatory-documents",
                                        },
                                        {
                                            label: "Getting Appointed",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/getting-appointed",
                                        },
                                        {
                                            label: "Contracting FAQ",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/contracting-faq",
                                        },
                                        {
                                            label: "Keep your License up to date with NIPR",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/keep-your-license-up-to-date-with-nipr",
                                        },
                                        {
                                            label: "CE Credits Providers",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/ce-credits-providers",
                                        },
                                        {
                                            label: "Tutorials in Spanish",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/tutorials-in-spanish",
                                        },
                                        {
                                            label: "Back Office Fees",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/getting-started/back-office-fees",
                                        },
                                    ],
                                },
                                {
                                    label: "Training",
                                    icon: "pi pi-fw pi-play-circle",
                                    items: [
                                        {
                                            label: "CEO Tap Webinar",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/ceo-tap-webinar",
                                        },
                                        {
                                            label: "US Power Hour Recordings",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/us-power-hour-recordings",
                                        },
                                        {
                                            label: "Leaders on TAP Webinar",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/leaders-on-tap-webinar",
                                        },
                                        {
                                            label: "Agents in Action Webinar",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/agents-in-action-webinar",
                                        },
                                        {
                                            label: "Driving Your Success Webinar",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/driving-your-success-webinar",
                                        },
                                        {
                                            label: "Business Development",
                                            icon: "pi pi-fw pi-briefcase",
                                            items: [
                                                {
                                                    label: "XCast Podcast",
                                                    icon: "pi pi-fw pi-volume-up",
                                                    to: "/agent/learn/about-experior/training/business-development/xcast-podcast",
                                                },
                                                {
                                                    label: "Experior Master Classes",
                                                    icon: "pi pi-fw pi-star",
                                                    to: "/agent/learn/about-experior/training/business-development/experior-master-classes",
                                                },
                                                {
                                                    label: "Resources & Tools",
                                                    icon: "pi pi-fw pi-wrench",
                                                    to: "/agent/learn/about-experior/training/business-development/resources-tools",
                                                },
                                            ],
                                        },
                                        {
                                            label: "US Product Partner Webinars",
                                            icon: "pi pi-fw pi-video",
                                            items: [
                                                {
                                                    label: "US Product Partners Weekly Webinar Schedule",
                                                    icon: "pi pi-fw pi-calendar",
                                                    to: "/agent/learn/about-experior/training/us-product-partner-webinars/weekly-webinar-schedule",
                                                },
                                                {
                                                    label: "US Product Partner Webinar Recordings",
                                                    icon: "pi pi-fw pi-video",
                                                    to: "/agent/learn/about-experior/training/us-product-partner-webinars/webinar-recordings",
                                                },
                                                {
                                                    label: "Spanish US Product Partner Recordings",
                                                    icon: "pi pi-fw pi-globe",
                                                    to: "/agent/learn/about-experior/training/us-product-partner-webinars/spanish-recordings",
                                                },
                                            ],
                                        },
                                        {
                                            label: "BTO",
                                            icon: "pi pi-fw pi-calendar",
                                            items: [
                                                {
                                                    label: "Overview",
                                                    icon: "pi pi-fw pi-file",
                                                    to: "/agent/learn/about-experior/training/bto",
                                                },
                                            ],
                                        },
                                        {
                                            label: "CRM Webinar Training",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/crm-webinar-training",
                                        },
                                        {
                                            label: "EmpowHER Webinar",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/empowher-webinar",
                                        },
                                        {
                                            label: "CEO Bootcamp",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/ceo-bootcamp",
                                        },
                                        {
                                            label: "Pre-Recorded Webinars",
                                            icon: "pi pi-fw pi-video",
                                            to: "/agent/learn/about-experior/training/pre-recorded-webinars",
                                        },
                                        {
                                            label: "Audio",
                                            icon: "pi pi-fw pi-volume-up",
                                            to: "/agent/learn/about-experior/training/audio",
                                        },
                                        {
                                            label: "Tutorials",
                                            icon: "pi pi-fw pi-book",
                                            to: "/agent/learn/about-experior/training/tutorials",
                                        },
                                        {
                                            label: "Podcasts",
                                            icon: "pi pi-fw pi-megaphone",
                                            to: "/agent/learn/about-experior/training/podcasts",
                                        },
                                        {
                                            label: "New York",
                                            icon: "pi pi-fw pi-map-marker",
                                            items: [
                                                {
                                                    label: "Overview",
                                                    icon: "pi pi-fw pi-file",
                                                    to: "/agent/learn/about-experior/training/new-york",
                                                },
                                            ],
                                        },
                                        {
                                            label: "Event Presentations",
                                            icon: "pi pi-fw pi-images",
                                            items: [
                                                {
                                                    label: "Overview",
                                                    icon: "pi pi-fw pi-file",
                                                    to: "/agent/learn/about-experior/training/event-presentations",
                                                },
                                            ],
                                        },
                                        {
                                            label: "Promotion Feature Training",
                                            icon: "pi pi-fw pi-star",
                                            to: "/agent/learn/about-experior/training/promotion-feature-training",
                                        },
                                        {
                                            label: "Jairek Robbins Coaching",
                                            icon: "pi pi-fw pi-user",
                                            to: "/agent/learn/about-experior/training/jairek-robbins-coaching",
                                        },
                                        {
                                            label: "Spanish Tutorials",
                                            icon: "pi pi-fw pi-globe",
                                            to: "/agent/learn/about-experior/training/spanish-tutorials",
                                        },
                                        {
                                            label: "Special Carrier Training",
                                            icon: "pi pi-fw pi-building",
                                            items: [
                                                {
                                                    label: "Overview",
                                                    icon: "pi pi-fw pi-file",
                                                    to: "/agent/learn/about-experior/training/special-carrier-training",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                { label: "Purchase Leads", icon: "pi pi-fw pi-file", to: "/agent/learn/about-experior/purchase-leads" },
                                { label: "Lead Training Guides", icon: "pi pi-fw pi-book", to: "/agent/learn/about-experior/lead-training-guides" },
                                {
                                    label: "Contests",
                                    icon: "pi pi-fw pi-trophy",
                                    items: [
                                        {
                                            label: "Carrier & partner contests",
                                            icon: "pi pi-fw pi-file",
                                            to: "/agent/learn/about-experior/contests",
                                        },
                                        {
                                            label: "Desert Oasis 2027",
                                            icon: "pi pi-fw pi-sun",
                                            to: "/agent/learn/about-experior/contests/desert-oasis-2027",
                                        },
                                    ],
                                },
                                {
                                    label: "What's New",
                                    icon: "pi pi-fw pi-info-circle",
                                    items: [
                                        {
                                            label: "Experior Events",
                                            icon: "pi pi-fw pi-calendar",
                                            to: "/agent/learn/about-experior/whats-new/experior-events",
                                        },
                                        {
                                            label: "News & Events",
                                            icon: "pi pi-fw pi-megaphone",
                                            to: "/agent/learn/about-experior/whats-new/news-events",
                                        },
                                        {
                                            label: "Record Breakers",
                                            icon: "pi pi-fw pi-chart-line",
                                            to: "/agent/learn/about-experior/whats-new/record-breakers",
                                        },
                                        {
                                            label: "Personal Bonus Qualifiers",
                                            icon: "pi pi-fw pi-user",
                                            to: "/agent/learn/about-experior/whats-new/personal-bonus-qualifiers",
                                        },
                                        {
                                            label: "Builders Bonus Qualifiers",
                                            icon: "pi pi-fw pi-users",
                                            to: "/agent/learn/about-experior/whats-new/builders-bonus-qualifiers",
                                        },
                                        {
                                            label: "Leadership",
                                            icon: "pi pi-fw pi-star",
                                            to: "/agent/learn/about-experior/whats-new/leadership",
                                        },
                                        {
                                            label: "Agent Promotions",
                                            icon: "pi pi-fw pi-arrow-circle-up",
                                            to: "/agent/learn/about-experior/whats-new/agent-promotions",
                                        },
                                        {
                                            label: "Hierarchy & Agency Premium Clubs",
                                            icon: "pi pi-fw pi-sitemap",
                                            items: [
                                                {
                                                    label: "1 Million Hierarchy Club",
                                                    icon: "pi pi-fw pi-star",
                                                    to: "/agent/learn/about-experior/whats-new/hierarchy-agency-premium-clubs/1-million-hierarchy-club",
                                                },
                                                {
                                                    label: "100 Grand Agency Club",
                                                    icon: "pi pi-fw pi-building",
                                                    to: "/agent/learn/about-experior/whats-new/hierarchy-agency-premium-clubs/100-grand-agency-club",
                                                },
                                                {
                                                    label: "200 Grand Agency Club",
                                                    icon: "pi pi-fw pi-building",
                                                    to: "/agent/learn/about-experior/whats-new/hierarchy-agency-premium-clubs/200-grand-agency-club",
                                                },
                                                {
                                                    label: "300 Grand Agency Club",
                                                    icon: "pi pi-fw pi-building",
                                                    to: "/agent/learn/about-experior/whats-new/hierarchy-agency-premium-clubs/300-grand-agency-club",
                                                },
                                                {
                                                    label: "400 Grand Agency Club",
                                                    icon: "pi pi-fw pi-building",
                                                    to: "/agent/learn/about-experior/whats-new/hierarchy-agency-premium-clubs/400-grand-agency-club",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    label: "Contacts",
                                    icon: "pi pi-fw pi-phone",
                                    items: [
                                        {
                                            label: "Experior Contacts",
                                            icon: "pi pi-fw pi-id-card",
                                            to: "/agent/learn/about-experior/contacts/experior-contacts",
                                        },
                                        {
                                            label: "Experior Office Branches",
                                            icon: "pi pi-fw pi-map-marker",
                                            to: "/agent/learn/about-experior/contacts/experior-office-branches",
                                        },
                                        {
                                            label: "Provider Contacts",
                                            icon: "pi pi-fw pi-building",
                                            to: "/agent/learn/about-experior/contacts/provider-contacts",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: "Products",
                            icon: "pi pi-fw pi-briefcase",
                            items: [
                                { label: "Life Insurance Products", icon: "pi pi-fw pi-file", to: "/agent/learn/products/life-insurance-products" },
                                { label: "Health Insurance Products", icon: "pi pi-fw pi-file", to: "/agent/learn/products/health-insurance-products" },
                                { label: "Annuities/Quantum", icon: "pi pi-fw pi-file", to: "/agent/learn/products/annuities-quantum" },
                                { label: "Global View Investment Platform", icon: "pi pi-fw pi-file", to: "/agent/learn/products/global-view-investment-platform" },
                                { label: "NEW Insurance SnapView (ISV)", icon: "pi pi-fw pi-file", to: "/agent/learn/products/new-insurance-snapview-isv" },
                                { label: "Carriers", icon: "pi pi-fw pi-file", to: "/agent/learn/products/carriers" },
                                { label: "Referral Partners", icon: "pi pi-fw pi-file", to: "/agent/learn/products/referral-partners" },
                                { label: "Puerto Rico", icon: "pi pi-fw pi-file", to: "/agent/learn/products/puerto-rico" },
                            ],
                        },
                        {
                            label: "Departments",
                            icon: "pi pi-fw pi-sitemap",
                            items: [
                                { label: "Broker Support", icon: "pi pi-fw pi-comments", to: "/agent/learn/departments/broker-support" },
                                { label: "Commissions", icon: "pi pi-fw pi-clock", to: "/agent/learn/departments/commissions" },
                                { label: "Contracting", icon: "pi pi-fw pi-pencil", to: "/agent/learn/departments/contracting" },
                                { label: "Compliance", icon: "pi pi-fw pi-file", to: "/agent/learn/departments/compliance" },
                                { label: "Marketing", icon: "pi pi-fw pi-star", to: "/agent/learn/departments/marketing" },
                                { label: "New & Pending Business", icon: "pi pi-fw pi-file", to: "/agent/learn/departments/new-pending-business" },
                            ],
                        },
                        {
                            label: "Development",
                            icon: "pi pi-fw pi-cog",
                            items: [
                                { label: "Releases", icon: "pi pi-fw pi-file", to: "/agent/learn/development/releases" },
                                { label: "Coming Soon", icon: "pi pi-fw pi-file", to: "/agent/learn/development/coming-soon" },
                                { label: "Pop-Ups", icon: "pi pi-fw pi-file", to: "/agent/learn/development/pop-ups" },
                            ],
                        },
                        {
                            label: "Resources",
                            icon: "pi pi-fw pi-folder",
                            items: [
                                { label: "Resources", icon: "pi pi-fw pi-folder", to: "/agent/learn/resources/resources" },
                                { label: "Forms", icon: "pi pi-fw pi-file", to: "/agent/learn/resources/forms" },
                                { label: "My CRM", icon: "pi pi-fw pi-filter", to: "/agent/learn/resources/my-crm" },
                                { label: "Experior Connect - Workvivo", icon: "pi pi-fw pi-users", to: "/agent/learn/resources/experior-connect-workvivo" },
                                { label: "Experior Connect - Workvivo Getting Started", icon: "pi pi-fw pi-file", to: "/agent/learn/resources/experior-connect-workvivo-getting-started" },
                            ],
                        },
                    ],
                },
            ],
        });
    }

    if (canAccessSection(user.role, "messages")) {
        model.push({
            label: "Communication",
            icon: "pi pi-comments",
            items: [
                {
                    label: "Messages",
                    icon: "pi pi-fw pi-comments",
                    to: user.role === "CARRIER" ? "/carrier/messages" : user.role === "ADMIN" ? "/admin/messages" : "/agent/messages",
                },
            ],
        });
    }

    if (canAccessSection(user.role, "commissions")) {
        model.push({
            label: "Commissions",
            icon: "pi pi-wallet",
            items: [
                {
                    label: user.role === "ADMIN" ? "Commission Management" : "Commission Tracker",
                    icon: "pi pi-fw pi-wallet",
                    to: user.role === "ADMIN" ? "/admin/commissions" : "/agent/commissions",
                },
            ],
        });
    }

    if (canAccessSection(user.role, "tickets")) {
        model.push({
            label: "Support",
            icon: "pi pi-ticket",
            items: [
                {
                    label: user.role === "ADMIN" ? "Ticket Queue" : "My Tickets",
                    icon: "pi pi-fw pi-ticket",
                    to: user.role === "CARRIER" ? "/carrier/tickets" : user.role === "ADMIN" ? "/admin/tickets" : "/agent/tickets",
                },
            ],
        });
    }

    if (canAccessSection(user.role, "agents") || canAccessSection(user.role, "carriers")) {
        model.push({
            label: "Administration",
            icon: "pi pi-cog",
            items: [
                { label: "Agents", icon: "pi pi-fw pi-users", to: "/admin/agents" },
                { label: "Carriers", icon: "pi pi-fw pi-building", to: "/admin/carriers" },
                { label: "Insurer Stats", icon: "pi pi-fw pi-chart-line", to: "/admin/insurer-stats" },
                { label: "Settings", icon: "pi pi-fw pi-cog", to: "/admin/settings" },
            ],
        });
    }

    model.push({
        label: "Account",
        icon: "pi pi-user",
        items: [
            {
                label: "Profile",
                icon: "pi pi-fw pi-user",
                to: user.role === "CARRIER" ? "/carrier/profile" : user.role === "ADMIN" ? "/admin/profile" : "/agent/profile",
            },
        ],
    });

    return <AppSubMenu model={model} />;
};

export default AppMenu;

