import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsurerStatDetail } from "@/lib/portalData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminInsurerStatDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await requireCurrentUser("ADMIN");
  const stat = await getInsurerStatDetail(params.id);

  if (!stat) {
    notFound();
  }

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="mt-0 mb-2">Insurer stat detail</h1>
          <p className="text-600 m-0">Review the monthly insurer snapshot and audit metadata.</p>
        </div>
        <Link href="/admin/insurer-stats">Back to insurer stats</Link>
      </div>
      <div className="grid">
        <div className="col-12 md:col-6">
          <p className="mb-2"><span className="font-semibold">Carrier:</span> {stat.carrierProfile.carrierName}</p>
          <p className="mb-2"><span className="font-semibold">Carrier code:</span> {stat.carrierProfile.carrierCode}</p>
          <p className="mb-2"><span className="font-semibold">Metric month:</span> {new Date(stat.metricMonth).toLocaleDateString()}</p>
          <p className="mb-2"><span className="font-semibold">Active agents:</span> {stat.activeAgents}</p>
          <p className="mb-2"><span className="font-semibold">Submitted policies:</span> {stat.submittedPolicies}</p>
          <p className="mb-2"><span className="font-semibold">Issued policies:</span> {stat.issuedPolicies}</p>
        </div>
        <div className="col-12 md:col-6">
          <p className="mb-2"><span className="font-semibold">Submitted premium:</span> ${stat.submittedPremium.toFixed(2)}</p>
          <p className="mb-2"><span className="font-semibold">Issued premium:</span> ${stat.issuedPremium.toFixed(2)}</p>
          <p className="mb-2"><span className="font-semibold">Commissions paid:</span> ${stat.commissionsPaid.toFixed(2)}</p>
          <p className="mb-2"><span className="font-semibold">Retention rate:</span> {stat.retentionRate.toFixed(1)}%</p>
          <p className="mb-0"><span className="font-semibold">Notes:</span> {stat.notes || "No notes"}</p>
        </div>
      </div>
    </div>
  );
}
