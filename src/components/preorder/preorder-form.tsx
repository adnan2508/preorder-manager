"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { createPreorder, updatePreorder } from "../../actions/preorder.actions";
import SubmitButton from "@/components/shared/submit-button";
import { PreorderWhen } from "@prisma/client";

interface PreorderFormProps {
    preorder?: {
        id: string;
        name: string;
        products: number;
        preorderWhen: PreorderWhen;
        startsAt: string;
        endsAt: string;
        active: boolean;
    };
}

export default function PreorderForm({
    preorder,
}: PreorderFormProps) {
    const [isActive, setIsActive] = useState(
        preorder?.active ?? true
    );
    const formAction = preorder ? updatePreorder : createPreorder;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Top Actions */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/"
                    className="border rounded-lg px-4 py-2 flex items-center gap-2"
                >
                    <FiArrowLeft />
                    Back
                </Link>

                <div className="flex gap-3">
                    <Link
                        href="/"
                        className="border rounded-lg px-5 py-2"
                    >
                        Cancel
                    </Link>

                    <SubmitButton
                        form="preorder-form"
                        className="bg-black text-white rounded-lg px-5 py-2"
                    >
                        Save changes
                    </SubmitButton>
                </div>
            </div>

            {/* Card */}
            <form
                id="preorder-form"
                action={formAction}
                className="border rounded-2xl bg-white overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">
                        Preorder details
                    </h2>

                    <p className="text-gray-500 mt-1">
                        These values appear in the preorders list.
                    </p>
                </div>

                <div className="p-6 space-y-8">

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-8 border-b pb-8">
                        <div>
                            <h3 className="font-semibold">
                                Name <span className="text-red-500">*</span>
                            </h3>

                            <p className="text-gray-500 mt-1">
                                A label to recognize this preorder by.
                            </p>
                        </div>

                        <input
                            name="name"
                            defaultValue={preorder?.name}
                            className="border rounded-lg px-4 py-3"
                            placeholder="Enter preorder name"
                        />
                    </div>

                    {/* Products */}
                    <div className="grid grid-cols-2 gap-8 border-b pb-8">
                        <div>
                            <h3 className="font-semibold">
                                Products
                            </h3>

                            <p className="text-gray-500 mt-1">
                                Number of products covered by this preorder.
                            </p>
                        </div>

                        <input
                            name="products"
                            type="number"
                            min={1}
                            className="border rounded-lg px-4 py-3 w-40"
                            defaultValue={preorder?.products ?? 1}
                        />
                    </div>

                    {/* Preorder When */}
                    <div className="grid grid-cols-2 gap-8 border-b pb-8">
                        <div>
                            <h3 className="font-semibold">
                                Preorder when
                            </h3>

                            <p className="text-gray-500 mt-1">
                                When customers are allowed to preorder.
                            </p>
                        </div>

                        <select
                            name="preorderWhen"
                            defaultValue={
                                preorder?.preorderWhen ??
                                PreorderWhen.REGARDLESS_OF_STOCK
                            }
                            className="border rounded-lg px-4 py-3"
                        >
                            <option value="REGARDLESS_OF_STOCK">
                                Regardless of stock
                            </option>

                            <option value="OUT_OF_STOCK">
                                Out of stock
                            </option>
                        </select>
                    </div>

                    {/* Starts At */}
                    <div className="grid grid-cols-2 gap-8 border-b pb-8">
                        <div>
                            <h3 className="font-semibold">
                                Starts at
                            </h3>

                            <p className="text-gray-500 mt-1">
                                When the preorder window opens.
                            </p>
                        </div>

                        <input
                            name="startsAt"
                            type="datetime-local"
                            defaultValue={preorder?.startsAt}
                            className="border rounded-lg px-4 py-3"
                        />
                    </div>

                    {/* Ends At */}
                    <div className="grid grid-cols-2 gap-8 border-b pb-8">
                        <div>
                            <h3 className="font-semibold">
                                Ends at
                            </h3>

                            <p className="text-gray-500 mt-1">
                                Leave empty for no end date.
                            </p>
                        </div>

                        <input
                            name="endsAt"
                            type="datetime-local"
                            defaultValue={preorder?.endsAt}
                            className="border rounded-lg px-4 py-3"
                        />
                    </div>

                    {/* Status */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold">
                                Status
                            </h3>

                            <p className="text-gray-500 mt-1">
                                Active preorders are visible to customers.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsActive((prev) => !prev)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? "bg-black" : "bg-gray-300"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                        }`}
                                />
                            </button>

                            <input
                                type="hidden"
                                name="active"
                                value={isActive ? "true" : "false"}
                            />
                            {preorder && (
                                <input
                                    type="hidden"
                                    name="id"
                                    value={preorder.id}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Buttons */}
                <div className="border-t p-6 flex justify-end gap-3">
                    <Link
                        href="/"
                        className="border rounded-lg px-5 py-2"
                    >
                        Cancel
                    </Link>

                    <SubmitButton className="bg-black text-white rounded-lg px-5 py-2">
                        Save changes
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}