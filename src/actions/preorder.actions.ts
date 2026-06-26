"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PreorderWhen } from "@prisma/client";
import { redirect } from "next/navigation";

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

export async function updatePreorder(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const products = Number(formData.get("products"));
  const preorderWhen = formData.get("preorderWhen") as string;
  const startsAt = formData.get("startsAt") as string;
  const endsAt = formData.get("endsAt") as string;
  const active = formData.get("active") === "true";

  await prisma.preorder.update({
    where: { id },
    data: {
      name,
      products,
      preorderWhen:
        preorderWhen === "REGARDLESS_OF_STOCK"
          ? PreorderWhen.REGARDLESS_OF_STOCK
          : PreorderWhen.OUT_OF_STOCK,
      startsAt: new Date(startsAt),
      endsAt: endsAt ? new Date(endsAt) : null,
      active,
    },
  });

  revalidatePath("/");
  revalidatePath(`/preorders/${id}`);

  redirect("/");
}

export async function createPreorder(formData: FormData) {
  const name = formData.get("name") as string;
  const products = Number(formData.get("products"));
  const preorderWhen = formData.get("preorderWhen") as string;
  const startsAt = formData.get("startsAt") as string;
  const endsAt = formData.get("endsAt") as string;
  const active = formData.get("active") === "true";

  await prisma.preorder.create({
    data: {
      name,
      products,
      preorderWhen:
        preorderWhen === "REGARDLESS_OF_STOCK"
          ? PreorderWhen.REGARDLESS_OF_STOCK
          : PreorderWhen.OUT_OF_STOCK,
      startsAt: new Date(startsAt),
      endsAt: endsAt ? new Date(endsAt) : null,
      active,
    },
  });

  revalidatePath("/");

  redirect("/");
}