import Link from "next/link";
import ListEmptyState from "@/components/portal/ListEmptyState";
import PaginationControls from "@/components/portal/PaginationControls";
import {
  PORTAL_FILTER_FORM_CLASS,
  PORTAL_FILTER_LABEL_CLASS,
  PortalFilterApplyButton,
  PortalFilterActions,
  PortalFilterInput,
  PortalFilterResetLink,
  PortalListHeader,
  PortalListPageCard,
} from "@/components/portal/PortalListLayout";
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
    <div className="flex flex-column gap-4">
      <PortalListPageCard>
        <PortalListHeader
          title="Insurer Statistics"
          description="Monitor insurer performance, premium volume, retention, and commissions paid."
          actions={
            <Link href="/admin/insurer-stats/create" className="p-button p-component p-button-success no-underline">
              <span className="p-button-label">New stat</span>
            </Link>
          }
        />

        <form className={PORTAL_FILTER_FORM_CLASS} action="/admin/insurer-stats" method="get">
          <input type="hidden" name="page" value="1" />
          <div className="col-12 md:col-6">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
            <PortalFilterInput
              name="q"
              inputType="search"
              placeholder="Search carrier or notes..."
              defaultValue={q}
            />
          </div>
          <PortalFilterActions>
            <PortalFilterApplyButton />
            <PortalFilterResetLink href="/admin/insurer-stats" />
          </PortalFilterActions>
        </form>
      </PortalListPageCard>

      <PortalListPageCard>
        <p className="text-sm text-700 m-0 mb-3">
          Showing {result.data.length === 0 ? 0 : (result.pagination.page - 1) * result.pagination.pageSize + 1}–
          {Math.min(result.pagination.page * result.pagination.pageSize, result.pagination.total)} of{" "}
          {result.pagination.total} records.
        </p>

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
                ? "No rows matched your carrier or notes search. Try different keywords or clear the field."
                : "Monthly performance snapshots by carrier will display here once metrics are loaded."
            }
            secondary={hasActiveFilters ? "Use Reset to see every record." : undefined}
          />
        )}

        <PaginationControls pathname="/admin/insurer-stats" searchParams={searchParams} pagination={result.pagination} />
      </PortalListPageCard>
    </div>
  );
}
