import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import {
  broadcastConversationInboxUpdate,
  createNotificationAndBroadcast,
  listConversationsForUser,
  validateNewConversationParticipants,
} from "@/lib/portalData";
import { publishConversationMessage, publishNotification } from "@/lib/realtime";

export async function GET(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const result = await listConversationsForUser(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      request.nextUrl.searchParams
    );

    return NextResponse.json({
      conversations: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { subject, participantIds, message } = await request.json();
    if (!subject || !Array.isArray(participantIds) || participantIds.length === 0) {
      return NextResponse.json({ error: "Missing conversation details." }, { status: 400 });
    }

    const uniqueParticipants = Array.from(
      new Set([authenticatedReq.user!.userId, ...participantIds])
    );

    const validation = await validateNewConversationParticipants(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      participantIds
    );
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 403 });
    }

    const conversation = await prisma.conversation.create({
      data: {
        subject,
        type: uniqueParticipants.length > 2 ? "GROUP" : "DIRECT",
        createdById: authenticatedReq.user!.userId,
        lastMessageAt: message ? new Date() : null,
        participants: {
          create: uniqueParticipants.map((participantId) => ({ userId: participantId })),
        },
        ...(message
          ? {
              messages: {
                create: {
                  senderId: authenticatedReq.user!.userId,
                  body: message,
                  messageType: "TEXT",
                },
              },
            }
          : {}),
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                role: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    const latestMessage = conversation.messages[0] ?? null;
    const recipients = conversation.participants.filter(
      (participant) => participant.userId !== authenticatedReq.user!.userId
    );

    await Promise.all([
      broadcastConversationInboxUpdate(conversation.id),
      ...(latestMessage
        ? [
            publishConversationMessage(conversation.id, {
              conversationId: conversation.id,
              message: latestMessage,
            }),
          ]
        : []),
      ...recipients.map(async (recipient) => {
        const notification = await createNotificationAndBroadcast({
          userId: recipient.userId,
          title: "New conversation started",
          message: `A new conversation about "${subject}" was created.`,
          type: "SYSTEM",
          link: `/${
            recipient.user.role === "ADMIN"
              ? "admin"
              : recipient.user.role === "CARRIER"
                ? "carrier"
                : "agent"
          }/messages/${conversation.id}`,
        });
        await publishNotification(recipient.userId, notification);
      }),
    ]);

    return NextResponse.json({ conversation }, { status: 201 });
  });
}
