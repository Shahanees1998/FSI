/** One historical slot (month-year + display value). */
export type RecordCell = {
    monthYear: string;
    value: string;
    /** Highlight when this cell matches the latest record refresh (e.g. Mar-26). */
    highlight?: boolean;
};

export type RecordRow = {
    label: string;
    /** Five columns #1 … #5; use `null` for empty. */
    ranks: [RecordCell | null, RecordCell | null, RecordCell | null, RecordCell | null, RecordCell | null];
};

function usd(n: number): string {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function num(n: number): string {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

/**
 * Company record snapshot — update ranks here when marketing sends new figures.
 * Values below match the Mar-26 highlights from the internal Record Breakers reference.
 */
export const COMPANY_RECORDS_MAIN: RecordRow[] = [
    {
        label: "Premium — TOTAL",
        ranks: [{ monthYear: "Mar-26", value: usd(22817360), highlight: true }, null, null, null, null],
    },
    {
        label: "Premium — CANADA",
        ranks: [null, null, null, null, null],
    },
    {
        label: "Premium — USA",
        ranks: [{ monthYear: "Mar-26", value: usd(19781028), highlight: true }, null, null, null, null],
    },
    {
        label: "Investments — TOTAL",
        ranks: [{ monthYear: "Mar-26", value: usd(47124399), highlight: true }, null, null, null, null],
    },
    {
        label: "Investments — CANADA",
        ranks: [null, { monthYear: "Mar-26", value: usd(28133647), highlight: true }, null, null, null],
    },
    {
        label: "Investments — USA",
        ranks: [null, null, null, { monthYear: "Mar-26", value: usd(18990752), highlight: true }, null],
    },
    {
        label: "Recruits — TOTAL",
        ranks: [{ monthYear: "Mar-26", value: num(4332), highlight: true }, null, null, null, null],
    },
    {
        label: "Recruits — CANADA",
        ranks: [null, null, null, { monthYear: "Mar-26", value: num(464), highlight: true }, null],
    },
    {
        label: "Recruits — USA",
        ranks: [{ monthYear: "Mar-26", value: num(3868), highlight: true }, null, null, null, null],
    },
];

export const COMPANY_RECORDS_SETTLED: RecordRow[] = [
    {
        label: "Settled premium — TOTAL",
        ranks: [{ monthYear: "Mar-26", value: usd(13982649), highlight: true }, null, null, null, null],
    },
    {
        label: "Settled premium — CANADA",
        ranks: [null, null, null, null, null],
    },
    {
        label: "Settled premium — USA",
        ranks: [{ monthYear: "Mar-26", value: usd(11962660), highlight: true }, null, null, null, null],
    },
];
