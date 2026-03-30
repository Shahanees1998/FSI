import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { listCommissionsForUser } from "@/lib/portalData";

export async function GET(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const result = await listCommissionsForUser(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      request.nextUrl.searchParams
    );

    return NextResponse.json({
      commissions: result.data,
      totals: result.totals,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    if (authenticatedReq.user!.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const commission = await prisma.commissionRecord.create({
      data: {
        agentId: body.agentId,
        carrierProfileId: body.carrierProfileId,
        policyNumber: body.policyNumber,
        clientName: body.clientName,
        productLine: body.productLine,
        amount: Number(body.amount),
        status: body.status || "PENDING",
        statementMonth: new Date(body.statementMonth),
        effectiveDate: body.effectiveDate ? new Date(body.effectiveDate) : null,
        paidAt: body.paidAt ? new Date(body.paidAt) : null,
        notes: body.notes || null,
        updatedById: authenticatedReq.user!.userId,
      },
    });

    return NextResponse.json({ commission }, { status: 201 });
  });
}
