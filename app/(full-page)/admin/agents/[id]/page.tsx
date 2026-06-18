import Link from "next/link";
import { notFound } from "next/navigation";
import AdminAgentProfileForm from "@/components/portal/AdminAgentProfileForm";
import AgentCompanyPicker from "@/components/portal/AgentCompanyPicker";
import { getUserDirectoryDetail, listActiveCompanies } from "@/lib/portalData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminAgentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await requireCurrentUser("ADMIN");
  const [agent, companies] = await Promise.all([
    getUserDirectoryDetail("AGENT", params.id),
    listActiveCompanies(),
  ]);

  if (!agent) {
    notFound();
  }

  const profile = agent.agentProfile as typeof agent.agentProfile & {
    company?: { id: string; name: string } | null;
  };

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
          <h3 className="mt-0">Edit profile</h3>
          <AdminAgentProfileForm
            agentId={agent.id}
            initial={{
              firstName: agent.firstName,
              lastName: agent.lastName,
              phone: agent.phone,
              status: agent.status,
              jobTitle: agent.jobTitle,
              location: agent.location,
              agentProfile: agent.agentProfile,
            }}
          />
          <div className="border-top-1 surface-border pt-4 mt-4">
            <h4 className="mt-0 mb-3">Company assignment</h4>
            <AgentCompanyPicker
              agentId={agent.id}
              initialCompanyId={profile?.companyId ?? null}
              companies={companies}
            />
          </div>
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
