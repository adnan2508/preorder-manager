import { prisma } from "./prisma";
import { PreorderTableItem } from "@/types/preorder";

export async function getPreorders(): Promise<PreorderTableItem[]> {
  const preorders = await prisma.preorder.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return preorders.map((preorder) => ({
    id: preorder.id,
    name: preorder.name,
    products: preorder.products,
    preorderWhen:
      preorder.preorderWhen === "REGARDLESS_OF_STOCK"
        ? "Regardless of stock"
        : "Out of stock",
    startsAt: preorder.startsAt.toLocaleDateString(),
    endsAt: preorder.endsAt
      ? preorder.endsAt.toLocaleDateString()
      : null,
    active: preorder.active,
  }));
}