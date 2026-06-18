import { NextRequest, NextResponse } from "next/server";
import { withAgentAuth } from "@/lib/authMiddleware";
import { deleteFromS3, isClientImageKeyForAgent, uploadClientImageToS3 } from "@/lib/s3";

export async function POST(request: NextRequest) {
  return withAgentAuth(request, async (req) => {
    const agentId = req.user!.userId;

    try {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!(file instanceof File)) {
        return NextResponse.json({ error: "No image file provided." }, { status: 400 });
      }

      const { url, key } = await uploadClientImageToS3(file, agentId);
      return NextResponse.json({ url, key });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload client image.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withAgentAuth(request, async (req) => {
    const agentId = req.user!.userId;

    try {
      const body = await request.json();
      const key = typeof body?.key === "string" ? body.key.trim() : "";

      if (!key || !isClientImageKeyForAgent(key, agentId)) {
        return NextResponse.json({ error: "Invalid image reference." }, { status: 400 });
      }

      await deleteFromS3(key);
      return NextResponse.json({ ok: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to remove client image.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  });
}
