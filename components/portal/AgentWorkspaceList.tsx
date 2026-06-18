import Link from "next/link";
import { AgentWorkspaceRecord, WorkspaceRecordType } from "@prisma/client";
import WorkspaceRecordDeleteButton from "@/components/portal/WorkspaceRecordDeleteButton";
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
import { formatWorkspaceCellValue, getRecordFieldValue } from "@/lib/agentWorkspaceData";
import { isLiveDerivedRecord } from "@/lib/liveWorkspaceRecords";
import { PaginationMeta, SearchParamRecord } from "@/lib/portalPagination";
import { getWorkspaceConfig } from "@/lib/workspaceRecordConfig";

export default function AgentWorkspaceList({
  recordType,
  searchParams = {},
  records,
  pagination,
}: {
  recordType: WorkspaceRecordType;
  searchParams?: SearchParamRecord;
  records: AgentWorkspaceRecord[];
  pagination: PaginationMeta;
}) {
  const config = getWorkspaceConfig(recordType);
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined;
  const company = typeof searchParams.company === "string" ? searchParams.company : undefined;
  const hasFilters = Boolean(q || status || company || config.filterFields?.some((f) => searchParams[f.key]));

  const table = (
    <PortalListTableWrap>
      <PortalListTable>
        <thead>
          <PortalListTheadRow>
            {config.columns.map((column) => (
              <PortalListTh key={column.key}>{column.label}</PortalListTh>
            ))}
            <PortalListThActions>Actions</PortalListThActions>
          </PortalListTheadRow>
        </thead>
        <tbody>
          {records.map((record) => (
            <PortalListTr key={record.id}>
              {config.columns.map((column) => (
                <PortalListTd key={column.key}>
                  {formatWorkspaceCellValue(getRecordFieldValue(record, column.key), column.format)}
                </PortalListTd>
              ))}
              <PortalListTdActions>
                {isLiveDerivedRecord(record) ? (
                  <span className="text-500 text-sm">Live data</span>
                ) : (
                  <div className="flex gap-2 justify-content-end flex-wrap">
                    <Link
                      href={`/agent/workspace/${recordType}/${record.id}/edit`}
                      className="p-button p-component p-button-text p-button-sm font-medium no-underline"
                    >
                      Edit
                    </Link>
                    <WorkspaceRecordDeleteButton recordId={record.id} recordType={recordType} />
                  </div>
                )}
              </PortalListTdActions>
            </PortalListTr>
          ))}
        </tbody>
      </PortalListTable>
    </PortalListTableWrap>
  );

  return (
    <div className="flex flex-column gap-4">
      <PortalListPageCard>
        <PortalListHeader
          title={config.title}
          description={config.description}
          actions={
            config.allowCreate ? (
              <Link
                href={`/agent/workspace/${recordType}/create`}
                className="p-button p-component p-button-success font-medium no-underline"
              >
                <span className="p-button-label p-c">New record</span>
              </Link>
            ) : undefined
          }
        />

        <form className={PORTAL_FILTER_FORM_CLASS} action={config.pathname} method="get">
          <input type="hidden" name="page" value="1" />
          <div className="col-12 md:col-4">
            <label className={PORTAL_FILTER_LABEL_CLASS}>Search</label>
            <PortalFilterInput
              inputType="search"
              name="q"
              placeholder="Search records…"
              defaultValue={q || ""}
            />
          </div>
          {config.filterFields?.map((field) => {
            const fieldValue =
              typeof searchParams[field.key] === "string" ? searchParams[field.key] : "";
            return (
              <div key={field.key} className="col-12 md:col-4">
                <label className={PORTAL_FILTER_LABEL_CLASS}>{field.label}</label>
                {field.type === "select" && field.options?.length ? (
                  <PortalFilterSelect name={field.key} defaultValue={fieldValue}>
                    {field.options.map((opt) => (
                      <option key={opt.value || "__all__"} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </PortalFilterSelect>
                ) : (
                  <PortalFilterInput
                    name={field.key}
                    placeholder={field.placeholder || ""}
                    defaultValue={fieldValue}
                  />
                )}
              </div>
            );
          })}
          <PortalFilterActions>
            <PortalFilterApplyButton />
            <PortalFilterResetLink href={config.pathname} />
          </PortalFilterActions>
        </form>
      </PortalListPageCard>

      <PortalListPageCard>
        <p className="text-sm text-700 m-0 mb-3">
          Showing {records.length === 0 ? 0 : (pagination.page - 1) * pagination.pageSize + 1}–
          {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total} items.
        </p>

        {records.length === 0 ? (
          <ListEmptyState
            iconClass="pi pi-file-edit"
            title={hasFilters ? "No records match your filters" : `No ${config.title.toLowerCase()} yet`}
            body={
              hasFilters
                ? "Try clearing search or filter fields, then click Apply filters again."
                : config.allowCreate
                  ? `Create a new ${config.title.toLowerCase().replace(/s$/, "")} record to see it listed here.`
                  : "Records will appear here when available."
            }
            secondary={
              hasFilters || !config.allowCreate
                ? undefined
                : 'Click "New record" above to get started.'
            }
          />
        ) : (
          table
        )}

        <PaginationControls pathname={config.pathname} searchParams={searchParams} pagination={pagination} />
      </PortalListPageCard>
    </div>
  );
}
