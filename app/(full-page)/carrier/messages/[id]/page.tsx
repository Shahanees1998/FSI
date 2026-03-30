import { notFound } from "next/navigation";
import MessagingWorkspace from "@/components/portal/MessagingWorkspace";
import { getConversationDetailForUser, listConversationsForUser } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function CarrierConversationDetailPage({
    params,
    searchParams = {},
}: {
    params: { id: string };
    searchParams?: SearchParamRecord;
}) {
    const user = await requireCurrentUser("CARRIER");
    const listParams: SearchParamRecord = {
        ...searchParams,
        ...(searchParams.pageSize ? {} : { pageSize: "30" }),
    };

    const [listResult, thread] = await Promise.all([
        listConversationsForUser({ role: user.role, userId: user.id }, listParams),
        getConversationDetailForUser(
            { role: user.role, userId: user.id },
            params.id,
            searchParams
        ),
    ]);

    if (!thread) {
        notFound();
    }

    return (
        <MessagingWorkspace
            title="Messages"
            subtitle="Coordinate with FSI administrators and agents who carry your products. Search covers subjects, people, and message text. Updates appear live."
            basePath="/carrier/messages"
            currentUser={{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                profileImage: user.profileImage,
            }}
            initialConversations={listResult.data}
            listPagination={listResult.pagination}
            searchParams={listParams}
            selectedConversationId={params.id}
            threadInitial={{
                conversation: thread.conversation,
                messages: thread.messages,
                pagination: thread.pagination,
            }}
            canStartConversation
        />
    );
}
