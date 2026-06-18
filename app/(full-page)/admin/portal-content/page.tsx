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
import { listPortalContents } from "@/lib/portalContentData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminPortalContentPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  await requireCurrentUser("ADMIN");
  const result = await listPortalContents(searchParams);
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const category = typeof searchParams.category === "string" ? searchParams.category : "";
  const hasFilters = Boolean(q.trim() || category);

  return (
    <div className="flex flex-column gap-4">
      <PortalListPageCard>
        <PortalListHeader
          title="Portal content"
          description="Manage Learn, recruiting, FAQ, training, and pop-up content."
          actions={
            <Link href="/admin/portal-content/create" className="p-button p-component p-button-success no-underline">
              <span className="p-button-label">New content</span>
            </Link>
          }
        />

        <form className={PORTAL_FILTER_FORM_CLASS} action="/admin/portal-content" method="get">
          <input type="hidden" name="page" value="1" />
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
            <PortalFilterInput name="q" inputType="search" placeholder="Search slug or title…" defaultValue={q} />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Category</label>
            <PortalFilterSelect name="category" defaultValue={category}>
              <option value="">All categories</option>
              <option value="LEARN">LEARN</option>
              <option value="RECRUITING">RECRUITING</option>
              <option value="POPUP">POPUP</option>
              <option value="FAQ">FAQ</option>
              <option value="TRAINING">TRAINING</option>
              <option value="NEW_AGENT">NEW_AGENT</option>
            </PortalFilterSelect>
          </div>
          <PortalFilterActions>
            <PortalFilterApplyButton />
            <PortalFilterResetLink href="/admin/portal-content" />
          </PortalFilterActions>
        </form>
      </PortalListPageCard>

      <PortalListPageCard>
        <p className="text-sm text-700 m-0 mb-3">
          Showing {result.data.length === 0 ? 0 : (result.pagination.page - 1) * result.pagination.pageSize + 1}–
          {Math.min(result.pagination.page * result.pagination.pageSize, result.pagination.total)} of{" "}
          {result.pagination.total} items.
        </p>

        {result.data.length === 0 ? (
          <ListEmptyState
            iconClass="pi pi-file"
            title={hasFilters ? "No content matches your filters" : "No portal content yet"}
            body={
              hasFilters
                ? "Try clearing search or category filters, then click Apply filters again."
                : "Create Learn pages, recruiting content, FAQs, and training materials from the button above."
            }
            secondary={hasFilters ? "Use Reset to clear filters." : 'Click "New content" above to get started.'}
          />
        ) : (
          <div className="flex flex-column gap-2">
            {result.data.map((item) => (
              <div key={item.id} className="border-1 surface-border border-round p-3 flex justify-content-between gap-3">
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-600 text-sm">
                    {item.slug} · {item.category} · {item.published ? "Published" : "Draft"}
                  </div>
                </div>
                <Link href={`/admin/portal-content/${item.id}/edit`}>Edit</Link>
              </div>
            ))}
          </div>
        )}

        <PaginationControls pathname="/admin/portal-content" searchParams={searchParams} pagination={result.pagination} />
      </PortalListPageCard>
    </div>
  );
}
