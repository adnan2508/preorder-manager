import { ReactNode } from "react";

type Props = {
  title: string;
  action?: ReactNode;
};

export default function PageHeading({
  title,
  action,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {action}
    </div>
  );
}