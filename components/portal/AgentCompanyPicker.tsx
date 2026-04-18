"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

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
  const [message, setMessage] = useState<string | null>(null);
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
    setMessage(null);
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
      setMessage(payload.error || "Unable to update company.");
      return;
    }
    setMessage("Company assignment saved.");
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
          {message && <span className="text-sm font-medium">{message}</span>}
        </div>
      </div>
    </div>
  );
}
