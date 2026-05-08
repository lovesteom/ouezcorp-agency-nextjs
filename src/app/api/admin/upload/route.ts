import { NextRequest, NextResponse } from "next/server";
import { extname } from "path";
import { requireAdminSession } from "@/lib/auth/guard";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "Aucun fichier fourni." },
      { status: 400 },
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      {
        error:
          "Type de fichier non autorisé. Utilisez JPG, PNG, WebP, GIF ou SVG.",
      },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (buffer.byteLength > MAX_SIZE) {
    return NextResponse.json(
      { error: "Fichier trop volumineux (max 5 Mo)." },
      { status: 400 },
    );
  }

  const ext = extname(file.name).toLowerCase() || ".jpg";
  const filename = `uploads/${randomUUID()}${ext}`;

  // Use Vercel Blob in production when token is available
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(filename, buffer, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    } catch (err) {
      console.error("Vercel Blob upload error:", err);
      return NextResponse.json(
        { error: "Erreur lors de l'upload vers le stockage cloud." },
        { status: 500 },
      );
    }
  }

  // Fallback: local filesystem (development only)
  const { writeFile, mkdir } = await import("fs/promises");
  const { join } = await import("path");
  const localName = `${randomUUID()}${ext}`;
  const uploadDir = join(process.cwd(), "public", "images");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, localName), buffer);
  return NextResponse.json({ url: `/images/${localName}` });
}
