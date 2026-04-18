"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import ListEmptyState from "@/components/portal/ListEmptyState";
import PaginationControls from "@/components/portal/PaginationControls";
import { APP_DEFAULT_AGENCY_NAME } from "@/lib/appBranding";
import { PaginationMeta, SearchParamRecord } from "@/lib/portalPagination";

interface DirectoryUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    status: string;
    jobTitle?: string | null;
    agentProfile?: {
        agentCode?: string;
        licenseNumber?: string | null;
        company?: {
            id: string;
            name: string;
            location?: string | null;
            department?: string | null;
        } | null;
    } | null;
    carrierProfile?: {
        carrierCode?: string;
        carrierName?: string;
        contactEmail?: string | null;
    } | null;
}

export default function UserDirectoryManager({
    mode,
    initialUsers,
    pathname,
    searchParams,
    pagination,
    filters,
    companies = [],
}: {
    mode: "agent" | "carrier";
    initialUsers: DirectoryUser[];
    pathname: string;
    searchParams: SearchParamRecord;
    pagination: PaginationMeta;
    filters: {
        q?: string;
        status?: string;
    };
    companies?: { id: string; name: string; location?: string | null; department?: string | null }[];
}) {
    const [users, setUsers] = useState(initialUsers);
    const [message, setMessage] = useState<string | null>(null);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "ACTIVE",
        jobTitle: "",
        location: "",
        agentCode: "",
        licenseNumber: "",
        companyId: "",
        carrierCode: "",
        carrierName: "",
    });

    const isAgent = mode === "agent";
    const endpoint = isAgent ? "/api/admin/agents" : "/api/admin/carriers";
    const hasActiveFilters = Boolean(filters.q?.trim()) || Boolean(filters.status);

    const createUser = async () => {
        setMessage(null);
        const response = await fetch(endpoint, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                role: isAgent ? "AGENT" : "CARRIER",
                agencyName: APP_DEFAULT_AGENCY_NAME,
                contactEmail: form.email,
                ...(isAgent && form.companyId ? { companyId: form.companyId } : {}),
            }),
        });
        const payload = await response.json();
        if (!response.ok) {
            setMessage(payload.error || "Unable to create record.");
            return;
        }

        setUsers((prev) => [payload[isAgent ? "agent" : "carrier"], ...prev]);
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            status: "ACTIVE",
            jobTitle: "",
            location: "",
            agentCode: "",
            licenseNumber: "",
            companyId: "",
            carrierCode: "",
            carrierName: "",
        });
        setMessage(`${isAgent ? "Agent" : "Carrier"} created successfully.`);
    };

    return (
        <div className="grid">
            <div className="col-12 lg:col-4">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <h3 className="mt-0">Add {isAgent ? "agent" : "carrier"}</h3>
                    <div className="grid">
                        <div className="col-12 md:col-6 lg:col-12">
                            <label className="block mb-2">First name</label>
                            <InputText
                                className="w-full"
                                value={form.firstName}
                                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                            />
                        </div>
                        <div className="col-12 md:col-6 lg:col-12">
                            <label className="block mb-2">Last name</label>
                            <InputText
                                className="w-full"
                                value={form.lastName}
                                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                            />
                        </div>
                        <div className="col-12">
                            <label className="block mb-2">Email</label>
                            <InputText
                                className="w-full"
                                value={form.email}
                                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div className="col-12">
                            <label className="block mb-2">Phone</label>
                            <InputText
                                className="w-full"
                                value={form.phone}
                                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                        <div className="col-12">
                            <label className="block mb-2">Job title</label>
                            <InputText
                                className="w-full"
                                value={form.jobTitle}
                                onChange={(e) => setForm((prev) => ({ ...prev, jobTitle: e.target.value }))}
                            />
                        </div>
                        <div className="col-12">
                            <label className="block mb-2">Status</label>
                            <Dropdown
                                className="w-full"
                                value={form.status}
                                options={[
                                    { label: "Active", value: "ACTIVE" },
                                    { label: "Invited", value: "INVITED" },
                                    { label: "Inactive", value: "INACTIVE" },
                                    { label: "Suspended", value: "SUSPENDED" },
                                ]}
                                onChange={(e) => setForm((prev) => ({ ...prev, status: e.value }))}
                            />
                        </div>
                        <div className="col-12">
                            <label className="block mb-2">
                                {isAgent ? "Agent code" : "Carrier code"}
                            </label>
                            <InputText
                                className="w-full"
                                value={isAgent ? form.agentCode : form.carrierCode}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        [isAgent ? "agentCode" : "carrierCode"]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="col-12">
                            <label className="block mb-2">
                                {isAgent ? "License number" : "Carrier name"}
                            </label>
                            <InputText
                                className="w-full"
                                value={isAgent ? form.licenseNumber : form.carrierName}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        [isAgent ? "licenseNumber" : "carrierName"]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        {isAgent && companies.length > 0 && (
                            <div className="col-12">
                                <label className="block mb-2">Company</label>
                                <Dropdown
                                    className="w-full"
                                    value={form.companyId}
                                    options={[
                                        { label: "No company", value: "" },
                                        ...companies.map((c) => ({
                                            label: [c.name, c.location, c.department].filter(Boolean).join(" · "),
                                            value: c.id,
                                        })),
                                    ]}
                                    onChange={(e) => setForm((prev) => ({ ...prev, companyId: e.value }))}
                                />
                            </div>
                        )}
                    </div>
                    <Button label={`Create ${isAgent ? "agent" : "carrier"}`} className="mt-3" onClick={createUser} />
                    {message && <p className="mt-3 mb-0 font-medium">{message}</p>}
                </div>
            </div>
            <div className="col-12 lg:col-8">
                <div className="surface-card border-round border-1 surface-border p-4">
                    <div className="flex flex-column lg:flex-row lg:justify-content-between lg:align-items-center gap-3 mb-4">
                        <div>
                            <h3 className="mt-0 mb-2">
                                {isAgent ? "Agent directory" : "Carrier directory"}
                            </h3>
                            <p className="m-0 text-600">
                                Search and filter directly on the server, then open each record for a full view.
                            </p>
                        </div>
                        <form className="flex flex-column lg:flex-row gap-2" action={pathname}>
                            <InputText name="q" placeholder="Search people, email, code..." defaultValue={filters.q || ""} />
                            <select
                                name="status"
                                className="p-inputtext p-component min-w-12rem"
                                defaultValue={filters.status || ""}
                            >
                                <option value="">All statuses</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INVITED">Invited</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="SUSPENDED">Suspended</option>
                            </select>
                            <Button type="submit" label="Apply" />
                        </form>
                    </div>
                    {users.length > 0 ? (
                        <div className="grid">
                            {users.map((user) => (
                                <div key={user.id} className="col-12">
                                    <div className="border-1 surface-border border-round p-3">
                                        <div className="flex justify-content-between align-items-start gap-3">
                                            <div>
                                                <div className="font-semibold">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-600 text-sm mt-1">
                                                    {user.email} | {user.status}
                                                </div>
                                                <div className="text-600 text-sm mt-1">
                                                    {isAgent
                                                        ? `${user.agentProfile?.agentCode || "No code"}${user.agentProfile?.licenseNumber ? ` | ${user.agentProfile.licenseNumber}` : ""}`
                                                        : `${user.carrierProfile?.carrierName || "No carrier name"} | ${user.carrierProfile?.carrierCode || "No code"}`}
                                                </div>
                                                {isAgent && user.agentProfile?.company?.name && (
                                                    <div className="text-600 text-sm mt-1">
                                                        Company: {user.agentProfile.company.name}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-600 text-sm mb-2">{user.jobTitle || "No title"}</div>
                                                <Link href={`${pathname}/${user.id}`} className="font-medium">
                                                    View details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ListEmptyState
                            iconClass={isAgent ? "pi pi-users" : "pi pi-building"}
                            title={
                                hasActiveFilters
                                    ? `No ${isAgent ? "agents" : "carriers"} match your filters`
                                    : `No ${isAgent ? "agents" : "carriers"} in the directory yet`
                            }
                            body={
                                hasActiveFilters
                                    ? `We could not find any ${isAgent ? "agent" : "carrier"} records that match your current search or status filter.`
                                    : `Use the form on the left to invite your first ${isAgent ? "agent" : "carrier"}. Each person appears here once their account is created, with quick access to profile details and status.`
                            }
                            secondary={
                                hasActiveFilters
                                    ? 'Clear the search box, set status to "All statuses", and click Apply to see the full directory.'
                                    : undefined
                            }
                        />
                    )}
                    <PaginationControls pathname={pathname} searchParams={searchParams} pagination={pagination} />
                </div>
            </div>
        </div>
    );
}
