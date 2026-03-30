import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthService } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDefaultRedirectPath } from "@/lib/rolePermissions";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  try {
    const payload = accessToken
      ? await AuthService.verifyToken(accessToken)
      : await AuthService.verifyToken(refreshToken!);
    return prisma.user.findUnique({
      where: { id: payload.userId },
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
        timezone: true,
        profileImage: true,
        profileImagePublicId: true,
        createdAt: true,
        updatedAt: true,
        agentProfile: true,
        carrierProfile: true,
      },
    });
  } catch {
    if (accessToken && refreshToken) {
      try {
        const payload = await AuthService.verifyToken(refreshToken);
        return prisma.user.findUnique({
          where: { id: payload.userId },
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
            timezone: true,
            profileImage: true,
            profileImagePublicId: true,
            createdAt: true,
            updatedAt: true,
            agentProfile: true,
            carrierProfile: true,
          },
        });
      } catch {
        return null;
      }
    }

    return null;
  }
}

export async function requireCurrentUser(expectedRole?: string) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  if (expectedRole && user.role !== expectedRole) {
    redirect(getDefaultRedirectPath(user.role));
  }

  return user;
}
