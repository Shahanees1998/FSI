import UserDirectoryManager from "@/components/portal/UserDirectoryManager";
import { listUsersByRole } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminAgentsPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    await requireCurrentUser("ADMIN");
    const result = await listUsersByRole("AGENT", searchParams);

    return (
        <UserDirectoryManager
            mode="agent"
            initialUsers={result.data}
            pathname="/admin/agents"
            searchParams={searchParams}
            pagination={result.pagination}
            filters={{
                q: typeof searchParams.q === "string" ? searchParams.q : undefined,
                status: typeof searchParams.status === "string" ? searchParams.status : undefined,
            }}
        />
    );
}
