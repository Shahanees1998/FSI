import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import {
  broadcastConversationInboxUpdate,
  createNotificationAndBroadcast,
  getConversationDetailForUser,
} from "@/lib/portalData";
import { publishConversationMessage, publishNotification } from "@/lib/realtime";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const result = await getConversationDetailForUser(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      params.id,
      request.nextUrl.searchParams
    );

    if (!result) {
      return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
    }

    return NextResponse.json(result);
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { body } = await request.json();
    if (!String(body || "").trim()) {
      return NextResponse.json({ error: "Message body is required." }, { status: 400 });
    }

    const result = await getConversationDetailForUser(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      params.id,
      new URLSearchParams()
    );

    if (!result) {
      return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
    }

    const message = await prisma.conversationMessage.create({
      data: {
        conversationId: params.id,
        senderId: authenticatedReq.user!.userId,
        body: String(body).trim(),
        messageType: "TEXT",
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
    });

    await prisma.conversation.update({
      where: { id: params.id },
      data: { lastMessageAt: new Date() },
    });

    const recipients = result.conversation.participants.filter(
      (participant) => participant.userId !== authenticatedReq.user!.userId
    );

    await Promise.all([
      publishConversationMessage(params.id, {
        conversationId: params.id,
        message,
      }),
      broadcastConversationInboxUpdate(params.id),
      ...recipients.map(async (participant) => {
        const notification = await createNotificationAndBroadcast({
          userId: participant.userId,
          title: "New message received",
          message: `${message.sender.firstName} ${message.sender.lastName}: ${message.body}`,
          type: "SYSTEM",
        });
        await publishNotification(participant.userId, notification);
      }),
    ]);

    return NextResponse.json({ message }, { status: 201 });
  });
}
