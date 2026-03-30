import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { listUsersByRole } from "@/lib/portalData";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const result = await listUsersByRole("CARRIER", request.nextUrl.searchParams);
    return NextResponse.json({
      carriers: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const body = await request.json();
    const password = await bcrypt.hash(body.password || "password123", 12);

    const carrier = await prisma.user.create({
      data: {
        email: String(body.email).toLowerCase(),
        password,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone || null,
        role: "CARRIER",
        status: body.status || "ACTIVE",
        jobTitle: body.jobTitle || null,
        location: body.location || null,
        emailVerified: true,
        carrierProfile: {
          create: {
            carrierCode: body.carrierCode || `CAR-${Date.now()}`,
            carrierName: body.carrierName,
            contactEmail: body.contactEmail || body.email,
            contactPhone: body.contactPhone || body.phone || null,
            website: body.website || null,
            status: body.carrierStatus || "ACTIVE",
          },
        },
      },
      include: { carrierProfile: true },
    });

    return NextResponse.json({ carrier }, { status: 201 });
  });
}
