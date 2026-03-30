import TicketWorkspace from "@/components/portal/TicketWorkspace";
import { listTicketsForUser } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminTicketsPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    const user = await requireCurrentUser("ADMIN");
    const result = await listTicketsForUser(
        { role: user.role, userId: user.id },
        searchParams
    );

    return (
        <TicketWorkspace
            initialTickets={result.data}
            canCreate={false}
            pathname="/admin/tickets"
            searchParams={searchParams}
            pagination={result.pagination}
            filters={{
                q: typeof searchParams.q === "string" ? searchParams.q : undefined,
                status: typeof searchParams.status === "string" ? searchParams.status : undefined,
                priority: typeof searchParams.priority === "string" ? searchParams.priority : undefined,
                category: typeof searchParams.category === "string" ? searchParams.category : undefined,
            }}
        />
    );
}
