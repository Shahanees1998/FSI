import ClientProfileForm from "@/components/clients/ClientProfileForm";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentClientCreatePage() {
  await requireCurrentUser("AGENT");

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <ClientProfileForm mode="create" />
    </div>
  );
}
