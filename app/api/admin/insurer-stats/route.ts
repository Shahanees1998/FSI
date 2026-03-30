import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { listInsurerStats } from "@/lib/portalData";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const result = await listInsurerStats(request.nextUrl.searchParams);
    return NextResponse.json({
      stats: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const body = await request.json();

    const stat = await prisma.insurerStat.create({
      data: {
        carrierProfileId: body.carrierProfileId,
        metricMonth: new Date(body.metricMonth),
        activeAgents: Number(body.activeAgents || 0),
        submittedPolicies: Number(body.submittedPolicies || 0),
        issuedPolicies: Number(body.issuedPolicies || 0),
        submittedPremium: Number(body.submittedPremium || 0),
        issuedPremium: Number(body.issuedPremium || 0),
        commissionsPaid: Number(body.commissionsPaid || 0),
        retentionRate: Number(body.retentionRate || 0),
        notes: body.notes || null,
        updatedById: authenticatedReq.user!.userId,
      },
    });

    return NextResponse.json({ stat }, { status: 201 });
  });
}
