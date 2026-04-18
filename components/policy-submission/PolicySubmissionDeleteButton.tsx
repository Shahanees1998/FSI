"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "primereact/button";

export default function PolicySubmissionDeleteButton({ policyId }: { policyId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!window.confirm("Remove this policy submission? This is a soft delete.")) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/agent/policy-submissions/${policyId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      window.alert(typeof data.error === "string" ? data.error : "Delete failed.");
      return;
    }
    router.refresh();
  };

  return (
    <Button
      type="button"
      label="Remove"
      icon="pi pi-trash"
      severity="danger"
      outlined
      size="small"
      loading={loading}
      disabled={loading}
      onClick={() => void onDelete()}
    />
  );
}
