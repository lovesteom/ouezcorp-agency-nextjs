"use server";

import { redirect } from "next/navigation";
import {
  clearAdminAuthCookies,
  completeAdmin2FA,
  startAdminLogin,
} from "@/lib/auth/admin";

export async function loginWithPassword(_prevState: any, formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }

  const result = await startAdminLogin(email, password);
  if (!result.ok) {
    return { error: result.error };
  }

  return { success: true };
}

export async function verifyTwoFactor(_prevState: any, formData: FormData) {
  const code = String(formData.get("code") || "");

  if (!code) {
    return { error: "Code 2FA requis." };
  }

  const result = await completeAdmin2FA(code);
  if (!result.ok) {
    return { error: result.error };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminAuthCookies();
  redirect("/admin/login");
}

export async function cancelTwoFactor() {
  await clearAdminAuthCookies();
  redirect("/admin/login");
}
