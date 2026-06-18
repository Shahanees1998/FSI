import Link from "next/link";
import ClientProfileDeleteButton from "@/components/clients/ClientProfileDeleteButton";
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
import { listClientProfilesForAgent } from "@/lib/clientProfileData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";
import { US_STATE_OPTIONS } from "@/lib/usStates";

export default async function AgentClientsPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  const user = await requireCurrentUser("AGENT");
  const result = await listClientProfilesForAgent(user.id, searchParams);
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const state = typeof searchParams.state === "string" ? searchParams.state : undefined;
  const city = typeof searchParams.city === "string" ? searchParams.city : undefined;
  const hasFilters = Boolean(q?.trim() || state || city?.trim());

  return (
    <div className="flex flex-column gap-4">
      <PortalListPageCard>
        <PortalListHeader
          title="Client Profiles"
          description="Add, edit, or remove client records you manage."
          actions={
            <Link href="/agent/clients/create" className="p-button p-component p-button-success font-medium no-underline">
              <span className="p-button-label p-c">New client</span>
            </Link>
          }
        />

        <form className={PORTAL_FILTER_FORM_CLASS} action="/agent/clients" method="get">
          <input type="hidden" name="page" value="1" />
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
            <PortalFilterInput
              inputType="search"
              name="q"
              placeholder="Name, email, phone..."
              defaultValue={q || ""}
            />
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>State</label>
            <PortalFilterSelect name="state" defaultValue={state || ""}>
              <option value="">Any state</option>
              {US_STATE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </PortalFilterSelect>
          </div>
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>City</label>
            <PortalFilterInput
              name="city"
              placeholder="Contains…"
              defaultValue={city || ""}
            />
          </div>
          <PortalFilterActions>
            <PortalFilterApplyButton />
            <PortalFilterResetLink href="/agent/clients" />
          </PortalFilterActions>
        </form>
      </PortalListPageCard>

      <PortalListPageCard>
        <p className="text-sm text-700 m-0 mb-3">
          Showing {result.data.length === 0 ? 0 : (result.pagination.page - 1) * result.pagination.pageSize + 1}–
          {Math.min(result.pagination.page * result.pagination.pageSize, result.pagination.total)} of{" "}
          {result.pagination.total} clients.
        </p>

        {result.data.length === 0 ? (
          <ListEmptyState
            iconClass="pi pi-users"
            title={hasFilters ? "No clients match your filters" : "No client profiles yet"}
            body={
              hasFilters
                ? "Try clearing search, state, or city filters, then click Apply filters again."
                : "Create a client profile to track contact details, policies, and submissions."
            }
            secondary={hasFilters ? undefined : 'Click "New client" above to get started.'}
          />
        ) : (
          <PortalListTableWrap>
            <PortalListTable>
              <thead>
                <PortalListTheadRow>
                  <PortalListTh>Name</PortalListTh>
                  <PortalListTh>Email</PortalListTh>
                  <PortalListTh>Phone</PortalListTh>
                  <PortalListTh>City</PortalListTh>
                  <PortalListTh>State</PortalListTh>
                  <PortalListTh>Updated</PortalListTh>
                  <PortalListThActions>Actions</PortalListThActions>
                </PortalListTheadRow>
              </thead>
              <tbody>
                {result.data.map((p) => (
                  <PortalListTr key={p.id}>
                    <PortalListTd>
                      {p.preferredFirstName} {p.lastName}
                    </PortalListTd>
                    <PortalListTd>{p.email || "—"}</PortalListTd>
                    <PortalListTd>{p.phone || "—"}</PortalListTd>
                    <PortalListTd>{p.city || "—"}</PortalListTd>
                    <PortalListTd>{p.state || "—"}</PortalListTd>
                    <PortalListTd className="text-600">{new Date(p.updatedAt).toLocaleDateString()}</PortalListTd>
                    <PortalListTdActions>
                      <div className="flex gap-2 justify-content-end flex-wrap">
                        <Link
                          href={`/agent/clients/${p.id}/edit`}
                          className="p-button p-component p-button-text p-button-sm font-medium no-underline"
                        >
                          Edit
                        </Link>
                        <ClientProfileDeleteButton profileId={p.id} />
                      </div>
                    </PortalListTdActions>
                  </PortalListTr>
                ))}
              </tbody>
            </PortalListTable>
          </PortalListTableWrap>
        )}

        <PaginationControls pathname="/agent/clients" searchParams={searchParams} pagination={result.pagination} />
      </PortalListPageCard>
    </div>
  );
}
