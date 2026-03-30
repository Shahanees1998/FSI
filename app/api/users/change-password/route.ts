import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required." },
        { status: 400 }
      );
    }

    if (String(newPassword).length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: authenticatedReq.user!.userId },
      select: { id: true, password: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const passwordMatches = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatches) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(String(newPassword), 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  });
}
