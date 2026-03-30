import ProfileSettingsForm from "@/components/portal/ProfileSettingsForm";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentProfilePage() {
    const user = await requireCurrentUser("AGENT");

    return (
        <div>
            <div className="surface-card border-round border-1 surface-border p-4 mb-4">
                <h1 className="mt-0 mb-2">Profile</h1>
                <p className="text-600 m-0">Update your contact details and maintain secure account access.</p>
            </div>
            <ProfileSettingsForm user={user} />
        </div>
    );
}
