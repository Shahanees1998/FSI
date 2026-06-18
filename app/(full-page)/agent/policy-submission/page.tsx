import Link from "next/link";
import PolicySubmissionDeleteButton from "@/components/policy-submission/PolicySubmissionDeleteButton";
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
  PortalListTable,
  PortalListTableWrap,
  PortalListTd,
  PortalListTdActions,
  PortalListTh,
  PortalListThActions,
  PortalListTheadRow,
  PortalListTr,
} from "@/components/portal/PortalListLayout";
import { listPolicySubmissionsForAgent } from "@/lib/policySubmissionData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentPolicySubmissionListPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  const user = await requireCurrentUser("AGENT");
  const result = await listPolicySubmissionsForAgent(user.id, searchParams);
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined;
  const progress = typeof searchParams.progress === "string" ? searchParams.progress : undefined;

  const hasFilters = Boolean(q?.trim() || status || progress);

  return (
    <div className="flex flex-column gap-4">
      <PortalListPageCard>
        <PortalListHeader
          title="Policy submission"
          description="Create submissions, track completion, and manage drafts."
          actions={
            <Link
              href="/agent/policy-submission/create"
              className="p-button p-component p-button-success font-medium no-underline"
            >
              <span className="p-button-label p-c">New policy submission</span>
            </Link>
          }
        />

        <form className={PORTAL_FILTER_FORM_CLASS} action="/agent/policy-submission" method="get">
          <input type="hidden" name="page" value="1" />
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
            <PortalFilterInput
              inputType="search"
              name="q"
              placeholder="Summary text…"
              defaultValue={q || ""}
            />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Status</label>
            <PortalFilterSelect name="status" defaultValue={status || ""}>
              <option value="">Any status</option>
              <option value="DRAFT">Draft</option>
              <option value="SUBMITTED">Submitted</option>
            </PortalFilterSelect>
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Progress</label>
            <PortalFilterSelect name="progress" defaultValue={progress || ""}>
              <option value="">Any progress</option>
              <option value="low">0–33%</option>
              <option value="mid">34–66%</option>
              <option value="high">67–100%</option>
            </PortalFilterSelect>
          </div>
          <PortalFilterActions>
            <PortalFilterApplyButton />
            <PortalFilterResetLink href="/agent/policy-submission" />
          </PortalFilterActions>
        </form>
      </PortalListPageCard>

      <PortalListPageCard>
        <p className="text-sm text-700 m-0 mb-3">
          Showing {result.data.length === 0 ? 0 : (result.pagination.page - 1) * result.pagination.pageSize + 1}–
          {Math.min(result.pagination.page * result.pagination.pageSize, result.pagination.total)} of{" "}
          {result.pagination.total} submissions.
        </p>

        {result.data.length === 0 ? (
          <ListEmptyState
            iconClass="pi pi-file-edit"
            title={hasFilters ? "No policy submissions match your filters" : "No policy submissions yet"}
            body={
              hasFilters
                ? "Try clearing search, status, or progress filters, then click Apply filters again."
                : "Start a new life, critical illness, or disability insurance submission. Complete applicant, company, client, and document sections before submitting."
            }
            secondary={
              hasFilters ? undefined : 'Click "New policy submission" above to get started.'
            }
          />
        ) : (
          <PortalListTableWrap>
            <PortalListTable>
              <thead>
                <PortalListTheadRow>
                  <PortalListTh>Summary</PortalListTh>
                  <PortalListTh>Status</PortalListTh>
                  <PortalListTh>Progress</PortalListTh>
                  <PortalListTh>Updated</PortalListTh>
                  <PortalListThActions>Actions</PortalListThActions>
                </PortalListTheadRow>
              </thead>
              <tbody>
                {result.data.map((row) => (
                  <PortalListTr key={row.id}>
                    <PortalListTd className="font-medium">{row.summaryLabel || "Policy submission"}</PortalListTd>
                    <PortalListTd>
                      <span
                        className={
                          row.status === "SUBMITTED"
                            ? "text-green-700 font-medium"
                            : "text-orange-600 font-medium"
                        }
                      >
                        {row.status === "SUBMITTED" ? "Submitted" : "Draft"}
                      </span>
                    </PortalListTd>
                    <PortalListTd>{row.progressPercent}%</PortalListTd>
                    <PortalListTd className="text-600">{new Date(row.updatedAt).toLocaleDateString()}</PortalListTd>
                    <PortalListTdActions>
                      <div className="flex gap-2 justify-content-end flex-wrap">
                        <Link
                          href={`/agent/policy-submission/${row.id}/edit`}
                          className="p-button p-component p-button-text p-button-sm font-medium no-underline"
                        >
                          Edit
                        </Link>
                        <PolicySubmissionDeleteButton policyId={row.id} />
                      </div>
                    </PortalListTdActions>
                  </PortalListTr>
                ))}
              </tbody>
            </PortalListTable>
          </PortalListTableWrap>
        )}

        <PaginationControls pathname="/agent/policy-submission" searchParams={searchParams} pagination={result.pagination} />
      </PortalListPageCard>
    </div>
  );
}
