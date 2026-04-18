"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "primereact/button";

export default function ClientProfileDeleteButton({ profileId, label }: { profileId: string; label?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!window.confirm("Remove this client profile? You can keep records; this is a soft delete.")) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/agent/client-profiles/${profileId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      window.alert(data.error || "Delete failed.");
      return;
    }
    router.refresh();
  };

  return (
    <Button
      type="button"
      label={label ?? "Remove"}
      icon="pi pi-trash"
      severity="danger"
      outlined
      size="small"
      loading={loading}
      disabled={loading}
      onClick={onDelete}
    />
  );
}
