import bcrypt from "bcryptjs";
import { generateSecret, generateURI } from "otplib";
import { Pool } from "pg";
import "dotenv/config";
import { randomUUID } from "node:crypto";

const email = process.argv[2] || "lovesteom@gmail.com";
const password = process.argv[3] || "ChangeMe123!";
const issuer = process.argv[4] || "OuezCorp Admin";

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL est manquante. Impossible de creer le user admin en base.",
  );
  process.exit(1);
}

const secret = generateSecret();
const otpauth = generateURI({
  issuer,
  label: email,
  secret,
});
const passwordHash = await bcrypt.hash(password, 12);
const now = new Date();
const generatedId = randomUUID();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const upsertQuery = `
  INSERT INTO "AdminUser" ("id", "email", "password", "createdAt", "updatedAt", "twoFactorEnabled", "twoFactorSecret")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  ON CONFLICT ("email")
  DO UPDATE SET
    "password" = EXCLUDED."password",
    "twoFactorEnabled" = EXCLUDED."twoFactorEnabled",
    "twoFactorSecret" = EXCLUDED."twoFactorSecret",
    "updatedAt" = EXCLUDED."updatedAt"
  RETURNING "id", "email";
`;

let dbUser;
try {
  const result = await pool.query(upsertQuery, [
    generatedId,
    email.toLowerCase().trim(),
    passwordHash,
    now,
    now,
    true,
    secret,
  ]);
  dbUser = result.rows[0];
} finally {
  await pool.end();
}

console.log("ADMIN_EMAIL=" + email);
console.log("ADMIN_PASSWORD_HASH=" + passwordHash);
console.log("ADMIN_TOTP_SECRET=" + secret);
console.log("ADMIN_DB_USER_ID=" + dbUser.id);
console.log("ADMIN_DB_USER_EMAIL=" + dbUser.email);
console.log("\nCopiez ce lien dans votre app 2FA (ou convertissez-le en QR):");
console.log(otpauth);
