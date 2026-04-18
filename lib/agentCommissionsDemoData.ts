/** Sample commission rows for /agent/commissions (illustrative only). */

export type DemoCommissionRow = {
  id: string;
  clientName: string;
  carrierName: string;
  carrierCode: string;
  productLine: string;
  policyNumber: string;
  status: "PENDING" | "APPROVED" | "PAID" | "DISPUTED";
  amount: number;
  /** ISO date string (statement month) */
  statementMonth: string;
  notes?: string;
};

export const DEMO_COMMISSIONS: DemoCommissionRow[] = [
  {
    id: "demo-comm-1",
    clientName: "Sarah Mitchell",
    carrierName: "Northbridge Life",
    carrierCode: "NBL",
    productLine: "Term life — 20 year",
    policyNumber: "NB-2025-88421",
    status: "PAID",
    amount: 1840.5,
    statementMonth: "2026-03-01",
    notes: "First-year comp",
  },
  {
    id: "demo-comm-2",
    clientName: "James Chen",
    carrierName: "Summit Assurance",
    carrierCode: "SUM",
    productLine: "Disability income",
    policyNumber: "SM-DI-7721",
    status: "APPROVED",
    amount: 920.0,
    statementMonth: "2026-03-01",
  },
  {
    id: "demo-comm-3",
    clientName: "Emily Rodriguez",
    carrierName: "Harbor Mutual",
    carrierCode: "HBM",
    productLine: "Whole life — participating",
    policyNumber: "HM-WL-99102",
    status: "PENDING",
    amount: 412.75,
    statementMonth: "2026-04-01",
  },
  {
    id: "demo-comm-4",
    clientName: "Michael O'Brien",
    carrierName: "Metro Brokerage Network",
    carrierCode: "MBN",
    productLine: "Critical illness",
    policyNumber: "MBN-CI-4418",
    status: "PAID",
    amount: 2650.0,
    statementMonth: "2026-02-01",
  },
  {
    id: "demo-comm-5",
    clientName: "Priya Patel",
    carrierName: "Northbridge Life",
    carrierCode: "NBL",
    productLine: "Indexed universal life",
    policyNumber: "NB-IUL-22017",
    status: "DISPUTED",
    amount: 0,
    statementMonth: "2026-01-01",
    notes: "Under carrier review",
  },
];
