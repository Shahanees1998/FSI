import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserDirectoryDetail } from "@/lib/portalData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminAgentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await requireCurrentUser("ADMIN");
  const agent = await getUserDirectoryDetail("AGENT", params.id);

  if (!agent) {
    notFound();
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="surface-card border-round border-1 surface-border p-4">
          <div className="flex justify-content-between align-items-start gap-3">
            <div>
              <h1 className="mt-0 mb-2">
                {agent.firstName} {agent.lastName}
              </h1>
              <p className="m-0 text-600">
                {agent.email} | {agent.status} | {agent.agentProfile?.agentCode ?? "No agent code"}
              </p>
            </div>
            <Link href="/admin/agents">Back to directory</Link>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-5">
        <div className="surface-card border-round border-1 surface-border p-4 h-full">
          <h3 className="mt-0">Profile snapshot</h3>
          <p className="mb-2"><span className="font-semibold">Phone:</span> {agent.phone || "Not provided"}</p>
          <p className="mb-2"><span className="font-semibold">Job title:</span> {agent.jobTitle || "Not provided"}</p>
          <p className="mb-2"><span className="font-semibold">Location:</span> {agent.location || "Not provided"}</p>
          <p className="mb-2"><span className="font-semibold">License:</span> {agent.agentProfile?.licenseNumber || "Not provided"}</p>
          <p className="mb-2"><span className="font-semibold">Agency:</span> {agent.agentProfile?.agencyName || "Not provided"}</p>
          <p className="mb-0"><span className="font-semibold">Created:</span> {new Date(agent.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <div className="col-12 lg:col-7">
        <div className="surface-card border-round border-1 surface-border p-4 h-full">
          <h3 className="mt-0">Recent requested tickets</h3>
          {agent.requestedTickets.map((ticket) => (
            <div key={ticket.id} className="border-bottom-1 surface-border py-3">
              <div className="font-semibold">{ticket.subject}</div>
              <div className="text-600 text-sm">{ticket.status} | {ticket.priority}</div>
            </div>
          ))}
          {agent.requestedTickets.length === 0 && <p className="text-600 mb-0">No recent tickets.</p>}
        </div>
      </div>
    </div>
  );
}
