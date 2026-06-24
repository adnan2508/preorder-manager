import Container from "@/components/shared/container";
import "./globals.css";
import Link from "next/link";
import PageHeading from "@/components/shared/page-heading";
import PreorderTabs from "@/components/preorder/preorder-tabs";
import PreorderTable from "@/components/preorder/preorder-table";
import PreorderPagination from "@/components/preorder/preorder-pagination";

export default function Home() {
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

      <div className="border rounded-xl overflow-visible bg-white">
        <PreorderTabs />
        <PreorderTable />

        <PreorderPagination />
      </div>
    </Container>
  );
}
