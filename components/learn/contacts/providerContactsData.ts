/** One line of published carrier contact info */
export type ProviderContactLine = {
    name: string;
    role?: string;
    phone?: string;
    email?: string;
};

export type ProviderCarrierEntry = {
    /** Accordion header, e.g. "Aflac — Life Insurance & Group Insurance" */
    header: string;
    /** When set, shown inside the panel; otherwise a generic placeholder is used. */
    contacts?: ProviderContactLine[];
};

export const PROVIDER_CARRIERS: ProviderCarrierEntry[] = [
    {
        header: "Aflac — Life Insurance & Group Insurance",
        contacts: [
            {
                name: "Brandon Gardner",
                role: "Special Project Manager",
                phone: "214-994-0423",
                email: "B1_Gardner@us.aflac.com",
            },
            {
                name: "Marcus Thomas",
                email: "marcus.thomas@us.aflac.com",
            },
            {
                name: "Agent Services",
                email: "information@aflac.aetna.com",
            },
        ],
    },
    { header: "Allianz — Annuities and Life Insurance" },
    { header: "American Amicable Group — Life Insurance" },
    { header: "American Equity — Annuities and Health & Dental" },
    { header: "American Home Life — Life Insurance" },
    { header: "American International Group (AIG) — Life Insurance" },
    { header: "American National (ANICO) — Annuities" },
    { header: "Americo — Life Insurance" },
    { header: "Ameritas — Life Insurance" },
    { header: "Annexus — Annuities and New Heights IUL" },
    { header: "Assurity — Life Insurance" },
    { header: "Athene — Annuities" },
    { header: "AuguStar — Annuities and Life Insurance" },
    { header: "Banner Life Family of Companies (Banner Life | William Penn) — Life Insurance" },
    { header: "Baltimore Life — Life Insurance" },
    { header: "Breeze — Group Insurance" },
    {
        header:
            "C2G Insurance Solutions — Medicare, UHOne Fixed Indemnity & GWU/BCBS Member Benefit Program",
    },
    { header: "Citizens (CICA) — Life Insurance" },
    { header: "Columbus Life — Life Insurance" },
    { header: "Corebridge Financial — Annuities and Life Insurance" },
];
