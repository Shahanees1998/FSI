import PolicySubmissionCreateStarter from "@/components/policy-submission/PolicySubmissionCreateStarter";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentPolicySubmissionCreatePage() {
  const user = await requireCurrentUser("AGENT");

  return (
    <PolicySubmissionCreateStarter defaultAgentName={`${user.firstName} ${user.lastName}`.trim()} />
  );
}
