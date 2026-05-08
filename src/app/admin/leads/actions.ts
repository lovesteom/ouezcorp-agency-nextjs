"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/guard";

export async function markLeadAsRead(id: string) {
  await requireAdminSession();
  await prisma.contactLead.update({
    where: { id },
    data: { status: "READ" },
  });
  revalidatePath("/admin/leads");
}

export async function archiveLead(id: string) {
  await requireAdminSession();
  await prisma.contactLead.update({
    where: { id },
    data: { status: "ARCHIVED" },
  });
  revalidatePath("/admin/leads");
}

export async function deleteLead(id: string) {
  await requireAdminSession();
  await prisma.contactLead.delete({ where: { id } });
  revalidatePath("/admin/leads");
}
