import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import { listPolicySubmissionsForAgent } from "@/lib/policySubmissionData";
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
    const row = await prisma.policySubmission.create({
      data: {
        agentId: req.user!.userId,
        status: "DRAFT",
        progressPercent: 0,
        currentStep: 0,
        formData: {},
        summaryLabel: "Policy submission",
      },
    });

    return NextResponse.json({ policySubmission: row }, { status: 201 });
  });
}
