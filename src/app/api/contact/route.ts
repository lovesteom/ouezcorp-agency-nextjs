import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendNotificationEmail(lead: {
  name: string;
  email: string;
  subject: string;
  budget: string;
  message: string;
}) {
  const toEmail = process.env.CONTACT_EMAIL;
  if (!toEmail) return;

  const host = process.env.MAILTRAP_HOST;
  const port = Number(process.env.MAILTRAP_PORT ?? 2525);
  const user = process.env.MAILTRAP_USER;
  const pass = process.env.MAILTRAP_PASS;

  if (!host || !user || !pass) return;

  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Formulaire OuezCorp" <noreply@ouezcorp.com>`,
    to: toEmail,
    subject: `Nouveau lead : ${lead.name} — ${lead.subject}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${lead.name}</p>
      <p><strong>Email :</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
      <p><strong>Type de projet :</strong> ${lead.subject}</p>
      <p><strong>Budget :</strong> ${lead.budget}</p>
      <p><strong>Message :</strong></p>
      <blockquote style="border-left:3px solid #f59e0b;padding-left:1rem;margin:0;color:#555">
        ${lead.message.replace(/\n/g, "<br>")}
      </blockquote>
    `,
  });
}

export async function POST(req: NextRequest) {
  // Rate limiting: 3 submissions per 15 minutes per IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const rl = checkRateLimit(`contact:${ip}`, 3, 15 * 60 * 1000);

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans quelques minutes." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const { name, email, subject, budget, message } = body as Record<
    string,
    unknown
  >;

  // Server-side validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json(
      { error: "Nom invalide (minimum 2 caractères)." },
      { status: 422 },
    );
  }
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 422 });
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Message trop court (minimum 10 caractères)." },
      { status: 422 },
    );
  }
  if (
    name.trim().length > 100 ||
    email.length > 200 ||
    message.trim().length > 5000
  ) {
    return NextResponse.json(
      { error: "Données trop longues." },
      { status: 422 },
    );
  }

  const lead = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    subject: typeof subject === "string" ? subject.trim() : null,
    budget: typeof budget === "string" ? budget.trim() : null,
    message: message.trim(),
    ipAddress: ip === "unknown" ? null : ip,
  };

  await prisma.contactLead.create({ data: lead });

  // Fire-and-forget email — failures don't block the response
  sendNotificationEmail({
    name: lead.name,
    email: lead.email,
    subject: lead.subject ?? "Non précisé",
    budget: lead.budget ?? "Non précisé",
    message: lead.message,
  }).catch(() => {
    // Lead already saved; email is best-effort
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
