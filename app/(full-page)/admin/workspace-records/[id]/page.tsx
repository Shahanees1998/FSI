import AdminWorkspaceRecordEditor from "@/components/portal/AdminWorkspaceRecordEditor";
import { toDateInputValue } from "@/components/portal/WorkspaceRecordForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkspaceRecordAdmin } from "@/lib/adminWorkspaceData";
import { getWorkspaceConfig } from "@/lib/workspaceRecordConfig";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminWorkspaceRecordDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await requireCurrentUser("ADMIN");
  const record = await getWorkspaceRecordAdmin(params.id);
  if (!record) notFound();

  const config = getWorkspaceConfig(record.recordType);

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <div className="flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="mt-0 mb-2">Workspace record</h1>
          <p className="text-600 m-0">{config.title} · {record.id}</p>
        </div>
        <Link href="/admin/workspace-records">Back to list</Link>
      </div>
      <AdminWorkspaceRecordEditor
        recordId={record.id}
        recordType={record.recordType}
        agentLabel={`${record.agent.firstName} ${record.agent.lastName} (${record.agent.email})`}
        initial={{
          clientName: record.clientName || "",
          policyNumber: record.policyNumber || "",
          associate: record.associate || "",
          company: record.company || "",
          status: record.status || "",
          amount: record.amount != null ? String(record.amount) : "",
          recordDate: toDateInputValue(record.recordDate),
          paidDate: toDateInputValue(record.paidDate),
        }}
      />
    </div>
  );
}
