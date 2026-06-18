"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useRouter } from "next/navigation";
import { useToast } from "@/store/toast.context";

export type InsurerStatFormValues = {
  id?: string;
  carrierProfileId: string;
  metricMonth: string;
  activeAgents: number;
  submittedPolicies: number;
  issuedPolicies: number;
  submittedPremium: number;
  issuedPremium: number;
  commissionsPaid: number;
  retentionRate: number;
  notes: string;
};

export default function InsurerStatForm({
  carriers,
  initial,
  mode,
}: {
  carriers: { id: string; carrierName: string; carrierCode: string }[];
  initial?: InsurerStatFormValues;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState<InsurerStatFormValues>(
    initial ?? {
      carrierProfileId: carriers[0]?.id || "",
      metricMonth: new Date().toISOString().slice(0, 7),
      activeAgents: 0,
      submittedPolicies: 0,
      issuedPolicies: 0,
      submittedPremium: 0,
      issuedPremium: 0,
      commissionsPaid: 0,
      retentionRate: 0,
      notes: "",
    }
  );
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const url =
      mode === "create"
        ? "/api/admin/insurer-stats"
        : `/api/admin/insurer-stats/${initial?.id}`;
    const response = await fetch(url, {
      method: mode === "create" ? "POST" : "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        metricMonth: `${form.metricMonth}-01`,
      }),
    });
    const payload = await response.json();
    setSaving(false);
    if (!response.ok) {
      showToast("error", payload.error || "Unable to save.");
      return;
    }
    showToast("success", "Saved.");
    if (mode === "create") {
      router.push(`/admin/insurer-stats/${payload.stat.id}`);
      router.refresh();
    } else {
      router.refresh();
    }
  };

  return (
    <div className="grid">
      <div className="col-12">
        <label className="block mb-2">Carrier</label>
        <select
          className="p-inputtext p-component w-full"
          value={form.carrierProfileId}
          onChange={(e) => setForm((f) => ({ ...f, carrierProfileId: e.target.value }))}
        >
          {carriers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.carrierName} ({c.carrierCode})
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2">Metric month</label>
        <InputText
          type="month"
          className="w-full"
          value={form.metricMonth}
          onChange={(e) => setForm((f) => ({ ...f, metricMonth: e.target.value }))}
        />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2">Active agents</label>
        <InputText
          type="number"
          className="w-full"
          value={String(form.activeAgents)}
          onChange={(e) => setForm((f) => ({ ...f, activeAgents: Number(e.target.value) }))}
        />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2">Submitted policies</label>
        <InputText
          type="number"
          className="w-full"
          value={String(form.submittedPolicies)}
          onChange={(e) => setForm((f) => ({ ...f, submittedPolicies: Number(e.target.value) }))}
        />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2">Issued policies</label>
        <InputText
          type="number"
          className="w-full"
          value={String(form.issuedPolicies)}
          onChange={(e) => setForm((f) => ({ ...f, issuedPolicies: Number(e.target.value) }))}
        />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2">Submitted premium</label>
        <InputText
          type="number"
          className="w-full"
          value={String(form.submittedPremium)}
          onChange={(e) => setForm((f) => ({ ...f, submittedPremium: Number(e.target.value) }))}
        />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2">Issued premium</label>
        <InputText
          type="number"
          className="w-full"
          value={String(form.issuedPremium)}
          onChange={(e) => setForm((f) => ({ ...f, issuedPremium: Number(e.target.value) }))}
        />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2">Commissions paid</label>
        <InputText
          type="number"
          className="w-full"
          value={String(form.commissionsPaid)}
          onChange={(e) => setForm((f) => ({ ...f, commissionsPaid: Number(e.target.value) }))}
        />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2">Retention rate (%)</label>
        <InputText
          type="number"
          step="0.1"
          className="w-full"
          value={String(form.retentionRate)}
          onChange={(e) => setForm((f) => ({ ...f, retentionRate: Number(e.target.value) }))}
        />
      </div>
      <div className="col-12">
        <label className="block mb-2">Notes</label>
        <InputTextarea
          className="w-full"
          autoResize
          rows={3}
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
      </div>
      <div className="col-12 flex gap-2 align-items-center">
        <Button label={mode === "create" ? "Create stat" : "Save changes"} onClick={save} loading={saving} />
      </div>
    </div>
  );
}
