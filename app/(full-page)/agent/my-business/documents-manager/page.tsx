import DocumentsManagerView from "@/components/my-business/DocumentsManagerView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMyBusinessDocumentsManagerPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-3 md:p-4">
            <DocumentsManagerView />
        </div>
    );
}

