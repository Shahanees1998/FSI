import Link from "next/link";
import { notFound } from "next/navigation";
import TicketDetailView from "@/components/portal/TicketDetailView";
import { getTicketDetailForUser } from "@/lib/portalData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function CarrierTicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireCurrentUser("CARRIER");
  const ticket = await getTicketDetailForUser(
    { role: user.role, userId: user.id },
    params.id
  );

  if (!ticket) {
    notFound();
  }

  return (
    <div>
      <div className="surface-card border-round border-1 surface-border p-4 mb-4">
        <div className="flex justify-content-between align-items-start gap-3">
          <div>
            <h1 className="mt-0 mb-2">Ticket detail</h1>
            <p className="text-600 m-0">Track the current status and add follow-up updates as needed.</p>
          </div>
          <Link href="/carrier/tickets">Back to tickets</Link>
        </div>
      </div>
      <TicketDetailView ticket={ticket} isAdmin={false} />
    </div>
  );
}
