import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserDirectoryDetail } from "@/lib/portalData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminCarrierDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await requireCurrentUser("ADMIN");
  const carrier = await getUserDirectoryDetail("CARRIER", params.id);

  if (!carrier) {
    notFound();
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="surface-card border-round border-1 surface-border p-4">
          <div className="flex justify-content-between align-items-start gap-3">
            <div>
              <h1 className="mt-0 mb-2">
                {carrier.firstName} {carrier.lastName}
              </h1>
              <p className="m-0 text-600">
                {carrier.email} | {carrier.status} | {carrier.carrierProfile?.carrierCode ?? "No carrier code"}
              </p>
            </div>
            <Link href="/admin/carriers">Back to directory</Link>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-5">
        <div className="surface-card border-round border-1 surface-border p-4 h-full">
          <h3 className="mt-0">Profile snapshot</h3>
          <p className="mb-2"><span className="font-semibold">Carrier name:</span> {carrier.carrierProfile?.carrierName || "Not provided"}</p>
          <p className="mb-2"><span className="font-semibold">Contact email:</span> {carrier.carrierProfile?.contactEmail || "Not provided"}</p>
          <p className="mb-2"><span className="font-semibold">Contact phone:</span> {carrier.carrierProfile?.contactPhone || "Not provided"}</p>
          <p className="mb-2"><span className="font-semibold">Website:</span> {carrier.carrierProfile?.website || "Not provided"}</p>
          <p className="mb-2"><span className="font-semibold">Job title:</span> {carrier.jobTitle || "Not provided"}</p>
          <p className="mb-0"><span className="font-semibold">Created:</span> {new Date(carrier.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="col-12 lg:col-7">
        <div className="surface-card border-round border-1 surface-border p-4 h-full">
          <h3 className="mt-0">Recent requested tickets</h3>
          {carrier.requestedTickets.map((ticket) => (
            <div key={ticket.id} className="border-bottom-1 surface-border py-3">
              <div className="font-semibold">{ticket.subject}</div>
              <div className="text-600 text-sm">{ticket.status} | {ticket.priority}</div>
            </div>
          ))}
          {carrier.requestedTickets.length === 0 && <p className="text-600 mb-0">No recent tickets.</p>}
        </div>
      </div>
    </div>
  );
}
