export type ThreeHundredGrandHonoree = {
    name: string;
    /** One or more lines under the portrait (team, date, stars). */
    footerLines: string[];
    imageSrc?: string | null;
};

export type ThreeHundredGrandSection = {
    heading: string;
    honorees: ThreeHundredGrandHonoree[];
};

export const THREE_HUNDRED_GRAND_SECTIONS: ThreeHundredGrandSection[] = [
    {
        heading: "1st time qualified in 2025",
        honorees: [{ name: "ANAND BINDAH", footerLines: ["MARCH 2025"] }],
    },
    {
        heading: "1st time qualified in 2024",
        honorees: [
            { name: "MICHAEL HA", footerLines: ["⭐RISING PHOENIX⭐"] },
            { name: "RAKESH PATEL", footerLines: ["⭐FML⭐ TEAM GOAL ACHIEVERS", "APRIL 2024"] },
        ],
    },
    {
        heading: "1st time qualified in 2023",
        honorees: [{ name: "JOE & JULIE LAXTON", footerLines: ["2023"] }],
    },
];
