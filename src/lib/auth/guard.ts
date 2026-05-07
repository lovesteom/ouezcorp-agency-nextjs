import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/auth/session";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const session = await verifyAdminSession(token);
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
