import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { listCompanies } from "@/lib/portalData";

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const result = await listCompanies(request.nextUrl.searchParams);
    return NextResponse.json({
      companies: result.data,
      pagination: result.pagination,
    });
  });
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!name) {
      return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    }

    const company = await prisma.company.create({
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

    return NextResponse.json({ company }, { status: 201 });
  });
}
