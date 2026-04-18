import SystemSettingsForm from "@/components/portal/SystemSettingsForm";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";
import { APP_DEFAULT_SUPPORT_EMAIL, APP_PORTAL_NAME } from "@/lib/appBranding";

export default async function AdminSettingsPage() {
    await requireCurrentUser("ADMIN");
    const settings =
        (await prisma.systemSettings.findFirst()) ||
        (await prisma.systemSettings.create({
            data: {
                siteName: APP_PORTAL_NAME,
                siteDescription: "Back-office workspace for agents, carriers, and administrators.",
                supportEmail: APP_DEFAULT_SUPPORT_EMAIL,
                notificationsEnabled: true,
            },
        }));

    return <SystemSettingsForm settings={settings} />;
}
