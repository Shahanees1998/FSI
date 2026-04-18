import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import { getClientProfileForAgent } from "@/lib/clientProfileData";
import { parseClientProfileBody } from "@/lib/clientProfilePayload";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAgentAuth(request, async (req) => {
    const profile = await getClientProfileForAgent(req.user!.userId, params.id, { includeDeleted: true });
    if (!profile) {
      return NextResponse.json({ error: "Client profile not found." }, { status: 404 });
    }

    return NextResponse.json({ profile });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAgentAuth(request, async (req) => {
    const existing = await getClientProfileForAgent(req.user!.userId, params.id);
    if (!existing) {
      return NextResponse.json({ error: "Client profile not found." }, { status: 404 });
    }

    const body = await request.json();
    const parsed = parseClientProfileBody(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const profile = await prisma.clientProfile.update({
      where: { id: params.id },
      data: parsed.fields,
    });

    return NextResponse.json({ profile });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAgentAuth(request, async (req) => {
    const existing = await getClientProfileForAgent(req.user!.userId, params.id);
    if (!existing) {
      return NextResponse.json({ error: "Client profile not found." }, { status: 404 });
    }

    await prisma.clientProfile.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ ok: true });
  });
}
