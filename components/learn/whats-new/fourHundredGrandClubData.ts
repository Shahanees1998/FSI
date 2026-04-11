export type FourHundredGrandHonoree = {
    name: string;
    footerLines: string[];
    imageSrc?: string | null;
};

export type FourHundredGrandSection = {
    heading: string;
    honorees: FourHundredGrandHonoree[];
};

export const FOUR_HUNDRED_GRAND_SECTIONS: FourHundredGrandSection[] = [
    {
        heading: "1st time qualified in 2025",
        honorees: [
            {
                name: "MICHAEL HA",
                footerLines: ["🌎 FML 🌎 TEAM V-GLOBAL 🌎", "JANUARY 2025"],
            },
            {
                name: "FAHIMEH SARVESTANI & PAUL COTE",
                footerLines: ["⭐ FML ⭐ WEC", "JANUARY 2025"],
            },
        ],
    },
    {
        heading: "1st time qualified in 2024",
        honorees: [{ name: "TJ PATEL", footerLines: ["⭐ FML ⭐ TEAM GOAL ACHIEVERS", "APRIL 2024"] }],
    },
    {
        heading: "1st time qualified in 2023",
        honorees: [{ name: "JOE & JULIE LAXTON", footerLines: ["2023"] }],
    },
];
