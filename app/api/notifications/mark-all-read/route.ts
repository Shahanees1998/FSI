import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const result = await prisma.notification.updateMany({
      where: { userId: authenticatedReq.user!.userId, isRead: false },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true, count: result.count });
  });
}
