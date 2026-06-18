"use client";

import { PortalContentCategory } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CATEGORIES: PortalContentCategory[] = ["LEARN", "RECRUITING", "POPUP", "FAQ", "TRAINING", "NEW_AGENT"];

export default function PortalContentForm({
  mode,
  contentId,
  initial,
}: {
  mode: "create" | "edit";
  contentId?: string;
  initial?: {
    slug: string;
    category: PortalContentCategory;
    title: string;
    body: string;
    videoId: string;
    pdfUrl: string;
    externalUrl: string;
    published: boolean;
  };
}) {
  const router = useRouter();
  const [form, setForm] = useState(
    initial ?? {
      slug: "",
      category: "LEARN" as PortalContentCategory,
      title: "",
      body: "",
      videoId: "",
      pdfUrl: "",
      externalUrl: "",
      published: true,
    }
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const url = mode === "create" ? "/api/admin/portal-content" : `/api/admin/portal-content/${contentId}`;
    const response = await fetch(url, {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const payload = await response.json();
    setSaving(false);

    if (!response.ok) {
      setError(payload.error || "Failed to save content.");
      return;
    }

    router.push("/admin/portal-content");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column gap-3">
      <div className="grid">
        <div className="col-12 md:col-6">
          <label className="block mb-2">Slug</label>
          <input className="p-inputtext p-component w-full" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
        </div>
        <div className="col-12 md:col-6">
          <label className="block mb-2">Category</label>
          <select className="p-inputtext p-component w-full" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as PortalContentCategory }))}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <label className="block mb-2">Title</label>
          <input className="p-inputtext p-component w-full" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        </div>
        <div className="col-12">
          <label className="block mb-2">Body</label>
          <textarea className="p-inputtext p-component w-full" rows={8} value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} />
        </div>
        <div className="col-12 md:col-4">
          <label className="block mb-2">YouTube video ID</label>
          <input className="p-inputtext p-component w-full" value={form.videoId} onChange={(e) => setForm((f) => ({ ...f, videoId: e.target.value }))} />
        </div>
        <div className="col-12 md:col-4">
          <label className="block mb-2">PDF URL</label>
          <input className="p-inputtext p-component w-full" value={form.pdfUrl} onChange={(e) => setForm((f) => ({ ...f, pdfUrl: e.target.value }))} />
        </div>
        <div className="col-12 md:col-4">
          <label className="block mb-2">External URL</label>
          <input className="p-inputtext p-component w-full" value={form.externalUrl} onChange={(e) => setForm((f) => ({ ...f, externalUrl: e.target.value }))} />
        </div>
        <div className="col-12">
          <label className="flex align-items-center gap-2">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
            Published
          </label>
        </div>
      </div>
      {error ? <p className="text-red-600 m-0">{error}</p> : null}
      <div className="flex gap-2">
        <button type="submit" className="p-button p-component" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        <Link href="/admin/portal-content" className="p-button p-component p-button-text no-underline">Cancel</Link>
      </div>
    </form>
  );
}
