import prisma from "./prisma";

/* ─── Posts / Blog ──────────────────────────────────────────── */

export async function getAllPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
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
    });
  } catch (error) {
    console.error("getAllPosts error:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug, published: true },
    });
  } catch (error) {
    console.error("getPostBySlug error:", error);
    return null;
  }
}

/* ─── Services ──────────────────────────────────────────────── */

export async function getAllServices() {
  try {
    return await prisma.service.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        slug: true,
        title: true,
        excerpt: true,
        featuredImage: true,
        tags: true,
      },
    });
  } catch (error) {
    console.error("getAllServices error:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug, published: true },
    });
  } catch (error) {
    console.error("getServiceBySlug error:", error);
    return null;
  }
}

/* ─── Réalisations ──────────────────────────────────────────── */

export async function getAllRealisations() {
  try {
    return await prisma.realisation.findMany({
      where: { published: true },
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
    });
  } catch (error) {
    console.error("getAllRealisations error:", error);
    return [];
  }
}

export async function getRealisationBySlug(slug: string) {
  try {
    return await prisma.realisation.findUnique({
      where: { slug, published: true },
    });
  } catch (error) {
    console.error("getRealisationBySlug error:", error);
    return null;
  }
}
