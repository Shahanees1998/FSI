import { notFound } from "next/navigation";
import ClientProfileForm, { ClientProfileFormInitial } from "@/components/clients/ClientProfileForm";
import { getClientProfileForAgent } from "@/lib/clientProfileData";
import { requireCurrentUser } from "@/lib/serverAuth";

function parseChildren(raw: unknown): ClientProfileFormInitial["children"] {
  if (!Array.isArray(raw)) return [];
  return raw.map((row) => {
    const o = row as Record<string, unknown>;
    return {
      firstName: String(o.firstName ?? ""),
      middleName: o.middleName != null ? String(o.middleName) : null,
      lastName: String(o.lastName ?? ""),
      preferredFirstName: String(o.preferredFirstName ?? ""),
      sex: o.sex != null ? String(o.sex) : null,
      birthDate: o.birthDate != null ? String(o.birthDate) : null,
    };
  });
}

export default async function AgentClientEditPage({ params }: { params: { id: string } }) {
  const user = await requireCurrentUser("AGENT");
  const profile = await getClientProfileForAgent(user.id, params.id);
  if (!profile) {
    notFound();
  }

  const initial: ClientProfileFormInitial = {
    firstName: profile.firstName,
    middleName: profile.middleName,
    lastName: profile.lastName,
    preferredFirstName: profile.preferredFirstName,
    city: profile.city,
    state: profile.state ?? "",
    country: profile.country,
    address: profile.address,
    zipCode: profile.zipCode,
    email: profile.email,
    phone: profile.phone,
    phoneType: profile.phoneType,
    sex: profile.sex,
    birthDate: profile.birthDate?.toISOString() ?? null,
    profileImageUrl: profile.profileImageUrl,
    spouseFirstName: profile.spouseFirstName,
    spouseMiddleName: profile.spouseMiddleName,
    spouseLastName: profile.spouseLastName,
    spousePreferredFirstName: profile.spousePreferredFirstName,
    spouseSex: profile.spouseSex,
    spouseBirthDate: profile.spouseBirthDate?.toISOString() ?? null,
    notes: profile.notes,
    children: parseChildren(profile.childrenData),
  };

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <ClientProfileForm mode="edit" profileId={profile.id} initial={initial} />
    </div>
  );
}
