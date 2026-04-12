import PreContractingDocumentsView from "@/components/contracts/PreContractingDocumentsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentPreContractingDocumentsPage() {
    const user = await requireCurrentUser("AGENT");
    const npnDisplay = user.agentProfile?.licenseNumber?.trim() || null;

    return <PreContractingDocumentsView npnDisplay={npnDisplay} />;
}

