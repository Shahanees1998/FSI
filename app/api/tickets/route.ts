import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { listTicketsForUser } from "@/lib/portalData";

export async function GET(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const result = await listTicketsForUser(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      request.nextUrl.searchParams
    );

    return NextResponse.json({
      tickets: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const body = await request.json();
    const { category, subject, description, priority } = body;

    if (!category || !subject || !description) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const ticket = await prisma.ticket.create({
      data: {
        requesterId: authenticatedReq.user!.userId,
        assignedToId: authenticatedReq.user!.role === "ADMIN" ? body.assignedToId || null : null,
        category,
        subject,
        description,
        priority: priority || "MEDIUM",
        status: "OPEN",
      },
    });

    await prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        authorId: authenticatedReq.user!.userId,
        body: description,
      },
    });

    return NextResponse.json({ ticket }, { status: 201 });
  });
}
