import SystemSettingsForm from "@/components/portal/SystemSettingsForm";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminSettingsPage() {
    await requireCurrentUser("ADMIN");
    const settings =
        (await prisma.systemSettings.findFirst()) ||
        (await prisma.systemSettings.create({
            data: {
                siteName: "Freedom Shield Insurance Portal",
                siteDescription: "Back-office workspace for agents, carriers, and administrators.",
                supportEmail: "support@freedomshieldinsurance.com",
                notificationsEnabled: true,
            },
        }));

    return <SystemSettingsForm settings={settings} />;
}
