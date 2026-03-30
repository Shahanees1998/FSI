import DashboardChartCard from "@/components/portal/DashboardChartCard";
import LiveNotificationsPanel from "@/components/portal/LiveNotificationsPanel";
import { prisma } from "@/lib/prisma";
import { requireCurrentUser } from "@/lib/serverAuth";

/** Min height for chart / list body so paired dashboard columns align */
const DASHBOARD_PANEL_MIN = "280px";

export default async function AdminDashboardPage() {
    const user = await requireCurrentUser("ADMIN");

    const [agents, carriers, tickets, conversations, commissions, notifications, ticketStatusRows, commissionTrendRows] = await Promise.all([
        prisma.user.count({ where: { role: "AGENT", isDeleted: false } }),
        prisma.user.count({ where: { role: "CARRIER", isDeleted: false } }),
        prisma.ticket.count({
            where: { status: { in: ["OPEN", "IN_PROGRESS", "WAITING_ON_AGENT", "WAITING_ON_CARRIER"] } },
        }),
        prisma.conversation.count(),
        prisma.commissionRecord.aggregate({ _sum: { amount: true } }),
        prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            take: 6,
        }),
        prisma.ticket.findMany({
            select: { status: true },
        }),
        prisma.commissionRecord.findMany({
            select: { statementMonth: true, amount: true },
            orderBy: { statementMonth: "asc" },
        }),
    ]);

    const recentTickets = await prisma.ticket.findMany({
        take: 6,
        orderBy: { updatedAt: "desc" },
        include: { requester: { select: { firstName: true, lastName: true } } },
    });

    const ticketStatusCounts = ticketStatusRows.reduce<Record<string, number>>((acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] ?? 0) + 1;
        return acc;
    }, {});

    const monthlyCommissionMap = commissionTrendRows.reduce<Record<string, number>>((acc, record) => {
        const label = new Intl.DateTimeFormat("en-US", {
            month: "short",
            year: "2-digit",
        }).format(record.statementMonth);
        acc[label] = (acc[label] ?? 0) + record.amount;
        return acc;
    }, {});

    const adminTicketChartData = {
        labels: Object.keys(ticketStatusCounts),
        datasets: [
            {
                data: Object.values(ticketStatusCounts),
                backgroundColor: ["#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#06b6d4"],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    const adminCommissionChartData = {
        labels: Object.keys(monthlyCommissionMap),
        datasets: [
            {
                label: "Commission volume",
                data: Object.values(monthlyCommissionMap),
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.15)",
                tension: 0.35,
                fill: true,
            },
        ],
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <h1 className="mt-0 mb-2">Admin Dashboard</h1>
                    <p className="text-600 m-0">
                        Manage platform activity across agents, carriers, commissions, communication, and support.
                    </p>
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Agents</div>
                    <div className="text-3xl font-semibold mt-2">{agents}</div>
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Carriers</div>
                    <div className="text-3xl font-semibold mt-2">{carriers}</div>
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Open tickets</div>
                    <div className="text-3xl font-semibold mt-2">{tickets}</div>
                </div>
            </div>
            <div className="col-12 md:col-3">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="text-600">Tracked commissions</div>
                    <div className="text-3xl font-semibold mt-2">${(commissions._sum.amount ?? 0).toFixed(0)}</div>
                </div>
            </div>
            <div className="col-12">
                <div className="flex flex-column lg:flex-row gap-4 align-items-stretch">
                    <div className="flex min-w-0 w-full" style={{ flex: "1 1 0%" }}>
                        <div className="surface-card border-round border-1 surface-border p-4 flex flex-column w-full">
                            <h3 className="mt-0 mb-2">Recent tickets</h3>
                            <div
                                className="flex-grow-1 flex flex-column justify-content-center"
                                style={{ minHeight: DASHBOARD_PANEL_MIN }}
                            >
                                {recentTickets.length === 0 ? (
                                    <p className="text-600 text-center m-0 px-3 line-height-3">
                                        No tickets yet. New support requests will appear here once they are created.
                                    </p>
                                ) : (
                                    recentTickets.map((ticket) => (
                                        <div key={ticket.id} className="border-bottom-1 surface-border py-3">
                                            <div className="font-semibold">{ticket.subject}</div>
                                            <div className="text-600 text-sm">
                                                {ticket.requester.firstName} {ticket.requester.lastName} |{" "}
                                                {ticket.status}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex min-w-0 w-full" style={{ flex: "1 1 0%" }}>
                        <DashboardChartCard
                            title="Commission trend"
                            subtitle="Track total commission volume by statement month."
                            type="line"
                            data={adminCommissionChartData}
                            height={DASHBOARD_PANEL_MIN}
                            emptyMessage="No commission records yet. Monthly totals will appear once commission data is added."
                            className="flex-grow-1"
                        />
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="flex flex-column lg:flex-row gap-4 align-items-stretch">
                    <div className="flex min-w-0 w-full" style={{ flex: "1 1 0%" }}>
                        <DashboardChartCard
                            title="Ticket status mix"
                            subtitle="See how support demand is distributed across current statuses."
                            type="doughnut"
                            data={adminTicketChartData}
                            height={DASHBOARD_PANEL_MIN}
                            emptyMessage="No tickets in the system yet. Status distribution will show after tickets are created."
                            options={{
                                cutout: "62%",
                            }}
                            className="flex-grow-1"
                        />
                    </div>
                    <div
                        className="flex flex-column gap-4 min-w-0 w-full"
                        style={{ flex: "1 1 0%" }}
                    >
                        <div className="surface-card border-round border-1 surface-border p-4 flex-shrink-0">
                            <h3 className="mt-0 mb-2">Communication overview</h3>
                            <p className="text-600 mb-2 mt-0">
                                Total active conversation threads across the platform.
                            </p>
                            <div className="text-4xl font-semibold">{conversations}</div>
                        </div>
                        <div className="flex-grow-1 flex flex-column min-h-0" style={{ minHeight: DASHBOARD_PANEL_MIN }}>
                            <LiveNotificationsPanel
                                userId={user.id}
                                initialNotifications={notifications}
                                title="Live notifications"
                                className="flex-grow-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
