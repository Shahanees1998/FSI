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

    const agent = await prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone ?? null,
        status: body.status,
        jobTitle: body.jobTitle ?? null,
        location: body.location ?? null,
        agentProfile: body.agentProfile
          ? {
              update: {
                licenseNumber: body.agentProfile.licenseNumber ?? null,
                fundServCode: body.agentProfile.fundServCode ?? null,
                agencyName: body.agentProfile.agencyName ?? null,
                city: body.agentProfile.city ?? null,
                state: body.agentProfile.state ?? null,
                country: body.agentProfile.country ?? null,
              },
            }
          : undefined,
      },
      include: { agentProfile: true },
    });

    return NextResponse.json({ agent });
  });
}
