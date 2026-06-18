"use client";

import { UserStatus } from "@prisma/client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/store/toast.context";

const STATUS_OPTIONS: UserStatus[] = ["ACTIVE", "INVITED", "INACTIVE", "SUSPENDED"];

type AgentProfile = {
  licenseNumber?: string | null;
  fundServCode?: string | null;
  agencyName?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
};

export default function AdminAgentProfileForm({
  agentId,
  initial,
}: {
  agentId: string;
  initial: {
    firstName: string;
    lastName: string;
    phone?: string | null;
    status: UserStatus;
    jobTitle?: string | null;
    location?: string | null;
    agentProfile?: AgentProfile | null;
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
    licenseNumber: initial.agentProfile?.licenseNumber ?? "",
    fundServCode: initial.agentProfile?.fundServCode ?? "",
    agencyName: initial.agentProfile?.agencyName ?? "",
    city: initial.agentProfile?.city ?? "",
    state: initial.agentProfile?.state ?? "",
    country: initial.agentProfile?.country ?? "",
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const response = await fetch(`/api/admin/agents/${agentId}`, {
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
        agentProfile: {
          licenseNumber: form.licenseNumber || null,
          fundServCode: form.fundServCode || null,
          agencyName: form.agencyName || null,
          city: form.city || null,
          state: form.state || null,
          country: form.country || null,
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
        <label className="block mb-2 font-medium">Phone</label>
        <InputText className="w-full" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Status</label>
        <select
          className="p-inputtext p-component w-full"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as UserStatus }))}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Job title</label>
        <InputText className="w-full" value={form.jobTitle} onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Location</label>
        <InputText className="w-full" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">License number</label>
        <InputText className="w-full" value={form.licenseNumber} onChange={(e) => setForm((f) => ({ ...f, licenseNumber: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">FundServ code</label>
        <InputText className="w-full" value={form.fundServCode} onChange={(e) => setForm((f) => ({ ...f, fundServCode: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Agency name</label>
        <InputText className="w-full" value={form.agencyName} onChange={(e) => setForm((f) => ({ ...f, agencyName: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">City</label>
        <InputText className="w-full" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
      </div>
      <div className="col-12 md:col-4">
        <label className="block mb-2 font-medium">State</label>
        <InputText className="w-full" value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} />
      </div>
      <div className="col-12 md:col-4">
        <label className="block mb-2 font-medium">Country</label>
        <InputText className="w-full" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} />
      </div>
      <div className="col-12">
        <Button label={saving ? "Saving…" : "Save profile"} onClick={save} loading={saving} />
      </div>
    </div>
  );
}
