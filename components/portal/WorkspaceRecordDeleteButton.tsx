"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkspaceRecordDeleteButton({
  recordId,
  recordType,
}: {
  recordId: string;
  recordType: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this record? This cannot be undone.")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/agent/workspace-records/${recordId}?recordType=${recordType}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete record.");
      }
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete record.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="p-button p-component p-button-text p-button-sm p-button-danger font-medium"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
