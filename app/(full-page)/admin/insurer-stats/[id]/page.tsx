import Link from "next/link";
import { notFound } from "next/navigation";
import InsurerStatForm from "@/components/portal/InsurerStatForm";
import { getInsurerStatDetail } from "@/lib/portalData";
import { prisma } from "@/lib/prisma";
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

  const carriers = await prisma.carrierProfile.findMany({
    orderBy: { carrierName: "asc" },
    select: { id: true, carrierName: true, carrierCode: true },
  });

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="mt-0 mb-2">Insurer stat detail</h1>
          <p className="text-600 m-0">{stat.carrierProfile.carrierName} · {new Date(stat.metricMonth).toLocaleDateString()}</p>
        </div>
        <Link href="/admin/insurer-stats">Back to insurer stats</Link>
      </div>
      <InsurerStatForm
        carriers={carriers}
        mode="edit"
        initial={{
          id: stat.id,
          carrierProfileId: stat.carrierProfileId,
          metricMonth: new Date(stat.metricMonth).toISOString().slice(0, 7),
          activeAgents: stat.activeAgents,
          submittedPolicies: stat.submittedPolicies,
          issuedPolicies: stat.issuedPolicies,
          submittedPremium: stat.submittedPremium,
          issuedPremium: stat.issuedPremium,
          commissionsPaid: stat.commissionsPaid,
          retentionRate: stat.retentionRate,
          notes: stat.notes || "",
        }}
      />
    </div>
  );
}
