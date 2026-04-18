import MessagingWorkspace from "@/components/portal/MessagingWorkspace";
import { listConversationsForUser } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function CarrierMessagesPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    const user = await requireCurrentUser("CARRIER");
    const listParams: SearchParamRecord = {
        ...searchParams,
        ...(searchParams.pageSize ? {} : { pageSize: "30" }),
    };
    const result = await listConversationsForUser(
        { role: user.role, userId: user.id },
        listParams
    );

    return (
        <MessagingWorkspace
            title="Messages"
            subtitle="Coordinate with JS Investment administrators and agents who carry your products. Search covers subjects, people, and message text. Updates appear live."
            basePath="/carrier/messages"
            currentUser={{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                profileImage: user.profileImage,
            }}
            initialConversations={result.data}
            listPagination={result.pagination}
            searchParams={listParams}
            selectedConversationId={null}
            threadInitial={null}
            canStartConversation
        />
    );
}
