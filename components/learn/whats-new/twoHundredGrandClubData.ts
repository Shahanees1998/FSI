export type TwoHundredGrandHonoree = {
    name: string;
    team: string;
    period: string;
    imageSrc?: string | null;
};

export type TwoHundredGrandSection = {
    heading: string;
    honorees: TwoHundredGrandHonoree[];
};

export const TWO_HUNDRED_GRAND_SECTIONS: TwoHundredGrandSection[] = [
    {
        heading: "1st time qualified in 2025",
        honorees: [
            { name: "Baljit Parmar", team: "TEAM *LLA*", period: "MARCH 2025" },
            { name: "Adriana Valencia", team: "FML TEAM UBUNTU", period: "MARCH 2025" },
            { name: "Madhusudan Badati", team: "THE DREAMWEAVERS", period: "MARCH 2025" },
        ],
    },
    {
        heading: "1st time qualified in 2024",
        honorees: [
            { name: "Paras Malhotra", team: "—", period: "2024" },
            { name: "Ann Pham", team: "—", period: "2024" },
        ],
    },
];
