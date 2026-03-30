import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommissionDetailForUser } from "@/lib/portalData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminCommissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireCurrentUser("ADMIN");
  const commission = await getCommissionDetailForUser(
    { role: user.role, userId: user.id },
    params.id
  );

  if (!commission) {
    notFound();
  }

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="mt-0 mb-2">Commission detail</h1>
          <p className="text-600 m-0">Review policy-level commission details and audit context.</p>
        </div>
        <Link href="/admin/commissions">Back to commissions</Link>
      </div>
      <div className="grid">
        <div className="col-12 md:col-6">
          <p className="mb-2"><span className="font-semibold">Client:</span> {commission.clientName}</p>
          <p className="mb-2"><span className="font-semibold">Policy:</span> {commission.policyNumber}</p>
          <p className="mb-2"><span className="font-semibold">Product line:</span> {commission.productLine}</p>
          <p className="mb-2"><span className="font-semibold">Status:</span> {commission.status}</p>
          <p className="mb-2"><span className="font-semibold">Statement month:</span> {new Date(commission.statementMonth).toLocaleDateString()}</p>
        </div>
        <div className="col-12 md:col-6">
          <p className="mb-2"><span className="font-semibold">Amount:</span> ${commission.amount.toFixed(2)}</p>
          <p className="mb-2"><span className="font-semibold">Agent:</span> {commission.agent.firstName} {commission.agent.lastName}</p>
          <p className="mb-2"><span className="font-semibold">Carrier:</span> {commission.carrierProfile.carrierName}</p>
          <p className="mb-2"><span className="font-semibold">Updated by:</span> {commission.updatedBy ? `${commission.updatedBy.firstName} ${commission.updatedBy.lastName}` : "System"}</p>
          <p className="mb-0"><span className="font-semibold">Notes:</span> {commission.notes || "No notes"}</p>
        </div>
      </div>
    </div>
  );
}
