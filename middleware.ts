import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthService } from "@/lib/auth";
import { canAccessPath, getDefaultRedirectPath } from "@/lib/rolePermissions";

const PUBLIC_PREFIXES = [
  "/_next",
  "/favicon.ico",
  // Static files under public/ (logos, etc.) must bypass auth or <img> requests get HTML redirects
  "/images",
  "/auth/login",
  "/auth/register",
  "/auth/forgotpassword",
  "/auth/reset-password",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/auth/refresh",
  "/api/auth/me",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
];

function isPublicPath(pathname: string) {
  return PUBLIC_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = AuthService.getTokenFromRequest(req);

  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      const payload = await AuthService.verifyToken(token);
      return NextResponse.redirect(new URL(getDefaultRedirectPath(payload.role), req.url));
    } catch {
      const response = NextResponse.redirect(new URL("/auth/login", req.url));
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = await AuthService.verifyToken(token);
    if (!canAccessPath(payload.role, pathname)) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      return NextResponse.redirect(new URL(getDefaultRedirectPath(payload.role), req.url));
    }

    return NextResponse.next();
  } catch {
    const response = pathname.startsWith("/api/")
      ? NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
      : NextResponse.redirect(new URL("/auth/login", req.url));

    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
