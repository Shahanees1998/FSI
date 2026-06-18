import CommissionForm, { toDateInput, toMonthInput, type CommissionFormValues } from "@/components/portal/CommissionForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommissionDetailForUser } from "@/lib/portalData";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminCommissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireCurrentUser("ADMIN");
  const [commission, agents, carriers] = await Promise.all([
    getCommissionDetailForUser({ role: user.role, userId: user.id }, params.id),
    prisma.user.findMany({
      where: { role: "AGENT", isDeleted: false },
      select: { id: true, firstName: true, lastName: true, email: true },
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    }),
    prisma.carrierProfile.findMany({
      select: { id: true, carrierName: true, carrierCode: true },
      orderBy: { carrierName: "asc" },
    }),
  ]);

  if (!commission) {
    notFound();
  }

  const initial: CommissionFormValues = {
    id: commission.id,
    agentId: commission.agentId,
    carrierProfileId: commission.carrierProfileId,
    policyNumber: commission.policyNumber,
    clientName: commission.clientName,
    productLine: commission.productLine,
    amount: commission.amount,
    status: commission.status,
    statementMonth: toMonthInput(commission.statementMonth),
    effectiveDate: toDateInput(commission.effectiveDate),
    paidAt: toDateInput(commission.paidAt),
    notes: commission.notes ?? "",
  };

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="mt-0 mb-2">Edit commission</h1>
          <p className="text-600 m-0">
            {commission.clientName} · {commission.policyNumber} · Updated{" "}
            {commission.updatedBy
              ? `by ${commission.updatedBy.firstName} ${commission.updatedBy.lastName}`
              : "in system"}
          </p>
        </div>
        <Link href="/admin/commissions">Back to commissions</Link>
      </div>
      <CommissionForm
        mode="edit"
        initial={initial}
        agents={agents.map((a) => ({
          id: a.id,
          label: `${a.firstName} ${a.lastName} (${a.email})`,
        }))}
        carriers={carriers.map((c) => ({
          id: c.id,
          label: `${c.carrierName} (${c.carrierCode})`,
        }))}
      />
    </div>
  );
}
