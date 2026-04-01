import PreApplicationInfoForm from "@/components/efa/PreApplicationInfoForm";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentPreApplicationInfoGatherPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <PreApplicationInfoForm />
        </div>
    );
}
