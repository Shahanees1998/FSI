export type HundredGrandHonoree = {
    name: string;
    team: string;
    /** e.g. "MARCH 2023" */
    period: string;
    imageSrc?: string | null;
};

export type HundredGrandSection = {
    heading: string;
    honorees: HundredGrandHonoree[];
};

export const HUNDRED_GRAND_SECTIONS: HundredGrandSection[] = [
    {
        heading: "1st time qualified in 2023",
        honorees: [
            { name: "Kizzy Bowen", team: "Team Emerald / U.O.D.", period: "MARCH 2023" },
            { name: "Cecile Mafie", team: "Team Bright Future", period: "MARCH 2023" },
            { name: "Samer & Paula Yorde", team: "Elite Group V.I.N.", period: "MARCH 2023" },
            { name: "Leonardo Garcia", team: "Team B.O.S.S. Empire", period: "MARCH 2023" },
            { name: "Jinesh Patel", team: "GPL / Team Goal Achievers", period: "MARCH 2023" },
            { name: "Monica Augustine", team: "GPL / Team Goal Achievers", period: "MARCH 2023" },
            { name: "Vishnu Priya", team: "GPL / Fight Club Key Players", period: "MARCH 2023" },
        ],
    },
    {
        heading: "1st time qualified in 2024",
        honorees: [
            { name: "Vishal and Kinjal Parmar", team: "Team Growth Services Inc", period: "JULY 2024" },
            { name: "Aman Singh", team: "Team As Real", period: "JULY 2024" },
            { name: "Linda Yao", team: "Winning", period: "JULY 2024" },
            { name: "Randy Rodriguez", team: "Team First Class Agencies", period: "JULY 2024" },
            { name: "Jashandeep & Gurleen Brar", team: "Team Youngest in Charge", period: "JULY 2024" },
            { name: "Le Vuong", team: "EHL ❤️ Diamond Team ❤️", period: "JULY 2024" },
        ],
    },
];
