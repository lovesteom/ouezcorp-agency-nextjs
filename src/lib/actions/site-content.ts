'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Interface for creating/updating a site content
export interface SaveContentInput {
  key: string;
  value: string;
  type: string;
  group?: string;
  label?: string;
}

// Fetch all site content items, optionally filtered by group
export async function getSiteContents(group?: string) {
  try {
    const contents = await prisma.siteContent.findMany({
      where: group ? { group } : undefined,
      orderBy: { key: 'asc' }
    });
    return contents;
  } catch (error) {
    console.error('Failed to get site contents:', error);
    return [];
  }
}

// Save or Update a site content item by key
export async function saveSiteContent(data: SaveContentInput) {
  try {
    const content = await prisma.siteContent.upsert({
      where: { key: data.key },
      update: {
        value: data.value,
        type: data.type,
        ...(data.group && { group: data.group }),
        ...(data.label && { label: data.label })
      },
      create: {
        key: data.key,
        value: data.value,
        type: data.type,
        group: data.group || 'GLOBAL',
        label: data.label || data.key
      }
    });

    revalidatePath('/'); // Revalidate main pages to show changes
    revalidatePath('/admin/content');
    return { success: true, content };
  } catch (error) {
    console.error('Failed to save site content:', error);
    return { success: false, error: 'Failed to save site content' };
  }
}

// Delete a site content item
export async function deleteSiteContent(key: string) {
  try {
    await prisma.siteContent.delete({
      where: { key }
    });
    
    revalidatePath('/');
    revalidatePath('/admin/content');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete site content:', error);
    return { success: false, error: 'Failed to delete site content' };
  }
}

// Helper to quickly retrieve a specific content value
export async function getContentValue(key: string, defaultValue = '') {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { key }
    });
    return content ? content.value : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}
