import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { listPortalContents, createPortalContent } from "@/lib/portalContentData";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const result = await listPortalContents(request.nextUrl.searchParams);
    return NextResponse.json({ contents: result.data, pagination: result.pagination });
  });
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (authenticatedReq) => {
    const body = await request.json();
    if (!body.slug || !body.title || !body.category) {
      return NextResponse.json({ error: "slug, title, and category are required." }, { status: 400 });
    }

    const content = await createPortalContent(body, authenticatedReq.user!.userId);
    return NextResponse.json({ content }, { status: 201 });
  });
}
