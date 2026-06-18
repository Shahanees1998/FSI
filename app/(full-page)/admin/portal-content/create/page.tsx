import PortalContentForm from "@/components/portal/PortalContentForm";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminPortalContentCreatePage() {
  await requireCurrentUser("ADMIN");

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <h1 className="mt-0 mb-4">Create portal content</h1>
      <PortalContentForm mode="create" />
    </div>
  );
}
