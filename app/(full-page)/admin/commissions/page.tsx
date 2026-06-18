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
  PortalFilterSelect,
  PortalListHeader,
  PortalListPageCard,
} from "@/components/portal/PortalListLayout";
import { listCommissionsForUser } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminCommissionsPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  const user = await requireCurrentUser("ADMIN");
  const result = await listCommissionsForUser({ role: user.role, userId: user.id }, searchParams);
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const status = typeof searchParams.status === "string" ? searchParams.status : "";
  const hasActiveFilters = Boolean(q.trim()) || Boolean(status);

  return (
    <div className="flex flex-column gap-4">
      <PortalListPageCard>
        <PortalListHeader
          title="Commission Management"
          description="Track commission records across carriers and agents."
          actions={
            <Link href="/admin/commissions/create" className="p-button p-component p-button-success no-underline">
              <span className="p-button-label">New commission</span>
            </Link>
          }
        />

        <form className={PORTAL_FILTER_FORM_CLASS} action="/admin/commissions" method="get">
          <input type="hidden" name="page" value="1" />
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
            <PortalFilterInput
              name="q"
              inputType="search"
              placeholder="Search client, policy, carrier..."
              defaultValue={q}
            />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Status</label>
            <PortalFilterSelect name="status" defaultValue={status}>
              <option value="">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="PAID">Paid</option>
              <option value="DISPUTED">Disputed</option>
            </PortalFilterSelect>
          </div>
          <PortalFilterActions>
            <PortalFilterApplyButton />
            <PortalFilterResetLink href="/admin/commissions" />
          </PortalFilterActions>
        </form>
      </PortalListPageCard>

      <PortalListPageCard>
        <p className="text-sm text-700 m-0 mb-3">
          Filtered total: <span className="font-semibold">${result.totals.total.toFixed(2)}</span>
          {" · "}
          Showing {result.data.length === 0 ? 0 : (result.pagination.page - 1) * result.pagination.pageSize + 1}–
          {Math.min(result.pagination.page * result.pagination.pageSize, result.pagination.total)} of{" "}
          {result.pagination.total} commissions.
        </p>

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
                        <Link href={`/admin/commissions/${commission.id}`}>Edit</Link>
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
                ? "Adjust your search terms or status filter and click Apply filters again."
                : "Commission entries will show client, agent, carrier, and payout details as they are added."
            }
            secondary={hasActiveFilters ? 'Use Reset to see every record.' : undefined}
          />
        )}

        <PaginationControls pathname="/admin/commissions" searchParams={searchParams} pagination={result.pagination} />
      </PortalListPageCard>
    </div>
  );
}
