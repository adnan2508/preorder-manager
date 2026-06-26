"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function togglePreorderStatus(id: string) {
  const preorder = await prisma.preorder.findUnique({
    where: { id },
  });

  if (!preorder) {
    throw new Error("Preorder not found.");
  }

  await prisma.preorder.update({
    where: { id },
    data: {
      active: !preorder.active,
    },
  });

  revalidatePath("/");
}

export async function deletePreorder(id: string) {
  await prisma.preorder.delete({
    where: { id },
  });

  revalidatePath("/");
}