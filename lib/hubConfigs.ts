import { WorkspaceRecordType } from "@prisma/client";
import { HubSection } from "@/components/portal/PortalHubView";

export const MY_BUSINESS_HUB_SECTIONS: Omit<HubSection, "count">[] = [
  { href: "/agent/my-business/insurance", title: "Insurance", description: "Life and health insurance policies.", icon: "pi pi-shield" },
  { href: "/agent/my-business/annuities", title: "Annuities", description: "Annuity business and premiums.", icon: "pi pi-chart-line" },
  { href: "/agent/my-business/trail", title: "Trail", description: "Trail commission activity.", icon: "pi pi-sync" },
  { href: "/agent/my-business/renewals", title: "Renewals", description: "Policy renewals tracking.", icon: "pi pi-refresh" },
  { href: "/agent/my-business/group", title: "Group", description: "Group business records.", icon: "pi pi-users" },
  { href: "/agent/my-business/health-dental", title: "Health & Dental", description: "Health and dental products.", icon: "pi pi-heart" },
  { href: "/agent/my-business/unlicensed", title: "Unlicensed", description: "Unlicensed agent business.", icon: "pi pi-exclamation-triangle" },
  { href: "/agent/my-business/additional-commission", title: "Additional commission", description: "Extra commission entries.", icon: "pi pi-dollar" },
  { href: "/agent/my-business/documents-manager", title: "Documents manager", description: "Uploaded documents.", icon: "pi pi-folder" },
  { href: "/agent/my-business/new-business-transmittals", title: "New business transmittals", description: "NBT submissions.", icon: "pi pi-send" },
];

export const MY_BUSINESS_RECORD_TYPES: WorkspaceRecordType[] = [
  "INSURANCE", "ANNUITIES", "TRAIL", "RENEWALS", "GROUP", "HEALTH_DENTAL", "UNLICENSED", "ADDITIONAL_COMMISSION", "DOCUMENT", "NEW_BUSINESS_TRANSMITTAL",
];

export const REPORTS_HUB_SECTIONS: Omit<HubSection, "count">[] = [
  { href: "/agent/reports/paid", title: "Paid reports", description: "Paid commission statements.", icon: "pi pi-check-circle" },
  { href: "/agent/reports/pending", title: "Pending reports", description: "Pending commission activity.", icon: "pi pi-clock" },
  { href: "/agent/reports/debts", title: "Debts", description: "Outstanding balances.", icon: "pi pi-wallet" },
  { href: "/agent/reports/roll-ups", title: "Roll-ups", description: "Roll-up commissions.", icon: "pi pi-sort-amount-up" },
  { href: "/agent/reports/potential-roll-ups", title: "Potential roll-ups", description: "Projected roll-up opportunities.", icon: "pi pi-chart-bar" },
  { href: "/agent/reports/escrow-account", title: "Escrow account", description: "Escrow ledger transactions.", icon: "pi pi-briefcase" },
];

export const REPORTS_RECORD_TYPES: WorkspaceRecordType[] = [
  "REPORT_PAID", "REPORT_PENDING", "REPORT_DEBT", "REPORT_ROLLUP", "REPORT_POTENTIAL_ROLLUP", "REPORT_ESCROW",
];

export const SCOREBOARD_HUB_SECTIONS: Omit<HubSection, "count">[] = [
  { href: "/agent/scoreboard/personal", title: "Personal scoreboard", description: "Your production metrics.", icon: "pi pi-user" },
  { href: "/agent/scoreboard/company", title: "Company scoreboard", description: "Company-wide leaderboard.", icon: "pi pi-building" },
  { href: "/agent/scoreboard/training", title: "Training", description: "Scoreboard training resources.", icon: "pi pi-video" },
  { href: "/agent/scoreboard/settled-investments-faq", title: "Settled investments FAQ", description: "FAQ for settled investments.", icon: "pi pi-question-circle" },
];

export const SCOREBOARD_RECORD_TYPES: WorkspaceRecordType[] = ["SCOREBOARD_PERSONAL", "SCOREBOARD_COMPANY"];

export const TEAM_HUB_SECTIONS: Omit<HubSection, "count">[] = [
  { href: "/agent/team/agreements", title: "Agreements", description: "Team member agreements.", icon: "pi pi-file-edit" },
  { href: "/agent/team/invites", title: "Invites", description: "Outstanding recruiting invitations.", icon: "pi pi-send" },
  { href: "/agent/team/invitees", title: "Invitees", description: "All recruiting prospects.", icon: "pi pi-user-plus" },
  { href: "/agent/team/promotion", title: "Promotion", description: "Promotion tracking.", icon: "pi pi-star" },
  { href: "/agent/team/reassigned-clients", title: "Reassigned clients", description: "Client reassignments.", icon: "pi pi-arrow-right-arrow-left" },
  { href: "/agent/team/visual-network", title: "Visual network", description: "Org hierarchy visualization.", icon: "pi pi-sitemap" },
  { href: "/agent/team/recruiting", title: "Recruiting", description: "Recruiting tools and media.", icon: "pi pi-megaphone" },
];

export const TEAM_RECORD_TYPES: WorkspaceRecordType[] = [
  "TEAM_AGREEMENT", "TEAM_INVITEE", "TEAM_PROMOTION", "TEAM_REASSIGNED_CLIENT",
];

export const LEARN_HUB_SECTIONS: Omit<HubSection, "count">[] = [
  { href: "/agent/learn/about-experior/getting-started/getting-started-with-experior-checklist-licensed", title: "Getting started", description: "Licensed agent onboarding checklist.", icon: "pi pi-flag" },
  { href: "/agent/learn/about-experior/training/us-power-hour-recordings", title: "Training", description: "Webinars, podcasts, and tutorials.", icon: "pi pi-video" },
  { href: "/agent/learn/products/carriers", title: "Products & carriers", description: "Carrier and product resources.", icon: "pi pi-box" },
  { href: "/agent/learn/departments/contracting", title: "Departments", description: "Contracting, compliance, commissions.", icon: "pi pi-building" },
  { href: "/agent/learn/resources/forms", title: "Forms & resources", description: "Forms, CRM, and tools.", icon: "pi pi-file" },
  { href: "/agent/learn/development/pop-ups", title: "Pop-ups", description: "Portal announcements.", icon: "pi pi-bell" },
];

export const NEW_AGENTS_HUB_SECTIONS: Omit<HubSection, "count">[] = [
  { href: "/agent/new-agents/getting-started", title: "Getting started", description: "Welcome and benefits overview.", icon: "pi pi-flag" },
  { href: "/agent/new-agents/get-licensed", title: "Get licensed", description: "Licensing steps and requirements.", icon: "pi pi-id-card" },
  { href: "/agent/new-agents/ready-to-sell", title: "Ready to sell", description: "Product training and appointment prep.", icon: "pi pi-check-circle" },
  { href: "/agent/new-agents/run-your-business", title: "Run your business", description: "Systems, CRM, and daily operations.", icon: "pi pi-briefcase" },
  { href: "/agent/new-agents/spanish-tutorials", title: "Spanish tutorials", description: "Onboarding videos in Spanish.", icon: "pi pi-video" },
];

export const RECRUITING_HUB_SECTIONS: Omit<HubSection, "count">[] = [
  { href: "/agent/team/recruiting/aoa-online-sign-up", title: "AOA online sign up", description: "Submit new associate applications.", icon: "pi pi-pencil" },
  { href: "/agent/team/recruiting/aoa-pdf-viewing-only", title: "AOA PDF viewing", description: "AOA PDF documents.", icon: "pi pi-file-pdf" },
  { href: "/agent/team/recruiting/new-associates", title: "New associates", description: "New associate resources.", icon: "pi pi-users" },
  { href: "/agent/team/recruiting/ed-ownership-program", title: "ED ownership program", description: "Executive director ownership path.", icon: "pi pi-briefcase" },
  { href: "/agent/team/recruiting/compound-recruiting", title: "Compound recruiting", description: "Compound recruiting program.", icon: "pi pi-share-alt" },
  { href: "/agent/team/recruiting/graphics", title: "Graphics", description: "Marketing graphics and templates.", icon: "pi pi-image" },
  { href: "/agent/team/recruiting/beam", title: "BEAM", description: "BEAM recruiting resources.", icon: "pi pi-book" },
  { href: "/agent/team/recruiting/usa-recruiting-video", title: "USA recruiting video", description: "Corporate recruiting video.", icon: "pi pi-youtube" },
  { href: "/agent/team/recruiting/the-imo-of-the-future", title: "The IMO of the future", description: "IMO vision and positioning.", icon: "pi pi-chart-line" },
];

export function attachCounts(
  sections: Omit<HubSection, "count">[],
  counts: Record<string, number>,
  typeByHref: Record<string, WorkspaceRecordType>
): HubSection[] {
  return sections.map((section) => ({
    ...section,
    count: counts[typeByHref[section.href]] ?? 0,
  }));
}

export const MY_BUSINESS_TYPE_BY_HREF: Record<string, WorkspaceRecordType> = {
  "/agent/my-business/insurance": "INSURANCE",
  "/agent/my-business/annuities": "ANNUITIES",
  "/agent/my-business/trail": "TRAIL",
  "/agent/my-business/renewals": "RENEWALS",
  "/agent/my-business/group": "GROUP",
  "/agent/my-business/health-dental": "HEALTH_DENTAL",
  "/agent/my-business/unlicensed": "UNLICENSED",
  "/agent/my-business/additional-commission": "ADDITIONAL_COMMISSION",
  "/agent/my-business/documents-manager": "DOCUMENT",
  "/agent/my-business/new-business-transmittals": "NEW_BUSINESS_TRANSMITTAL",
};

export const REPORTS_TYPE_BY_HREF: Record<string, WorkspaceRecordType> = {
  "/agent/reports/paid": "REPORT_PAID",
  "/agent/reports/pending": "REPORT_PENDING",
  "/agent/reports/debts": "REPORT_DEBT",
  "/agent/reports/roll-ups": "REPORT_ROLLUP",
  "/agent/reports/potential-roll-ups": "REPORT_POTENTIAL_ROLLUP",
  "/agent/reports/escrow-account": "REPORT_ESCROW",
};

export const SCOREBOARD_TYPE_BY_HREF: Record<string, WorkspaceRecordType> = {
  "/agent/scoreboard/personal": "SCOREBOARD_PERSONAL",
  "/agent/scoreboard/company": "SCOREBOARD_COMPANY",
};

export const TEAM_TYPE_BY_HREF: Record<string, WorkspaceRecordType> = {
  "/agent/team/agreements": "TEAM_AGREEMENT",
  "/agent/team/invites": "TEAM_INVITEE",
  "/agent/team/invitees": "TEAM_INVITEE",
  "/agent/team/promotion": "TEAM_PROMOTION",
  "/agent/team/reassigned-clients": "TEAM_REASSIGNED_CLIENT",
};
