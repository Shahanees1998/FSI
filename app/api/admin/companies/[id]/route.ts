import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { getCompanyById } from "@/lib/portalData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const company = await getCompanyById(params.id, { allowDeleted: true });
    if (!company) {
      return NextResponse.json({ error: "Company not found." }, { status: 404 });
    }

    return NextResponse.json({ company });
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const existing = await getCompanyById(params.id, { allowDeleted: true });
    if (!existing) {
      return NextResponse.json({ error: "Company not found." }, { status: 404 });
    }
    if (existing.deletedAt) {
      return NextResponse.json({ error: "Cannot edit a deleted company." }, { status: 400 });
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) {
      return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    }

    const company = await prisma.company.update({
      where: { id: params.id },
      data: {
        name,
        location: typeof body.location === "string" ? body.location.trim() || null : null,
        department: typeof body.department === "string" ? body.department.trim() || null : null,
        address: typeof body.address === "string" ? body.address.trim() || null : null,
        city: typeof body.city === "string" ? body.city.trim() || null : null,
        state: typeof body.state === "string" ? body.state.trim() || null : null,
        country: typeof body.country === "string" ? body.country.trim() || null : null,
        phone: typeof body.phone === "string" ? body.phone.trim() || null : null,
        website: typeof body.website === "string" ? body.website.trim() || null : null,
        notes: typeof body.notes === "string" ? body.notes.trim() || null : null,
      },
      include: {
        _count: { select: { agents: true } },
      },
    });

    return NextResponse.json({ company });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async () => {
    const existing = await getCompanyById(params.id, { allowDeleted: true });
    if (!existing) {
      return NextResponse.json({ error: "Company not found." }, { status: 404 });
    }
    if (existing.deletedAt) {
      return NextResponse.json({ error: "Company is already deleted." }, { status: 400 });
    }

    await prisma.company.update({
      where: { id: params.id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ ok: true });
  });
}
