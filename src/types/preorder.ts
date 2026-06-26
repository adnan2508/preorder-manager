export interface PreorderTableItem {
  id: string;
  name: string;
  products: number;
  preorderWhen: string;
  startsAt: string;
  endsAt: string | null;
  active: boolean;
  createdAt: string;
}