import MessagingWorkspace from "@/components/portal/MessagingWorkspace";
import { listConversationsForUser } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminMessagesPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    const user = await requireCurrentUser("ADMIN");
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
            subtitle="Slack-style threads across agents, carriers, and administrators. Search runs on the server across subjects, people, and message text. New messages sync in real time."
            basePath="/admin/messages"
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
