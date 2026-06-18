"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { validatePolicySubmissionForCreate } from "@/lib/policySubmissionForm";
import { US_STATE_OPTIONS } from "@/lib/usStates";
import { useToast } from "@/store/toast.context";

export default function PolicySubmissionCreateStarter({
  defaultAgentName,
}: {
  defaultAgentName: string;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [agentName, setAgentName] = useState(defaultAgentName);
  const [stateDealSignedAt, setStateDealSignedAt] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const create = async () => {
    const formData = {
      applicant: {
        agentName: agentName.trim(),
        stateDealSignedAt: stateDealSignedAt ?? "",
      },
      company: {},
      client: {},
      documents: {},
    };

    const validation = validatePolicySubmissionForCreate(formData);
    if (!validation.ok) {
      const nextErrors: Record<string, string> = {};
      if (!agentName.trim()) nextErrors.agentName = "Agent name is required.";
      if (!stateDealSignedAt) nextErrors.stateDealSignedAt = "State deal signed at is required.";
      setErrors(nextErrors);
      showToast("warn", "Check required fields", validation.error);
      return;
    }

    setErrors({});
    setCreating(true);
    try {
      const response = await fetch("/api/agent/policy-submissions", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const payload = await response.json();
      if (!response.ok) {
        showToast("error", payload.error || "Unable to create policy submission.");
        return;
      }
      router.push(`/agent/policy-submission/${payload.policySubmission.id}/edit`);
      router.refresh();
    } catch {
      showToast("error", "Unable to create policy submission.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-semibold m-0 text-900">New policy submission</h1>
          <p className="m-0 mt-2 text-600">
            Start with applicant details. You can complete company, client, and documents on the next screen.
          </p>
        </div>
        <Link href="/agent/policy-submission" className="p-button p-component p-button-secondary font-medium no-underline">
          Cancel
        </Link>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <label className="block mb-2 font-medium">
            Agent name <span className="text-red-500">*</span>
          </label>
          <InputText
            className={classNames("w-full", { "p-invalid": Boolean(errors.agentName) })}
            value={agentName}
            onChange={(e) => {
              setAgentName(e.target.value);
              if (errors.agentName) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.agentName;
                  return next;
                });
              }
            }}
          />
          {errors.agentName ? <small className="p-error block mt-1">{errors.agentName}</small> : null}
        </div>
        <div className="col-12 md:col-6">
          <label className="block mb-2 font-medium">
            State deal signed at <span className="text-red-500">*</span>
          </label>
          <Dropdown
            className={classNames("w-full", { "p-invalid": Boolean(errors.stateDealSignedAt) })}
            value={stateDealSignedAt}
            options={US_STATE_OPTIONS}
            optionLabel="label"
            optionValue="value"
            placeholder="Select state"
            showClear
            onChange={(e) => {
              setStateDealSignedAt(e.value ?? null);
              if (errors.stateDealSignedAt) {
                setErrors((prev) => {
                  const next = { ...prev };
                  delete next.stateDealSignedAt;
                  return next;
                });
              }
            }}
          />
          {errors.stateDealSignedAt ? (
            <small className="p-error block mt-1">{errors.stateDealSignedAt}</small>
          ) : null}
        </div>
      </div>

      <div className="flex justify-content-end mt-4 pt-3 border-top-1 surface-border">
        <Button
          label="Continue to submission"
          icon="pi pi-arrow-right"
          iconPos="right"
          onClick={() => void create()}
          loading={creating}
          disabled={creating}
        />
      </div>
    </div>
  );
}
