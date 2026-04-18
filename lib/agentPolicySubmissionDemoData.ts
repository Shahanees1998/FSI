/** Sample policy submissions for /agent/policy-submission demo table (not persisted). */

export type DemoPolicySubmissionRow = {
  id: string;
  summaryLabel: string;
  status: "DRAFT" | "SUBMITTED";
  progressPercent: number;
  updatedAt: string;
};

export const DEMO_POLICY_PROGRESS_FILTER_OPTIONS = [
  { label: "Any progress", value: "" },
  { label: "0–33%", value: "low" },
  { label: "34–66%", value: "mid" },
  { label: "67–100%", value: "high" },
] as const;

const products = [
  "Term life",
  "Whole life",
  "Disability",
  "Critical illness",
  "Indexed UL",
  "Universal life",
  "Group health",
];

const firstNames = [
  "Sarah",
  "James",
  "Emily",
  "Michael",
  "Priya",
  "David",
  "Lisa",
  "Robert",
  "Anna",
  "Chris",
  "Maria",
  "Kevin",
  "Jennifer",
  "Marcus",
  "Rachel",
  "Tom",
  "Nina",
  "Omar",
  "Helen",
  "Victor",
  "Yuki",
  "Diego",
  "Fatima",
  "Ian",
  "Julia",
  "Kyle",
  "Laura",
];

function buildRows(): DemoPolicySubmissionRow[] {
  const rows: DemoPolicySubmissionRow[] = [];
  for (let i = 0; i < firstNames.length; i++) {
    const fn = firstNames[i];
    const product = products[i % products.length];
    const progressPercent = ((i * 17 + 11) % 101) as number;
    const status: "DRAFT" | "SUBMITTED" = progressPercent >= 85 ? "SUBMITTED" : i % 3 === 0 ? "SUBMITTED" : "DRAFT";
    const d = new Date(2026, i % 12, 1 + (i % 27));
    const updatedAt = d.toISOString().slice(0, 10);
    rows.push({
      id: `demo-ps-${i + 1}`,
      summaryLabel: `${fn} Morgan · ${product}`,
      status,
      progressPercent,
      updatedAt,
    });
  }
  return rows;
}

export const DEMO_POLICY_SUBMISSIONS: DemoPolicySubmissionRow[] = buildRows();
