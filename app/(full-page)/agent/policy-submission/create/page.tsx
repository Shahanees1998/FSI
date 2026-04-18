import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentPolicySubmissionCreatePage() {
  const user = await requireCurrentUser("AGENT");
  const row = await prisma.policySubmission.create({
    data: {
      agentId: user.id,
      status: "DRAFT",
      progressPercent: 0,
      currentStep: 0,
      formData: {},
      summaryLabel: "Policy submission",
    },
  });
  redirect(`/agent/policy-submission/${row.id}/edit`);
}
