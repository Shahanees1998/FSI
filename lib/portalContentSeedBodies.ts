const GRAPHICS_DRIVE_URL =
  "https://drive.google.com/drive/folders/1YZU2njyWnEOMkMAD3ksB1wbCAN6EtDr?usp=sharing";
const CANVA_URL = "https://www.canva.com/";

/** Slug-specific portal content bodies (admin CMS / seed script). */
export const PORTAL_CONTENT_BODY_OVERRIDES: Record<string, string | null> = {
  "recruiting/graphics": [
    "Social media graphics for recruiting and team building.",
    "",
    "How to access and customize graphics:",
    "",
    "1. Download graphics",
    `Use the Google Drive folder to view and download files: ${GRAPHICS_DRIVE_URL}`,
    "",
    "2. Available versions",
    "Topics include recruiting, promotions, and Spanish-language versions where noted in the folder.",
    "",
    "3. Customize with Canva",
    `Edit or create your own designs at ${CANVA_URL}`,
    "",
    "Share approved graphics with prospects and on your social channels.",
  ].join("\n"),
  "recruiting/usa-recruiting-video": [
    "USA recruiting overview video for sharing with prospective associates.",
    "",
    "Use this recording in one-on-one meetings, virtual info sessions, and follow-up emails.",
    "Pair it with AOA online sign up and your upline recruiting checklist.",
  ].join("\n"),
  "recruiting/the-imo-of-the-future": [
    "Overview of the IMO of the Future positioning and recruiting message.",
    "",
    "Share with prospects who want to understand the agency model, support systems, and long-term ownership path.",
    "Contact your upline for localized talking points and compliance-approved language.",
  ].join("\n"),
  "recruiting/aoa-online-sign-up": [
    "Associate Online Application (AOA) — online sign up.",
    "",
    "Send new prospects to the AOA online sign up flow from Team → Recruiting.",
    "Confirm all required fields and documents before submission.",
    "Your upline receives notification when an application is started or completed.",
  ].join("\n"),
  "recruiting/aoa-pdf-viewing-only": [
    "AOA PDF for viewing and printing when online sign up is not used.",
    "",
    "Download the current AOA PDF, review with your prospect, and follow internal submission instructions from head office.",
  ].join("\n"),
  "recruiting/beam": [
    "BEAM program resources for recruiting and associate development.",
    "",
    "Download the program PDFs linked on this page.",
    "Review materials with prospects before scheduling follow-up meetings.",
  ].join("\n"),
  "recruiting/new-associates": [
    "New associate onboarding resources.",
    "",
    "Share the linked PDF with newly signed associates.",
    "Walk through licensing, contracting, and first-90-days expectations with your upline.",
  ].join("\n"),
  "about-experior/contacts/regional-offices": [
    "Regional office locations and local support contacts.",
    "",
    "Use this directory for in-market meetings, training events, and regional questions.",
    "Confirm office hours before visiting.",
  ].join("\n"),
  "about-experior/hpn-university": [
    "HPN University training and certification resources.",
    "",
    "Complete assigned modules in order.",
    "Track progress with your upline and apply lessons to daily prospecting activity.",
  ].join("\n"),
  "about-experior/whats-new/agent-promotions": [
    "Current agent promotion announcements and qualification notes.",
    "",
    "Promotion lists refresh on head office schedules.",
    "Compare against your scoreboard and commission reports before celebrating with your team.",
  ].join("\n"),
  "departments/compliance/compliance-violation-incident-report-form": [
    "Compliance violation and incident reporting.",
    "",
    "Report violations or incidents through My Tickets (/agent/tickets) or the internal compliance process from head office.",
    "Include dates, parties involved, and supporting documentation when available.",
  ].join("\n"),
};

export const PORTAL_CONTENT_VIDEO_OVERRIDES: Record<string, string> = {
  "recruiting/usa-recruiting-video": "zOXvHy9kPfw",
};

export const PORTAL_CONTENT_PDF_OVERRIDES: Record<string, string> = {
  "recruiting/aoa-pdf-viewing-only": "/documents/new-associates-dummy.pdf",
};

function lines(...parts: string[]) {
  return parts.filter(Boolean).join("\n");
}

/** Rich seed/admin body copy — replaces generic “managed by admin” placeholders. */
export function portalContentSeedBody(title: string, slug: string): string | null {
  if (Object.prototype.hasOwnProperty.call(PORTAL_CONTENT_BODY_OVERRIDES, slug)) {
    return PORTAL_CONTENT_BODY_OVERRIDES[slug] ?? null;
  }

  if (slug.includes("new-pending-business") || slug.includes("nbt")) {
    return lines(
      `${title} — procedures, forms, and training for new business transactions.`,
      "",
      "• Submit new business through My Business → New business transmittals",
      "• Reconcile pending items against carrier confirmations",
      "• Open /agent/tickets for stuck or rejected submissions",
    );
  }

  if (slug.startsWith("products/carriers/")) {
    return lines(
      `${title} — carrier product and appointment resources.`,
      "",
      "• Confirm contracting before submitting new business",
      "• Use carrier portals for the latest brochures and rate sheets",
      "• Contact Contracting or Broker Support for appointment issues",
      "• Open /agent/tickets for commission or pending-report questions",
    );
  }

  if (slug.startsWith("about-experior/training/")) {
    return lines(
      `${title} — training session materials and replays.`,
      "",
      "• Watch the recording when a video is attached to this page",
      "• Check the training calendar for upcoming live sessions",
      "• Share questions with your upline or head office training team",
    );
  }

  if (slug.startsWith("resources/forms/")) {
    return lines(
      `${title} — forms and submission instructions.`,
      "",
      "• Download the latest PDF from head office or your upline",
      "• ED-only forms require executive director access",
      "• Follow compliance guidance before submitting sensitive requests",
    );
  }

  if (slug.startsWith("departments/")) {
    return lines(
      `${title} — department resources and contacts.`,
      "",
      "• Review guides on this page before opening a ticket",
      "• Use /agent/tickets for case-specific questions",
      "• Allow standard processing time on business days",
    );
  }

  if (slug.startsWith("recruiting/")) {
    return lines(
      `${title} — recruiting tools and reference material.`,
      "",
      "• Share with qualified prospects only",
      "• Pair with AOA sign up and upline recruiting scripts",
      "• Use approved compliance language in all markets",
    );
  }

  if (slug.startsWith("about-experior/whats-new/")) {
    return lines(
      `${title} — announcements and qualification updates.`,
      "",
      "• Figures refresh on published head office schedules",
      "• Compare against scoreboard and commission reports",
      "• Ask your upline before communicating changes to your team",
    );
  }

  if (slug.startsWith("about-experior/contacts/")) {
    return lines(
      `${title} — directory and contact information.`,
      "",
      "• Use Experior Contacts for head office departments",
      "• Provider contacts list carrier service lines",
      "• Regional pages include local meeting details",
    );
  }

  if (slug.startsWith("new-agents/")) {
    return lines(
      `${title} — new associate onboarding step.`,
      "",
      "• Complete tasks in the order shown in the new agents hub",
      "• Spanish tutorials are available where noted",
      "• Ask your recruiting upline before submitting applications",
    );
  }

  if (slug.startsWith("scoreboard/")) {
    return lines(
      `${title} — scoreboard guidance.`,
      "",
      "• Use Amount Paid when reconciling to commission reports",
      "• Set date range and generation filters before running totals",
      "• See Settled Investments FAQ for roll-up rules",
    );
  }

  if (slug.startsWith("products/")) {
    return lines(
      `${title} — product resources and quoting references.`,
      "",
      "• Confirm carrier appointments before illustrating or submitting",
      "• Use linked tools and external portals where provided",
      "• Contact Broker Support for product-specific questions",
    );
  }

  if (slug.startsWith("resources/")) {
    return lines(
      `${title} — agent resources and tools.`,
      "",
      "• Bookmark this page for quick access during client meetings",
      "• External tools may require separate login credentials",
      "• Notify head office if a link is broken or outdated",
    );
  }

  if (slug.startsWith("development/")) {
    return lines(
      `${title} — platform updates from the development team.`,
      "",
      "• Review release notes for workflow changes",
      "• Report bugs through /agent/tickets with screenshots when possible",
    );
  }

  return lines(
    `${title} — agent reference material.`,
    "",
    "• Maintained by head office administrators",
    "• Contact your upline for market-specific guidance",
    "• Open /agent/tickets if content appears incorrect or outdated",
  );
}

/** Fallback copy when no CMS row exists yet (Learn CMS placeholder pages). */
export function portalContentDefaultBody(title: string, slug: string) {
  return portalContentSeedBody(title, slug);
}
