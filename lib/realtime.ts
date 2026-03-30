import Pusher from "pusher";

let pusherServer: Pusher | null | undefined;

function getPusherServer() {
  if (pusherServer !== undefined) {
    return pusherServer;
  }

  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) {
    pusherServer = null;
    return pusherServer;
  }

  pusherServer = new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
  });

  return pusherServer;
}

async function publish(channel: string, event: string, payload: unknown) {
  const pusher = getPusherServer();
  if (!pusher) {
    return;
  }

  await pusher.trigger(channel, event, payload);
}

export async function publishConversationMessage(
  conversationId: string,
  payload: unknown
) {
  await publish(`conversation-${conversationId}`, "message.created", payload);
}

export async function publishNotification(userId: string, payload: unknown) {
  await publish(`user-${userId}`, "notification.created", payload);
}

/** Sidebar / inbox refresh when a conversation is created or a new message arrives. */
export async function publishInboxUpdate(userId: string, payload: unknown) {
  await publish(`user-${userId}`, "inbox.updated", payload);
}
