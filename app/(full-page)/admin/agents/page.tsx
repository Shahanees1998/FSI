import UserDirectoryManager from "@/components/portal/UserDirectoryManager";
import { listActiveCompanies, listUsersByRole } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminAgentsPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    await requireCurrentUser("ADMIN");
    const [result, companies] = await Promise.all([
        listUsersByRole("AGENT", searchParams),
        listActiveCompanies(),
    ]);

    return (
        <UserDirectoryManager
            mode="agent"
            initialUsers={result.data}
            pathname="/admin/agents"
            searchParams={searchParams}
            pagination={result.pagination}
            companies={companies}
            filters={{
                q: typeof searchParams.q === "string" ? searchParams.q : undefined,
                status: typeof searchParams.status === "string" ? searchParams.status : undefined,
            }}
        />
    );
}
