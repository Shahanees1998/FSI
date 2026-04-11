import EventCalendarView from "@/components/learn/EventCalendarView";
import ChecklistLicensedView from "@/components/learn/getting-started/ChecklistLicensedView";
import ContractingFaqView from "@/components/learn/getting-started/ContractingFaqView";
import CeCreditsProvidersView from "@/components/learn/getting-started/CeCreditsProvidersView";
import BackOfficeFeesView from "@/components/learn/getting-started/BackOfficeFeesView";
import TutorialsSpanishLearnView from "@/components/learn/getting-started/TutorialsSpanishLearnView";
import KeepLicenseNiprView from "@/components/learn/getting-started/KeepLicenseNiprView";
import GettingAppointedView from "@/components/learn/getting-started/GettingAppointedView";
import MandatoryDocumentsView from "@/components/learn/getting-started/MandatoryDocumentsView";
import SubmitLicenseApplicationView from "@/components/learn/getting-started/SubmitLicenseApplicationView";
import ChecklistUnlicensedView from "@/components/learn/getting-started/ChecklistUnlicensedView";
import ErrorsAndOmissionsInsuranceView from "@/components/learn/getting-started/ErrorsAndOmissionsInsuranceView";
import RegisterForOnlineCourseView from "@/components/learn/getting-started/RegisterForOnlineCourseView";
import UsaOnboardingProcessView from "@/components/learn/getting-started/UsaOnboardingProcessView";
import ContestsView from "@/components/learn/ContestsView";
import DesertOasisContest2027View from "@/components/learn/DesertOasisContest2027View";
import LeadTrainingGuidesView from "@/components/learn/LeadTrainingGuidesView";
import LifeInsuranceProductsHubView from "@/components/learn/products/LifeInsuranceProductsHubView";
import PurchaseLeadsView from "@/components/learn/PurchaseLeadsView";
import UpcomingMeetingsView from "@/components/learn/UpcomingMeetingsView";
import ContactsSectionView from "@/components/learn/contacts/ContactsSectionView";
import ExperiorContactsView from "@/components/learn/contacts/ExperiorContactsView";
import ExperiorOfficeBranchesView from "@/components/learn/contacts/ExperiorOfficeBranchesView";
import ProviderContactsView from "@/components/learn/contacts/ProviderContactsView";
import ExperiorEventsView from "@/components/learn/whats-new/ExperiorEventsView";
import NewsAndEventsView from "@/components/learn/whats-new/NewsAndEventsView";
import BuildersBonusQualifiersView from "@/components/learn/whats-new/BuildersBonusQualifiersView";
import LeadershipView from "@/components/learn/whats-new/LeadershipView";
import HundredGrandClubView from "@/components/learn/whats-new/HundredGrandClubView";
import FourHundredGrandClubView from "@/components/learn/whats-new/FourHundredGrandClubView";
import ThreeHundredGrandClubView from "@/components/learn/whats-new/ThreeHundredGrandClubView";
import TwoHundredGrandClubView from "@/components/learn/whats-new/TwoHundredGrandClubView";
import OneMillionHierarchyClubView from "@/components/learn/whats-new/OneMillionHierarchyClubView";
import PersonalBonusQualifiersView from "@/components/learn/whats-new/PersonalBonusQualifiersView";
import RecordBreakersView from "@/components/learn/whats-new/RecordBreakersView";
import WhatsNewSectionView from "@/components/learn/whats-new/WhatsNewSectionView";
import { requireCurrentUser } from "@/lib/serverAuth";
import { redirect } from "next/navigation";

const EXPERIOR_ACADEMY_EXTERNAL_URL = "https://experioracademyus.learnworlds.com/";
const CALENDAR_INTEGRATION_EXPLAINER_VIDEO_URL =
    "https://www.youtube.com/watch?v=eW_wsVBcIvI&t=2s";

const LEARN_TITLES: Record<string, string> = {
    "about-experior/experior-academy": "Experior Academy",
    "about-experior/hpn-university": "HPN University",
    "about-experior/experior-schedule/calendar-integration-explainer-video":
        "Calendar Integration Explainer Video",
    "about-experior/experior-schedule/upcoming-meetings": "Upcoming Meetings",
    "about-experior/experior-schedule/event-calendar": "Event Calendar",
    "about-experior/getting-started/usa-onboarding-process": "USA Onboarding Process",
    "about-experior/getting-started/register-for-the-online-course": "Register for the Online Course",
    "about-experior/getting-started/errors-and-omissions-insurance": "Errors and Omissions Insurance",
    "about-experior/getting-started/getting-started-with-experior-checklist-unlicensed":
        "Getting Started With Experior Checklist - Unlicensed",
    "about-experior/getting-started/submit-your-license-application": "Submit Your License Application",
    "about-experior/getting-started/getting-started-with-experior-checklist-licensed":
        "Getting Started With Experior Checklist - Licensed",
    "about-experior/getting-started/mandatory-documents": "Mandatory Documents",
    "about-experior/getting-started/getting-appointed": "Getting Appointed",
    "about-experior/getting-started/contracting-faq": "Contracting FAQ",
    "about-experior/getting-started/keep-your-license-up-to-date-with-nipr":
        "Keep your License up to date with NIPR",
    "about-experior/getting-started/ce-credits-providers": "CE Credits Providers",
    "about-experior/getting-started/tutorials-in-spanish": "Tutorials in Spanish",
    "about-experior/getting-started/back-office-fees": "Back Office Fees",
    "about-experior/training/ceo-tap-webinar": "CEO Tap Webinar",
    "about-experior/training/us-power-hour-recordings": "US Power Hour Recordings",
    "about-experior/training/leaders-on-tap-webinar": "Leaders on TAP Webinar",
    "about-experior/training/agents-in-action-webinar": "Agents in Action Webinar",
    "about-experior/training/driving-your-success-webinar": "Driving Your Success Webinar",
    "about-experior/training/business-development/xcast-podcast": "XCast Podcast",
    "about-experior/training/business-development/experior-master-classes": "Experior Master Classes",
    "about-experior/training/business-development/resources-tools": "Resources & Tools",
    "about-experior/training/us-product-partner-webinars/weekly-webinar-schedule":
        "US Product Partners Weekly Webinar Schedule",
    "about-experior/training/us-product-partner-webinars/webinar-recordings":
        "US Product Partner Webinar Recordings",
    "about-experior/training/us-product-partner-webinars/spanish-recordings":
        "Spanish US Product Partner Recordings",
    "about-experior/training/bto": "BTO",
    "about-experior/training/crm-webinar-training": "CRM Webinar Training",
    "about-experior/training/empowher-webinar": "EmpowHER Webinar",
    "about-experior/training/ceo-bootcamp": "CEO Bootcamp",
    "about-experior/training/pre-recorded-webinars": "Pre-Recorded Webinars",
    "about-experior/training/audio": "Audio",
    "about-experior/training/tutorials": "Tutorials",
    "about-experior/training/podcasts": "Podcasts",
    "about-experior/training/new-york": "New York",
    "about-experior/training/event-presentations": "Event Presentations",
    "about-experior/training/promotion-feature-training": "Promotion Feature Training",
    "about-experior/training/jairek-robbins-coaching": "Jairek Robbins Coaching",
    "about-experior/training/spanish-tutorials": "Spanish Tutorials",
    "about-experior/training/special-carrier-training": "Special Carrier Training",
    "about-experior/purchase-leads": "Purchase Leads",
    "about-experior/lead-training-guides": "Lead Training Guides",
    "about-experior/contests": "Contests",
    "about-experior/contests/desert-oasis-2027": "Desert Oasis Contest 2027",
    "about-experior/whats-new": "What's New",
    "about-experior/whats-new/experior-events": "Experior Events",
    "about-experior/whats-new/news-events": "News & Events",
    "about-experior/whats-new/record-breakers": "Record Breakers",
    "about-experior/whats-new/personal-bonus-qualifiers": "Personal Bonus Qualifiers",
    "about-experior/whats-new/builders-bonus-qualifiers": "Builders Bonus Qualifiers",
    "about-experior/whats-new/leadership": "Leadership",
    "about-experior/whats-new/agent-promotions": "Agent Promotions",
    "about-experior/whats-new/hierarchy-agency-premium-clubs/1-million-hierarchy-club": "1 Million Hierarchy Club",
    "about-experior/whats-new/hierarchy-agency-premium-clubs/100-grand-agency-club": "100 Grand Agency Club",
    "about-experior/whats-new/hierarchy-agency-premium-clubs/200-grand-agency-club": "200 Grand Agency Club",
    "about-experior/whats-new/hierarchy-agency-premium-clubs/300-grand-agency-club": "300 Grand Agency Club",
    "about-experior/whats-new/hierarchy-agency-premium-clubs/400-grand-agency-club": "400 Grand Agency Club",
    "about-experior/contacts": "Contacts",
    "about-experior/contacts/experior-contacts": "Experior Contacts",
    "about-experior/contacts/experior-office-branches": "Experior Office Branches",
    "about-experior/contacts/provider-contacts": "Provider Contacts",
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

    if (key === "about-experior/experior-academy") {
        redirect(EXPERIOR_ACADEMY_EXTERNAL_URL);
    }

    if (key === "about-experior/experior-schedule") {
        redirect("/agent/learn/about-experior/experior-schedule/calendar-integration-explainer-video");
    }

    if (key === "about-experior/experior-schedule/calendar-integration-explainer-video") {
        redirect(CALENDAR_INTEGRATION_EXPLAINER_VIDEO_URL);
    }

    if (key === "about-experior/experior-schedule/upcoming-meetings") {
        return (
            <UpcomingMeetingsView
                embedUrl={process.env.NEXT_PUBLIC_UPCOMING_MEETINGS_CALENDAR_EMBED_URL ?? null}
            />
        );
    }

    if (key === "about-experior/experior-schedule/event-calendar") {
        return (
            <EventCalendarView
                embedUrl={process.env.NEXT_PUBLIC_EVENT_CALENDAR_EMBED_URL ?? null}
            />
        );
    }

    if (key === "about-experior/getting-started") {
        redirect("/agent/learn/about-experior/getting-started/usa-onboarding-process");
    }

    if (key === "about-experior/getting-started/usa-onboarding-process") {
        return <UsaOnboardingProcessView />;
    }

    if (key === "about-experior/getting-started/register-for-the-online-course") {
        return (
            <RegisterForOnlineCourseView
                registrationUrl={
                    process.env.NEXT_PUBLIC_EXAMFX_REGISTRATION_URL?.trim() || "https://www.examfx.com/"
                }
            />
        );
    }

    if (key === "about-experior/getting-started/errors-and-omissions-insurance") {
        return (
            <ErrorsAndOmissionsInsuranceView
                signUpUrl={process.env.NEXT_PUBLIC_EO_SIGNUP_URL?.trim() ?? ""}
                pricingGuidePdfUrl={
                    process.env.NEXT_PUBLIC_EO_PRICING_GUIDE_PDF_URL?.trim() ?? "/documents/eo-pricing-guide.pdf"
                }
                viewRatesPdfUrl={process.env.NEXT_PUBLIC_EO_VIEW_RATES_PDF_URL?.trim() ?? "/documents/eo-view-rates.pdf"}
                programComparisonPdfUrl={
                    process.env.NEXT_PUBLIC_EO_PROGRAM_COMPARISON_PDF_URL?.trim() ??
                    "/documents/eo-program-comparison.pdf"
                }
            />
        );
    }

    if (key === "about-experior/getting-started/getting-started-with-experior-checklist-unlicensed") {
        return <ChecklistUnlicensedView />;
    }

    if (key === "about-experior/getting-started/getting-started-with-experior-checklist-licensed") {
        return <ChecklistLicensedView />;
    }

    if (key === "about-experior/getting-started/submit-your-license-application") {
        return (
            <SubmitLicenseApplicationView
                applicationUrl={
                    process.env.NEXT_PUBLIC_STATE_LICENSE_APPLICATION_URL?.trim() || "https://www.nipr.com/"
                }
            />
        );
    }

    if (key === "about-experior/getting-started/mandatory-documents") {
        return <MandatoryDocumentsView />;
    }

    if (key === "about-experior/getting-started/getting-appointed") {
        return <GettingAppointedView />;
    }

    if (key === "about-experior/getting-started/contracting-faq") {
        return <ContractingFaqView />;
    }

    if (key === "about-experior/getting-started/keep-your-license-up-to-date-with-nipr") {
        return <KeepLicenseNiprView />;
    }

    if (key === "about-experior/getting-started/ce-credits-providers") {
        return <CeCreditsProvidersView />;
    }

    if (key === "about-experior/getting-started/tutorials-in-spanish") {
        return (
            <TutorialsSpanishLearnView
                videos={{
                    preLicense: process.env.NEXT_PUBLIC_SPANISH_TUTORIAL_PRE_LICENSE_VIDEO_ID,
                    nipr: process.env.NEXT_PUBLIC_SPANISH_TUTORIAL_NIPR_VIDEO_ID,
                    platform: process.env.NEXT_PUBLIC_SPANISH_TUTORIAL_PLATFORM_VIDEO_ID,
                    eo: process.env.NEXT_PUBLIC_SPANISH_TUTORIAL_EO_VIDEO_ID,
                    inviteLead: process.env.NEXT_PUBLIC_SPANISH_TUTORIAL_INVITE_LEAD_VIDEO_ID,
                    nbtEfaLite: process.env.NEXT_PUBLIC_SPANISH_TUTORIAL_NBT_EFA_LITE_VIDEO_ID,
                }}
            />
        );
    }

    if (key === "about-experior/getting-started/back-office-fees") {
        return (
            <BackOfficeFeesView
                ecosystemVideoId={process.env.NEXT_PUBLIC_ECOSYSTEM_FEES_VIDEO_ID ?? null}
            />
        );
    }

    if (key === "about-experior/training") {
        redirect("/agent/learn/about-experior/training/ceo-tap-webinar");
    }

    if (key === "about-experior/training/business-development") {
        redirect("/agent/learn/about-experior/training/business-development/xcast-podcast");
    }

    if (key === "about-experior/training/us-product-partner-webinars") {
        redirect("/agent/learn/about-experior/training/us-product-partner-webinars/weekly-webinar-schedule");
    }

    if (key === "about-experior/purchase-leads") {
        return (
            <PurchaseLeadsView
                caboomWebinarVideoId={process.env.NEXT_PUBLIC_CABOOM_LAUNCH_WEBINAR_VIDEO_ID ?? null}
                caboomWebinarRecordingUrl={process.env.NEXT_PUBLIC_CABOOM_LAUNCH_WEBINAR_RECORDING_URL ?? null}
            />
        );
    }

    if (key === "about-experior/lead-training-guides") {
        return <LeadTrainingGuidesView />;
    }

    if (key === "about-experior/contests/desert-oasis-2027") {
        return <DesertOasisContest2027View />;
    }

    if (key === "about-experior/contests") {
        return <ContestsView />;
    }

    if (key === "about-experior/whats-new") {
        redirect("/agent/learn/about-experior/whats-new/experior-events");
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs") {
        redirect("/agent/learn/about-experior/whats-new/hierarchy-agency-premium-clubs/1-million-hierarchy-club");
    }

    if (
        key === "about-experior/whats-new/hierarchy-agency-premium-clubs/agency-premium-club" ||
        key === "about-experior/whats-new/hierarchy-agency-premium-clubs/hierarchy"
    ) {
        redirect("/agent/learn/about-experior/whats-new/hierarchy-agency-premium-clubs/1-million-hierarchy-club");
    }

    if (key === "about-experior/whats-new/experior-events") {
        return <ExperiorEventsView eventsPageUrl={process.env.NEXT_PUBLIC_EXPERIOR_EVENTS_URL?.trim() ?? null} />;
    }

    if (key === "about-experior/whats-new/news-events") {
        return (
            <NewsAndEventsView
                experiorFactorTicketsUrl={process.env.NEXT_PUBLIC_EXPERIOR_FACTOR_TICKETS_URL?.trim() ?? null}
                entrepreneursLoungeRegisterUrl={process.env.NEXT_PUBLIC_ENTREPRENEURS_LOUNGE_REGISTER_URL?.trim() ?? null}
            />
        );
    }

    if (key === "about-experior/whats-new/record-breakers") {
        return <RecordBreakersView />;
    }

    if (key === "about-experior/whats-new/personal-bonus-qualifiers") {
        return <PersonalBonusQualifiersView />;
    }

    if (key === "about-experior/whats-new/builders-bonus-qualifiers") {
        return <BuildersBonusQualifiersView />;
    }

    if (key === "about-experior/whats-new/leadership") {
        return <LeadershipView />;
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/1-million-hierarchy-club") {
        return <OneMillionHierarchyClubView />;
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/100-grand-agency-club") {
        return <HundredGrandClubView />;
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/200-grand-agency-club") {
        return <TwoHundredGrandClubView />;
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/300-grand-agency-club") {
        return <ThreeHundredGrandClubView />;
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/400-grand-agency-club") {
        return <FourHundredGrandClubView />;
    }

    const whatsNewTitle = LEARN_TITLES[key];
    if (whatsNewTitle && key.startsWith("about-experior/whats-new/")) {
        return <WhatsNewSectionView title={whatsNewTitle} />;
    }

    if (key === "about-experior/contacts") {
        redirect("/agent/learn/about-experior/contacts/experior-contacts");
    }

    if (key === "about-experior/contacts/experior-contacts") {
        return <ExperiorContactsView />;
    }

    if (key === "about-experior/contacts/experior-office-branches") {
        return (
            <ExperiorOfficeBranchesView
                embedUrl={process.env.NEXT_PUBLIC_EXPERIOR_OFFICE_BRANCHES_URL?.trim() ?? null}
            />
        );
    }

    if (key === "about-experior/contacts/provider-contacts") {
        return <ProviderContactsView />;
    }

    const contactsTitle = LEARN_TITLES[key];
    if (contactsTitle && key.startsWith("about-experior/contacts/")) {
        return <ContactsSectionView title={contactsTitle} />;
    }

    if (key === "products/life-insurance-products") {
        return (
            <LifeInsuranceProductsHubView
                quotingToolsUrl={process.env.NEXT_PUBLIC_LIFE_QUOTING_TOOLS_URL?.trim() ?? null}
            />
        );
    }

    const title = LEARN_TITLES[key] ?? toTitleCaseFromSlug(slug[slug.length - 1] ?? "Learn");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <h1 className="mt-0 mb-2">{title}</h1>
            <p className="text-600 m-0">Dummy content for now.</p>
        </div>
    );
}

