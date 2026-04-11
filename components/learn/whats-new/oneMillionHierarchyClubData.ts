export type MillionClubHonoree = {
    name: string;
    title: string;
    team: string;
    /** As printed on the recognition card, e.g. "DECEMBER 2024" */
    period: string;
    /** Optional headshot under `public/` (e.g. `/images/hierarchy-clubs/1m/chonburi-nguyen.jpg`). */
    imageSrc?: string | null;
};

export const ONE_MILLION_CLUB_HONOREES: MillionClubHonoree[] = [
    {
        name: "CHONBURI NGUYEN",
        title: "Executive Director",
        team: "TEAM Energetic Achievers",
        period: "DECEMBER 2024",
        // imageSrc: "/images/hierarchy-clubs/1m/chonburi-nguyen.jpg",
    },
    {
        name: "MIKE TRAN",
        title: "Executive Director",
        team: "TEAM V-GLOBAL",
        period: "DECEMBER 2024",
        // imageSrc: "/images/hierarchy-clubs/1m/mike-tran.jpg",
    },
    {
        name: "BHUPINDER CHEEMA",
        title: "Senior Executive Director",
        team: "TEAM ALBERTA LTD",
        period: "DECEMBER 2024",
        // imageSrc: "/images/hierarchy-clubs/1m/bhupinder-cheema.jpg",
    },
    {
        name: "DARREN & STEPHANIE GOLKA",
        title: "Senior Executive Directors",
        team: "TEAM (R.E.O.S.)",
        period: "MARCH 2023",
        // imageSrc: "/images/hierarchy-clubs/1m/darren-stephanie-golka.jpg",
    },
    {
        name: "MAURO AND MARA ARTURI",
        title: "National Executive Directors",
        team: "★ FML ★ Free More Lives ★",
        period: "SEPTEMBER 2022",
        // imageSrc: "/images/hierarchy-clubs/1m/mauro-mara-arturi.jpg",
    },
    {
        name: "FRANK & YOLANDA DE LIO",
        title: "National Executive Directors",
        team: "★ FML ★ FIGHT CLUB ★",
        period: "SEPTEMBER 2022",
        // imageSrc: "/images/hierarchy-clubs/1m/frank-yolanda-de-lio.jpg",
    },
];
