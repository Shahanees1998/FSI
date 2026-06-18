import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import { getAgentNetworkTreeForUser } from "@/lib/agentNetworkData";

export async function GET(request: NextRequest) {
  return withAgentAuth(request, async (authenticatedReq) => {
    const depth = Number.parseInt(request.nextUrl.searchParams.get("depth") || "3", 10);
    const order = request.nextUrl.searchParams.get("order") === "newest" ? "newest" : "oldest";

    const tree = await getAgentNetworkTreeForUser(authenticatedReq.user!.userId, {
      depth: Number.isFinite(depth) ? depth : 3,
      order,
    });

    if (!tree) {
      return NextResponse.json({ error: "Agent profile not found." }, { status: 404 });
    }

    return NextResponse.json({ tree });
  });
}
