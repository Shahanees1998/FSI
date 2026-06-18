import CommissionForm from "@/components/portal/CommissionForm";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminCommissionCreatePage() {
  await requireCurrentUser("ADMIN");

  const [agents, carriers] = await Promise.all([
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

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="mt-0 mb-2">New commission</h1>
          <p className="text-600 m-0">Create a commission record for an agent and carrier.</p>
        </div>
        <Link href="/admin/commissions">Back to commissions</Link>
      </div>
      <CommissionForm
        mode="create"
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
