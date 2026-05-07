"use server";

import { redirect } from "next/navigation";
import {
  clearAdminAuthCookies,
  completeAdmin2FA,
  startAdminLogin,
} from "@/lib/auth/admin";

type LoginState = { error: string; success: boolean };

export async function loginWithPassword(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email et mot de passe requis.", success: false };
  }

  const result = await startAdminLogin(email, password);
  if (!result.ok) {
    return { error: result.error ?? "Erreur inconnue.", success: false };
  }

  return { error: "", success: true };
}

type TwoFactorState = { error: string };

export async function verifyTwoFactor(
  _prevState: TwoFactorState,
  formData: FormData,
): Promise<TwoFactorState> {
  const code = String(formData.get("code") || "");

  if (!code) {
    return { error: "Code 2FA requis." };
  }

  const result = await completeAdmin2FA(code);
  if (!result.ok) {
    return { error: result.error ?? "Erreur inconnue." };
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
