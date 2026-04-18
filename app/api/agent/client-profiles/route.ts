import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import { listClientProfilesForAgent } from "@/lib/clientProfileData";
import { parseClientProfileBody } from "@/lib/clientProfilePayload";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  return withAgentAuth(request, async (req) => {
    const agentId = req.user!.userId;
    const result = await listClientProfilesForAgent(agentId, request.nextUrl.searchParams);
    return NextResponse.json({
      profiles: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAgentAuth(request, async (req) => {
    const body = await request.json();
    const parsed = parseClientProfileBody(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const profile = await prisma.clientProfile.create({
      data: {
        agentId: req.user!.userId,
        ...parsed.fields,
      },
    });

    return NextResponse.json({ profile }, { status: 201 });
  });
}
