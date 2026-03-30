import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { getUserDirectoryDetail } from "@/lib/portalData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const carrier = await getUserDirectoryDetail("CARRIER", params.id);
    if (!carrier) {
      return NextResponse.json({ error: "Carrier not found." }, { status: 404 });
    }

    return NextResponse.json({ carrier });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const { id } = params;
    const body = await request.json();

    const carrier = await prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone ?? null,
        status: body.status,
        jobTitle: body.jobTitle ?? null,
        location: body.location ?? null,
        carrierProfile: body.carrierProfile
          ? {
              update: {
                carrierName: body.carrierProfile.carrierName,
                contactEmail: body.carrierProfile.contactEmail ?? null,
                contactPhone: body.carrierProfile.contactPhone ?? null,
                website: body.carrierProfile.website ?? null,
                status: body.carrierProfile.status ?? "ACTIVE",
              },
            }
          : undefined,
      },
      include: { carrierProfile: true },
    });

    return NextResponse.json({ carrier });
  });
}
