"use client";

import { CommissionStatus } from "@prisma/client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/store/toast.context";

export type CommissionFormValues = {
  id?: string;
  agentId: string;
  carrierProfileId: string;
  policyNumber: string;
  clientName: string;
  productLine: string;
  amount: number;
  status: CommissionStatus;
  statementMonth: string;
  effectiveDate: string;
  paidAt: string;
  notes: string;
};

type AgentOption = { id: string; label: string };
type CarrierOption = { id: string; label: string };

const STATUS_OPTIONS: CommissionStatus[] = ["PENDING", "APPROVED", "PAID", "DISPUTED"];

function toMonthInput(value: Date | string | null | undefined) {
  if (!value) return new Date().toISOString().slice(0, 7);
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 7);
}

function toDateInput(value: Date | string | null | undefined) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function CommissionForm({
  mode,
  agents,
  carriers,
  initial,
}: {
  mode: "create" | "edit";
  agents: AgentOption[];
  carriers: CarrierOption[];
  initial?: CommissionFormValues;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState<CommissionFormValues>(
    initial ?? {
      agentId: agents[0]?.id ?? "",
      carrierProfileId: carriers[0]?.id ?? "",
      policyNumber: "",
      clientName: "",
      productLine: "",
      amount: 0,
      status: "PENDING",
      statementMonth: new Date().toISOString().slice(0, 7),
      effectiveDate: "",
      paidAt: "",
      notes: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const save = async () => {
    setSaving(true);
    const payload = {
      ...form,
      statementMonth: `${form.statementMonth}-01`,
      effectiveDate: form.effectiveDate || null,
      paidAt: form.paidAt || null,
      notes: form.notes || null,
    };

    const url = mode === "create" ? "/api/commissions" : `/api/commissions/${initial?.id}`;
    const response = await fetch(url, {
      method: mode === "create" ? "POST" : "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setSaving(false);
    if (!response.ok) {
      showToast("error", data.error || "Unable to save commission.");
      return;
    }
    if (mode === "create") {
      router.push(`/admin/commissions/${data.commission.id}`);
      router.refresh();
    } else {
      showToast("success", "Saved.");
      router.refresh();
    }
  };

  const remove = async () => {
    if (!initial?.id || !confirm("Delete this commission record?")) return;
    setDeleting(true);
    const response = await fetch(`/api/commissions/${initial.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setDeleting(false);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      showToast("error", data.error || "Unable to delete.");
      return;
    }
    router.push("/admin/commissions");
    router.refresh();
  };

  return (
    <div className="grid">
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Agent</label>
        <select
          className="p-inputtext p-component w-full"
          value={form.agentId}
          onChange={(e) => setForm((f) => ({ ...f, agentId: e.target.value }))}
        >
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Carrier</label>
        <select
          className="p-inputtext p-component w-full"
          value={form.carrierProfileId}
          onChange={(e) => setForm((f) => ({ ...f, carrierProfileId: e.target.value }))}
        >
          {carriers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Client name</label>
        <InputText className="w-full" value={form.clientName} onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Policy number</label>
        <InputText className="w-full" value={form.policyNumber} onChange={(e) => setForm((f) => ({ ...f, policyNumber: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Product line</label>
        <InputText className="w-full" value={form.productLine} onChange={(e) => setForm((f) => ({ ...f, productLine: e.target.value }))} />
      </div>
      <div className="col-12 md:col-6">
        <label className="block mb-2 font-medium">Amount</label>
        <InputText
          type="number"
          step="0.01"
          className="w-full"
          value={String(form.amount)}
          onChange={(e) => setForm((f) => ({ ...f, amount: Number.parseFloat(e.target.value) || 0 }))}
        />
      </div>
      <div className="col-12 md:col-4">
        <label className="block mb-2 font-medium">Status</label>
        <select
          className="p-inputtext p-component w-full"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as CommissionStatus }))}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12 md:col-4">
        <label className="block mb-2 font-medium">Statement month</label>
        <InputText
          type="month"
          className="w-full"
          value={form.statementMonth}
          onChange={(e) => setForm((f) => ({ ...f, statementMonth: e.target.value }))}
        />
      </div>
      <div className="col-12 md:col-4">
        <label className="block mb-2 font-medium">Effective date</label>
        <InputText
          type="date"
          className="w-full"
          value={form.effectiveDate}
          onChange={(e) => setForm((f) => ({ ...f, effectiveDate: e.target.value }))}
        />
      </div>
      <div className="col-12 md:col-4">
        <label className="block mb-2 font-medium">Paid date</label>
        <InputText
          type="date"
          className="w-full"
          value={form.paidAt}
          onChange={(e) => setForm((f) => ({ ...f, paidAt: e.target.value }))}
        />
      </div>
      <div className="col-12">
        <label className="block mb-2 font-medium">Notes</label>
        <InputTextarea className="w-full" rows={3} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
      </div>
      <div className="col-12 flex flex-wrap gap-2">
        <Button label={saving ? "Saving…" : mode === "create" ? "Create commission" : "Save changes"} onClick={save} loading={saving} />
        {mode === "edit" ? (
          <Button label={deleting ? "Deleting…" : "Delete"} severity="danger" outlined onClick={remove} loading={deleting} />
        ) : null}
      </div>
    </div>
  );
}

export { toMonthInput, toDateInput };
