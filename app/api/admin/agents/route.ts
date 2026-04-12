import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { listUsersByRole } from "@/lib/portalData";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const result = await listUsersByRole("AGENT", request.nextUrl.searchParams);
    return NextResponse.json({
      agents: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const body = await request.json();
    const password = await bcrypt.hash(body.password || "password123", 12);

    const agent = await prisma.user.create({
      data: {
        email: String(body.email).toLowerCase(),
        password,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone || null,
        role: "AGENT",
        status: body.status || "ACTIVE",
        jobTitle: body.jobTitle || null,
        location: body.location || null,
        emailVerified: true,
        agentProfile: {
          create: {
            agentCode: body.agentCode || `AGT-${Date.now()}`,
            licenseNumber: body.licenseNumber || null,
            fundServCode: body.fundServCode || null,
            agencyName: body.agencyName || "Freedom Shield Insurance",
            city: body.city || null,
            state: body.state || null,
            country: body.country || null,
          },
        },
      },
      include: { agentProfile: true },
    });

    return NextResponse.json({ agent }, { status: 201 });
  });
}
