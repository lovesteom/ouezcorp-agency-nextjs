"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/guard";

function parseTags(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  return JSON.stringify(
    raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  );
}

function parseGallery(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const urls = raw
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);
  return JSON.stringify(urls);
}

export async function createRealisation(prevState: any, formData: FormData) {
  await requireAdminSession();
  try {
    const slug = formData.get("slug") as string;
    const existing = await prisma.realisation.findUnique({ where: { slug } });
    if (existing) return { error: "Une réalisation avec ce slug existe déjà." };

    await prisma.realisation.create({
      data: {
        title: formData.get("title") as string,
        slug,
        excerpt: (formData.get("excerpt") as string) || null,
        content: (formData.get("content") as string) || null,
        featuredImage: (formData.get("featuredImage") as string) || null,
        client: (formData.get("client") as string) || null,
        stack: (formData.get("stack") as string) || null,
        result: (formData.get("result") as string) || null,
        gallery: parseGallery(formData.get("gallery") as string),
        tags: parseTags(formData.get("tags") as string),
        order: parseInt(formData.get("order") as string) || 0,
        status: (formData.get("status") as string) || "PUBLISHED",
        seoTitle: (formData.get("seoTitle") as string) || null,
        seoDescription: (formData.get("seoDescription") as string) || null,
      },
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Une erreur s'est produite." };
  }
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
  revalidatePath(`/realisations/${formData.get("slug")}`, "page");
  redirect("/admin/realisations");
}

export async function updateRealisation(prevState: any, formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const slug = formData.get("slug") as string;
  try {
    const existing = await prisma.realisation.findUnique({ where: { slug } });
    if (existing && existing.id !== id)
      return { error: "Une réalisation avec ce slug existe déjà." };

    await prisma.realisation.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        slug,
        excerpt: (formData.get("excerpt") as string) || null,
        content: (formData.get("content") as string) || null,
        featuredImage: (formData.get("featuredImage") as string) || null,
        client: (formData.get("client") as string) || null,
        stack: (formData.get("stack") as string) || null,
        result: (formData.get("result") as string) || null,
        gallery: parseGallery(formData.get("gallery") as string),
        tags: parseTags(formData.get("tags") as string),
        order: parseInt(formData.get("order") as string) || 0,
        status: (formData.get("status") as string) || "PUBLISHED",
        seoTitle: (formData.get("seoTitle") as string) || null,
        seoDescription: (formData.get("seoDescription") as string) || null,
      },
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Une erreur s'est produite lors de la modification." };
  }
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
  revalidatePath(`/realisations/${slug}`, "page");
  redirect("/admin/realisations");
}

export async function deleteRealisation(id: string) {
  await requireAdminSession();
  const r = await prisma.realisation.findUnique({
    where: { id },
    select: { slug: true },
  });
  await prisma.realisation.delete({ where: { id } });
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
  if (r) revalidatePath(`/realisations/${r.slug}`, "page");
}

export async function setRealisationStatus(id: string, status: string) {
  await requireAdminSession();
  const r = await prisma.realisation.update({
    where: { id },
    data: { status },
    select: { slug: true },
  });
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
  revalidatePath(`/realisations/${r.slug}`, "page");
}
