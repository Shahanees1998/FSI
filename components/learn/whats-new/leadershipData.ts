/** Optional `public/` path for a headshot, e.g. `/images/leadership/dror-david.jpg` */
export type LeaderProfile = {
    name: string;
    title: string;
    imageSrc?: string | null;
};

/** Reserved for future council listings (section may start empty). */
export const EXPERIOR_LEADERSHIP_COUNCIL: LeaderProfile[] = [];

export const EXECUTIVE_PARTNERS: LeaderProfile[] = [
    { name: "Darren & Stephanie Golka", title: "National Executive Partners" },
    { name: "Frank & Yolanda De Lio", title: "Senior Executive Partners" },
    { name: "Mauro & Mara Arturi", title: "National Executive Partners" },
    { name: "Juan & Veronica Jaime", title: "Senior Executive Partners" },
    { name: "Angel & Yohana Contreras", title: "National Executive Partners" },
];

export const ADVISORY_TEAM: LeaderProfile[] = [
    { name: "Adeola Abiodun", title: "Senior National Executive Director" },
    { name: "Ayodeji Adeyemo", title: "Senior Executive Director" },
    { name: "Dror David", title: "Senior Executive Director" },
    { name: "Myron Weeks & Anastasios Lagos", title: "Senior Executive Directors" },
    { name: "Annie Cuillerier", title: "Executive Director" },
    { name: "Nick & Angelica FitzGerald", title: "Senior Executive Directors" },
    { name: "Tariq & Sophie Ba'Aqeel", title: "Senior Executive Directors" },
    { name: "Madhab Dulal", title: "Senior Executive Director" },
    { name: "Denesh Logeswaran & Lucia Medina", title: "Senior Executive Directors" },
    { name: "Sudhir and Mi…", title: "Senior Executive Directors" },
    { name: "Prabhjit Virk", title: "Senior Executive Director" },
    { name: "Kinjal & Vishal Parmar", title: "Senior Executive Directors" },
    { name: "Puru Polavaram", title: "Senior Executive Director" },
    { name: "Hernan & Azy Rodriguez", title: "Senior Executive Directors" },
    { name: "Kevin & Pam P…", title: "Senior Executive Directors" },
    { name: "Paras Malhotra", title: "Senior Executive Director" },
    { name: "Francis & Dianne Sinday", title: "Senior Executive Directors" },
    { name: "Editha Ramil", title: "Executive Director" },
    { name: "Steven & Terry Cooper", title: "Senior Executive Directors" },
    { name: "Bhupinder Sin…", title: "Senior Executive Director" },
    { name: "Michael Ha", title: "Senior Executive Director" },
    { name: "Mario & Leanna Francella", title: "Senior Executive Directors" },
];
