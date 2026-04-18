import { notFound } from "next/navigation";
import PolicySubmissionWizard from "@/components/policy-submission/PolicySubmissionWizard";
import { getPolicySubmissionForAgent } from "@/lib/policySubmissionData";
import { parseFormDataJson } from "@/lib/policySubmissionForm";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentPolicySubmissionEditPage({ params }: { params: { id: string } }) {
  const user = await requireCurrentUser("AGENT");
  const row = await getPolicySubmissionForAgent(user.id, params.id);
  if (!row) {
    notFound();
  }

  const initialForm = parseFormDataJson(row.formData);

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <PolicySubmissionWizard
        policyId={row.id}
        initialForm={initialForm}
        initialStep={row.currentStep}
        initialStatus={row.status}
        defaultAgentName={`${user.firstName} ${user.lastName}`.trim()}
      />
    </div>
  );
}
