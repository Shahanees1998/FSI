import { NextRequest, NextResponse } from 'next/server';
import { getFcmStatus, sendFcmToUser } from '@/lib/fcmService';

/**
 * GET /api/debug/fcm?userId=xxx
 * Local FCM health check. Only available when NODE_ENV=development.
 * - No query: returns FCM init status and env check (no secrets).
 * - userId=xxx: also returns token count for that user (to verify device is registered).
 *
 * POST /api/debug/fcm
 * Body: { "userId": "xxx" }
 * Sends a test notification to that user (dev only). Use to verify push on device.
 */
function devOnly() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'FCM debug API is only available in development (NODE_ENV=development)' },
      { status: 404 }
    );
  }
  return null;
}

export async function GET(request: NextRequest) {
  const blocked = devOnly();
  if (blocked) return blocked;

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') ?? undefined;
    const status = await getFcmStatus(userId);
    return NextResponse.json(status);
  } catch (e) {
    console.error('[FCM debug]', e);
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const blocked = devOnly();
  if (blocked) return blocked;

  try {
    const body = await request.json().catch(() => ({}));
    const userId = typeof body.userId === 'string' ? body.userId.trim() : null;
    if (!userId) {
      return NextResponse.json({ error: 'Body must include { "userId": "..." }' }, { status: 400 });
    }

    const status = await getFcmStatus(userId);
    if (!status.initialized) {
      return NextResponse.json({ error: 'FCM not initialized', status }, { status: 503 });
    }
    if ((status.tokenCount ?? 0) === 0) {
      return NextResponse.json({
        error: 'No device token for this user – open the app (dev build/APK) and log in',
        status,
      }, { status: 400 });
    }

    await sendFcmToUser(userId, {
      title: 'Test notification',
      body: 'If you see this, FCM is working locally.',
      data: { type: 'DEBUG_TEST' },
    });

    return NextResponse.json({
      success: true,
      message: 'Test notification sent. Check the device.',
      status: { ...status, tokenCount: status.tokenCount },
    });
  } catch (e) {
    console.error('[FCM debug POST]', e);
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
