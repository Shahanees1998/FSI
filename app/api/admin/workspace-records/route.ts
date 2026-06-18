import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { listWorkspaceRecordsAdmin } from "@/lib/adminWorkspaceData";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const result = await listWorkspaceRecordsAdmin(request.nextUrl.searchParams);
    return NextResponse.json({ records: result.data, pagination: result.pagination });
  });
}
