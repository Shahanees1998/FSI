import { NextRequest, NextResponse } from "next/server";
import { AuthService, refreshAccessToken } from "./auth";
import { getAuthCookieOptions } from "./authCookieOptions";
import { isAdminRole, UserRole } from "./rolePermissions";

export interface AuthenticatedRequest extends NextRequest {
  user?: Awaited<ReturnType<typeof AuthService.verifyToken>>;
}

async function attachUser(req: NextRequest): Promise<AuthenticatedRequest> {
  const token = AuthService.getTokenFromRequest(req);
  if (!token) {
    return req as AuthenticatedRequest;
  }

  const payload = await AuthService.verifyToken(token);
  const authenticatedReq = req as AuthenticatedRequest;
  authenticatedReq.user = payload;
  return authenticatedReq;
}

export async function withAuth(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const authenticatedReq = await attachUser(req);
    if (!authenticatedReq.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    return handler(authenticatedReq);
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid token") {
      const refreshToken = req.cookies.get("refresh_token")?.value;
      if (!refreshToken) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 });
      }

      try {
        const newAccessToken = await refreshAccessToken(refreshToken);
        const payload = await AuthService.verifyToken(newAccessToken);
        const authenticatedReq = req as AuthenticatedRequest;
        authenticatedReq.user = payload;
        const response = await handler(authenticatedReq);
        response.cookies.set("access_token", newAccessToken, {
          ...getAuthCookieOptions(req),
          maxAge: 7 * 24 * 60 * 60,
        });
        return response;
      } catch {
        const response = NextResponse.json({ error: "Authentication required" }, { status: 401 });
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
        return response;
      }
    }

    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
}

export async function withAdminAuth(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return withAuth(req, async (authenticatedReq) => {
    if (!authenticatedReq.user || !isAdminRole(authenticatedReq.user.role)) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    return handler(authenticatedReq);
  });
}

export async function withAgentAuth(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  return withAuth(req, async (authenticatedReq) => {
    if (!authenticatedReq.user || authenticatedReq.user.role !== UserRole.AGENT) {
      return NextResponse.json({ error: "Agent access required" }, { status: 403 });
    }

    return handler(authenticatedReq);
  });
}

export async function withOptionalAuth(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const authenticatedReq = await attachUser(req);
    return handler(authenticatedReq);
  } catch {
    return handler(req as AuthenticatedRequest);
  }
}
