import { Prisma } from "@prisma/client";

export type ClientProfileChildPayload = {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  preferredFirstName: string;
  sex?: string | null;
  birthDate?: string | null;
};

function trimStr(v: unknown): string | null {
  if (v == null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

function parseOptionalDate(v: unknown): Date | null {
  if (v == null || v === "") return null;
  const d = new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d;
}

function normalizeChildren(raw: unknown): Prisma.InputJsonValue {
  if (!Array.isArray(raw)) {
    return [];
  }

  const rows = raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const o = item as Record<string, unknown>;
      const firstName = String(o.firstName ?? "").trim();
      const lastName = String(o.lastName ?? "").trim();
      const preferredFirstName = String(o.preferredFirstName ?? "").trim();
      if (!firstName || !lastName || !preferredFirstName) {
        return null;
      }
      return {
        firstName,
        middleName: trimStr(o.middleName),
        lastName,
        preferredFirstName,
        sex: trimStr(o.sex),
        birthDate: trimStr(o.birthDate),
      };
    })
    .filter(Boolean);

  return (rows.length ? rows : []) as Prisma.InputJsonValue;
}

export type ParsedClientProfileFields = {
  firstName: string;
  middleName: string | null;
  lastName: string;
  preferredFirstName: string;
  city: string | null;
  state: string | null;
  country: string | null;
  address: string | null;
  zipCode: string | null;
  email: string | null;
  phone: string | null;
  phoneType: string | null;
  sex: string | null;
  birthDate: Date | null;
  profileImageUrl: string | null;
  spouseFirstName: string | null;
  spouseMiddleName: string | null;
  spouseLastName: string | null;
  spousePreferredFirstName: string | null;
  spouseSex: string | null;
  spouseBirthDate: Date | null;
  childrenData: Prisma.InputJsonValue;
  notes: string | null;
};

export function parseClientProfileBody(body: unknown): { ok: true; fields: ParsedClientProfileFields } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid JSON body." };
  }

  const b = body as Record<string, unknown>;
  const firstName = String(b.firstName ?? "").trim();
  const lastName = String(b.lastName ?? "").trim();
  const preferredFirstName = String(b.preferredFirstName ?? "").trim();

  if (!firstName || !lastName || !preferredFirstName) {
    return { ok: false, error: "First name, last name, and preferred first name are required." };
  }

  const fields: ParsedClientProfileFields = {
    firstName,
    middleName: trimStr(b.middleName),
    lastName,
    preferredFirstName,
    city: trimStr(b.city),
    state: trimStr(b.state),
    country: trimStr(b.country) ?? "USA",
    address: trimStr(b.address),
    zipCode: trimStr(b.zipCode),
    email: trimStr(b.email),
    phone: trimStr(b.phone),
    phoneType: trimStr(b.phoneType),
    sex: trimStr(b.sex),
    birthDate: parseOptionalDate(b.birthDate),
    profileImageUrl: trimStr(b.profileImageUrl),
    spouseFirstName: trimStr(b.spouseFirstName),
    spouseMiddleName: trimStr(b.spouseMiddleName),
    spouseLastName: trimStr(b.spouseLastName),
    spousePreferredFirstName: trimStr(b.spousePreferredFirstName),
    spouseSex: trimStr(b.spouseSex),
    spouseBirthDate: parseOptionalDate(b.spouseBirthDate),
    childrenData: normalizeChildren(b.children),
    notes: trimStr(b.notes),
  };

  return { ok: true, fields };
}
