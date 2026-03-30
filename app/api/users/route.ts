import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        jobTitle: true,
        location: true,
        createdAt: true,
        agentProfile: { select: { agentCode: true, agencyName: true } },
        carrierProfile: { select: { carrierName: true, carrierCode: true } },
      },
    });

    return NextResponse.json({ users });
  });
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const body = await request.json();
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      status = "ACTIVE",
      jobTitle,
      location,
      agentCode,
      carrierCode,
      carrierName,
    } = body;

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(String(password), 12);

    try {
      const user = await prisma.user.create({
        data: {
          email: String(email).toLowerCase(),
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          role,
          status,
          jobTitle,
          location,
          emailVerified: true,
          ...(role === "AGENT"
            ? {
                agentProfile: {
                  create: {
                    agentCode: agentCode || `AGT-${Date.now()}`,
                    agencyName: "Freedom Shield Insurance",
                  },
                },
              }
            : {}),
          ...(role === "CARRIER"
            ? {
                carrierProfile: {
                  create: {
                    carrierCode: carrierCode || `CAR-${Date.now()}`,
                    carrierName: carrierName || `${firstName} ${lastName}`,
                  },
                },
              }
            : {}),
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
        },
      });

      await prisma.adminLog.create({
        data: {
          adminId: authenticatedReq.user!.userId,
          action: "USER_CREATED",
          entityType: "USER",
          entityId: user.id,
          description: `Created ${role.toLowerCase()} account for ${firstName} ${lastName}.`,
        },
      });

      return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
    }
  });
}
