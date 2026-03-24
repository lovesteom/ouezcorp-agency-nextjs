import prisma from './prisma';

export async function getPage(slug: string) {
  try {
    const page = await prisma.page.findUnique({
      where: { slug }
    });
    return page;
  } catch (error) {
    console.error(`Error fetching CMS page for slug ${slug}:`, error);
    return null;
  }
}

export async function getPageSEO(slug: string, defaultTitle = "Ouezcorp Agency", defaultDesc = "Agence digitale") {
  const page = await getPage(slug);
  if (!page) {
    return {
      title: defaultTitle,
      description: defaultDesc,
    };
  }

  return {
    title: page.seoTitle || page.title || defaultTitle,
    description: page.seoDescription || defaultDesc,
    keywords: page.seoKeywords ? page.seoKeywords.split(',').map(k => k.trim()) : [],
  };
}
