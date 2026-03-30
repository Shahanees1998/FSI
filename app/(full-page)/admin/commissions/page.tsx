import Link from "next/link";
import ListEmptyState from "@/components/portal/ListEmptyState";
import PaginationControls from "@/components/portal/PaginationControls";
import { listCommissionsForUser } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminCommissionsPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    const user = await requireCurrentUser("ADMIN");
    const result = await listCommissionsForUser(
        { role: user.role, userId: user.id },
        searchParams
    );
    const q = typeof searchParams.q === "string" ? searchParams.q : "";
    const status = typeof searchParams.status === "string" ? searchParams.status : "";
    const hasActiveFilters = Boolean(q.trim()) || Boolean(status);

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <div className="flex flex-column lg:flex-row lg:justify-content-between lg:align-items-center gap-3 mb-4">
                <div>
                    <h1 className="mt-0 mb-2">Commission Management</h1>
                    <p className="text-600 m-0">Track commission records across carriers and agents.</p>
                </div>
                <form className="flex flex-column lg:flex-row gap-2" action="/admin/commissions">
                    <input
                        className="p-inputtext p-component"
                        name="q"
                        placeholder="Search client, policy, carrier..."
                        defaultValue={typeof searchParams.q === "string" ? searchParams.q : ""}
                    />
                    <select
                        className="p-inputtext p-component"
                        name="status"
                        defaultValue={typeof searchParams.status === "string" ? searchParams.status : ""}
                    >
                        <option value="">All statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PAID">Paid</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                    <button className="p-button p-component" type="submit">
                        Apply
                    </button>
                </form>
            </div>
            <div className="mb-4 text-600">
                Filtered total: <span className="font-semibold">${result.totals.total.toFixed(2)}</span>
            </div>
            {result.data.length > 0 ? (
                <div className="grid">
                    {result.data.map((commission) => (
                        <div key={commission.id} className="col-12">
                            <div className="border-1 surface-border border-round p-3">
                                <div className="flex justify-content-between gap-3">
                                    <div>
                                        <div className="font-semibold">{commission.clientName}</div>
                                        <div className="text-600 text-sm mt-1">
                                            {commission.agent.firstName} {commission.agent.lastName} |{" "}
                                            {commission.carrierProfile.carrierName}
                                        </div>
                                        <div className="text-600 text-sm mt-1">
                                            {commission.productLine} | {commission.policyNumber} | {commission.status}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold">${commission.amount.toFixed(2)}</div>
                                        <div className="text-600 text-sm">
                                            {new Date(commission.statementMonth).toLocaleDateString()}
                                        </div>
                                        <div className="mt-2">
                                            <Link href={`/admin/commissions/${commission.id}`}>View details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <ListEmptyState
                    iconClass="pi pi-wallet"
                    title={hasActiveFilters ? "No commissions match your filters" : "No commission records yet"}
                    body={
                        hasActiveFilters
                            ? "Adjust your search terms or status filter and click Apply. Commission rows appear here once they are recorded in the system."
                            : "Commission entries will show client, agent, carrier, and payout details as they are added. Use the filters above once data is available."
                    }
                    secondary={
                        hasActiveFilters
                            ? 'Clear the search field, set status to "All statuses", and apply again to see every record.'
                            : undefined
                    }
                />
            )}
            <PaginationControls pathname="/admin/commissions" searchParams={searchParams} pagination={result.pagination} />
        </div>
    );
}
