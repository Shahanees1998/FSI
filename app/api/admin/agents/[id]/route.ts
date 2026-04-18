import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { getUserDirectoryDetail } from "@/lib/portalData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const agent = await getUserDirectoryDetail("AGENT", params.id);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found." }, { status: 404 });
    }

    return NextResponse.json({ agent });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const { id } = params;
    const body = await request.json();

    let companyUpdate:
      | { connect: { id: string } }
      | { disconnect: true }
      | undefined;
    if (body.companyId !== undefined) {
      if (!body.companyId) {
        companyUpdate = { disconnect: true };
      } else {
        const company = await prisma.company.findFirst({
          where: { id: String(body.companyId), deletedAt: null },
          select: { id: true },
        });
        companyUpdate = company ? { connect: { id: company.id } } : { disconnect: true };
      }
    }

    const ap = body.agentProfile;
    const agentProfileData =
      ap || companyUpdate !== undefined
        ? {
            update: {
              ...(ap
                ? {
                    licenseNumber: ap.licenseNumber ?? null,
                    fundServCode: ap.fundServCode ?? null,
                    agencyName: ap.agencyName ?? null,
                    city: ap.city ?? null,
                    state: ap.state ?? null,
                    country: ap.country ?? null,
                  }
                : {}),
              ...(companyUpdate !== undefined ? { company: companyUpdate } : {}),
            },
          }
        : undefined;

    const agent = await prisma.user.update({
      where: { id },
      data: {
        ...(body.firstName !== undefined ? { firstName: body.firstName } : {}),
        ...(body.lastName !== undefined ? { lastName: body.lastName } : {}),
        ...(body.phone !== undefined ? { phone: body.phone ?? null } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.jobTitle !== undefined ? { jobTitle: body.jobTitle ?? null } : {}),
        ...(body.location !== undefined ? { location: body.location ?? null } : {}),
        ...(agentProfileData ? { agentProfile: agentProfileData } : {}),
      },
      include: { agentProfile: { include: { company: true } } },
    });

    return NextResponse.json({ agent });
  });
}
