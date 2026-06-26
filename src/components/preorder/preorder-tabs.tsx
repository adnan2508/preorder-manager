"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BiSortAlt2 } from "react-icons/bi";
import { FiLoader } from "react-icons/fi";
import type { PreorderTableItem } from "@/types/preorder";
import PreorderTable from "./preorder-table";
import PreorderPagination from "./preorder-pagination";

type FilterType = "all" | "active" | "inactive";
type SortField = "name" | "createdAt" | "startsAt" | "endsAt";
type SortDirection = "asc" | "desc";

interface PreorderTabsProps {
    preorders: PreorderTableItem[];
    totalItems: number;
}

export default function PreorderTabs({
    preorders,
    totalItems,
}: PreorderTabsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = 8;

    useEffect(() => {
        setIsLoading(false);
    }, [preorders, totalItems, pathname, searchParams]);

    const resolveFilter = (value: string | null) => {
        if (value === "active" || value === "inactive") {
            return value;
        }

        return "all";
    };

    const resolveSort = (value: string | null) => {
        if (value === "name" || value === "createdAt" || value === "startsAt" || value === "endsAt") {
            return value;
        }

        return "createdAt";
    };

    const resolveDirection = (value: string | null) => {
        return value === "asc" ? "asc" : "desc";
    };

    const filter = resolveFilter(searchParams.get("filter"));
    const sortField = resolveSort(searchParams.get("sort"));
    const sortDirection = resolveDirection(searchParams.get("direction"));
    const page = Number(searchParams.get("page") ?? "1");

    const updateQuery = (
        nextFilter: FilterType,
        nextSort: SortField,
        nextDirection: SortDirection,
        nextPage: number,
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextFilter === "all") {
            params.delete("filter");
        } else {
            params.set("filter", nextFilter);
        }

        if (nextSort === "createdAt") {
            params.delete("sort");
        } else {
            params.set("sort", nextSort);
        }

        if (nextDirection === "desc") {
            params.delete("direction");
        } else {
            params.set("direction", nextDirection);
        }

        if (nextPage === 1) {
            params.delete("page");
        } else {
            params.set("page", String(nextPage));
        }

        const query = params.toString();
        const nextUrl = query ? `${pathname}?${query}` : pathname;

        setIsLoading(true);
        router.push(nextUrl, { scroll: false });
    };

    const handleFilterChange = (nextFilter: FilterType) => {
        updateQuery(nextFilter, sortField, sortDirection, 1);
        setOpen(false);
    };

    const handleSortFieldChange = (nextSort: SortField) => {
        updateQuery(filter, nextSort, sortDirection, 1);
        setOpen(false);
    };

    const handleDirectionChange = (nextDirection: SortDirection) => {
        updateQuery(filter, sortField, nextDirection, 1);
        setOpen(false);
    };

    const handlePageChange = (nextPage: number) => {
        updateQuery(filter, sortField, sortDirection, nextPage);
    };

    return (
        <div className="border rounded-xl overflow-visible bg-white">
            <div className="flex justify-between gap-6 border-b px-4 py-3 relative z-30">
                <div className="flex gap-6">
                    <button
                        onClick={() => handleFilterChange("all")}
                        className={`px-4 py-1 rounded ${filter === "all" ? "font-semibold bg-gray-100" : "text-gray-600"}`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => handleFilterChange("active")}
                        className={`${filter === "active" ? "font-semibold bg-gray-100 px-4 py-1 rounded" : "text-gray-600"}`}
                    >
                        Active
                    </button>

                    <button
                        onClick={() => handleFilterChange("inactive")}
                        className={`${filter === "inactive" ? "font-semibold bg-gray-100 px-4 py-1 rounded" : "text-gray-600"}`}
                    >
                        Inactive
                    </button>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-white rounded-xl p-2 cursor-pointer border border-gray-300 flex items-center gap-2 hover:bg-gray-50"
                    >
                        <BiSortAlt2 size={18} />
                    </button>

                    {open && (
                        <div className="absolute right-0 rounded-xl border border-gray-200 bg-white shadow-lg">
                            <div className="p-4">
                                <h3 className="text-gray-600 font-medium mb-4">
                                    Sort by
                                </h3>

                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sortField"
                                            className="h-4 w-4 accent-black"
                                            checked={sortField === "name"}
                                            onChange={() => handleSortFieldChange("name")}
                                        />
                                        <span className="text-sm">Name</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sortField"
                                            className="h-4 w-4 accent-black"
                                            checked={sortField === "createdAt"}
                                            onChange={() => handleSortFieldChange("createdAt")}
                                        />
                                        <span className="text-sm">Created At</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sortField"
                                            className="h-4 w-4 accent-black"
                                            checked={sortField === "startsAt"}
                                            onChange={() => handleSortFieldChange("startsAt")}
                                        />
                                        <span className="text-sm">Starts At</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sortField"
                                            className="h-4 w-4 accent-black"
                                            checked={sortField === "endsAt"}
                                            onChange={() => handleSortFieldChange("endsAt")}
                                        />
                                        <span className="text-sm">Ends At</span>
                                    </label>
                                </div>

                                <div className="my-3 border-t" />

                                <div className="px-1 pb-1">
                                    <button
                                        onClick={() => handleDirectionChange("asc")}
                                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-gray-100 ${sortDirection === "asc" ? "bg-gray-200" : ""}`}
                                    >
                                        <span>↑</span>
                                        Ascending
                                    </button>

                                    <button
                                        onClick={() => handleDirectionChange("desc")}
                                        className={`mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-gray-100 ${sortDirection === "desc" ? "bg-gray-200" : ""}`}
                                    >
                                        <span>↓</span>
                                        Descending
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="flex min-h-64 items-center justify-center border-t">
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                        <FiLoader className="h-5 w-5 animate-spin" />
                        Loading preorders...
                    </div>
                </div>
            ) : (
                <>
                    <PreorderTable preorders={preorders} />
                    <PreorderPagination
                        totalItems={totalItems}
                        page={page}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}