import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { isAdminRole } from "@/lib/rolePermissions";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { id } = params;
    const requester = authenticatedReq.user!;

    if (!isAdminRole(requester.role) && requester.userId !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        agentProfile: true,
        carrierProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const { id } = params;
    if (!isAdminRole(authenticatedReq.user!.role) && authenticatedReq.user!.userId !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { firstName, lastName, phone, jobTitle, location, status } = await request.json();

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(jobTitle !== undefined ? { jobTitle } : {}),
        ...(location !== undefined ? { location } : {}),
        ...(isAdminRole(authenticatedReq.user!.role) && status !== undefined ? { status } : {}),
      },
    });

    return NextResponse.json({ user });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    if (!isAdminRole(authenticatedReq.user!.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = params;

    await prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
        status: "INACTIVE",
      },
    });

    return NextResponse.json({ success: true });
  });
}
