"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useToast } from "@/store/toast.context";

export default function AgentCompanyPicker({
  agentId,
  initialCompanyId,
  companies,
}: {
  agentId: string;
  initialCompanyId: string | null;
  companies: { id: string; name: string; location?: string | null; department?: string | null }[];
}) {
  const [companyId, setCompanyId] = useState<string>(initialCompanyId ?? "");
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "No company", value: "" },
    ...companies.map((c) => ({
      label: [c.name, c.location, c.department].filter(Boolean).join(" · "),
      value: c.id,
    })),
  ];

  const save = async () => {
    setLoading(true);
    const response = await fetch(`/api/admin/agents/${agentId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId: companyId || null,
      }),
    });
    setLoading(false);
    const payload = await response.json();
    if (!response.ok) {
      showToast("error", payload.error || "Unable to update company.");
      return;
    }
    showToast("success", "Company assignment saved.");
  };

  return (
    <div className="grid">
      <div className="col-12">
        <label className="block mb-2">Company</label>
        <Dropdown
          className="w-full"
          value={companyId}
          options={options}
          onChange={(e) => setCompanyId(e.value)}
        />
        <div className="flex flex-wrap gap-2 align-items-center mt-3">
          <Button label="Save assignment" onClick={save} loading={loading} disabled={loading} size="small" />
        </div>
      </div>
    </div>
  );
}
