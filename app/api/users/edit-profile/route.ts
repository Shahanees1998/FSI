import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const userId = authenticatedReq.user!.userId;
    const { firstName, lastName, phone, jobTitle, location } = await request.json();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone: phone ?? null,
        jobTitle: jobTitle ?? null,
        location: location ?? null,
      },
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
      },
    });

    return NextResponse.json({ user });
  });
}
