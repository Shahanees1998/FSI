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
import { listWorkspaceRecordsAdmin } from "@/lib/adminWorkspaceData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminWorkspaceRecordsPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  await requireCurrentUser("ADMIN");
  const result = await listWorkspaceRecordsAdmin(searchParams);
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const recordType = typeof searchParams.recordType === "string" ? searchParams.recordType : "";
  const hasFilters = Boolean(q.trim() || recordType.trim());

  return (
    <div className="flex flex-column gap-4">
      <PortalListPageCard>
        <PortalListHeader
          title="Agent workspace records"
          description="View all agent business, report, team, and contract records across the platform."
        />

        <form className={PORTAL_FILTER_FORM_CLASS} action="/admin/workspace-records" method="get">
          <input type="hidden" name="page" value="1" />
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
            <PortalFilterInput name="q" placeholder="Search…" defaultValue={q} />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Record type</label>
            <PortalFilterInput name="recordType" placeholder="e.g. INSURANCE" defaultValue={recordType} />
          </div>
          <PortalFilterActions>
            <PortalFilterApplyButton />
            <PortalFilterResetLink href="/admin/workspace-records" />
          </PortalFilterActions>
        </form>
      </PortalListPageCard>

      <PortalListPageCard>
        <p className="text-sm text-700 m-0 mb-3">
          Showing {result.data.length === 0 ? 0 : (result.pagination.page - 1) * result.pagination.pageSize + 1}–
          {Math.min(result.pagination.page * result.pagination.pageSize, result.pagination.total)} of{" "}
          {result.pagination.total} records.
        </p>

        {result.data.length === 0 ? (
          <ListEmptyState
            iconClass="pi pi-file-edit"
            title={hasFilters ? "No records match your filters" : "No workspace records yet"}
            body={
              hasFilters
                ? "Try clearing search or record type filters, then click Apply filters again."
                : "Agent workspace records will appear here as agents create business, report, and team entries."
            }
            secondary={hasFilters ? "Use Reset to clear filters." : undefined}
          />
        ) : (
          <div className="flex flex-column gap-2">
            {result.data.map((record) => (
              <div
                key={record.id}
                className="border-1 surface-border border-round p-3 flex justify-content-between align-items-start gap-3"
              >
                <div>
                  <div className="font-semibold">
                    {record.recordType} · {record.clientName || record.associate || record.company || "—"}
                  </div>
                  <div className="text-600 text-sm">
                    Agent: {record.agent.firstName} {record.agent.lastName} ({record.agent.email}) · Updated{" "}
                    {new Date(record.updatedAt).toLocaleString()}
                  </div>
                </div>
                <Link
                  href={`/admin/workspace-records/${record.id}`}
                  className="text-primary text-sm font-medium no-underline hover:underline flex-shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}

        <PaginationControls pathname="/admin/workspace-records" searchParams={searchParams} pagination={result.pagination} />
      </PortalListPageCard>
    </div>
  );
}
