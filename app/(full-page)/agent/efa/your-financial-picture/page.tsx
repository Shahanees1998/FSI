import YourFinancialPictureForm from "@/components/efa/YourFinancialPictureForm";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentYourFinancialPicturePage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-3 md:p-4">
            <YourFinancialPictureForm />
        </div>
    );
}
