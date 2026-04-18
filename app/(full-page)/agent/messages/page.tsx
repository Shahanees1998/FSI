import MessagingWorkspace from "@/components/portal/MessagingWorkspace";
import { listConversationsForUser } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentMessagesPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    const user = await requireCurrentUser("AGENT");
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
            subtitle="Chat with JS Investment administrators and carriers in your preferred network. Search covers subjects, names, and message text. Updates appear live."
            basePath="/agent/messages"
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
