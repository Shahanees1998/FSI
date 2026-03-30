import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { createNotificationAndBroadcast } from "@/lib/portalData";
import { publishNotification } from "@/lib/realtime";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { id } = params;
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        requester: { select: { firstName: true, lastName: true, email: true } },
        assignedTo: { select: { firstName: true, lastName: true, email: true } },
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            author: { select: { firstName: true, lastName: true, role: true } },
          },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    const canView =
      authenticatedReq.user!.role === "ADMIN" ||
      ticket.requesterId === authenticatedReq.user!.userId ||
      ticket.assignedToId === authenticatedReq.user!.userId;

    if (!canView) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ ticket });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { id } = params;
    const { message, status, assignedToId, internal } = await request.json();

    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
    }

    const canUpdate =
      authenticatedReq.user!.role === "ADMIN" || ticket.requesterId === authenticatedReq.user!.userId;
    if (!canUpdate) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(authenticatedReq.user!.role === "ADMIN" ? { assignedToId: assignedToId ?? ticket.assignedToId } : {}),
      },
    });

    if (message) {
      await prisma.ticketMessage.create({
        data: {
          ticketId: id,
          authorId: authenticatedReq.user!.userId,
          body: message,
          internal: authenticatedReq.user!.role === "ADMIN" && Boolean(internal),
        },
      });
    }

    const recipients = [ticket.requesterId, ticket.assignedToId]
      .filter(Boolean)
      .filter((recipientId, index, values) => values.indexOf(recipientId) === index)
      .filter((recipientId) => recipientId !== authenticatedReq.user!.userId);

    const author = await prisma.user.findUnique({
      where: { id: authenticatedReq.user!.userId },
      select: { firstName: true, lastName: true, role: true },
    });

    await Promise.all(
      recipients.map(async (recipientId) => {
        const recipient = await prisma.user.findUnique({
          where: { id: recipientId! },
          select: { role: true },
        });

        const notification = await createNotificationAndBroadcast({
          userId: recipientId!,
          title: "Ticket updated",
          message: `${author?.firstName ?? "A user"} ${author?.lastName ?? ""} updated "${ticket.subject}".`,
          type: "SYSTEM",
          link: `/${
            recipient?.role === "ADMIN"
              ? "admin"
              : recipient?.role === "CARRIER"
                ? "carrier"
                : "agent"
          }/tickets/${id}`,
        });

        await publishNotification(recipientId!, notification);
      })
    );

    return NextResponse.json({ ticket: updatedTicket });
  });
}
