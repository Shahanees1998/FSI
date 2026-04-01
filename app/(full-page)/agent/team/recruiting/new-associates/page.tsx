import NewAssociatesRecruitingView from "@/components/team/NewAssociatesRecruitingView";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function NewAssociatesRecruitingPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden p-0 w-full max-w-full">
            <div className="surface-100 border-bottom-1 surface-border px-3 py-2 md:px-4">
                <p className="text-600 text-sm m-0">
                    <span className="font-medium text-800">Team</span>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-800">Recruiting</span>
                    <span className="mx-2">/</span>
                    <span>New Associates</span>
                </p>
            </div>
            <NewAssociatesRecruitingView />
        </div>
    );
}
