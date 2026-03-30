import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuthService } from "@/lib/auth";
import { getAuthCookieOptions } from "@/lib/authCookieOptions";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const { accessToken, refreshToken } = await AuthService.authenticateUser({
      email: normalizedEmail,
      password: String(password),
    });

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
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
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

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
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Login failed.",
      },
      { status: 401 }
    );
  }
}
