import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import { listRecruiterOptions } from "@/lib/agentNetworkData";
import { createWorkspaceRecordForAgent } from "@/lib/agentWorkspaceData";
import { prisma } from "@/lib/prisma";
import { APP_DEFAULT_AGENCY_NAME } from "@/lib/appBranding";

export async function POST(request: NextRequest) {
  return withAgentAuth(request, async (authenticatedReq) => {
    const body = await request.json();
    const {
      firstLegalName,
      middleLegalName,
      lastLegalName,
      firstPreferredName,
      lastPreferredName,
      email,
      phone,
      birthDate,
      streetAddress,
      city,
      state,
      zipCode,
      recruiterProfileId,
      country = "USA",
    } = body;

    if (!firstLegalName || !lastLegalName || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: String(email).toLowerCase() } });
    if (existing) {
      return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
    }

    const tempPassword = `Aoa${Date.now().toString(36)}!`;
    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    const preferredFirst = firstPreferredName || firstLegalName;
    const preferredLast = lastPreferredName || lastLegalName;

    const user = await prisma.user.create({
      data: {
        email: String(email).toLowerCase(),
        password: hashedPassword,
        firstName: firstLegalName,
        lastName: lastLegalName,
        phone: phone || null,
        role: "AGENT",
        status: "INVITED",
        emailVerified: false,
        agentProfile: {
          create: {
            agentCode: `AGT-${Date.now()}`,
            agencyName: APP_DEFAULT_AGENCY_NAME,
            city: city || null,
            state: state || null,
            country,
            address: streetAddress || null,
            recruiterProfileId: recruiterProfileId || null,
          },
        },
      },
      include: { agentProfile: true },
    });

    await createWorkspaceRecordForAgent(authenticatedReq.user!.userId, "TEAM_INVITEE", {
      associate: `${preferredFirst} ${preferredLast}`,
      status: "Submitted",
      recordDate: new Date(),
      metadata: {
        email,
        phone: phone || "",
        recruiterProfileId: recruiterProfileId || "",
        userId: user.id,
        agentCode: user.agentProfile?.agentCode,
      },
    });

    return NextResponse.json(
      {
        success: true,
        userId: user.id,
        message: "AOA application submitted. The associate will receive credentials by email.",
      },
      { status: 201 }
    );
  });
}

export async function GET(request: NextRequest) {
  return withAgentAuth(request, async () => {
    const recruiters = await listRecruiterOptions();
    return NextResponse.json({ recruiters });
  });
}
