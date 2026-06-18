import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { getCommissionDetailForUser } from "@/lib/portalData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const commission = await getCommissionDetailForUser(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      params.id
    );

    if (!commission) {
      return NextResponse.json({ error: "Commission not found." }, { status: 404 });
    }

    return NextResponse.json({ commission });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    if (authenticatedReq.user!.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const existing = await prisma.commissionRecord.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Commission not found." }, { status: 404 });
    }

    const body = await request.json();
    const commission = await prisma.commissionRecord.update({
      where: { id: params.id },
      data: {
        ...(body.agentId ? { agentId: body.agentId } : {}),
        ...(body.carrierProfileId ? { carrierProfileId: body.carrierProfileId } : {}),
        ...(body.policyNumber !== undefined ? { policyNumber: String(body.policyNumber) } : {}),
        ...(body.clientName !== undefined ? { clientName: String(body.clientName) } : {}),
        ...(body.productLine !== undefined ? { productLine: String(body.productLine) } : {}),
        ...(body.amount !== undefined ? { amount: Number(body.amount) } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.statementMonth ? { statementMonth: new Date(body.statementMonth) } : {}),
        ...(body.effectiveDate !== undefined
          ? { effectiveDate: body.effectiveDate ? new Date(body.effectiveDate) : null }
          : {}),
        ...(body.paidAt !== undefined ? { paidAt: body.paidAt ? new Date(body.paidAt) : null } : {}),
        ...(body.notes !== undefined ? { notes: body.notes || null } : {}),
        updatedById: authenticatedReq.user!.userId,
      },
    });

    await prisma.adminLog.create({
      data: {
        adminId: authenticatedReq.user!.userId,
        action: "COMMISSION_UPDATED",
        entityType: "COMMISSION_RECORD",
        entityId: commission.id,
        description: `Updated commission record ${commission.policyNumber}.`,
      },
    });

    return NextResponse.json({ commission });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    if (authenticatedReq.user!.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const existing = await prisma.commissionRecord.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Commission not found." }, { status: 404 });
    }

    await prisma.commissionRecord.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  });
}
