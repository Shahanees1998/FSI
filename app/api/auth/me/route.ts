import { NextRequest, NextResponse } from "next/server";
import { withOptionalAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  return withOptionalAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    if (!authenticatedReq.user?.userId) {
      return NextResponse.json({ success: false, user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: authenticatedReq.user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        jobTitle: true,
        location: true,
        profileImage: true,
        profileImagePublicId: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: user ?? null,
    });
  });
}
