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
import AnnuitiesQuantumView from "@/components/learn/products/AnnuitiesQuantumView";
import GlobalViewInvestmentPlatformView from "@/components/learn/products/GlobalViewInvestmentPlatformView";
import InsuranceSnapViewIsvView from "@/components/learn/products/InsuranceSnapViewIsvView";
import HealthInsuranceProductsHubView from "@/components/learn/products/HealthInsuranceProductsHubView";
import CarriersHubView from "@/components/learn/products/CarriersHubView";
import PuertoRicoHubView from "@/components/learn/products/PuertoRicoHubView";
import ReferralPartnersHubView from "@/components/learn/products/ReferralPartnersHubView";
import LifeInsuranceProductsHubView from "@/components/learn/products/LifeInsuranceProductsHubView";
import { renderLearnCmsSubpage } from "@/lib/renderLearnCmsSubpage";
import DevelopmentComingSoonView from "@/components/learn/development/DevelopmentComingSoonView";
import DevelopmentPopUpsView from "@/components/learn/development/DevelopmentPopUpsView";
import DevelopmentReleasesView from "@/components/learn/development/DevelopmentReleasesView";
import PurchaseLeadsView from "@/components/learn/PurchaseLeadsView";
import UpcomingMeetingsView from "@/components/learn/UpcomingMeetingsView";
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
import BrokerSupportHubView from "@/components/learn/departments/BrokerSupportHubView";
import CommissionsHubView from "@/components/learn/departments/CommissionsHubView";
import ComplianceHubView from "@/components/learn/departments/ComplianceHubView";
import MarketingHubView from "@/components/learn/departments/MarketingHubView";
import NewPendingBusinessHubView from "@/components/learn/departments/NewPendingBusinessHubView";
import ContractingHubView from "@/components/learn/departments/ContractingHubView";
import { BROKER_SUPPORT_LEARN_TITLES } from "@/lib/learn/departmentsBrokerSupportNav";
import { COMMISSIONS_LEARN_TITLES } from "@/lib/learn/departmentsCommissionsNav";
import { COMPLIANCE_LEARN_TITLES } from "@/lib/learn/departmentsComplianceNav";
import { CONTRACTING_LEARN_TITLES } from "@/lib/learn/departmentsContractingNav";
import { NEW_PENDING_BUSINESS_LEARN_TITLES } from "@/lib/learn/departmentsNewPendingBusinessNav";
import { CARRIER_LEARN_TITLES } from "@/lib/learn/carriersNav";
import { PUERTO_RICO_LEARN_TITLES } from "@/lib/learn/puertoRicoNav";
import { REFERRAL_PARTNER_LEARN_TITLES } from "@/lib/learn/referralPartnersNav";
import FormsHubView from "@/components/learn/resources/FormsHubView";
import MyCrmView from "@/components/learn/resources/MyCrmView";
import ExperiorConnectWorkvivoView from "@/components/learn/resources/ExperiorConnectWorkvivoView";
import ExperiorConnectWorkvivoGettingStartedView from "@/components/learn/resources/ExperiorConnectWorkvivoGettingStartedView";
import ResourcesHubView from "@/components/learn/resources/ResourcesHubView";
import { FORMS_LEARN_TITLES } from "@/lib/learn/resourcesFormsNav";
import { RESOURCES_HUB_LEARN_TITLES } from "@/lib/learn/resourcesHubNav";
import { requireCurrentUser } from "@/lib/serverAuth";
import { redirect } from "next/navigation";
import PortalContentView from "@/components/portal/PortalContentView";
import { getPortalContentBySlug, listActivePopups, portalContentToPopupRow } from "@/lib/portalContentData";

const EXPERIOR_ACADEMY_EXTERNAL_URL = "https://experioracademyus.learnworlds.com/";
const DEFAULT_EXPERIOR_WORKVIVO_LOGIN_URL = "https://experiorfinancial.workvivo.us/login";
const DEFAULT_WORKVIVO_IOS_APP_URL = "https://apps.apple.com/us/app/workvivo/id1147631784";
const DEFAULT_WORKVIVO_ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.workvivo.workvivo";
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
    ...CARRIER_LEARN_TITLES,
    "products/referral-partners": "Referral Partners",
    ...REFERRAL_PARTNER_LEARN_TITLES,
    "products/puerto-rico": "Puerto Rico",
    ...PUERTO_RICO_LEARN_TITLES,
    "departments/broker-support": "Broker Support",
    ...BROKER_SUPPORT_LEARN_TITLES,
    "departments/commissions": "Commissions",
    ...COMMISSIONS_LEARN_TITLES,
    "departments/contracting": "Contracting",
    ...CONTRACTING_LEARN_TITLES,
    "departments/compliance": "Compliance",
    ...COMPLIANCE_LEARN_TITLES,
    "departments/marketing": "Marketing Hub",
    "departments/new-pending-business": "New & Pending Business",
    ...NEW_PENDING_BUSINESS_LEARN_TITLES,
    "development/releases": "Releases",
    "development/coming-soon": "Coming Soon",
    "development/pop-ups": "Pop-Ups",
    "resources/resources": "Resources",
    ...RESOURCES_HUB_LEARN_TITLES,
    "resources/forms": "Forms",
    ...FORMS_LEARN_TITLES,
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

const GETTING_STARTED_BACK = {
    backHref: "/agent/learn/about-experior/getting-started/getting-started-with-experior-checklist-licensed",
    backLabel: "Getting Started",
} as const;

const WHATS_NEW_BACK = {
    backHref: "/agent/learn/about-experior/whats-new",
    backLabel: "What's New",
} as const;

const SCHEDULE_BACK = {
    backHref: "/agent/learn/about-experior/experior-schedule/upcoming-meetings",
    backLabel: "Schedule",
} as const;

const CONTESTS_BACK = {
    backHref: "/agent/learn/about-experior/contests",
    backLabel: "Contests",
} as const;

const CONTACTS_MAIN_BACK = {
    backHref: "/agent/learn/about-experior/contacts",
    backLabel: "Contacts",
} as const;

const DEVELOPMENT_BACK = {
    backHref: "/agent/learn/development/releases",
    backLabel: "Development",
} as const;

const LEARN_ROOT_BACK = {
    backHref: "/agent/learn",
    backLabel: "Learn",
} as const;

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
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...SCHEDULE_BACK,
            fallback: (
                <UpcomingMeetingsView
                    embedUrl={process.env.NEXT_PUBLIC_UPCOMING_MEETINGS_CALENDAR_EMBED_URL ?? null}
                />
            ),
        });
    }

    if (key === "about-experior/experior-schedule/event-calendar") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...SCHEDULE_BACK,
            fallback: (
                <EventCalendarView embedUrl={process.env.NEXT_PUBLIC_EVENT_CALENDAR_EMBED_URL ?? null} />
            ),
        });
    }

    if (key === "about-experior/getting-started") {
        redirect("/agent/learn/about-experior/getting-started/usa-onboarding-process");
    }

    if (key === "about-experior/getting-started/usa-onboarding-process") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: <UsaOnboardingProcessView />,
        });
    }

    if (key === "about-experior/getting-started/register-for-the-online-course") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: (
                <RegisterForOnlineCourseView
                    registrationUrl={
                        process.env.NEXT_PUBLIC_EXAMFX_REGISTRATION_URL?.trim() || "https://www.examfx.com/"
                    }
                />
            ),
        });
    }

    if (key === "about-experior/getting-started/errors-and-omissions-insurance") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: (
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
            ),
        });
    }

    if (key === "about-experior/getting-started/getting-started-with-experior-checklist-unlicensed") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: <ChecklistUnlicensedView />,
        });
    }

    if (key === "about-experior/getting-started/getting-started-with-experior-checklist-licensed") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: <ChecklistLicensedView />,
        });
    }

    if (key === "about-experior/getting-started/submit-your-license-application") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: (
                <SubmitLicenseApplicationView
                    applicationUrl={
                        process.env.NEXT_PUBLIC_STATE_LICENSE_APPLICATION_URL?.trim() || "https://www.nipr.com/"
                    }
                />
            ),
        });
    }

    if (key === "about-experior/getting-started/mandatory-documents") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: <MandatoryDocumentsView />,
        });
    }

    if (key === "about-experior/getting-started/getting-appointed") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: <GettingAppointedView />,
        });
    }

    if (key === "about-experior/getting-started/contracting-faq") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: <ContractingFaqView />,
        });
    }

    if (key === "about-experior/getting-started/keep-your-license-up-to-date-with-nipr") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: <KeepLicenseNiprView />,
        });
    }

    if (key === "about-experior/getting-started/ce-credits-providers") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: <CeCreditsProvidersView />,
        });
    }

    if (key === "about-experior/getting-started/tutorials-in-spanish") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: (
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
            ),
        });
    }

    if (key === "about-experior/getting-started/back-office-fees") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...GETTING_STARTED_BACK,
            fallback: (
                <BackOfficeFeesView
                    ecosystemVideoId={process.env.NEXT_PUBLIC_ECOSYSTEM_FEES_VIDEO_ID ?? null}
                />
            ),
        });
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

    const trainingTitle = LEARN_TITLES[key];
    if (trainingTitle && key.startsWith("about-experior/training/")) {
        return await renderLearnCmsSubpage({
            slug: key,
            title: trainingTitle,
            backHref: "/agent/learn/about-experior/training/ceo-tap-webinar",
            backLabel: "Training",
        });
    }

    if (key === "about-experior/hpn-university") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            backHref: "/agent/learn",
            backLabel: "Learn",
        });
    }

    if (key === "about-experior/purchase-leads") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: (
                <PurchaseLeadsView
                    caboomWebinarVideoId={process.env.NEXT_PUBLIC_CABOOM_LAUNCH_WEBINAR_VIDEO_ID ?? null}
                    caboomWebinarRecordingUrl={process.env.NEXT_PUBLIC_CABOOM_LAUNCH_WEBINAR_RECORDING_URL ?? null}
                />
            ),
        });
    }

    if (key === "about-experior/lead-training-guides") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <LeadTrainingGuidesView />,
        });
    }

    if (key === "about-experior/contests/desert-oasis-2027") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...CONTESTS_BACK,
            fallback: <DesertOasisContest2027View />,
        });
    }

    if (key === "about-experior/contests") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <ContestsView />,
        });
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
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <ExperiorEventsView eventsPageUrl={process.env.NEXT_PUBLIC_EXPERIOR_EVENTS_URL?.trim() ?? null} />,
        });
    }

    if (key === "about-experior/whats-new/news-events") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: (
                <NewsAndEventsView
                    experiorFactorTicketsUrl={process.env.NEXT_PUBLIC_EXPERIOR_FACTOR_TICKETS_URL?.trim() ?? null}
                    entrepreneursLoungeRegisterUrl={
                        process.env.NEXT_PUBLIC_ENTREPRENEURS_LOUNGE_REGISTER_URL?.trim() ?? null
                    }
                />
            ),
        });
    }

    if (key === "about-experior/whats-new/record-breakers") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <RecordBreakersView />,
        });
    }

    if (key === "about-experior/whats-new/personal-bonus-qualifiers") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <PersonalBonusQualifiersView />,
        });
    }

    if (key === "about-experior/whats-new/builders-bonus-qualifiers") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <BuildersBonusQualifiersView />,
        });
    }

    if (key === "about-experior/whats-new/leadership") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <LeadershipView />,
        });
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/1-million-hierarchy-club") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <OneMillionHierarchyClubView />,
        });
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/100-grand-agency-club") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <HundredGrandClubView />,
        });
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/200-grand-agency-club") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <TwoHundredGrandClubView />,
        });
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/300-grand-agency-club") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <ThreeHundredGrandClubView />,
        });
    }

    if (key === "about-experior/whats-new/hierarchy-agency-premium-clubs/400-grand-agency-club") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...WHATS_NEW_BACK,
            fallback: <FourHundredGrandClubView />,
        });
    }

    const whatsNewTitle = LEARN_TITLES[key];
    if (whatsNewTitle && key.startsWith("about-experior/whats-new/")) {
        return await renderLearnCmsSubpage({ slug: key, title: whatsNewTitle, backHref: "/agent/learn/about-experior/whats-new", backLabel: "What's New" });
    }

    if (key === "about-experior/contacts") {
        redirect("/agent/learn/about-experior/contacts/experior-contacts");
    }

    if (key === "about-experior/contacts/experior-contacts") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...CONTACTS_MAIN_BACK,
            fallback: <ExperiorContactsView />,
        });
    }

    if (key === "about-experior/contacts/experior-office-branches") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...CONTACTS_MAIN_BACK,
            fallback: (
                <ExperiorOfficeBranchesView
                    embedUrl={process.env.NEXT_PUBLIC_EXPERIOR_OFFICE_BRANCHES_URL?.trim() ?? null}
                />
            ),
        });
    }

    if (key === "about-experior/contacts/provider-contacts") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...CONTACTS_MAIN_BACK,
            fallback: <ProviderContactsView />,
        });
    }

    const contactsTitle = LEARN_TITLES[key];
    if (contactsTitle && key.startsWith("about-experior/contacts/")) {
        return await renderLearnCmsSubpage({ slug: key, title: contactsTitle, backHref: "/agent/learn/about-experior/contacts", backLabel: "Contacts" });
    }

    if (key === "products/life-insurance-products") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: (
                <LifeInsuranceProductsHubView
                    quotingToolsUrl={process.env.NEXT_PUBLIC_LIFE_QUOTING_TOOLS_URL?.trim() ?? null}
                />
            ),
        });
    }

    if (key === "products/health-insurance-products") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: (
                <HealthInsuranceProductsHubView
                    newHealthPartnersUrl={process.env.NEXT_PUBLIC_NEW_HEALTH_PARTNERS_URL?.trim() ?? null}
                    c2gUrl={process.env.NEXT_PUBLIC_C2G_HEALTH_URL?.trim() ?? null}
                />
            ),
        });
    }

    if (key === "products/annuities-quantum") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: (
                <AnnuitiesQuantumView
                    advisorPortalUrl={process.env.NEXT_PUBLIC_QUANTUM_ADVISOR_PORTAL_URL?.trim() ?? null}
                />
            ),
        });
    }

    if (key === "products/global-view-investment-platform") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: (
                <GlobalViewInvestmentPlatformView
                    compensationGridVideoId={process.env.NEXT_PUBLIC_GLOBAL_VIEW_COMPENSATION_VIDEO_ID?.trim() ?? null}
                    trifectaRecruitingVideoId={
                        process.env.NEXT_PUBLIC_GLOBAL_VIEW_TRIFECTA_RECRUITING_VIDEO_ID?.trim() ?? null
                    }
                />
            ),
        });
    }

    if (key === "products/new-insurance-snapview-isv") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <InsuranceSnapViewIsvView />,
        });
    }

    if (key === "products/carriers") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <CarriersHubView />,
        });
    }

    if (key.startsWith("products/carriers/")) {
        const carrierTitle = CARRIER_LEARN_TITLES[key];
        if (carrierTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: carrierTitle, backHref: "/agent/learn/products/carriers", backLabel: "Carriers" });
        }
    }

    if (key === "products/referral-partners") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <ReferralPartnersHubView />,
        });
    }

    if (key.startsWith("products/referral-partners/")) {
        const referralTitle = REFERRAL_PARTNER_LEARN_TITLES[key];
        if (referralTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: referralTitle, backHref: "/agent/learn/products/referral-partners", backLabel: "Referral Partners" });
        }
    }

    if (key === "products/puerto-rico") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <PuertoRicoHubView />,
        });
    }

    if (key.startsWith("products/puerto-rico/")) {
        const prTitle = PUERTO_RICO_LEARN_TITLES[key];
        if (prTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: prTitle, backHref: "/agent/learn/products/puerto-rico", backLabel: "Puerto Rico" });
        }
    }

    if (key === "departments/broker-support") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <BrokerSupportHubView />,
        });
    }

    if (key.startsWith("departments/broker-support/")) {
        const bsTitle = BROKER_SUPPORT_LEARN_TITLES[key];
        if (bsTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: bsTitle, backHref: "/agent/learn/departments/broker-support", backLabel: "Broker Support" });
        }
    }

    if (key === "departments/commissions") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <CommissionsHubView />,
        });
    }

    if (key.startsWith("departments/commissions/")) {
        const commTitle = COMMISSIONS_LEARN_TITLES[key];
        if (commTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: commTitle, backHref: "/agent/learn/departments/commissions", backLabel: "Commissions" });
        }
    }

    if (key === "departments/contracting") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <ContractingHubView />,
        });
    }

    if (key.startsWith("departments/contracting/")) {
        const contractingTitle = CONTRACTING_LEARN_TITLES[key];
        if (contractingTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: contractingTitle, backHref: "/agent/learn/departments/contracting", backLabel: "Contracting" });
        }
    }

    if (key === "departments/compliance") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <ComplianceHubView />,
        });
    }

    if (key.startsWith("departments/compliance/")) {
        const complianceTitle = COMPLIANCE_LEARN_TITLES[key];
        if (complianceTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: complianceTitle, backHref: "/agent/learn/departments/compliance", backLabel: "Compliance" });
        }
    }

    if (key === "departments/marketing") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: (
                <MarketingHubView
                    experiorFactorTicketsUrl={process.env.NEXT_PUBLIC_EXPERIOR_FACTOR_TICKETS_URL?.trim() ?? null}
                    promotionsCompensationGuideUrl={
                        process.env.NEXT_PUBLIC_MARKETING_PROMOTIONS_COMPENSATION_GUIDE_URL?.trim() ?? null
                    }
                    promotionTrackUrl={process.env.NEXT_PUBLIC_MARKETING_PROMOTION_TRACK_URL?.trim() ?? null}
                />
            ),
        });
    }

    if (key === "departments/new-pending-business") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <NewPendingBusinessHubView />,
        });
    }

    if (key.startsWith("departments/new-pending-business/")) {
        const npbTitle = NEW_PENDING_BUSINESS_LEARN_TITLES[key];
        if (npbTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: npbTitle, backHref: "/agent/learn/departments/new-pending-business", backLabel: "New & Pending Business" });
        }
    }

    if (key === "development/releases") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...DEVELOPMENT_BACK,
            fallback: <DevelopmentReleasesView />,
        });
    }

    if (key === "development/coming-soon") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...DEVELOPMENT_BACK,
            fallback: <DevelopmentComingSoonView />,
        });
    }

    if (key === "development/pop-ups") {
        const popups = await listActivePopups();
        return <DevelopmentPopUpsView rows={popups.map(portalContentToPopupRow)} />;
    }

    if (key === "resources/resources") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <ResourcesHubView />,
        });
    }

    if (key.startsWith("resources/resources/")) {
        const resTitle = RESOURCES_HUB_LEARN_TITLES[key];
        if (resTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: resTitle, backHref: "/agent/learn/resources/resources", backLabel: "Resources" });
        }
    }

    if (key === "resources/forms") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <FormsHubView />,
        });
    }

    if (key.startsWith("resources/forms/")) {
        const formsTitle = FORMS_LEARN_TITLES[key];
        if (formsTitle) {
            return await renderLearnCmsSubpage({ slug: key, title: formsTitle, backHref: "/agent/learn/resources/forms", backLabel: "Forms" });
        }
    }

    if (key === "resources/my-crm") {
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <MyCrmView crmUrl={process.env.NEXT_PUBLIC_EXPERIOR_CRM_URL?.trim() ?? null} />,
        });
    }

    if (key === "resources/experior-connect-workvivo") {
        const workvivoUrl =
            process.env.NEXT_PUBLIC_EXPERIOR_WORKVIVO_URL?.trim() || DEFAULT_EXPERIOR_WORKVIVO_LOGIN_URL;
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: <ExperiorConnectWorkvivoView loginUrl={workvivoUrl} />,
        });
    }

    if (key === "resources/experior-connect-workvivo-getting-started") {
        const desktopLoginUrl =
            process.env.NEXT_PUBLIC_EXPERIOR_WORKVIVO_URL?.trim() || DEFAULT_EXPERIOR_WORKVIVO_LOGIN_URL;
        const iosAppUrl = process.env.NEXT_PUBLIC_EXPERIOR_WORKVIVO_IOS_URL?.trim() || DEFAULT_WORKVIVO_IOS_APP_URL;
        const androidAppUrl =
            process.env.NEXT_PUBLIC_EXPERIOR_WORKVIVO_ANDROID_URL?.trim() || DEFAULT_WORKVIVO_ANDROID_APP_URL;
        const dashboardImageSrc = process.env.NEXT_PUBLIC_WORKVIVO_DASHBOARD_IMAGE_SRC?.trim() ?? null;
        const profileTutorialYoutubeId = process.env.NEXT_PUBLIC_WORKVIVO_PROFILE_TUTORIAL_YOUTUBE_ID?.trim() ?? null;
        const createPostTutorialYoutubeId =
            process.env.NEXT_PUBLIC_WORKVIVO_CREATE_POST_TUTORIAL_YOUTUBE_ID?.trim() ?? null;
        return await renderLearnCmsSubpage({
            slug: key,
            title: LEARN_TITLES[key],
            ...LEARN_ROOT_BACK,
            fallback: (
                <ExperiorConnectWorkvivoGettingStartedView
                    desktopLoginUrl={desktopLoginUrl}
                    iosAppUrl={iosAppUrl}
                    androidAppUrl={androidAppUrl}
                    dashboardImageSrc={dashboardImageSrc}
                    profileTutorialYoutubeId={profileTutorialYoutubeId}
                    createPostTutorialYoutubeId={createPostTutorialYoutubeId}
                />
            ),
        });
    }

    const cmsContent = await getPortalContentBySlug(key);
    if (cmsContent) {
        return <PortalContentView content={cmsContent} backHref="/agent/learn" backLabel="Learn" />;
    }

    const title = LEARN_TITLES[key] ?? toTitleCaseFromSlug(slug[slug.length - 1] ?? "Learn");

    return await renderLearnCmsSubpage({
        slug: key,
        title,
        ...LEARN_ROOT_BACK,
    });
}

