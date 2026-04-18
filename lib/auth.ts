import { SignJWT, decodeJwt, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "JS Investment-development-secret-change-me"
);

const ACCESS_TOKEN_EXPIRY = "7d";
const REFRESH_TOKEN_EXPIRY = "30d";

export interface JWTClaims {
  userId: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthService {
  static async generateAccessToken(payload: Omit<JWTClaims, "iat" | "exp">) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(ACCESS_TOKEN_EXPIRY)
      .sign(JWT_SECRET);
  }

  static async generateRefreshToken(payload: Omit<JWTClaims, "iat" | "exp">) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(REFRESH_TOKEN_EXPIRY)
      .sign(JWT_SECRET);
  }

  static async verifyToken(token: string): Promise<JWTClaims> {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return payload as unknown as JWTClaims;
    } catch {
      throw new Error("Invalid token");
    }
  }

  static decodeToken(token: string): JWTClaims | null {
    try {
      return decodeJwt(token) as JWTClaims;
    } catch {
      return null;
    }
  }

  static async authenticateUser(credentials: LoginCredentials): Promise<AuthTokens> {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || user.isDeleted) {
      throw new Error("Invalid email or password");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("Account is not active. Please contact the JS Investment administrator.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const payload: Omit<JWTClaims, "iat" | "exp"> = {
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

    return { accessToken, refreshToken };
  }

  static async refreshAccessToken(refreshToken: string) {
    const payload = await AuthService.verifyToken(refreshToken);
    return AuthService.generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
  }

  static getTokenFromRequest(req: NextRequest): string | null {
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      return authHeader.slice(7);
    }

    return req.cookies.get("access_token")?.value ?? null;
  }

  static async setAuthCookies(accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }

  static async clearAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
  }
}

export function getTokenFromRequest(req: NextRequest) {
  return AuthService.getTokenFromRequest(req);
}

export async function refreshAccessToken(refreshToken: string) {
  return AuthService.refreshAccessToken(refreshToken);
}
