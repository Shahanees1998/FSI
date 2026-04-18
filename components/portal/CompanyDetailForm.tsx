"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export type CompanyDetail = {
  id: string;
  name: string;
  location: string | null;
  department: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  phone: string | null;
  website: string | null;
  notes: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: { agents: number };
};

export default function CompanyDetailForm({ company: initial }: { company: CompanyDetail }) {
  const router = useRouter();
  const [company, setCompany] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    setMessage(null);
    const response = await fetch(`/api/admin/companies/${company.id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: company.name,
        location: company.location,
        department: company.department,
        address: company.address,
        city: company.city,
        state: company.state,
        country: company.country,
        phone: company.phone,
        website: company.website,
        notes: company.notes,
      }),
    });
    const payload = await response.json();
    setSaving(false);
    if (!response.ok) {
      setMessage(payload.error || "Unable to save.");
      return;
    }
    setCompany((prev) => ({
      ...prev,
      ...payload.company,
      createdAt: payload.company.createdAt ?? prev.createdAt,
      updatedAt: payload.company.updatedAt ?? prev.updatedAt,
    }));
    setMessage("Saved.");
  };

  const softDelete = async () => {
    if (!window.confirm(`Soft-delete “${company.name}”? It will be removed from lists; linked agents keep their link for records.`)) {
      return;
    }
    setMessage(null);
    const response = await fetch(`/api/admin/companies/${company.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error || "Unable to delete.");
      return;
    }
    router.push("/admin/companies");
    router.refresh();
  };

  if (company.deletedAt) {
    return (
      <div className="surface-card border-round border-1 surface-border p-4">
        <p className="mt-0">This company was deleted on {new Date(company.deletedAt).toLocaleString()}.</p>
        <Link href="/admin/companies">Back to companies</Link>
      </div>
    );
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="surface-card border-round border-1 surface-border p-4">
          <div className="flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
              <h1 className="mt-0 mb-2">Edit company</h1>
              <p className="m-0 text-600">
                {company._count.agents} agent(s) linked · Created {new Date(company.createdAt).toLocaleString()}
              </p>
            </div>
            <Link href="/admin/companies">Back to list</Link>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-8">
        <div className="surface-card border-round border-1 surface-border p-4">
          <div className="grid">
            <div className="col-12">
              <label className="block mb-2">Name *</label>
              <InputText
                className="w-full"
                value={company.name}
                onChange={(e) => setCompany((c) => ({ ...c, name: e.target.value }))}
              />
            </div>
            <div className="col-12 md:col-6">
              <label className="block mb-2">Location</label>
              <InputText
                className="w-full"
                value={company.location ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, location: e.target.value || null }))}
              />
            </div>
            <div className="col-12 md:col-6">
              <label className="block mb-2">Department</label>
              <InputText
                className="w-full"
                value={company.department ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, department: e.target.value || null }))}
              />
            </div>
            <div className="col-12">
              <label className="block mb-2">Address</label>
              <InputText
                className="w-full"
                value={company.address ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, address: e.target.value || null }))}
              />
            </div>
            <div className="col-12 md:col-4">
              <label className="block mb-2">City</label>
              <InputText
                className="w-full"
                value={company.city ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, city: e.target.value || null }))}
              />
            </div>
            <div className="col-12 md:col-4">
              <label className="block mb-2">State / province</label>
              <InputText
                className="w-full"
                value={company.state ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, state: e.target.value || null }))}
              />
            </div>
            <div className="col-12 md:col-4">
              <label className="block mb-2">Country</label>
              <InputText
                className="w-full"
                value={company.country ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, country: e.target.value || null }))}
              />
            </div>
            <div className="col-12 md:col-6">
              <label className="block mb-2">Phone</label>
              <InputText
                className="w-full"
                value={company.phone ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, phone: e.target.value || null }))}
              />
            </div>
            <div className="col-12 md:col-6">
              <label className="block mb-2">Website</label>
              <InputText
                className="w-full"
                value={company.website ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, website: e.target.value || null }))}
              />
            </div>
            <div className="col-12">
              <label className="block mb-2">Notes</label>
              <InputTextarea
                className="w-full"
                autoResize
                rows={4}
                value={company.notes ?? ""}
                onChange={(e) => setCompany((c) => ({ ...c, notes: e.target.value || null }))}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 align-items-center mt-3">
            <Button label="Save changes" onClick={save} loading={saving} disabled={saving} />
            {message && <span className="font-medium">{message}</span>}
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-4">
        <div className="surface-card border-round border-1 surface-border p-4">
          <h3 className="mt-0">Danger zone</h3>
          <p className="text-600 mb-3">
            Soft-delete hides this company from pickers and directory lists. Agents may still show a historical link.
          </p>
          <Button label="Soft-delete company" severity="danger" outlined onClick={softDelete} />
        </div>
      </div>
    </div>
  );
}
