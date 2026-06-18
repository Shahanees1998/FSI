import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import { createWorkspaceRecordForAgent, WorkspaceRecordInput } from "@/lib/agentWorkspaceData";
import { validateWorkspaceRecordInput } from "@/lib/workspaceRecordValidation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  return withAgentAuth(request, async (authenticatedReq) => {
    const body = await request.json();
    const {
      firstName,
      middleName,
      lastName,
      email,
      recruiterProfileId,
      message,
      aoaLanguage = "english",
      splitRecruiting = false,
    } = body;

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "First name, last name, and email are required." }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    if (!EMAIL_RE.test(normalizedEmail)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const associate = [firstName, middleName, lastName].filter(Boolean).join(" ").trim();

    const input: WorkspaceRecordInput = {
      associate,
      status: "Invited",
      recordDate: new Date(),
      metadata: {
        email: normalizedEmail,
        recruiterProfileId: recruiterProfileId || "",
        message: message?.trim() || "",
        aoaLanguage,
        splitRecruiting: Boolean(splitRecruiting),
      },
    };

    const validation = validateWorkspaceRecordInput("TEAM_INVITEE", input);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const record = await createWorkspaceRecordForAgent(authenticatedReq.user!.userId, "TEAM_INVITEE", input);

    return NextResponse.json({ success: true, record }, { status: 201 });
  });
}
