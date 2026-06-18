"use client";

import { CarrierStatus, UserStatus } from "@prisma/client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/store/toast.context";

const USER_STATUS: UserStatus[] = ["ACTIVE", "INVITED", "INACTIVE", "SUSPENDED"];
const CARRIER_STATUS: CarrierStatus[] = ["ACTIVE", "PENDING", "ARCHIVED"];

export default function AdminCarrierProfileForm({
  carrierId,
  initial,
}: {
  carrierId: string;
  initial: {
    firstName: string;
    lastName: string;
    phone?: string | null;
    status: UserStatus;
    jobTitle?: string | null;
    location?: string | null;
    carrierProfile?: {
      carrierName?: string | null;
      contactEmail?: string | null;
      contactPhone?: string | null;
      website?: string | null;
      status?: CarrierStatus | null;
    } | null;
  };
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    firstName: initial.firstName,
    lastName: initial.lastName,
    phone: initial.phone ?? "",
    status: initial.status,
    jobTitle: initial.jobTitle ?? "",
    location: initial.location ?? "",
    carrierName: initial.carrierProfile?.carrierName ?? "",
    contactEmail: initial.carrierProfile?.contactEmail ?? "",
    contactPhone: initial.carrierProfile?.contactPhone ?? "",
    website: initial.carrierProfile?.website ?? "",
    carrierStatus: initial.carrierProfile?.status ?? "ACTIVE",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const response = await fetch(`/api/admin/carriers/${carrierId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || null,
        status: form.status,
        jobTitle: form.jobTitle || null,
        location: form.location || null,
        carrierProfile: {
          carrierName: form.carrierName,
          contactEmail: form.contactEmail || null,
          contactPhone: form.contactPhone || null,
          website: form.website || null,
          status: form.carrierStatus,
        },
      }),
    });
    const payload = await response.json();
    setSaving(false);
    if (!response.ok) {
      showToast("error", payload.error || "Unable to save.");
      return;
    }
    showToast("success", "Profile saved.");
    router.refresh();
  };

  return (
    <div className="grid">
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">First name</label>
        <InputText className="w-full" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Last name</label>
        <InputText className="w-full" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Carrier name</label>
        <InputText className="w-full" value={form.carrierName} onChange={(e) => setForm((f) => ({ ...f, carrierName: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">User status</label>
        <select
          className="p-inputtext p-component w-full"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as UserStatus }))}
        >
          {USER_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Carrier status</label>
        <select
          className="p-inputtext p-component w-full"
          value={form.carrierStatus}
          onChange={(e) => setForm((f) => ({ ...f, carrierStatus: e.target.value as CarrierStatus }))}
        >
          {CARRIER_STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Contact email</label>
        <InputText className="w-full" value={form.contactEmail} onChange={(e) => setForm((f) => ({ ...f, contactEmail: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Contact phone</label>
        <InputText className="w-full" value={form.contactPhone} onChange={(e) => setForm((f) => ({ ...f, contactPhone: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Website</label>
        <InputText className="w-full" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Phone</label>
        <InputText className="w-full" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
      </div>
      <div className="col-12">
        <Button label={saving ? "Saving…" : "Save profile"} onClick={save} loading={saving} />
      </div>
    </div>
  );
}
