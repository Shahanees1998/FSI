import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import {
  deleteWorkspaceRecordForAgent,
  getWorkspaceRecordForAgent,
  updateWorkspaceRecordForAgent,
} from "@/lib/agentWorkspaceData";
import { parseWorkspaceRecordType } from "@/lib/workspaceRecordConfig";
import { validateWorkspaceRecordInput } from "@/lib/workspaceRecordValidation";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAgentAuth(request, async (authenticatedReq) => {
    const recordType = parseWorkspaceRecordType(request.nextUrl.searchParams.get("recordType") || "");
    if (!recordType) {
      return NextResponse.json({ error: "Valid recordType is required." }, { status: 400 });
    }

    const record = await getWorkspaceRecordForAgent(
      authenticatedReq.user!.userId,
      recordType,
      params.id
    );

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
  return withAgentAuth(request, async (authenticatedReq) => {
    const body = await request.json();
    const recordType = parseWorkspaceRecordType(body.recordType);
    if (!recordType) {
      return NextResponse.json({ error: "Valid recordType is required." }, { status: 400 });
    }

    const validation = validateWorkspaceRecordInput(recordType, body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const record = await updateWorkspaceRecordForAgent(
      authenticatedReq.user!.userId,
      recordType,
      params.id,
      body
    );

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
  return withAgentAuth(request, async (authenticatedReq) => {
    const recordType = parseWorkspaceRecordType(request.nextUrl.searchParams.get("recordType") || "");
    if (!recordType) {
      return NextResponse.json({ error: "Valid recordType is required." }, { status: 400 });
    }

    const record = await deleteWorkspaceRecordForAgent(
      authenticatedReq.user!.userId,
      recordType,
      params.id
    );

    if (!record) {
      return NextResponse.json({ error: "Record not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  });
}
