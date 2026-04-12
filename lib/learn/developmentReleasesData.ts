/** Structured release notes for Learn → Development → Releases (newest first). */

export type ReleaseTask = {
    issueType: string;
    title: string;
    purpose: string;
    /** Bullet lines under Details */
    details: string[];
    summary: string;
    /** Optional alternate label before purpose paragraph */
    purposeHeading?: string;
    detailsHeading?: string;
    summaryHeading?: string;
};

export type ReleaseDaySection = {
    /** e.g. "MARCH 19, 2025" */
    dateLabel: string;
    tasks: ReleaseTask[];
};

export type ReleaseMonthBlock = {
    /** e.g. "MARCH 2025" — shown in gold month ribbon */
    monthBanner: string;
    sections: ReleaseDaySection[];
};

export const RELEASES_MONTH_FOOTER =
    "This release aims to enhance system stability, introduce new features, and resolve existing issues for a smoother user experience. Thank you for your attention and continued efforts!";

export const RELEASE_MONTHS: ReleaseMonthBlock[] = [
    {
        monthBanner: "March 2025",
        sections: [
            {
                dateLabel: "March 19, 2025",
                tasks: [
                    {
                        issueType: "Task",
                        title: "NBT update: Policy number column in NBTs",
                        purpose:
                            "Improve clarity and downstream processing when policy numbers are captured on new business transmittals.",
                        details: [
                            "Adds a dedicated policy number field where carriers and workflows expect it.",
                            "Aligns exports and CRM sync with the policy identifier used in commission reporting.",
                        ],
                        summary: "Agents can record policy numbers consistently on NBTs, reducing rework and support tickets.",
                    },
                    {
                        issueType: "Task",
                        title: "Compliance update: Request form compliance description",
                        purpose: "Give reviewers clearer context when agents submit compliance-related requests.",
                        details: [
                            "Expanded description fields with inline guidance text.",
                            "Validation prompts when mandatory context is missing.",
                        ],
                        summary: "Fewer back-and-forth messages during compliance reviews.",
                    },
                    {
                        issueType: "Task",
                        title: "Contracting update: Alphabetical sorting in My Contracts section",
                        purpose: "Make long carrier lists easier to scan when managing appointments.",
                        details: ["Default sort is alphabetical by carrier display name.", "Preserves filters when returning to the list."],
                        summary: "Faster navigation in My Contracts for high-volume agents.",
                    },
                ],
            },
        ],
    },
    {
        monthBanner: "February 2025",
        sections: [
            {
                dateLabel: "February 12, 2025",
                tasks: [
                    {
                        issueType: "Task",
                        title: "System update: Security improvements",
                        purpose: "Harden authentication, session handling, and sensitive data access paths.",
                        details: [
                            "Stricter session expiry and refresh behavior for agent sessions.",
                            "Additional rate limiting on sensitive API routes.",
                            "Dependency updates for known CVEs in the web stack.",
                        ],
                        summary: "Reduces risk surface across the agent portal without changing day-to-day CRM flows.",
                    },
                    {
                        issueType: "Task",
                        title: "AuguStar contracting flow update",
                        purpose: "Align the AuguStar appointment path with the latest carrier requirements.",
                        details: [
                            "Reordered steps where e-signature is required before carrier submission.",
                            "Clearer error states when required attachments are missing.",
                        ],
                        summary: "Fewer declined packets for AuguStar appointments.",
                    },
                    {
                        issueType: "Task",
                        title: "NBT deal list update: restore missing slider control",
                        purpose: "Fix a UI regression that hid the horizontal scroll range on wide deal tables.",
                        details: ["Slider control restored on viewports under 1200px.", "Keyboard focus order corrected for accessibility."],
                        summary: "Deal lists are usable again on laptops without horizontal page scroll.",
                    },
                    {
                        issueType: "Task",
                        title: "Compliance update: automatic CC on compliance emails",
                        purpose: "Ensure compliance threads retain the right distribution list.",
                        details: ["Adds default CC rules for outbound compliance templates.", "Configurable per region in admin settings."],
                        summary: "Improves traceability on compliance correspondence.",
                    },
                    {
                        issueType: "Task",
                        title: "Vector forms update",
                        purpose: "Publish the latest Vector PDF mappings used in contracting packets.",
                        details: ["Template versions bumped where carrier wording changed.", "Checksum validation on upload to catch corrupt files."],
                        summary: "Agents submit current Vector forms without silent version mismatches.",
                    },
                ],
            },
        ],
    },
    {
        monthBanner: "January 2025",
        sections: [
            {
                dateLabel: "January 29, 2025",
                tasks: [
                    {
                        issueType: "Task",
                        title: "System update: System notifications instead of support tickets for the password reset flow",
                        purpose: "Reduce unnecessary support volume when agents self-serve password resets.",
                        details: [
                            "Password reset confirmations now generate in-app notifications.",
                            "Support ticket auto-creation is disabled for this flow unless the reset fails twice.",
                        ],
                        summary: "Agents get faster feedback while support focuses on higher-severity issues.",
                    },
                ],
            },
            {
                dateLabel: "January 15, 2025",
                tasks: [
                    {
                        issueType: "Task",
                        title: "CRM / NBT update: Synchronize clients when an existing agent joins the CRM",
                        purpose: "Automatically create client cards from historical NBTs when an agent enables CRM for the first time.",
                        details: [
                            "Runs a one-time sync job scoped to NBTs in the last 36 months.",
                            "Applies to agents joining CRM after this release is live.",
                        ],
                        summary: "New CRM users land with a populated book instead of an empty pipeline.",
                    },
                    {
                        issueType: "Task",
                        title: "New sections in the client card: Investment / annuities, health & dental, and travel",
                        purpose: "Extend synchronized deal types so cards reflect the full household relationship.",
                        details: [
                            "USA: annuities, health & dental.",
                            "Canada: investment, health & dental, travel.",
                            "Auto-created cards show an info callout: “This client has been automatically created from your NBT.”",
                        ],
                        summary: "One client record spans more product lines with less duplicate data entry.",
                    },
                    {
                        issueType: "Task",
                        title: "Promotions optimization",
                        purpose: "Improve performance and usability on promotion dashboards under load.",
                        details: [
                            "“All results” page: optimized 50-day eligibility checks.",
                            "Filter data, premium per bonus requirement, qualified SM/ED criteria, and active agents requirement queries batched.",
                            "Smoke and load tests run against staging snapshots.",
                        ],
                        summary: "Promotion season pages stay responsive for large hierarchies.",
                    },
                    {
                        issueType: "Task",
                        title: "Scoreboard update: Hide contest scoreboard",
                        purpose: "Pause public scoreboard display while contest figures are reconciled.",
                        details: [
                            "Temporary banner: “The contest scoreboard is currently unavailable. We're double-checking the numbers to ensure the contest results are accurate and properly reviewed.”",
                            "Admin toggle restores the board when finance signs off.",
                        ],
                        summary: "Prevents incorrect standings from circulating during audit windows.",
                    },
                ],
            },
        ],
    },
    {
        monthBanner: "December 2024",
        sections: [
            {
                dateLabel: "December 2024",
                tasks: [
                    {
                        issueType: "Task",
                        title: "Contracting: Add Vector debit check / authorization form for pre-contracting",
                        purpose: "Require the debit authorization document before certain carriers accept appointments.",
                        details: [
                            "New document in Contracting Documents with 30-day validity.",
                            "“Confirm validity” flow; expired docs block new submissions until renewed.",
                            "Admin approve/decline workflow; surfaced on create/update carrier screens.",
                        ],
                        summary: "Pre-contracting packets stay carrier-compliant with fewer manual follow-ups.",
                    },
                    {
                        issueType: "Task",
                        title: "Search bar adjustment (search by content, not a specific document)",
                        purpose: "Let agents find answers across the platform instead of guessing document titles.",
                        details: [
                            "Content search uses LIKE matching across indexed help and media text.",
                            "Media split into Documents vs. videos with tag-aware matching.",
                            "Results show snippets with page names for faster scanning.",
                        ],
                        summary: "Support and training material surfaces faster from global search.",
                    },
                ],
            },
        ],
    },
    {
        monthBanner: "September 2024",
        sections: [
            {
                dateLabel: "September 11, 2024",
                tasks: [
                    {
                        issueType: "Task",
                        title: "Profile update: Full-time or part-time work with Experior",
                        purpose: "Capture employment classification for workforce planning and ticket routing.",
                        details: [
                            "New “Type of Experior employment” section on the agent profile.",
                            "Switching from part-time to full-time opens a guided checklist and generates an internal ticket.",
                            "Part-time selections collect required supplemental details.",
                        ],
                        summary: "People operations receives cleaner signals when agents change engagement level.",
                    },
                ],
            },
        ],
    },
];
