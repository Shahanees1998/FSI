import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { listUsersByRole } from "@/lib/portalData";
import { APP_DEFAULT_AGENCY_NAME } from "@/lib/appBranding";

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

    let companyConnect: { connect: { id: string } } | undefined;
    if (body.companyId && typeof body.companyId === "string") {
      const company = await prisma.company.findFirst({
        where: { id: body.companyId, deletedAt: null },
        select: { id: true },
      });
      if (company) {
        companyConnect = { connect: { id: company.id } };
      }
    }

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
            agencyName: body.agencyName || APP_DEFAULT_AGENCY_NAME,
            city: body.city || null,
            state: body.state || null,
            country: body.country || null,
            ...(companyConnect ? { company: companyConnect } : {}),
          },
        },
      },
      include: { agentProfile: { include: { company: true } } },
    });

    return NextResponse.json({ agent }, { status: 201 });
  });
}
