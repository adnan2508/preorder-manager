"use client";

import { useState } from "react";
import { preorders } from "@/lib/mock-data";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function PreorderTable() {
  const [items, setItems] = useState(preorders);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, active: !item.active }
          : item
      )
    );
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b bg-gray-50 text-left">
          <th className="p-3">
            <input type="checkbox" />
          </th>

          <th>Name</th>
          <th>Products</th>
          <th>Preorder when</th>
          <th>Starts at</th>
          <th>Ends at</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className="border-b hover:bg-gray-50"
          >
            <td className="p-3">
              <input type="checkbox" />
            </td>

            <td className="font-medium">{item.name}</td>
            <td>{item.products}</td>
            <td>{item.preorderWhen}</td>
            <td>{item.startsAt}</td>
            <td>{item.endsAt ?? "-"}</td>

            <td>
              <button
                type="button"
                onClick={() => toggleStatus(item.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  item.active ? "bg-black" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    item.active
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </td>

            <td>
              <div className="flex gap-3">
                <button className="bg-white rounded-xl p-2 border border-gray-300">
                  <FiEdit size={18} />
                </button>

                <button className="bg-white rounded-xl p-2 border border-gray-300">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}