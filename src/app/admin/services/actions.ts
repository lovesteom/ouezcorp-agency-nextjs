"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/guard";

function parseTags(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const tags = raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return JSON.stringify(tags);
}

export async function createService(prevState: any, formData: FormData) {
  await requireAdminSession();
  try {
    const slug = formData.get("slug") as string;
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) return { error: "Un service avec ce slug existe déjà." };

    await prisma.service.create({
      data: {
        title: formData.get("title") as string,
        slug,
        excerpt: (formData.get("excerpt") as string) || null,
        content: (formData.get("content") as string) || null,
        featuredImage: (formData.get("featuredImage") as string) || null,
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
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${formData.get("slug")}`, "page");
  redirect("/admin/services");
}

export async function updateService(prevState: any, formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const slug = formData.get("slug") as string;
  try {
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing && existing.id !== id)
      return { error: "Un service avec ce slug existe déjà." };

    await prisma.service.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        slug,
        excerpt: (formData.get("excerpt") as string) || null,
        content: (formData.get("content") as string) || null,
        featuredImage: (formData.get("featuredImage") as string) || null,
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
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${slug}`, "page");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdminSession();
  const service = await prisma.service.findUnique({
    where: { id },
    select: { slug: true },
  });
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  if (service) revalidatePath(`/services/${service.slug}`, "page");
}
