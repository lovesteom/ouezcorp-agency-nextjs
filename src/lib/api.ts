import prisma from "./prisma";

/* ─── Posts / Blog ──────────────────────────────────────────── */

export async function getAllPosts(options?: { limit?: number }) {
  try {
    return await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        featuredImage: true,
        categories: true,
        author: true,
        publishedAt: true,
      },
      ...(options?.limit ? { take: options.limit } : {}),
    });
  } catch (error) {
    console.error("getAllPosts error:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.post.findFirst({
      where: { slug, status: "PUBLISHED" },
    });
  } catch (error) {
    console.error("getPostBySlug error:", error);
    return null;
  }
}

/* ─── Services ──────────────────────────────────────────────── */

export async function getAllServices(options?: { limit?: number }) {
  try {
    return await prisma.service.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        slug: true,
        title: true,
        excerpt: true,
        featuredImage: true,
        tags: true,
      },
      ...(options?.limit ? { take: options.limit } : {}),
    });
  } catch (error) {
    console.error("getAllServices error:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findFirst({
      where: { slug, status: "PUBLISHED" },
    });
  } catch (error) {
    console.error("getServiceBySlug error:", error);
    return null;
  }
}

/* ─── Réalisations ──────────────────────────────────────────── */

export async function getAllRealisations(options?: { limit?: number }) {
  try {
    return await prisma.realisation.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: {
        slug: true,
        title: true,
        excerpt: true,
        featuredImage: true,
        client: true,
        stack: true,
        tags: true,
      },
      ...(options?.limit ? { take: options.limit } : {}),
    });
  } catch (error) {
    console.error("getAllRealisations error:", error);
    return [];
  }
}

export async function getRealisationBySlug(slug: string) {
  try {
    return await prisma.realisation.findFirst({
      where: { slug, status: "PUBLISHED" },
    });
  } catch (error) {
    console.error("getRealisationBySlug error:", error);
    return null;
  }
}
