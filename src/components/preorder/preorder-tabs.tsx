"use client";

import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

export default function PreorderTabs() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-between gap-6 border-b px-4 py-3 relative z-30">
            <div className="flex gap-6">
                <button className="font-semibold bg-gray-100 px-4 py-1 rounded">
                    All
                </button>

                <button className="text-gray-600">
                    Active
                </button>

                <button className="text-gray-600">
                    Inactive
                </button>
            </div>

            {/* sort button */}
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="bg-white rounded-xl p-2 border border-gray-300 flex items-center gap-2 hover:bg-gray-50"
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
                                    />
                                    <span className="text-sm">Name</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sortField"
                                        className="h-4 w-4 accent-black"
                                        defaultChecked
                                    />
                                    <span className="text-sm">Created At</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sortField"
                                        className="h-4 w-4 accent-black"
                                    />
                                    <span className="text-sm">Starts At</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sortField"
                                        className="h-4 w-4 accent-black"
                                    />
                                    <span className="text-sm">Ends At</span>
                                </label>
                            </div>

                            <div className="my-3 border-t" />

                            <div className="px-1 pb-1">
                                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-gray-100">
                                    <span>↑</span>
                                    Ascending
                                </button>


                                <button className="flex w-full items-center gap-2 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold">
                                    <span>↓</span>
                                    Descending
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}