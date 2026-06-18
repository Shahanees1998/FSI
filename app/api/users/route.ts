import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { APP_DEFAULT_AGENCY_NAME } from "@/lib/appBranding";
import {
  buildPagedResult,
  getSearchValue,
  normalizeSearchTerm,
  parsePagination,
} from "@/lib/portalPagination";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const pagination = parsePagination(request.nextUrl.searchParams, { defaultPageSize: 20 });
    const q = normalizeSearchTerm(getSearchValue(request.nextUrl.searchParams, "q"));
    const role = normalizeSearchTerm(getSearchValue(request.nextUrl.searchParams, "role"));
    const status = normalizeSearchTerm(getSearchValue(request.nextUrl.searchParams, "status"));

    const where = {
      isDeleted: false,
      ...(role ? { role: role as "ADMIN" | "AGENT" | "CARRIER" } : {}),
      ...(status ? { status: status as "INVITED" | "ACTIVE" | "INACTIVE" | "SUSPENDED" } : {}),
      ...(q
        ? {
            OR: [
              { firstName: { contains: q } },
              { lastName: { contains: q } },
              { email: { contains: q } },
              { phone: { contains: q } },
            ],
          }
        : {}),
    };

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: pagination.skip,
        take: pagination.pageSize,
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
      }),
    ]);

    return NextResponse.json({
      users,
      pagination: buildPagedResult(users, total, pagination).pagination,
    });
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
                    agencyName: APP_DEFAULT_AGENCY_NAME,
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
