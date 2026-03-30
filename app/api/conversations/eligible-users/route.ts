import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { listEligibleConversationPartners } from "@/lib/portalData";

export async function GET(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const result = await listEligibleConversationPartners(
      {
        role: authenticatedReq.user!.role,
        userId: authenticatedReq.user!.userId,
      },
      request.nextUrl.searchParams
    );

    return NextResponse.json({
      users: result.data,
      pagination: result.pagination,
    });
  });
}
