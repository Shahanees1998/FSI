import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import {
  deletePortalContent,
  getPortalContentById,
  updatePortalContent,
} from "@/lib/portalContentData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const content = await getPortalContentById(params.id);
    if (!content) {
      return NextResponse.json({ error: "Content not found." }, { status: 404 });
    }
    return NextResponse.json({ content });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const body = await request.json();
    const content = await updatePortalContent(params.id, body);
    return NextResponse.json({ content });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    await deletePortalContent(params.id);
    return NextResponse.json({ success: true });
  });
}
