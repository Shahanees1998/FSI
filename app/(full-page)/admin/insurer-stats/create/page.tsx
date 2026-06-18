import InsurerStatForm from "@/components/portal/InsurerStatForm";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminInsurerStatCreatePage() {
  await requireCurrentUser("ADMIN");
  const carriers = await prisma.carrierProfile.findMany({
    orderBy: { carrierName: "asc" },
    select: { id: true, carrierName: true, carrierCode: true },
  });

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <h1 className="mt-0 mb-4">Create insurer stat</h1>
      <InsurerStatForm carriers={carriers} mode="create" />
    </div>
  );
}
