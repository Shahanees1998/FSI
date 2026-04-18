"use client";

import { DEMO_COMMISSIONS } from "@/lib/agentCommissionsDemoData";

function statusLabel(s: string) {
  switch (s) {
    case "PENDING":
      return "Pending";
    case "APPROVED":
      return "Approved";
    case "PAID":
      return "Paid";
    case "DISPUTED":
      return "Disputed";
    default:
      return s;
  }
}

export default function AgentCommissionsDemoSection() {
  const demoTotal = DEMO_COMMISSIONS.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-start gap-3 mb-4">
        <div>
          <h2 className="text-xl font-semibold m-0 text-900">Sample commissions (demo)</h2>
          <p className="text-600 m-0 mt-2 text-sm">
            Illustrative statement-style rows for layout review — not from your production data.
          </p>
        </div>
        <div className="text-right">
          <div className="text-600 text-sm">Demo subtotal</div>
          <div className="text-xl font-semibold">${demoTotal.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid">
        {DEMO_COMMISSIONS.map((commission) => (
          <div key={commission.id} className="col-12">
            <div className="border-1 surface-border border-round p-3 surface-50">
              <div className="flex justify-content-between gap-3 flex-wrap">
                <div>
                  <div className="font-semibold">{commission.clientName}</div>
                  <div className="text-600 text-sm mt-1">
                    {commission.carrierName} | {commission.productLine}
                  </div>
                  <div className="text-600 text-sm mt-1">
                    Policy {commission.policyNumber} | {statusLabel(commission.status)}
                  </div>
                  {commission.notes ? (
                    <div className="text-600 text-sm mt-1 italic">{commission.notes}</div>
                  ) : null}
                </div>
                <div className="text-right">
                  <div className="font-semibold">${commission.amount.toFixed(2)}</div>
                  <div className="text-600 text-sm">{new Date(commission.statementMonth).toLocaleDateString()}</div>
                  <div className="mt-2 text-500 text-sm">Demo — no detail page</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
