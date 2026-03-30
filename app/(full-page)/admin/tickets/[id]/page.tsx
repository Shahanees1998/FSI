import Link from "next/link";
import { notFound } from "next/navigation";
import TicketDetailView from "@/components/portal/TicketDetailView";
import { getTicketDetailForUser } from "@/lib/portalData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminTicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireCurrentUser("ADMIN");
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
            <p className="text-600 m-0">Review the ticket history, status, and communication in one place.</p>
          </div>
          <Link href="/admin/tickets">Back to tickets</Link>
        </div>
      </div>
      <TicketDetailView ticket={ticket} isAdmin />
    </div>
  );
}
