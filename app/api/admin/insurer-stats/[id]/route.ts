import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const stat = await prisma.insurerStat.findUnique({
      where: { id: params.id },
      include: { carrierProfile: true, updatedBy: true },
    });

    if (!stat) {
      return NextResponse.json({ error: "Insurer stat not found." }, { status: 404 });
    }

    return NextResponse.json({ stat });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const existing = await prisma.insurerStat.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Insurer stat not found." }, { status: 404 });
    }

    const body = await request.json();
    const stat = await prisma.insurerStat.update({
      where: { id: params.id },
      data: {
        ...(body.carrierProfileId ? { carrierProfileId: body.carrierProfileId } : {}),
        ...(body.metricMonth ? { metricMonth: new Date(body.metricMonth) } : {}),
        ...(body.activeAgents !== undefined ? { activeAgents: Number(body.activeAgents) } : {}),
        ...(body.submittedPolicies !== undefined ? { submittedPolicies: Number(body.submittedPolicies) } : {}),
        ...(body.issuedPolicies !== undefined ? { issuedPolicies: Number(body.issuedPolicies) } : {}),
        ...(body.submittedPremium !== undefined ? { submittedPremium: Number(body.submittedPremium) } : {}),
        ...(body.issuedPremium !== undefined ? { issuedPremium: Number(body.issuedPremium) } : {}),
        ...(body.commissionsPaid !== undefined ? { commissionsPaid: Number(body.commissionsPaid) } : {}),
        ...(body.retentionRate !== undefined ? { retentionRate: Number(body.retentionRate) } : {}),
        ...(body.notes !== undefined ? { notes: body.notes || null } : {}),
        updatedById: authenticatedReq.user!.userId,
      },
      include: { carrierProfile: true },
    });

    await prisma.adminLog.create({
      data: {
        adminId: authenticatedReq.user!.userId,
        action: "INSURER_STAT_UPDATED",
        entityType: "INSURER_STAT",
        entityId: stat.id,
        description: `Updated insurer stat for ${stat.carrierProfile.carrierName}.`,
      },
    });

    return NextResponse.json({ stat });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const existing = await prisma.insurerStat.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Insurer stat not found." }, { status: 404 });
    }

    await prisma.insurerStat.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  });
}
