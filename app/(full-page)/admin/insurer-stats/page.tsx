import Link from "next/link";
import ListEmptyState from "@/components/portal/ListEmptyState";
import PaginationControls from "@/components/portal/PaginationControls";
import { listInsurerStats } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminInsurerStatsPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    await requireCurrentUser("ADMIN");
    const result = await listInsurerStats(searchParams);
    const q = typeof searchParams.q === "string" ? searchParams.q : "";
    const hasActiveFilters = Boolean(q.trim());

    return (
        <div className="surface-card border-round border-1 surface-border p-4">
            <div className="flex flex-column lg:flex-row lg:justify-content-between lg:align-items-center gap-3 mb-4">
                <div>
                    <h1 className="mt-0 mb-2">Insurer Statistics</h1>
                    <p className="text-600 m-0">Monitor insurer performance, premium volume, retention, and commissions paid.</p>
                </div>
                <form action="/admin/insurer-stats">
                    <input
                        className="p-inputtext p-component"
                        name="q"
                        placeholder="Search carrier or notes..."
                        defaultValue={typeof searchParams.q === "string" ? searchParams.q : ""}
                    />
                    <button className="p-button p-component ml-2" type="submit">
                        Search
                    </button>
                </form>
            </div>
            {result.data.length > 0 ? (
                <div className="grid">
                    {result.data.map((stat) => (
                        <div key={stat.id} className="col-12 lg:col-6">
                            <div className="border-1 surface-border border-round p-3 h-full">
                                <div className="font-semibold">{stat.carrierProfile.carrierName}</div>
                                <div className="text-600 text-sm mt-1">
                                    {new Date(stat.metricMonth).toLocaleDateString()} | {stat.carrierProfile.carrierCode}
                                </div>
                                <div className="grid mt-3">
                                    <div className="col-6 text-sm">Active agents: {stat.activeAgents}</div>
                                    <div className="col-6 text-sm">Issued policies: {stat.issuedPolicies}</div>
                                    <div className="col-6 text-sm">Submitted premium: ${stat.submittedPremium.toFixed(0)}</div>
                                    <div className="col-6 text-sm">Issued premium: ${stat.issuedPremium.toFixed(0)}</div>
                                    <div className="col-6 text-sm">Commissions paid: ${stat.commissionsPaid.toFixed(0)}</div>
                                    <div className="col-6 text-sm">Retention rate: {stat.retentionRate.toFixed(1)}%</div>
                                </div>
                                {stat.notes && <p className="text-600 text-sm mb-0 mt-3">{stat.notes}</p>}
                                <div className="mt-3">
                                    <Link href={`/admin/insurer-stats/${stat.id}`}>View details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <ListEmptyState
                    iconClass="pi pi-chart-line"
                    title={hasActiveFilters ? "No insurer stats match your search" : "No insurer statistics yet"}
                    body={
                        hasActiveFilters
                            ? "No rows matched your carrier or notes search. Try different keywords or clear the field to browse all metrics."
                            : "Monthly performance snapshots by carrier will display here once metrics are loaded. Each card summarizes agents, policies, premium, and retention."
                    }
                    secondary={hasActiveFilters ? "Clear the search box and search again to see every record." : undefined}
                />
            )}
            <PaginationControls pathname="/admin/insurer-stats" searchParams={searchParams} pagination={result.pagination} />
        </div>
    );
}
