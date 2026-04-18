import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import {
  getPolicySubmissionForAgent,
  mergeFormDataProgress,
  mergeStoredAndIncomingFormData,
  parseFormDataJson,
} from "@/lib/policySubmissionData";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return withAgentAuth(request, async (req) => {
    const row = await getPolicySubmissionForAgent(req.user!.userId, params.id, { includeDeleted: true });
    if (!row) {
      return NextResponse.json({ error: "Policy submission not found." }, { status: 404 });
    }

    return NextResponse.json({ policySubmission: row });
  });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  return withAgentAuth(request, async (req) => {
    const existing = await getPolicySubmissionForAgent(req.user!.userId, params.id);
    if (!existing) {
      return NextResponse.json({ error: "Policy submission not found." }, { status: 404 });
    }

    const body = await request.json();
    const formData =
      body.formData !== undefined
        ? mergeStoredAndIncomingFormData(existing.formData, body.formData)
        : parseFormDataJson(existing.formData);
    const { progressPercent, summaryLabel, formDataJson } = mergeFormDataProgress(formData);

    const currentStep =
      typeof body.currentStep === "number" && body.currentStep >= 0 && body.currentStep <= 3
        ? body.currentStep
        : undefined;

    let status: "DRAFT" | "SUBMITTED" | undefined;
    if (body.status === "SUBMITTED") {
      status = "SUBMITTED";
    } else if (body.status === "DRAFT") {
      status = "DRAFT";
    }

    const policySubmission = await prisma.policySubmission.update({
      where: { id: params.id },
      data: {
        formData: formDataJson,
        progressPercent,
        summaryLabel,
        ...(currentStep !== undefined ? { currentStep } : {}),
        ...(status !== undefined ? { status } : {}),
      },
    });

    return NextResponse.json({ policySubmission });
  });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return withAgentAuth(request, async (req) => {
    const existing = await getPolicySubmissionForAgent(req.user!.userId, params.id);
    if (!existing) {
      return NextResponse.json({ error: "Policy submission not found." }, { status: 404 });
    }

    await prisma.policySubmission.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ ok: true });
  });
}
