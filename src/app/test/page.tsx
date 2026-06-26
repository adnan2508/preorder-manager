import { prisma } from "@/lib/prisma";

export default async function TestPage() {
  const count = await prisma.preorder.count();

  return (
    <div className="p-10">
      Total Preorders: {count}
    </div>
  );
}