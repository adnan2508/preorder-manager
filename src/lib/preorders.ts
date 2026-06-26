import { prisma } from "./prisma";
import { PreorderTableItem } from "@/types/preorder";

type FilterType = "all" | "active" | "inactive";
type SortField = "name" | "createdAt" | "startsAt" | "endsAt";
type SortDirection = "asc" | "desc";

interface GetPreordersOptions {
  filter?: FilterType;
  sort?: SortField;
  direction?: SortDirection;
  page?: number;
  pageSize?: number;
}

interface GetPreordersResult {
  preorders: PreorderTableItem[];
  totalCount: number;
}

export async function getPreorders({
  filter = "all",
  sort = "createdAt",
  direction = "desc",
  page = 1,
  pageSize = 8,
}: GetPreordersOptions = {}): Promise<GetPreordersResult> {
  const where =
    filter === "active"
      ? { active: true }
      : filter === "inactive"
        ? { active: false }
        : {};

  const orderBy =
    sort === "name"
      ? { name: direction }
      : sort === "startsAt"
        ? { startsAt: direction }
        : sort === "endsAt"
          ? { endsAt: direction }
          : { createdAt: direction };

  const [totalCount, preorders] = await Promise.all([
    prisma.preorder.count({ where }),
    prisma.preorder.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return {
    totalCount,
    preorders: preorders.map((preorder) => ({
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
      createdAt: preorder.createdAt.toISOString(),
    })),
  };
}