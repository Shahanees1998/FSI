import { PortalContentCategory } from "@prisma/client";
import { BROKER_SUPPORT_LEARN_TITLES } from "@/lib/learn/departmentsBrokerSupportNav";
import { COMMISSIONS_LEARN_TITLES } from "@/lib/learn/departmentsCommissionsNav";
import { COMPLIANCE_LEARN_TITLES } from "@/lib/learn/departmentsComplianceNav";
import { CONTRACTING_LEARN_TITLES } from "@/lib/learn/departmentsContractingNav";
import { NEW_PENDING_BUSINESS_LEARN_TITLES } from "@/lib/learn/departmentsNewPendingBusinessNav";
import { CARRIER_LEARN_TITLES } from "@/lib/learn/carriersNav";
import { PUERTO_RICO_LEARN_TITLES } from "@/lib/learn/puertoRicoNav";
import { REFERRAL_PARTNER_LEARN_TITLES } from "@/lib/learn/referralPartnersNav";
import { FORMS_LEARN_TITLES } from "@/lib/learn/resourcesFormsNav";
import { RESOURCES_HUB_LEARN_TITLES } from "@/lib/learn/resourcesHubNav";

const TRAINING_SLUGS: Record<string, string> = {
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
};

const GETTING_STARTED_SLUGS: Record<string, string> = {
  "about-experior/getting-started/usa-onboarding-process": "USA Onboarding Process",
  "about-experior/getting-started/register-for-the-online-course": "Register for the Online Course",
  "about-experior/getting-started/errors-and-omissions-insurance": "Errors and Omissions Insurance",
  "about-experior/getting-started/getting-started-with-experior-checklist-unlicensed":
    "Getting Started With Experior Checklist - Unlicensed",
  "about-experior/getting-started/getting-started-with-experior-checklist-licensed":
    "Getting Started With Experior Checklist - Licensed",
  "about-experior/getting-started/submit-your-license-application": "Submit Your License Application",
  "about-experior/getting-started/mandatory-documents": "Mandatory Documents",
  "about-experior/getting-started/getting-appointed": "Getting Appointed",
  "about-experior/getting-started/contracting-faq": "Contracting FAQ",
  "about-experior/getting-started/keep-your-license-up-to-date-with-nipr":
    "Keep your License up to date with NIPR",
  "about-experior/getting-started/ce-credits-providers": "CE Credits Providers",
  "about-experior/getting-started/tutorials-in-spanish": "Tutorials in Spanish",
  "about-experior/getting-started/back-office-fees": "Back Office Fees",
};

const WHATS_NEW_SLUGS: Record<string, string> = {
  "about-experior/whats-new/agent-promotions": "Agent Promotions",
  "about-experior/whats-new/experior-events": "Experior Events",
  "about-experior/whats-new/news-events": "News & Events",
  "about-experior/whats-new/record-breakers": "Record Breakers",
  "about-experior/whats-new/personal-bonus-qualifiers": "Personal Bonus Qualifiers",
  "about-experior/whats-new/builders-bonus-qualifiers": "Builders Bonus Qualifiers",
  "about-experior/whats-new/leadership": "Leadership",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/1-million-hierarchy-club": "1 Million Hierarchy Club",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/100-grand-agency-club": "100 Grand Agency Club",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/200-grand-agency-club": "200 Grand Agency Club",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/300-grand-agency-club": "300 Grand Agency Club",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/400-grand-agency-club": "400 Grand Agency Club",
};

const CONTACTS_SLUGS: Record<string, string> = {
  "about-experior/contacts/regional-offices": "Regional Offices",
};

const RECRUITING_SLUGS: Record<string, string> = {
  "recruiting/beam": "BEAM",
  "recruiting/new-associates": "New Associates",
  "recruiting/graphics": "Graphics",
  "recruiting/aoa-pdf-viewing-only": "AOA PDF Viewing",
  "recruiting/usa-recruiting-video": "USA Recruiting Video",
  "recruiting/the-imo-of-the-future": "The IMO of the Future",
  "recruiting/compound-recruiting": "Compound Recruiting",
  "recruiting/ed-ownership-program": "ED Ownership Program",
  "recruiting/aoa-online-sign-up": "AOA (Online Sign Up)",
  "recruiting/cfrb-newstalk-1010-interview-ceo-jamie-prickett":
    "CFRB Newstalk 1010 Interview with CEO, Jamie Prickett",
  "recruiting/why-choose-experior-corporate-video": "Why Choose Experior Corporate Video",
  "recruiting/why-choose-experior-spanish-subtitles": "Why Choose Experior | Spanish Subtitles",
};

const NEW_AGENT_SLUGS: Record<string, string> = {
  "new-agents/getting-started": "Getting Started",
  "new-agents/get-licensed": "Get Licensed",
  "new-agents/ready-to-sell": "Ready To Sell",
  "new-agents/run-your-business": "Run Your Business",
  "new-agents/spanish-tutorials": "Spanish Tutorials",
};

const SCOREBOARD_SLUGS: Record<string, string> = {
  "scoreboard/training": "Scoreboard Training",
};

const EXTRA_LEARN_SLUGS: Record<string, string> = {
  "about-experior/purchase-leads": "Purchase Leads",
  "about-experior/lead-training-guides": "Lead Training Guides",
  "about-experior/contests": "Contests",
  "about-experior/contests/desert-oasis-2027": "Desert Oasis Contest 2027",
  "about-experior/experior-schedule/upcoming-meetings": "Upcoming Meetings",
  "about-experior/experior-schedule/event-calendar": "Event Calendar",
  "about-experior/contacts/experior-contacts": "Experior Contacts",
  "about-experior/contacts/experior-office-branches": "Experior Office Branches",
  "about-experior/contacts/provider-contacts": "Provider Contacts",
  "products/life-insurance-products": "Life Insurance Products",
  "products/health-insurance-products": "Health Insurance Products",
  "products/annuities-quantum": "Annuities — Quantum",
  "products/global-view-investment-platform": "Global View Investment Platform",
  "products/new-insurance-snapview-isv": "New Insurance SnapView ISV",
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
  "resources/resources": "Resources",
  "resources/forms": "Forms",
  "resources/my-crm": "My CRM",
  "resources/experior-connect-workvivo": "Experior Connect - Workvivo",
  "resources/experior-connect-workvivo-getting-started": "Experior Connect - Workvivo Getting Started",
};

function categoryForSlug(slug: string): PortalContentCategory {
  if (slug.startsWith("recruiting/")) return "RECRUITING";
  if (slug.startsWith("new-agents/")) return "NEW_AGENT";
  if (slug.startsWith("scoreboard/")) return "TRAINING";
  if (slug.startsWith("about-experior/training/")) return "TRAINING";
  if (slug.includes("faq") || slug.includes("FAQ")) return "FAQ";
  return "LEARN";
}

export function portalContentDefaultBody(title: string, slug: string) {
  if (slug === "departments/compliance/compliance-violation-incident-report-form") {
    return `${title}: report compliance violations or incidents through Support Tickets (/agent/tickets) or follow the internal compliance process from head office. Admins can replace this page with a form link or PDF in Portal Content.`;
  }
  if (slug.includes("new-pending-business") || slug.includes("nbt")) {
    return `${title} procedures, forms, and training for new business transactions. Use My Business → New business transmittals (/agent/my-business/new-business-transmittals) for submissions. Admins can publish detailed steps here (slug: ${slug}).`;
  }
  if (slug.startsWith("resources/forms/")) {
    return `${title} forms and instructions for agents. Download the latest PDF from head office or check Portal Content updates. Slug: ${slug}.`;
  }
  return `${title} resources are available in the portal. This page is managed through the admin Portal Content manager (slug: ${slug}). Contact your upline or head office for the latest carrier-specific details.`;
}

/** Pages with dedicated React UI fallbacks stay unpublished so CMS does not override them. */
const RICH_FALLBACK_EXACT_SLUGS = new Set([
  "about-experior/purchase-leads",
  "about-experior/lead-training-guides",
  "about-experior/contests",
  "about-experior/contests/desert-oasis-2027",
  "about-experior/experior-schedule/upcoming-meetings",
  "about-experior/experior-schedule/event-calendar",
  "about-experior/contacts/experior-contacts",
  "about-experior/contacts/experior-office-branches",
  "about-experior/contacts/provider-contacts",
  "about-experior/whats-new/experior-events",
  "about-experior/whats-new/news-events",
  "about-experior/whats-new/record-breakers",
  "about-experior/whats-new/personal-bonus-qualifiers",
  "about-experior/whats-new/builders-bonus-qualifiers",
  "about-experior/whats-new/leadership",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/1-million-hierarchy-club",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/100-grand-agency-club",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/200-grand-agency-club",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/300-grand-agency-club",
  "about-experior/whats-new/hierarchy-agency-premium-clubs/400-grand-agency-club",
  "products/life-insurance-products",
  "products/health-insurance-products",
  "products/annuities-quantum",
  "products/global-view-investment-platform",
  "products/new-insurance-snapview-isv",
  "products/carriers",
  "products/referral-partners",
  "products/puerto-rico",
  "departments/broker-support",
  "departments/commissions",
  "departments/contracting",
  "departments/compliance",
  "departments/marketing",
  "departments/new-pending-business",
  "development/releases",
  "development/coming-soon",
  "resources/resources",
  "resources/forms",
  "resources/my-crm",
  "resources/experior-connect-workvivo",
  "resources/experior-connect-workvivo-getting-started",
  "scoreboard/training",
  "scoreboard/settled-investments-faq",
  "recruiting/beam",
  "recruiting/new-associates",
  "recruiting/graphics",
  "recruiting/aoa-pdf-viewing-only",
  "recruiting/usa-recruiting-video",
  "recruiting/the-imo-of-the-future",
  "recruiting/compound-recruiting",
  "recruiting/ed-ownership-program",
  "recruiting/aoa-online-sign-up",
]);

const RICH_FALLBACK_PREFIXES = ["about-experior/getting-started/", "new-agents/"];

function isRichFallbackSlug(slug: string) {
  if (RICH_FALLBACK_EXACT_SLUGS.has(slug)) return true;
  return RICH_FALLBACK_PREFIXES.some((prefix) => slug.startsWith(prefix));
}

export function buildPortalContentSeedData(createdById: string) {
  const slugTitleMap: Record<string, string> = {
    ...CARRIER_LEARN_TITLES,
    ...REFERRAL_PARTNER_LEARN_TITLES,
    ...PUERTO_RICO_LEARN_TITLES,
    ...BROKER_SUPPORT_LEARN_TITLES,
    ...COMMISSIONS_LEARN_TITLES,
    ...CONTRACTING_LEARN_TITLES,
    ...COMPLIANCE_LEARN_TITLES,
    ...NEW_PENDING_BUSINESS_LEARN_TITLES,
    ...FORMS_LEARN_TITLES,
    ...RESOURCES_HUB_LEARN_TITLES,
    ...TRAINING_SLUGS,
    ...GETTING_STARTED_SLUGS,
    ...WHATS_NEW_SLUGS,
    ...EXTRA_LEARN_SLUGS,
    ...CONTACTS_SLUGS,
    ...RECRUITING_SLUGS,
    ...NEW_AGENT_SLUGS,
    ...SCOREBOARD_SLUGS,
    "about-experior/hpn-university": "HPN University",
    "scoreboard/settled-investments-faq": "Settled Investments FAQ",
  };

  return Object.entries(slugTitleMap).map(([slug, title]) => {
    const richFallback = isRichFallbackSlug(slug);
    const redirectOnly =
      slug === "recruiting/cfrb-newstalk-1010-interview-ceo-jamie-prickett" ||
      slug === "recruiting/why-choose-experior-corporate-video" ||
      slug === "recruiting/why-choose-experior-spanish-subtitles";

    return {
    slug,
    category: categoryForSlug(slug),
    title,
    body: redirectOnly ? null : portalContentDefaultBody(title, slug),
    published: !richFallback,
    publishedAt: richFallback ? null : new Date(),
    createdById,
    ...(slug === "recruiting/beam"
      ? {
          metadata: {
            documents: [
              { title: "BEAM — Program overview", pdfUrl: "/documents/beam-document-1.pdf" },
              { title: "BEAM — Training checklist", pdfUrl: "/documents/beam-document-2.pdf" },
            ],
          },
        }
      : {}),
    ...(slug === "recruiting/new-associates"
      ? { pdfUrl: "/documents/new-associates-dummy.pdf" }
      : {}),
    ...(slug === "recruiting/cfrb-newstalk-1010-interview-ceo-jamie-prickett"
      ? { body: null, externalUrl: "https://www.newstalk1010.com/audio.html", published: true, publishedAt: new Date() }
      : {}),
    ...(slug === "recruiting/why-choose-experior-corporate-video"
      ? { body: null, externalUrl: "https://www.youtube.com/watch?v=zOXvHy9kPfw", published: true, publishedAt: new Date() }
      : {}),
    ...(slug === "recruiting/why-choose-experior-spanish-subtitles"
      ? { body: null, externalUrl: "https://www.youtube.com/watch?v=SoGwY1KqDBc", published: true, publishedAt: new Date() }
      : {}),
  };
  });
}
