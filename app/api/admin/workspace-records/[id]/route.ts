import { NextRequest, NextResponse } from "next/server";
import {
  deleteWorkspaceRecordAdmin,
  getWorkspaceRecordAdmin,
  updateWorkspaceRecordAdmin,
} from "@/lib/adminWorkspaceData";
import { withAdminAuth } from "@/lib/authMiddleware";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const record = await getWorkspaceRecordAdmin(params.id);
    if (!record) {
      return NextResponse.json({ error: "Record not found." }, { status: 404 });
    }
    return NextResponse.json({ record });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const body = await request.json();
    const record = await updateWorkspaceRecordAdmin(params.id, body);
    if (!record) {
      return NextResponse.json({ error: "Record not found." }, { status: 404 });
    }
    return NextResponse.json({ record });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const record = await deleteWorkspaceRecordAdmin(params.id);
    if (!record) {
      return NextResponse.json({ error: "Record not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  });
}
