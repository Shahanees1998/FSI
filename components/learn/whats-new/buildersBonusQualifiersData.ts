export type BuildersBonusRow = {
    name: string;
    title: string;
    bonusType: string;
    recruits: string;
    lifeApps: string;
};

/** Update when a new monthly report is published. */
export const BUILDERS_BONUS_PERIOD = "March 2026";

export const BUILDERS_BONUS_MAIN_ROWS: BuildersBonusRow[] = [
    { name: "Angel & Yohana Contreras 🔥FML🔥Team UBUNTU 🤙🏻", title: "NEP", bonusType: "30x30", recruits: "134", lifeApps: "34.6" },
    { name: "ASTRID GOMEZ - FML UBUNTU 🔥 GCO 🚀", title: "SNED", bonusType: "30x30", recruits: "38", lifeApps: "168.7" },
    {
        name: "Coach Marc & Nancy Tirolla CEO LIFE-NFIN8TY ♟️🏁👺",
        title: "SED",
        bonusType: "50x50",
        recruits: "57.2",
        lifeApps: "71.42",
    },
    { name: "Frank & Yolanda De Lio - ★ FML ★ FIGHT CLUB ★", title: "SEP", bonusType: "30x30", recruits: "32", lifeApps: "32" },
    {
        name: "Gabriela Cantos & Esteban Villalba MONEY MAKER 💰 ELITE GROUP⚡️ NFIN8TY",
        title: "SED",
        bonusType: "40x40",
        recruits: "42.65",
        lifeApps: "41.47",
    },
    {
        name: "Gonzalo & Jennyfer Ortiz ⚡️LION GROUP ⚡️ELITE GROUP ⚡️NFIN8TY",
        title: "ED",
        bonusType: "30x30",
        recruits: "33.95",
        lifeApps: "54.38",
    },
    { name: "Guille Maldonado 🎯\"UBUNTU FOCUS🎯\"", title: "SED", bonusType: "30x30", recruits: "34.5", lifeApps: "32.7" },
    {
        name: "Juan & Katherine Cardenas 🔥FREEDOM CALL🔥",
        title: "SED",
        bonusType: "50x50",
        recruits: "63.65",
        lifeApps: "92.5",
    },
    { name: "Leonardo García NFIN8TY - CEOLIFE", title: "ED", bonusType: "40x40", recruits: "59.1", lifeApps: "44.86" },
    {
        name: "Manuel & Lily Advisors Group of California - FML - Team \"UBUNTU\"",
        title: "ED",
        bonusType: "30x30",
        recruits: "256",
        lifeApps: "31",
    },
    {
        name: "Mariangel Antonella ✨ UBUNTU FML FOCUS NexExp MEDINA 🪄🚀",
        title: "ED",
        bonusType: "40x40",
        recruits: "48",
        lifeApps: "49",
    },
    {
        name: "Natalie & Oscar💗 🔥 Freedom Call ❤️ HearthWise 🔥",
        title: "ED",
        bonusType: "30x30",
        recruits: "39.35",
        lifeApps: "30.5",
    },
    {
        name: "Samer & Paula Yorde ELITE GROUP ⚡️ NFIN8TY",
        title: "EP",
        bonusType: "50x50",
        recruits: "62.15",
        lifeApps: "106.93",
    },
    { name: "WILLIAM RAFAEL RIVERO PEREZ", title: "ED", bonusType: "30x30", recruits: "30", lifeApps: "91.1" },
    { name: "🦍💎 Herberth Joya 💎🦍", title: "SED", bonusType: "30x30", recruits: "33.2", lifeApps: "34.35" },
    { name: "💎 Jason & Stephanie Allison 💎", title: "ED", bonusType: "40x40", recruits: "49", lifeApps: "41.5" },
    { name: "💎 Jose & Alejandra Llamas 💎", title: "SED", bonusType: "50x50", recruits: "60", lifeApps: "100" },
    { name: "💎Alex & Stephanie Haynes 💎", title: "SNED", bonusType: "30x30", recruits: "49", lifeApps: "36" },
    { name: "💎Crystal & Orlando Rios 💎", title: "SED", bonusType: "30x30", recruits: "57.25", lifeApps: "35" },
    { name: "💎Diana Delgado 💎", title: "ED", bonusType: "30x30", recruits: "45.5", lifeApps: "30.38" },
    { name: "💎Juan & Veronica Jaime 💎 D1", title: "SEP", bonusType: "40x40", recruits: "71.72", lifeApps: "42.6" },
    { name: "💎Juan & Veronica Jaime 💎 D1", title: "SEP", bonusType: "100x100", recruits: "479", lifeApps: "546.94" },
    {
        name: "Samer & Paula Yorde ELITE GROUP ⚡️ NFIN8TY",
        title: "EP",
        bonusType: "100x100",
        recruits: "293",
        lifeApps: "567.13",
    },
    {
        name: "Mauro and Mara Arturi FML - Free More Lives",
        title: "NEP",
        bonusType: "100x100",
        recruits: "173",
        lifeApps: "131.88",
    },
    {
        name: "Juan & Katherine Cardenas 🔥FREEDOM CALL🔥",
        title: "SED",
        bonusType: "100x100",
        recruits: "101.5",
        lifeApps: "127",
    },
    {
        name: "Darren and Stephanie Goika NFIN8TY",
        title: "NEP",
        bonusType: "100x100",
        recruits: "231.87",
        lifeApps: "224.27",
    },
    {
        name: "Coach Marc & Nancy Tirolla CEO LIFE-NFIN8TY ♟️🏁👺",
        title: "SED",
        bonusType: "100x100",
        recruits: "143.84",
        lifeApps: "161.16",
    },
    {
        name: "Angel & Yohana Contreras 🔥FML🔥Team UBUNTU 🤙🏻",
        title: "NEP",
        bonusType: "100x100",
        recruits: "573.26",
        lifeApps: "522.82",
    },
];

/** Two-column ED+ agency list (left / right as on the published report). */
export const ED_AGENCY_BONUS_COLUMNS: { left: string[]; right: string[] } = {
    left: [
        "Adeola Abiodun - ✨FML✨TeamOvercomers",
        "Adriana & Carlos Valencia ✨FML Ubuntu Prime BLA",
        "Alexis Goncalves 🔥FML 🔥Team Ubuntu 🤙🏻",
    ],
    right: [
        "LUIS & ISA LOPEZ (LEGACY TEAM 🍀/ ELITE GROUP ⚡️ NFIN8TY)",
        "Mariangel Antonella ✨ UBUNTU FML FOCUS NexExp MEDINA 🪄🚀",
        "Mirna Muro MG Dream Team / ELITE GROUP",
    ],
};
