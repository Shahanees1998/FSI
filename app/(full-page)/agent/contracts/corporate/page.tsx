import CorporateContractsView from "@/components/contracts/CorporateContractsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentContractsCorporatePage() {
    const user = await requireCurrentUser("AGENT");
    const npnDisplay = user.agentProfile?.licenseNumber?.trim() || null;

    return <CorporateContractsView npnDisplay={npnDisplay} />;
}

