import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import { listPolicySubmissionsForAgent, mergeFormDataProgress } from "@/lib/policySubmissionData";
import { parseFormDataJson, validatePolicySubmissionForCreate } from "@/lib/policySubmissionForm";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  return withAgentAuth(request, async (req) => {
    const agentId = req.user!.userId;
    const result = await listPolicySubmissionsForAgent(agentId, request.nextUrl.searchParams);
    return NextResponse.json({
      policySubmissions: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAgentAuth(request, async (req) => {
    const body = await request.json().catch(() => ({}));
    const formData = parseFormDataJson(body.formData);
    const validation = validatePolicySubmissionForCreate(formData);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { progressPercent, summaryLabel, formDataJson } = mergeFormDataProgress(formData);

    const row = await prisma.policySubmission.create({
      data: {
        agentId: req.user!.userId,
        status: "DRAFT",
        progressPercent,
        currentStep: 0,
        formData: formDataJson,
        summaryLabel,
      },
    });

    return NextResponse.json({ policySubmission: row }, { status: 201 });
  });
}
