import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function PreorderPagination() {
  return (
    <div className="border-t px-6 py-4 flex items-center justify-center gap-4">
      <button
        className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-400"
      >
        <FiChevronLeft />
      </button>

      <span className="text-sm font-medium">
        Showing 1 to 8 from 8
      </span>

      <button
        className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-400"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}