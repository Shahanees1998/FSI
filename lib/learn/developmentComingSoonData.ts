/** Upcoming work items for Learn → Development → Coming Soon. */

export type ComingSoonRow = {
    task: string;
    bullets: string[];
};

export const COMING_SOON_FOOTER =
    "And so much more…. This gives you a sneak peak into what we are working on for you and your team!";

export const COMING_SOON_ROWS: ComingSoonRow[] = [
    {
        task: "Trip contest scoreboard",
        bullets: [
            "Highlights standings and winners for the Superior Trip and related travel contests.",
            "Designed so recruiters can celebrate momentum without leaving the main platform.",
        ],
    },
    {
        task: "Pre-contracting questionnaire",
        bullets: [
            "New U.S. platform flow to pre-fill carrier contract applications before you enter contracting.",
            "Reduces duplicate data entry between CRM, questionnaires, and carrier portals.",
        ],
    },
    {
        task: "Legacy qualifications",
        bullets: [
            "Dedicated page under the Promotions tab to track progress toward Legacy status.",
            "Surfaces milestones, documentation checkpoints, and countdown-style eligibility windows.",
        ],
    },
    {
        task: "Two-step authentication",
        bullets: [
            "Adds 2FA via mobile numbers for sensitive back-office actions.",
            "Aligns agent security posture with enterprise standards for financial platforms.",
        ],
    },
    {
        task: "Policy feeds",
        bullets: [
            "Automatic population of carrier policy feeds into the back office as carriers publish updates.",
            "Supports faster case reconciliation without manual CSV uploads where APIs exist.",
        ],
    },
    {
        task: "Additional documents under pre-contracting",
        bullets: [
            "Upload slots for annuity, best-interest, and CE certificates where carriers require them.",
            "Planned API hooks with Slicon and NIPR so validations can run before submission.",
        ],
    },
    {
        task: "Integrations with third parties",
        bullets: [
            "Automatic data transfer between the platform and trusted vendors (for example NIPR database refresh).",
            "Fewer swivel-chair updates when licenses or appointments change upstream.",
        ],
    },
    {
        task: "Office address — new functionality",
        bullets: [
            "New format for choosing office addresses: public, private, upline, or downline visibility.",
            "Keeps marketing and compliance aligned on which address surfaces on consumer materials.",
        ],
    },
    {
        task: "Entrepreneurs Lounge scoreboard",
        bullets: [
            "Scoreboard for qualifiers with integrated registration for invite-only sessions.",
            "Helps leadership see who still needs to complete prerequisites before each lounge.",
        ],
    },
    {
        task: "Ticket revamp",
        bullets: [
            "Redesign of the ticketing system with tagging for COs and richer system notifications.",
            "Aims to shorten time-to-resolution through smarter routing and templates.",
        ],
    },
    {
        task: "Corporate contracting",
        bullets: [
            "Section for agents operating as corporations to upload entity docs and apply for corporate contracts.",
            "Mirrors the individual flow but with additional KYC and beneficial-owner prompts.",
        ],
    },
    {
        task: "E-certificate upload for NBTs",
        bullets: [
            "New field when creating a New Business Transaction to attach carrier-issued e-certificates.",
            "Speeds up pend resolution when carriers ask for proof before issuing the policy number.",
        ],
    },
    {
        task: "Additional documents for NBTs",
        bullets: [
            "Optional uploads for extra carrier-specific paperwork during NBT creation.",
            "Keeps everything versioned with the case instead of scattered email attachments.",
        ],
    },
];
