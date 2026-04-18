import CompanyCreateForm from "@/components/portal/CompanyCreateForm";
import Link from "next/link";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentCompanyCreatePage() {
  await requireCurrentUser("AGENT");

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <Link href="/agent/companies" className="p-button p-component p-button-text p-0 mb-3 no-underline inline-flex">
        <span className="p-button-label">← Back to companies</span>
      </Link>
      <h1 className="text-2xl font-semibold m-0 text-900">New company</h1>
      <p className="m-0 mt-2 mb-4 text-600">Add an organization for assigning clients and profiles.</p>
      <CompanyCreateForm apiUrl="/api/agent/companies" redirectTo="/agent/companies" />
    </div>
  );
}
