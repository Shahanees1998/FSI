import RollupsView from "@/components/reports/RollupsView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentReportsRollUpsPage() {
    await requireCurrentUser("AGENT");

    return <RollupsView />;
}

