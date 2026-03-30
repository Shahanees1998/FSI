import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AuthService } from "@/lib/auth";
import { getDefaultRedirectPath } from "@/lib/rolePermissions";

// IMPORTANT: This route must be evaluated per-request (cookies-based redirect).
// Otherwise, some deployments may cache the "logged out" redirect and keep sending users to /auth/login.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token) {
    try {
      const payload = await AuthService.verifyToken(token);
      redirect(getDefaultRedirectPath(payload.role));
    } catch {
      redirect("/auth/login");
    }
  }

  redirect("/auth/login");
}