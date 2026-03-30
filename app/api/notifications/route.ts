import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { createNotificationAndBroadcast, listNotificationsForUser } from "@/lib/portalData";
import { publishNotification } from "@/lib/realtime";

export async function GET(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const result = await listNotificationsForUser(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      request.nextUrl.searchParams
    );

    return NextResponse.json({
      notifications: result.data,
      unreadCount: result.unreadCount,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    if (authenticatedReq.user!.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId, title, message, type = "SYSTEM", link } = await request.json();
    if (!userId || !title || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const notification = await createNotificationAndBroadcast({
      userId,
      title,
      message,
      type,
      link,
    });
    await publishNotification(userId, notification);

    return NextResponse.json({ notification }, { status: 201 });
  });
}
