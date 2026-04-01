import EfaDataInputFullForm from "@/components/efa/EfaDataInputFullForm";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentEfaDataInputFullPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <EfaDataInputFullForm />
        </div>
    );
}
