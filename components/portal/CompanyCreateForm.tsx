"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";

type FormKey =
  | "name"
  | "location"
  | "department"
  | "address"
  | "city"
  | "state"
  | "country"
  | "phone"
  | "website"
  | "notes";

const REQUIRED_FIELDS: FormKey[] = [
  "name",
  "location",
  "department",
  "address",
  "city",
  "state",
  "country",
  "phone",
  "website",
];

function emptyErrorsForForm(form: Record<FormKey, string>): Partial<Record<FormKey, boolean>> {
  const err: Partial<Record<FormKey, boolean>> = {};
  for (const key of REQUIRED_FIELDS) {
    if (!String(form[key] ?? "").trim()) {
      err[key] = true;
    }
  }
  return err;
}

export type CompanyCreateFormProps = {
  apiUrl: string;
  /** Shown above fields (e.g. admin sidebar). Omit on standalone create page. */
  heading?: string;
  /** After successful create, navigate here; otherwise `router.refresh()` only. */
  redirectTo?: string;
};

export default function CompanyCreateForm({ apiUrl, heading, redirectTo }: CompanyCreateFormProps) {
  const router = useRouter();
  const toastRef = useRef<Toast>(null);
  const [creating, setCreating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormKey, boolean>>>({});

  const [form, setForm] = useState({
    name: "",
    location: "",
    department: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    website: "",
    notes: "",
  });

  const clearFieldError = (key: FormKey) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateForm = (key: FormKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    clearFieldError(key);
  };

  const createCompany = async () => {
    setSubmitted(true);
    const errors = emptyErrorsForForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      toastRef.current?.show({
        severity: "warn",
        summary: "Check required fields",
        detail: "Fill in every required field (marked with *).",
        life: 6000,
      });
      return;
    }

    setCreating(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          location: form.location.trim() || null,
          department: form.department.trim() || null,
          address: form.address.trim() || null,
          city: form.city.trim() || null,
          state: form.state.trim() || null,
          country: form.country.trim() || null,
          phone: form.phone.trim() || null,
          website: form.website.trim() || null,
          notes: form.notes.trim() || null,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        toastRef.current?.show({
          severity: "error",
          summary: "Could not create company",
          detail: typeof payload.error === "string" ? payload.error : "Request failed.",
          life: 8000,
        });
        return;
      }

      setForm({
        name: "",
        location: "",
        department: "",
        address: "",
        city: "",
        state: "",
        country: "",
        phone: "",
        website: "",
        notes: "",
      });
      setFieldErrors({});
      setSubmitted(false);

      const created = payload.company as { name: string };
      toastRef.current?.show({
        severity: "success",
        summary: "Company created",
        detail: `${created.name} was added successfully.`,
        life: 5000,
      });

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } finally {
      setCreating(false);
    }
  };

  const invalid = (key: FormKey) => submitted && Boolean(fieldErrors[key]);

  return (
    <>
      <Toast ref={toastRef} position="top-right" />
      {heading ? <h3 className="mt-0">{heading}</h3> : null}
      <div className="grid">
        <div className="col-12">
          <label className="block mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("name") })}
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
            aria-invalid={invalid("name")}
          />
        </div>
        <div className="col-12 md:col-6">
          <label className="block mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("location") })}
            value={form.location}
            placeholder="Office, region, or site"
            onChange={(e) => updateForm("location", e.target.value)}
            aria-invalid={invalid("location")}
          />
        </div>
        <div className="col-12 md:col-6">
          <label className="block mb-2">
            Department <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("department") })}
            value={form.department}
            onChange={(e) => updateForm("department", e.target.value)}
            aria-invalid={invalid("department")}
          />
        </div>
        <div className="col-12">
          <label className="block mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("address") })}
            value={form.address}
            onChange={(e) => updateForm("address", e.target.value)}
            aria-invalid={invalid("address")}
          />
        </div>
        <div className="col-12 md:col-6">
          <label className="block mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("city") })}
            value={form.city}
            onChange={(e) => updateForm("city", e.target.value)}
            aria-invalid={invalid("city")}
          />
        </div>
        <div className="col-12 md:col-6">
          <label className="block mb-2">
            State / province <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("state") })}
            value={form.state}
            onChange={(e) => updateForm("state", e.target.value)}
            aria-invalid={invalid("state")}
          />
        </div>
        <div className="col-12">
          <label className="block mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("country") })}
            value={form.country}
            onChange={(e) => updateForm("country", e.target.value)}
            aria-invalid={invalid("country")}
          />
        </div>
        <div className="col-12 md:col-6">
          <label className="block mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("phone") })}
            value={form.phone}
            onChange={(e) => updateForm("phone", e.target.value)}
            aria-invalid={invalid("phone")}
          />
        </div>
        <div className="col-12 md:col-6">
          <label className="block mb-2">
            Website <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": invalid("website") })}
            value={form.website}
            placeholder="https://..."
            onChange={(e) => updateForm("website", e.target.value)}
            aria-invalid={invalid("website")}
          />
        </div>
        <div className="col-12">
          <label className="block mb-2">Notes (optional)</label>
          <InputTextarea
            className="w-full"
            autoResize
            rows={3}
            value={form.notes}
            onChange={(e) => updateForm("notes", e.target.value)}
          />
        </div>
      </div>
      <Button label="Create company" className="mt-3" type="button" loading={creating} disabled={creating} onClick={createCompany} />
    </>
  );
}
