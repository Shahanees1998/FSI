import ProfileSettingsForm from "@/components/portal/ProfileSettingsForm";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function CarrierProfilePage() {
    const user = await requireCurrentUser("CARRIER");

    return (
        <div>
            <div className="surface-card border-round border-1 surface-border p-4 mb-4">
                <h1 className="mt-0 mb-2">Carrier Profile</h1>
                <p className="text-600 m-0">Maintain contact details used across JS Investment communication and support workflows.</p>
            </div>
            <ProfileSettingsForm user={user} />
        </div>
    );
}
