import { Preorder } from "@/types/preorder";

export const preorders: Preorder[] = [
  {
    id: "1",
    name: "Multi variant 3",
    products: 1,
    preorderWhen: "out-of-stock",
    startsAt: "Dec 15, 2025 08:24 PM",
    endsAt: null,
    active: true,
  },
  {
    id: "2",
    name: "Multi variant 2",
    products: 1,
    preorderWhen: "regardless-of-stock",
    startsAt: "Dec 15, 2025 08:24 PM",
    endsAt: "Dec 15, 2025 08:27 PM",
    active: false,
  },
  {
    id: "3",
    name: "Partial payment",
    products: 1,
    preorderWhen: "regardless-of-stock",
    startsAt: "Aug 17, 2025 04:56 PM",
    endsAt: null,
    active: true,
  },
];