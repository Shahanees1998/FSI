"use client";

import { WorkspaceRecordType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getWorkspaceConfig } from "@/lib/workspaceRecordConfig";

type FormValues = {
  clientName: string;
  policyNumber: string;
  associate: string;
  company: string;
  status: string;
  amount: string;
  recordDate: string;
  paidDate: string;
};

export default function AdminWorkspaceRecordEditor({
  recordId,
  recordType,
  agentLabel,
  initial,
}: {
  recordId: string;
  recordType: WorkspaceRecordType;
  agentLabel: string;
  initial: FormValues;
}) {
  const router = useRouter();
  const config = getWorkspaceConfig(recordType);
  const [values, setValues] = useState<FormValues>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/workspace-records/${recordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: values.clientName || null,
          policyNumber: values.policyNumber || null,
          associate: values.associate || null,
          company: values.company || null,
          status: values.status || null,
          amount: values.amount ? Number.parseFloat(values.amount) : null,
          recordDate: values.recordDate || null,
          paidDate: values.paidDate || null,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to save record.");
      }
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save record.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this workspace record?")) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/workspace-records/${recordId}`, { method: "DELETE" });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete record.");
      }
      router.push("/admin/workspace-records");
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete record.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-3">
      <p className="text-600 text-sm m-0">
        Agent: <span className="font-semibold text-800">{agentLabel}</span> · Type:{" "}
        <span className="font-semibold text-800">{config.title}</span>
      </p>
      <div className="grid">
        {[
          ["clientName", "Client name"],
          ["policyNumber", "Policy / reference #"],
          ["associate", "Associate"],
          ["company", "Company"],
          ["status", "Status"],
        ].map(([key, label]) => (
          <div key={key} className="col-12 md:col-6">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              className="p-inputtext p-component w-full"
              value={values[key as keyof FormValues]}
              onChange={(e) => updateField(key as keyof FormValues, e.target.value)}
            />
          </div>
        ))}
        <div className="col-12 md:col-6">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            className="p-inputtext p-component w-full"
            value={values.amount}
            onChange={(e) => updateField("amount", e.target.value)}
          />
        </div>
        <div className="col-12 md:col-6">
          <label className="block text-sm font-medium mb-1">Record date</label>
          <input
            type="date"
            className="p-inputtext p-component w-full"
            value={values.recordDate}
            onChange={(e) => updateField("recordDate", e.target.value)}
          />
        </div>
        <div className="col-12 md:col-6">
          <label className="block text-sm font-medium mb-1">Paid date</label>
          <input
            type="date"
            className="p-inputtext p-component w-full"
            value={values.paidDate}
            onChange={(e) => updateField("paidDate", e.target.value)}
          />
        </div>
      </div>
      {error ? <p className="text-red-600 m-0">{error}</p> : null}
      <div className="flex gap-2 flex-wrap">
        <button type="submit" className="p-button p-component" disabled={loading}>
          <span className="p-button-label">{loading ? "Saving…" : "Save changes"}</span>
        </button>
        <button type="button" className="p-button p-component p-button-danger p-button-outlined" onClick={handleDelete} disabled={loading}>
          <span className="p-button-label">Delete</span>
        </button>
        <Link href="/admin/workspace-records" className="p-button p-component p-button-text no-underline">
          <span className="p-button-label">Back to list</span>
        </Link>
      </div>
    </form>
  );
}
