import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthService } from "@/lib/auth";
import { getAuthCookieOptions } from "@/lib/authCookieOptions";
import { APP_DEFAULT_AGENCY_NAME } from "@/lib/appBranding";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      jobTitle,
      location,
      agencyName,
      carrierName,
    } = body;

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!["AGENT", "CARRIER"].includes(String(role))) {
      return NextResponse.json({ error: "Invalid account role." }, { status: 400 });
    }

    if (String(password).length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(String(password), 12);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        phone: phone ? String(phone).trim() : null,
        role,
        status: "ACTIVE",
        jobTitle: jobTitle ? String(jobTitle).trim() : null,
        location: location ? String(location).trim() : null,
        emailVerified: true,
        ...(role === "AGENT"
          ? {
              agentProfile: {
                create: {
                  agentCode: `AGT-${Date.now()}`,
                  agencyName: agencyName ? String(agencyName).trim() : APP_DEFAULT_AGENCY_NAME,
                },
              },
            }
          : {
              carrierProfile: {
                create: {
                  carrierCode: `CAR-${Date.now()}`,
                  carrierName: carrierName
                    ? String(carrierName).trim()
                    : `${String(firstName).trim()} ${String(lastName).trim()}`,
                  contactEmail: normalizedEmail,
                  contactPhone: phone ? String(phone).trim() : null,
                  status: "ACTIVE",
                },
              },
            }),
      },
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
        profileImage: true,
        profileImagePublicId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const [accessToken, refreshToken] = await Promise.all([
      AuthService.generateAccessToken(payload),
      AuthService.generateRefreshToken(payload),
    ]);

    const response = NextResponse.json({
      success: true,
      user,
    });
    const cookieOptions = getAuthCookieOptions(request);
    response.cookies.set("access_token", accessToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60,
    });
    response.cookies.set("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "An account with that email or phone already exists." },
        { status: 409 }
      );
    }

    console.error("Register error:", error);
    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}
