import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { role, userId } = authenticatedReq.user!;

    const unreadNotifications = await prisma.notification.count({
      where: { userId, isRead: false },
    });

    const openTickets =
      role === "ADMIN"
        ? await prisma.ticket.count({
            where: { status: { in: ["OPEN", "IN_PROGRESS", "WAITING_ON_AGENT", "WAITING_ON_CARRIER"] } },
          })
        : await prisma.ticket.count({
            where: {
              requesterId: userId,
              status: { in: ["OPEN", "IN_PROGRESS", "WAITING_ON_AGENT", "WAITING_ON_CARRIER"] },
            },
          });

    const conversations =
      role === "ADMIN"
        ? await prisma.conversation.count()
        : await prisma.conversationParticipant.count({
            where: { userId },
          });

    let commissionTotal = 0;
    if (role === "AGENT") {
      const aggregate = await prisma.commissionRecord.aggregate({
        where: { agentId: userId },
        _sum: { amount: true },
      });
      commissionTotal = aggregate._sum.amount ?? 0;
    }

    const recentTickets =
      role === "ADMIN"
        ? await prisma.ticket.findMany({
            take: 5,
            orderBy: { updatedAt: "desc" },
            include: { requester: { select: { firstName: true, lastName: true } } },
          })
        : await prisma.ticket.findMany({
            where: { requesterId: userId },
            take: 5,
            orderBy: { updatedAt: "desc" },
          });

    const recentNotifications = await prisma.notification.findMany({
      where: { userId },
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      cards: {
        unreadNotifications,
        openTickets,
        conversations,
        commissionTotal,
      },
      recentTickets,
      recentNotifications,
    });
  });
}
