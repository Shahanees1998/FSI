export type PersonalBonusRow = {
    name: string;
    title: string;
    /** Formatted currency string for display */
    premium: string;
    /** Recruits count; null renders as — */
    recruits: string | null;
};

export type PersonalBonusTier = {
    id: "B3" | "B2" | "B1";
    /** Full yellow-banner label */
    banner: string;
    rows: PersonalBonusRow[];
};

/** Update each month when marketing publishes a new qualifier list. */
export const PERSONAL_BONUS_PERIOD = "March 2026";

export const PERSONAL_BONUS_TIERS: PersonalBonusTier[] = [
    {
        id: "B3",
        banner: "B3 Bonus — USA 130% · CAN 160%",
        rows: [
            { name: "Angel & Yohana Contreras 🔥FML🔥Team UBUNTU 🤝", title: "NED", premium: "$122,027.34", recruits: "134.3" },
            { name: "William Rafael Rivero Perez", title: "ED", premium: "$591,490.04", recruits: "30" },
            { name: "Pablo Ballesteros Escala360 Agency", title: "SED", premium: "$351,981.29", recruits: "29.8" },
        ],
    },
    {
        id: "B2",
        banner: "B2 Bonus — USA 125% · CAN 150%",
        rows: [
            { name: "Adriana & Carlos Valencia 🌤️ FML Ubuntu Prime BLA", title: "SED", premium: "$90,796.80", recruits: "52" },
            { name: "Alex & Stephanie Haynes 💎", title: "SNED", premium: "$87,165.84", recruits: "49" },
            { name: "Sarah Reay", title: "SM", premium: "$25,345.08", recruits: null },
        ],
    },
    {
        id: "B1",
        banner: "B1 Bonus — USA 120% · CAN 145%",
        rows: [
            { name: "Carlos Barreto - FML UBUNTU 🔥 GCO 🚀", title: "ED", premium: "$422,575.86", recruits: "10" },
            {
                name: "Oscar Maldonado CM Ubuntu Capital 🔥💰 - FML - Team UBUNTU",
                title: "ED",
                premium: "$66,787.18",
                recruits: "110.5",
            },
            { name: "Daniel & Ashley Prete \"Limitless Leaders\"", title: "NED", premium: "$68,898.97", recruits: "28.1" },
        ],
    },
];
