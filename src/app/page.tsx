import Container from "@/components/shared/container";
import "./globals.css";
import Link from "next/link";
import PageHeading from "@/components/shared/page-heading";
import PreorderTabs from "@/components/preorder/preorder-tabs";
import { getPreorders } from "@/lib/preorders";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: Promise<{
    filter?: string;
    sort?: string;
    direction?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;

  const filter =
    resolvedSearchParams.filter === "active" || resolvedSearchParams.filter === "inactive"
      ? resolvedSearchParams.filter
      : "all";

  const sort = ["name", "createdAt", "startsAt", "endsAt"].includes(resolvedSearchParams.sort ?? "")
    ? (resolvedSearchParams.sort as "name" | "createdAt" | "startsAt" | "endsAt")
    : "createdAt";

  const direction = resolvedSearchParams.direction === "asc" ? "asc" : "desc";
  const page = Number(resolvedSearchParams.page ?? 1);

  const { preorders, totalCount } = await getPreorders({
    filter,
    sort,
    direction,
    page,
    pageSize: 8,
  });

  return (
    <Container>
      <PageHeading
        title="Preorders"
        action={
          <Link
            href="/preorders/new"
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Create Preorder
          </Link>
        }
      />

      <PreorderTabs
        preorders={preorders}
        totalItems={totalCount}
      />
    </Container>
  );
}
