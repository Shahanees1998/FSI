import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import {
  createWorkspaceRecordForAgent,
  listWorkspaceRecordsForAgent,
} from "@/lib/agentWorkspaceData";
import { getWorkspaceConfig, parseWorkspaceRecordType } from "@/lib/workspaceRecordConfig";
import { validateWorkspaceRecordInput } from "@/lib/workspaceRecordValidation";
import { WorkspaceRecordType } from "@prisma/client";

function parseRecordTypeParam(value: string | null): WorkspaceRecordType | null {
  if (!value) return null;
  return parseWorkspaceRecordType(value);
}

export async function GET(request: NextRequest) {
  return withAgentAuth(request, async (authenticatedReq) => {
    const recordType = parseRecordTypeParam(request.nextUrl.searchParams.get("recordType"));
    if (!recordType) {
      return NextResponse.json({ error: "Valid recordType is required." }, { status: 400 });
    }

    const config = getWorkspaceConfig(recordType);
    const filterKeys = config.filterFields?.map((field) => field.key) ?? [];
    const result = await listWorkspaceRecordsForAgent(
      authenticatedReq.user!.userId,
      recordType,
      request.nextUrl.searchParams,
      filterKeys
    );

    return NextResponse.json({
      records: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAgentAuth(request, async (authenticatedReq) => {
    const body = await request.json();
    const recordType = parseRecordTypeParam(body.recordType);
    if (!recordType) {
      return NextResponse.json({ error: "Valid recordType is required." }, { status: 400 });
    }

    const validation = validateWorkspaceRecordInput(recordType, body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const record = await createWorkspaceRecordForAgent(authenticatedReq.user!.userId, recordType, body);
    return NextResponse.json({ record }, { status: 201 });
  });
}
