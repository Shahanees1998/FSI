import DashboardChartCard from "@/components/portal/DashboardChartCard";
import LiveNotificationsPanel from "@/components/portal/LiveNotificationsPanel";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";

const DASHBOARD_PANEL_MIN = "280px";

export default async function AgentDashboardPage() {
    const user = await requireCurrentUser("AGENT");

    const [commissions, tickets, notifications, conversations, commissionTrendRows, ticketStatusRows] = await Promise.all([
        prisma.commissionRecord.aggregate({
            where: { agentId: user.id },
            _sum: { amount: true },
            _count: { _all: true },
        }),
        prisma.ticket.findMany({
            where: { requesterId: user.id },
            orderBy: { updatedAt: "desc" },
            take: 5,
        }),
        prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
        prisma.conversation.findMany({
            where: { participants: { some: { userId: user.id } } },
            orderBy: { updatedAt: "desc" },
            take: 5,
        }),
        prisma.commissionRecord.findMany({
            where: { agentId: user.id },
            select: { statementMonth: true, amount: true },
            orderBy: { statementMonth: "asc" },
        }),
        prisma.ticket.findMany({
            where: { requesterId: user.id },
            select: { status: true },
        }),
    ]);

    const monthlyCommissionMap = commissionTrendRows.reduce<Record<string, number>>((acc, record) => {
        const label = new Intl.DateTimeFormat("en-US", {
            month: "short",
            year: "2-digit",
        }).format(record.statementMonth);
        acc[label] = (acc[label] ?? 0) + record.amount;
        return acc;
    }, {});

    const ticketStatusCounts = ticketStatusRows.reduce<Record<string, number>>((acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] ?? 0) + 1;
        return acc;
    }, {});

    const agentCommissionChartData = {
        labels: Object.keys(monthlyCommissionMap),
        datasets: [
            {
                label: "Commission earned",
                data: Object.values(monthlyCommissionMap),
                backgroundColor: "#2563eb",
                borderRadius: 8,
            },
        ],
    };

    const agentTicketChartData = {
        labels: Object.keys(ticketStatusCounts),
        datasets: [
            {
                data: Object.values(ticketStatusCounts),
                backgroundColor: ["#2563eb", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#06b6d4"],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <h1 className="mt-0 mb-2">Agent Dashboard</h1>
                    <p className="text-600 m-0">
                        Monitor commission activity, open support tickets, and carrier communication from one workspace.
                    </p>
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Commission total</div>
                    <div className="text-3xl font-semibold mt-2">${(commissions._sum.amount ?? 0).toFixed(2)}</div>
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Commission records</div>
                    <div className="text-3xl font-semibold mt-2">{commissions._count._all}</div>
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Active tickets</div>
                    <div className="text-3xl font-semibold mt-2">{tickets.length}</div>
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Recent conversations</div>
                    <div className="text-3xl font-semibold mt-2">{conversations.length}</div>
                </div>
            </div>
            <div className="col-12">
                <div className="flex flex-column lg:flex-row gap-4 align-items-stretch">
                    <div className="flex min-w-0 w-full" style={{ flex: "1 1 0%" }}>
                        <div className="surface-card border-round border-1 surface-border p-4 flex flex-column w-full">
                            <h3 className="mt-0 mb-2">Recent ticket activity</h3>
                            <div
                                className="flex-grow-1 flex flex-column justify-content-center"
                                style={{ minHeight: DASHBOARD_PANEL_MIN }}
                            >
                                {tickets.length === 0 ? (
                                    <p className="text-600 text-center m-0 px-3 line-height-3">
                                        No tickets yet. Open a support ticket from the tickets page when you need help.
                                    </p>
                                ) : (
                                    tickets.map((ticket) => (
                                        <div key={ticket.id} className="border-bottom-1 surface-border py-3">
                                            <div className="font-semibold">{ticket.subject}</div>
                                            <div className="text-600 text-sm">
                                                {ticket.category} | {ticket.status} | {ticket.priority}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-0 w-full" style={{ flex: "1 1 0%" }}>
                        <LiveNotificationsPanel
                            userId={user.id}
                            initialNotifications={notifications}
                            title="Notifications"
                            className="flex-grow-1"
                        />
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="flex flex-column lg:flex-row gap-4 align-items-stretch">
                    <div className="flex min-w-0 w-full" style={{ flex: "1 1 0%" }}>
                        <DashboardChartCard
                            title="Commission history"
                            subtitle="Compare your commission volume across recent statement months."
                            type="bar"
                            data={agentCommissionChartData}
                            height={DASHBOARD_PANEL_MIN}
                            emptyMessage="No commission history yet. Your statement months will chart here once records exist."
                            className="flex-grow-1"
                        />
                    </div>
                    <div className="flex min-w-0 w-full" style={{ flex: "1 1 0%" }}>
                        <DashboardChartCard
                            title="My ticket statuses"
                            subtitle="See where your current support workload stands."
                            type="doughnut"
                            data={agentTicketChartData}
                            height={DASHBOARD_PANEL_MIN}
                            emptyMessage="No tickets yet. Status mix will appear after you create support tickets."
                            options={{
                                cutout: "62%",
                            }}
                            className="flex-grow-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
