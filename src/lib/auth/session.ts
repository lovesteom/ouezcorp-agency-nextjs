import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();

function getSessionSecret(): Uint8Array {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    (process.env.NODE_ENV !== "production"
      ? "dev-admin-session-secret-change-me"
      : undefined);
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET manquant dans les variables d'environnement",
    );
  }
  return encoder.encode(secret);
}

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_2FA_PENDING_COOKIE = "admin_2fa_pending";

export type AdminSessionPayload = {
  sub: string;
  email: string;
  role: "admin";
};

export async function signAdminSession(
  payload: AdminSessionPayload,
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSessionSecret());
}

export async function verifyAdminSession(
  token: string,
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (payload.role !== "admin" || !payload.sub || !payload.email) {
      return null;
    }

    return {
      sub: payload.sub as string,
      email: payload.email as string,
      role: "admin",
    };
  } catch {
    return null;
  }
}

export type Pending2FAPayload = {
  sub: string;
  email: string;
  stage: "2fa";
};

export async function signPending2FA(
  payload: Pending2FAPayload,
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(getSessionSecret());
}

export async function verifyPending2FA(
  token: string,
): Promise<Pending2FAPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    if (payload.stage !== "2fa" || !payload.sub || !payload.email) {
      return null;
    }

    return {
      sub: payload.sub as string,
      email: payload.email as string,
      stage: "2fa",
    };
  } catch {
    return null;
  }
}
