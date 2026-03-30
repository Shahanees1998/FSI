import LiveNotificationsPanel from "@/components/portal/LiveNotificationsPanel";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function CarrierDashboardPage() {
    const user = await requireCurrentUser("CARRIER");
    const carrierProfile = user.carrierProfile;

    const [stats, tickets, conversations, notifications] = await Promise.all([
        carrierProfile
            ? prisma.insurerStat.findMany({
                  where: { carrierProfileId: carrierProfile.id },
                  orderBy: { metricMonth: "desc" },
                  take: 3,
              })
            : [],
        prisma.ticket.findMany({
            where: { requesterId: user.id },
            orderBy: { updatedAt: "desc" },
            take: 5,
        }),
        prisma.conversation.findMany({
            where: { participants: { some: { userId: user.id } } },
            orderBy: { updatedAt: "desc" },
            take: 5,
        }),
        prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
    ]);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <h1 className="mt-0 mb-2">Carrier Dashboard</h1>
                    <p className="text-600 m-0">
                        Review collaboration activity with agents and monitor insurer performance summaries.
                    </p>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Recent conversations</div>
                    <div className="text-3xl font-semibold mt-2">{conversations.length}</div>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Open tickets</div>
                    <div className="text-3xl font-semibold mt-2">{tickets.length}</div>
                </div>
            </div>
            <div className="col-12 md:col-4">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Latest stat snapshots</div>
                    <div className="text-3xl font-semibold mt-2">{stats.length}</div>
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <h3 className="mt-0">Insurer statistics</h3>
                    {stats.map((stat) => (
                        <div key={stat.id} className="border-bottom-1 surface-border py-3">
                            <div className="font-semibold">
                                {new Date(stat.metricMonth).toLocaleDateString()}
                            </div>
                            <div className="text-600 text-sm">
                                Active agents: {stat.activeAgents} | Issued policies: {stat.issuedPolicies}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="grid">
                    <div className="col-12">
                        <div className="surface-card border-round border-1 surface-border p-4">
                            <h3 className="mt-0">Support activity</h3>
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="border-bottom-1 surface-border py-3">
                                    <div className="font-semibold">{ticket.subject}</div>
                                    <div className="text-600 text-sm">
                                        {ticket.category} | {ticket.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-12">
                        <LiveNotificationsPanel
                            userId={user.id}
                            initialNotifications={notifications}
                            title="Live notifications"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
