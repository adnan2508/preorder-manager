import { PrismaClient, PreorderWhen } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.preorder.deleteMany();

  await prisma.preorder.createMany({
    data: [
      {
        name: "Summer Collection",
        products: 15,
        preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
        startsAt: new Date("2026-06-01T09:00:00"),
        endsAt: new Date("2026-06-30T23:59:59"),
        active: true,
      },
      {
        name: "Gaming Accessories",
        products: 8,
        preorderWhen: PreorderWhen.OUT_OF_STOCK,
        startsAt: new Date("2026-06-05T10:00:00"),
        endsAt: new Date("2026-07-10T23:59:59"),
        active: true,
      },
      {
        name: "Winter Jackets",
        products: 20,
        preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
        startsAt: new Date("2026-07-01T09:00:00"),
        endsAt: null,
        active: false,
      },
      {
        name: "Smart Watches",
        products: 11,
        preorderWhen: PreorderWhen.OUT_OF_STOCK,
        startsAt: new Date("2026-06-15T09:00:00"),
        endsAt: new Date("2026-07-20T23:59:59"),
        active: true,
      },
      {
        name: "Home Decor",
        products: 25,
        preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
        startsAt: new Date("2026-06-20T09:00:00"),
        endsAt: null,
        active: false,
      },
      {
        name: "Fitness Equipment",
        products: 13,
        preorderWhen: PreorderWhen.OUT_OF_STOCK,
        startsAt: new Date("2026-06-18T09:00:00"),
        endsAt: new Date("2026-07-15T23:59:59"),
        active: true,
      },
      {
        name: "Office Essentials",
        products: 7,
        preorderWhen: PreorderWhen.REGARDLESS_OF_STOCK,
        startsAt: new Date("2026-06-22T09:00:00"),
        endsAt: null,
        active: true,
      },
      {
        name: "Travel Bags",
        products: 10,
        preorderWhen: PreorderWhen.OUT_OF_STOCK,
        startsAt: new Date("2026-06-25T09:00:00"),
        endsAt: new Date("2026-07-30T23:59:59"),
        active: false,
      },
    ],
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });