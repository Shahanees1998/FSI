import EfaTrainingContent from "@/components/efa/EfaTrainingContent";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentEfaTrainingPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4 md:p-5">
            <EfaTrainingContent />
        </div>
    );
}
