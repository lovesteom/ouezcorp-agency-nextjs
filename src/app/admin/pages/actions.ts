'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPage(prevState: any, formData: FormData) {
  console.log("ACTION: createPage started");
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    console.log("Creating page:", { title, slug });

    if (!prisma) {
        console.error("PRISMA CLIENT IS UNDEFINED");
        return { error: "Erreur interne: Client base de données non initialisé." };
    }

    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) {
      return { error: "Une page avec ce slug existe déjà." };
    }

    const created = await prisma.page.create({
      data: {
        title: formData.get('title') as string,
        slug,
        content: formData.get('content') as string || null,
        seoTitle: formData.get('seoTitle') as string || null,
        seoDescription: formData.get('seoDescription') as string || null,
        seoKeywords: formData.get('seoKeywords') as string || null,
      }
    });
    console.log("CREATED PAGE SUCCESS:", created.id);
  } catch (error) {
    console.error("CREATE PAGE ERROR: ", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Une erreur s'est produite." };
  }

  revalidatePath('/admin/pages');
  redirect('/admin/pages');
}

export async function updatePage(prevState: any, formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const slug = formData.get('slug') as string;
    
    // Check if slug conflicts with another page
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return { error: "Une page avec ce slug existe déjà." };
    }

    await prisma.page.update({
      where: { id },
      data: {
        title: formData.get('title') as string,
        slug,
        content: formData.get('content') as string || null,
        seoTitle: formData.get('seoTitle') as string || null,
        seoDescription: formData.get('seoDescription') as string || null,
        seoKeywords: formData.get('seoKeywords') as string || null,
      }
    });

  } catch (error) {
     if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Une erreur s'est produite lors de la modification." };
  }

  revalidatePath('/admin/pages');
  redirect('/admin/pages');
}

export async function deletePage(id: string) {
  await prisma.page.delete({ where: { id } });
  revalidatePath('/admin/pages');
}
