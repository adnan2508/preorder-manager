import Container from "@/components/shared/container";
import "./globals.css";
import PageHeading from "@/components/shared/page-heading";

export default function Home() {
  return (
    <Container>
      <PageHeading
        title="Preorders"
        action={
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Create Preorder
          </button>
        }
      />

      <div className="border rounded-xl overflow-hidden">
        <div className="p-10 text-center text-gray-500">
          Table Coming Soon
        </div>
      </div>
    </Container>
  );
}
