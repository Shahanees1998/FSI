import { Prisma } from "@prisma/client";
import { validateClientProfileInput } from "@/lib/clientProfileValidation";

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
  profileImagePublicId: string | null;
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

  const spouseFirstName = trimStr(b.spouseFirstName);
  const spouseLastName = trimStr(b.spouseLastName);
  const spousePreferredFirstName = trimStr(b.spousePreferredFirstName);
  const showSpouse = Boolean(spouseFirstName || spouseLastName || spousePreferredFirstName || trimStr(b.spouseSex) || b.spouseBirthDate);

  const childrenRaw = Array.isArray(b.children) ? b.children : [];
  const childrenForValidation = childrenRaw.map((item, index) => {
    const o = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    return {
      key: String(index),
      firstName: String(o.firstName ?? ""),
      middleName: String(o.middleName ?? ""),
      lastName: String(o.lastName ?? ""),
      preferredFirstName: String(o.preferredFirstName ?? ""),
      sex: trimStr(o.sex),
      birthDate: parseOptionalDate(o.birthDate),
    };
  });

  const validation = validateClientProfileInput({
    firstName,
    middleName: String(b.middleName ?? ""),
    lastName,
    preferredFirstName,
    sex: trimStr(b.sex),
    birthDate: parseOptionalDate(b.birthDate),
    email: trimStr(b.email),
    phone: trimStr(b.phone),
    phoneType: trimStr(b.phoneType),
    city: trimStr(b.city),
    state: trimStr(b.state),
    country: trimStr(b.country) ?? "USA",
    zipCode: trimStr(b.zipCode),
    address: trimStr(b.address),
    showSpouse,
    spouse: showSpouse
      ? {
          firstName: spouseFirstName ?? "",
          middleName: String(b.spouseMiddleName ?? ""),
          lastName: spouseLastName ?? "",
          preferredFirstName: spousePreferredFirstName ?? "",
          sex: trimStr(b.spouseSex),
          birthDate: parseOptionalDate(b.spouseBirthDate),
        }
      : undefined,
    children: childrenForValidation,
  });

  if (validation.firstError) {
    return { ok: false, error: validation.firstError };
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
    profileImagePublicId: trimStr(b.profileImagePublicId),
    spouseFirstName,
    spouseMiddleName: trimStr(b.spouseMiddleName),
    spouseLastName,
    spousePreferredFirstName,
    spouseSex: trimStr(b.spouseSex),
    spouseBirthDate: parseOptionalDate(b.spouseBirthDate),
    childrenData: normalizeChildren(b.children),
    notes: trimStr(b.notes),
  };

  return { ok: true, fields };
}
