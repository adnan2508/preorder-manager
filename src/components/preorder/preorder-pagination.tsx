import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PreorderPaginationProps {
  totalItems: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function PreorderPagination({
  totalItems,
  page,
  pageSize,
  onPageChange,
}: PreorderPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="border-t px-6 py-4 flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
      >
        <FiChevronLeft />
      </button>

      <span className="text-sm font-medium">
        Showing {startItem} to {endItem} from {totalItems}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}