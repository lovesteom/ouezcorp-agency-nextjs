"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/guard";

export async function createPost(prevState: any, formData: FormData) {
  await requireAdminSession();
  try {
    const slug = formData.get("slug") as string;
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) return { error: "Un article avec ce slug existe déjà." };

    const categoriesRaw = formData.get("categories") as string;
    let categoriesJson: string | null = null;
    if (categoriesRaw?.trim()) {
      const cats = categoriesRaw
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      categoriesJson = JSON.stringify(cats);
    }

    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug,
        excerpt: (formData.get("excerpt") as string) || null,
        content: (formData.get("content") as string) || null,
        featuredImage: (formData.get("featuredImage") as string) || null,
        author: (formData.get("author") as string) || "OuezCorp Team",
        categories: categoriesJson,
        status: (formData.get("status") as string) || "PUBLISHED",
        publishedAt: formData.get("publishedAt")
          ? new Date(formData.get("publishedAt") as string)
          : new Date(),
        seoTitle: (formData.get("seoTitle") as string) || null,
        seoDescription: (formData.get("seoDescription") as string) || null,
      },
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Une erreur s'est produite." };
  }
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${formData.get("slug")}`, "page");
  redirect("/admin/posts");
}

export async function updatePost(prevState: any, formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id") as string;
  const slug = formData.get("slug") as string;
  try {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing && existing.id !== id)
      return { error: "Un article avec ce slug existe déjà." };

    const categoriesRaw = formData.get("categories") as string;
    let categoriesJson: string | null = null;
    if (categoriesRaw?.trim()) {
      const cats = categoriesRaw
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      categoriesJson = JSON.stringify(cats);
    }

    await prisma.post.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        slug,
        excerpt: (formData.get("excerpt") as string) || null,
        content: (formData.get("content") as string) || null,
        featuredImage: (formData.get("featuredImage") as string) || null,
        author: (formData.get("author") as string) || "OuezCorp Team",
        categories: categoriesJson,
        status: (formData.get("status") as string) || "PUBLISHED",
        publishedAt: formData.get("publishedAt")
          ? new Date(formData.get("publishedAt") as string)
          : undefined,
        seoTitle: (formData.get("seoTitle") as string) || null,
        seoDescription: (formData.get("seoDescription") as string) || null,
      },
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Une erreur s'est produite lors de la modification." };
  }
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`, "page");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdminSession();
  const post = await prisma.post.findUnique({
    where: { id },
    select: { slug: true },
  });
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  if (post) revalidatePath(`/blog/${post.slug}`, "page");
}

export async function setPostStatus(id: string, status: string) {
  await requireAdminSession();
  const post = await prisma.post.update({
    where: { id },
    data: { status },
    select: { slug: true },
  });
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`, "page");
}
