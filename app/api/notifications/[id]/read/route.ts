import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { id } = params;
    const notification = await prisma.notification.updateMany({
      where: { id, userId: authenticatedReq.user!.userId },
      data: { isRead: true },
    });

    return NextResponse.json({ success: true, count: notification.count });
  });
}
