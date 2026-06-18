import { NextRequest, NextResponse } from "next/server";
import { withAuth, AuthenticatedRequest } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";
import { deleteFromS3, uploadProfileImageToS3 } from "@/lib/s3";

export async function POST(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const userId = authenticatedReq.user!.userId;

    try {
      const formData = await request.formData();
      const file = formData.get("file");

      if (!(file instanceof File)) {
        return NextResponse.json({ error: "No image file provided." }, { status: 400 });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { profileImagePublicId: true },
      });

      const { url, key } = await uploadProfileImageToS3(file, userId);

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          profileImage: url,
          profileImagePublicId: key,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          role: true,
          status: true,
          jobTitle: true,
          location: true,
          profileImage: true,
          profileImagePublicId: true,
        },
      });

      if (existingUser?.profileImagePublicId && existingUser.profileImagePublicId !== key) {
        try {
          await deleteFromS3(existingUser.profileImagePublicId);
        } catch (error) {
          console.error("Failed to delete previous profile image:", error);
        }
      }

      return NextResponse.json({ user });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload profile image.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  });
}

export async function DELETE(request: NextRequest) {
  return withAuth(request, async (authenticatedReq: AuthenticatedRequest) => {
    const userId = authenticatedReq.user!.userId;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileImagePublicId: true },
    });

    if (existingUser?.profileImagePublicId) {
      try {
        await deleteFromS3(existingUser.profileImagePublicId);
      } catch (error) {
        console.error("Failed to delete profile image from S3:", error);
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        profileImage: null,
        profileImagePublicId: null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        jobTitle: true,
        location: true,
        profileImage: true,
        profileImagePublicId: true,
      },
    });

    return NextResponse.json({ user });
  });
}
