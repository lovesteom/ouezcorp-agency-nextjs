import { cookies } from "next/headers";
import { verify } from "otplib";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import {
  ADMIN_2FA_PENDING_COOKIE,
  ADMIN_SESSION_COOKIE,
  signAdminSession,
  signPending2FA,
  verifyAdminSession,
  verifyPending2FA,
} from "@/lib/auth/session";

const secureCookie = process.env.NODE_ENV === "production";

const ENV_ADMIN_ID = "env-admin";

function getEnvAdminConfig() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const totpSecret = process.env.ADMIN_TOTP_SECRET;

  if (!email) return null;

  return {
    email,
    password,
    passwordHash,
    totpSecret,
  };
}

function isEnvAdminConfigComplete(
  config: ReturnType<typeof getEnvAdminConfig>,
) {
  if (!config) return false;
  const hasPassword = Boolean(config.password || config.passwordHash);
  return hasPassword && Boolean(config.totpSecret);
}

export async function startAdminLogin(
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  const envAdmin = getEnvAdminConfig();

  if (envAdmin && normalizedEmail === envAdmin.email) {
    if (!isEnvAdminConfigComplete(envAdmin)) {
      return {
        ok: false,
        error:
          "Configuration admin incomplète (ADMIN_PASSWORD/ADMIN_PASSWORD_HASH et ADMIN_TOTP_SECRET requis).",
      };
    }

    const isValidFromHash = envAdmin.passwordHash
      ? await bcrypt.compare(password, envAdmin.passwordHash)
      : false;
    const isValidFromPlain = envAdmin.password
      ? password === envAdmin.password
      : false;

    if (!isValidFromHash && !isValidFromPlain) {
      return { ok: false, error: "Identifiants invalides." };
    }

    const pendingToken = await signPending2FA({
      sub: ENV_ADMIN_ID,
      email: envAdmin.email,
      stage: "2fa",
    });

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_2FA_PENDING_COOKIE, pendingToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: secureCookie,
      path: "/",
      maxAge: 60 * 10,
    });

    return { ok: true };
  }

  let user;
  try {
    user = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });
  } catch {
    return {
      ok: false,
      error:
        "Service d'authentification indisponible (base de données). Vérifiez la configuration Prisma.",
    };
  }

  if (!user) {
    return { ok: false, error: "Identifiants invalides." };
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return { ok: false, error: "Identifiants invalides." };
  }

  if (!user.twoFactorEnabled || !user.twoFactorSecret) {
    return { ok: false, error: "2FA non configuré pour cet administrateur." };
  }

  const pendingToken = await signPending2FA({
    sub: user.id,
    email: user.email,
    stage: "2fa",
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_2FA_PENDING_COOKIE, pendingToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: secureCookie,
    path: "/",
    maxAge: 60 * 10,
  });

  return { ok: true };
}

export async function completeAdmin2FA(
  code: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const cookieStore = await cookies();
  const pendingToken = cookieStore.get(ADMIN_2FA_PENDING_COOKIE)?.value;

  if (!pendingToken) {
    return { ok: false, error: "Session 2FA expirée. Reconnectez-vous." };
  }

  const pending = await verifyPending2FA(pendingToken);
  if (!pending) {
    return { ok: false, error: "Session 2FA invalide. Reconnectez-vous." };
  }

  const envAdmin = getEnvAdminConfig();

  if (
    pending.sub === ENV_ADMIN_ID &&
    envAdmin &&
    isEnvAdminConfigComplete(envAdmin)
  ) {
    const verification = await verify({
      token: code.trim(),
      secret: envAdmin.totpSecret!,
    });

    if (!verification.valid) {
      return { ok: false, error: "Code 2FA invalide." };
    }

    const sessionToken = await signAdminSession({
      sub: ENV_ADMIN_ID,
      email: envAdmin.email,
      role: "admin",
    });

    cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: secureCookie,
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    cookieStore.delete(ADMIN_2FA_PENDING_COOKIE);
    return { ok: true };
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: pending.sub },
  });
  if (!user || !user.twoFactorSecret || !user.twoFactorEnabled) {
    return { ok: false, error: "Compte admin invalide ou 2FA non activé." };
  }

  const verification = await verify({
    token: code.trim(),
    secret: user.twoFactorSecret,
  });
  if (!verification.valid) {
    return { ok: false, error: "Code 2FA invalide." };
  }

  const sessionToken = await signAdminSession({
    sub: user.id,
    email: user.email,
    role: "admin",
  });

  cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: secureCookie,
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  cookieStore.delete(ADMIN_2FA_PENDING_COOKIE);

  return { ok: true };
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminSession(token);
}

export async function hasPending2FA() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_2FA_PENDING_COOKIE)?.value;
  if (!token) return false;
  const payload = await verifyPending2FA(token);
  return !!payload;
}

export async function clearAdminAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  cookieStore.delete(ADMIN_2FA_PENDING_COOKIE);
}
