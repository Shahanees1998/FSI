/** Static demo rows for the agent /agent/clients page (sample tables). */

export type DemoClientRow = {
  id: string;
  displayName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  updatedAt: string;
};

export type DemoPolicyRow = {
  id: string;
  summaryLabel: string;
  status: "DRAFT" | "SUBMITTED";
  progressPercent: number;
  updatedAt: string;
};

export const DEMO_CLIENTS: DemoClientRow[] = [
  { id: "demo-c1", displayName: "Sarah Mitchell", email: "s.mitchell@email.com", phone: "617-555-0101", city: "Boston", state: "MA", updatedAt: "2026-04-12" },
  { id: "demo-c2", displayName: "James Chen", email: "j.chen@email.com", phone: "415-555-0102", city: "San Francisco", state: "CA", updatedAt: "2026-04-11" },
  { id: "demo-c3", displayName: "Emily Rodriguez", email: "e.rodriguez@email.com", phone: "305-555-0103", city: "Miami", state: "FL", updatedAt: "2026-04-10" },
  { id: "demo-c4", displayName: "Michael O'Brien", email: "m.obrien@email.com", phone: "312-555-0104", city: "Chicago", state: "IL", updatedAt: "2026-04-09" },
  { id: "demo-c5", displayName: "Priya Patel", email: "p.patel@email.com", phone: "469-555-0105", city: "Dallas", state: "TX", updatedAt: "2026-04-08" },
  { id: "demo-c6", displayName: "David Kim", email: "d.kim@email.com", phone: "206-555-0106", city: "Seattle", state: "WA", updatedAt: "2026-04-07" },
  { id: "demo-c7", displayName: "Lisa Thompson", email: "l.thompson@email.com", phone: "602-555-0107", city: "Phoenix", state: "AZ", updatedAt: "2026-04-06" },
  { id: "demo-c8", displayName: "Robert Garcia", email: "r.garcia@email.com", phone: "404-555-0108", city: "Atlanta", state: "GA", updatedAt: "2026-04-05" },
  { id: "demo-c9", displayName: "Anna Novak", email: "a.novak@email.com", phone: "215-555-0109", city: "Philadelphia", state: "PA", updatedAt: "2026-04-04" },
  { id: "demo-c10", displayName: "Chris Walker", email: "c.walker@email.com", phone: "702-555-0110", city: "Las Vegas", state: "NV", updatedAt: "2026-04-03" },
  { id: "demo-c11", displayName: "Maria Santos", email: "m.santos@email.com", phone: "303-555-0111", city: "Denver", state: "CO", updatedAt: "2026-04-02" },
  { id: "demo-c12", displayName: "Kevin Brooks", email: "k.brooks@email.com", phone: "615-555-0112", city: "Nashville", state: "TN", updatedAt: "2026-04-01" },
  { id: "demo-c13", displayName: "Jennifer Lee", email: "j.lee@email.com", phone: "503-555-0113", city: "Portland", state: "OR", updatedAt: "2026-03-30" },
  { id: "demo-c14", displayName: "Marcus Johnson", email: "m.johnson@email.com", phone: "704-555-0114", city: "Charlotte", state: "NC", updatedAt: "2026-03-29" },
  { id: "demo-c15", displayName: "Rachel Green", email: "r.green@email.com", phone: "512-555-0115", city: "Austin", state: "TX", updatedAt: "2026-03-28" },
  { id: "demo-c16", displayName: "Tom Harris", email: "t.harris@email.com", phone: "801-555-0116", city: "Salt Lake City", state: "UT", updatedAt: "2026-03-27" },
  { id: "demo-c17", displayName: "Nina Foster", email: "n.foster@email.com", phone: "314-555-0117", city: "St. Louis", state: "MO", updatedAt: "2026-03-26" },
  { id: "demo-c18", displayName: "Omar Ali", email: "o.ali@email.com", phone: "313-555-0118", city: "Detroit", state: "MI", updatedAt: "2026-03-25" },
];

export const DEMO_POLICIES: DemoPolicyRow[] = [
  { id: "demo-p1", summaryLabel: "Mitchell · Term life", status: "SUBMITTED", progressPercent: 100, updatedAt: "2026-04-14" },
  { id: "demo-p2", summaryLabel: "Chen · Disability", status: "DRAFT", progressPercent: 42, updatedAt: "2026-04-13" },
  { id: "demo-p3", summaryLabel: "Rodriguez · Whole life", status: "SUBMITTED", progressPercent: 100, updatedAt: "2026-04-12" },
  { id: "demo-p4", summaryLabel: "O'Brien · Critical illness", status: "DRAFT", progressPercent: 18, updatedAt: "2026-04-11" },
  { id: "demo-p5", summaryLabel: "Patel · Universal life", status: "SUBMITTED", progressPercent: 100, updatedAt: "2026-04-10" },
  { id: "demo-p6", summaryLabel: "Kim · Indexed UL", status: "DRAFT", progressPercent: 65, updatedAt: "2026-04-09" },
  { id: "demo-p7", summaryLabel: "Thompson · Term life", status: "SUBMITTED", progressPercent: 100, updatedAt: "2026-04-08" },
  { id: "demo-p8", summaryLabel: "Garcia · Disability", status: "DRAFT", progressPercent: 28, updatedAt: "2026-04-07" },
  { id: "demo-p9", summaryLabel: "Novak · Whole life", status: "SUBMITTED", progressPercent: 100, updatedAt: "2026-04-06" },
  { id: "demo-p10", summaryLabel: "Walker · Term life", status: "DRAFT", progressPercent: 55, updatedAt: "2026-04-05" },
  { id: "demo-p11", summaryLabel: "Santos · Critical illness", status: "SUBMITTED", progressPercent: 100, updatedAt: "2026-04-04" },
  { id: "demo-p12", summaryLabel: "Brooks · Universal life", status: "DRAFT", progressPercent: 12, updatedAt: "2026-04-03" },
  { id: "demo-p13", summaryLabel: "Lee · Term life", status: "SUBMITTED", progressPercent: 100, updatedAt: "2026-04-02" },
  { id: "demo-p14", summaryLabel: "Johnson · Disability", status: "DRAFT", progressPercent: 71, updatedAt: "2026-04-01" },
  { id: "demo-p15", summaryLabel: "Green · Whole life", status: "SUBMITTED", progressPercent: 100, updatedAt: "2026-03-31" },
  { id: "demo-p16", summaryLabel: "Harris · Indexed UL", status: "DRAFT", progressPercent: 33, updatedAt: "2026-03-30" },
];

export const DEMO_POLICY_PROGRESS_BUCKETS = [
  { label: "Any progress", value: "" },
  { label: "0–33%", value: "low" },
  { label: "34–66%", value: "mid" },
  { label: "67–100%", value: "high" },
] as const;
