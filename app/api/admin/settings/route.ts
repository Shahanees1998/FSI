import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const settings =
      (await prisma.systemSettings.findFirst()) ||
      (await prisma.systemSettings.create({
        data: {
          siteName: "Freedom Shield Insurance Portal",
          siteDescription: "Back-office workspace for agents, carriers, and administrators.",
          supportEmail: "support@freedomshieldinsurance.com",
          notificationsEnabled: true,
        },
      }));

    return NextResponse.json({ settings });
  });
}

export async function PUT(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const body = await request.json();
    const existing = await prisma.systemSettings.findFirst();

    const settings = existing
      ? await prisma.systemSettings.update({
          where: { id: existing.id },
          data: {
            siteName: body.siteName,
            siteDescription: body.siteDescription ?? null,
            supportEmail: body.supportEmail,
            supportPhone: body.supportPhone ?? null,
            commissionDisclaimer: body.commissionDisclaimer ?? null,
            notificationsEnabled: Boolean(body.notificationsEnabled),
          },
        })
      : await prisma.systemSettings.create({
          data: {
            siteName: body.siteName,
            siteDescription: body.siteDescription ?? null,
            supportEmail: body.supportEmail,
            supportPhone: body.supportPhone ?? null,
            commissionDisclaimer: body.commissionDisclaimer ?? null,
            notificationsEnabled: Boolean(body.notificationsEnabled),
          },
        });

    return NextResponse.json({ settings });
  });
}
