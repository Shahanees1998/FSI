"use client";

import { WorkspaceRecordType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { classNames } from "primereact/utils";
import {
  buildWorkspaceRecordPayloadFromForm,
  validateWorkspaceRecordInput,
} from "@/lib/workspaceRecordValidation";
import { getWorkspaceConfig, WorkspaceFormField } from "@/lib/workspaceRecordConfig";
import { useToast } from "@/store/toast.context";

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

function toDateInputValue(value: Date | string | null | undefined) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function initFlatFromConfig(
  recordType: WorkspaceRecordType,
  initial?: Partial<FormValues>,
  initialMetadata?: Record<string, unknown> | null
) {
  const config = getWorkspaceConfig(recordType);
  const flat: Record<string, string> = {};

  if (config.formFields?.length) {
    for (const field of config.formFields) {
      if (field.key.startsWith("metadata.")) {
        const metaKey = field.key.slice("metadata.".length);
        flat[field.key] = String(initialMetadata?.[metaKey] ?? "");
      } else {
        flat[field.key] = String(initial?.[field.key as keyof FormValues] ?? "");
      }
    }
    return flat;
  }

  return {
    clientName: initial?.clientName || "",
    policyNumber: initial?.policyNumber || "",
    associate: initial?.associate || "",
    company: initial?.company || "",
    status: initial?.status || "",
    amount: initial?.amount || "",
    recordDate: initial?.recordDate || "",
    paidDate: initial?.paidDate || "",
  } as Record<string, string>;
}

export default function WorkspaceRecordForm({
  recordType,
  mode,
  recordId,
  initial,
  initialMetadata,
}: {
  recordType: WorkspaceRecordType;
  mode: "create" | "edit";
  recordId?: string;
  initial?: Partial<FormValues>;
  initialMetadata?: Record<string, unknown> | null;
}) {
  const config = getWorkspaceConfig(recordType);
  const router = useRouter();
  const { showToast } = useToast();
  const usesConfigFields = Boolean(config.formFields?.length);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [flatValues, setFlatValues] = useState<Record<string, string>>(() => {
    const flat = initFlatFromConfig(recordType, initial, initialMetadata);
    if (mode === "create" && !flat.recordDate) {
      flat.recordDate = new Date().toISOString().slice(0, 10);
    }
    return flat;
  });
  const [values, setValues] = useState<FormValues>({
    clientName: initial?.clientName || "",
    policyNumber: initial?.policyNumber || "",
    associate: initial?.associate || "",
    company: initial?.company || "",
    status: initial?.status || "",
    amount: initial?.amount || "",
    recordDate: initial?.recordDate || "",
    paidDate: initial?.paidDate || "",
  });

  const payload = useMemo(() => {
    if (usesConfigFields) {
      return {
        recordType,
        ...buildWorkspaceRecordPayloadFromForm(recordType, flatValues),
      };
    }

    return {
      recordType,
      clientName: values.clientName || null,
      policyNumber: values.policyNumber || null,
      associate: values.associate || null,
      company: values.company || null,
      status: values.status || null,
      amount: values.amount ? Number.parseFloat(values.amount) : null,
      recordDate: values.recordDate || null,
      paidDate: values.paidDate || null,
      metadata: {},
    };
  }, [usesConfigFields, flatValues, values, recordType]);

  function updateFlatField(key: string, value: string) {
    setFlatValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    const validation = validateWorkspaceRecordInput(recordType, payload);
    if (!validation.ok) {
      const nextErrors: Record<string, string> = {};
      if (validation.field) {
        nextErrors[validation.field] = validation.error;
      }
      setErrors(nextErrors);
      showToast("warn", "Check required fields", validation.error);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const url =
        mode === "create"
          ? "/api/agent/workspace-records"
          : `/api/agent/workspace-records/${recordId}`;
      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to save record.");
      }

      showToast("success", mode === "create" ? "Record created." : "Record saved.");
      router.push(config.pathname);
      router.refresh();
    } catch (submitError) {
      showToast(
        "error",
        submitError instanceof Error ? submitError.message : "Failed to save record."
      );
    } finally {
      setLoading(false);
    }
  }

  function renderConfiguredField(field: WorkspaceFormField) {
    const value = flatValues[field.key] ?? "";
    const hasError = Boolean(errors[field.key]);
    const label = (
      <label className="block text-sm font-medium mb-1">
        {field.label}
        {field.required ? <span className="text-red-500"> *</span> : null}
      </label>
    );

    if (field.type === "date") {
      return (
        <div key={field.key} className="col-12 md:col-6">
          {label}
          <input
            type="date"
            className={classNames("p-inputtext p-component w-full", { "p-invalid": hasError })}
            value={value}
            onChange={(e) => updateFlatField(field.key, e.target.value)}
          />
          {hasError ? <small className="p-error block mt-1">{errors[field.key]}</small> : null}
        </div>
      );
    }

    if (field.type === "select" && field.options?.length) {
      return (
        <div key={field.key} className="col-12 md:col-6">
          {label}
          <select
            className={classNames("p-inputtext p-component w-full", { "p-invalid": hasError })}
            value={value}
            onChange={(e) => updateFlatField(field.key, e.target.value)}
          >
            <option value="">Select…</option>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {hasError ? <small className="p-error block mt-1">{errors[field.key]}</small> : null}
        </div>
      );
    }

    if (field.type === "number") {
      return (
        <div key={field.key} className="col-12 md:col-6">
          {label}
          <input
            type="number"
            step="0.01"
            className={classNames("p-inputtext p-component w-full", { "p-invalid": hasError })}
            placeholder={field.placeholder || ""}
            value={value}
            onChange={(e) => updateFlatField(field.key, e.target.value)}
          />
          {hasError ? <small className="p-error block mt-1">{errors[field.key]}</small> : null}
        </div>
      );
    }

    return (
      <div key={field.key} className="col-12 md:col-6">
        {label}
        <input
          type={field.type === "email" ? "email" : "text"}
          className={classNames("p-inputtext p-component w-full", { "p-invalid": hasError })}
          placeholder={field.placeholder || ""}
          value={value}
          onChange={(e) => updateFlatField(field.key, e.target.value)}
        />
        {hasError ? <small className="p-error block mt-1">{errors[field.key]}</small> : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-3">
      <div className="grid">
        {usesConfigFields
          ? config.formFields!.map((field) => renderConfiguredField(field))
          : (
            <>
              <div className="col-12 md:col-6">
                <label className="block text-sm font-medium mb-1">Client name</label>
                <input
                  className="p-inputtext p-component w-full"
                  value={values.clientName}
                  onChange={(e) => updateField("clientName", e.target.value)}
                />
              </div>
              <div className="col-12 md:col-6">
                <label className="block text-sm font-medium mb-1">Policy / reference #</label>
                <input
                  className="p-inputtext p-component w-full"
                  value={values.policyNumber}
                  onChange={(e) => updateField("policyNumber", e.target.value)}
                />
              </div>
              <div className="col-12 md:col-6">
                <label className="block text-sm font-medium mb-1">Associate</label>
                <input
                  className="p-inputtext p-component w-full"
                  value={values.associate}
                  onChange={(e) => updateField("associate", e.target.value)}
                />
              </div>
              <div className="col-12 md:col-6">
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  className="p-inputtext p-component w-full"
                  value={values.company}
                  onChange={(e) => updateField("company", e.target.value)}
                />
              </div>
              <div className="col-12 md:col-6">
                <label className="block text-sm font-medium mb-1">Status</label>
                <input
                  className="p-inputtext p-component w-full"
                  value={values.status}
                  onChange={(e) => updateField("status", e.target.value)}
                />
              </div>
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
            </>
          )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button type="submit" className="p-button p-component" disabled={loading}>
          <span className="p-button-label">{loading ? "Saving…" : mode === "create" ? "Create" : "Save changes"}</span>
        </button>
        <Link href={config.pathname} className="p-button p-component p-button-text no-underline">
          <span className="p-button-label">Cancel</span>
        </Link>
      </div>
    </form>
  );
}

export { toDateInputValue };
