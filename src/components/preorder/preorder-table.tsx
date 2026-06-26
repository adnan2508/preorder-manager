"use client";

import { useState } from "react";
import { PreorderTableItem } from "@/types/preorder";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface PreorderTableProps {
  preorders: PreorderTableItem[];
}

export default function PreorderTable({
  preorders,
}: PreorderTableProps) {

  const [items, setItems] = useState(preorders);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, active: !item.active }
          : item
      )
    );
  };

  const handleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const allSelected =
    items.length > 0 &&
    selectedRows.length === items.length;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(items.map((item) => item.id));
    }
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b bg-gray-50 text-left">
          <th className="p-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
              className="h-4 w-4 accent-black"
            />
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
            className={`border-b hover:bg-gray-100 ${selectedRows.includes(item.id)
              ? "bg-gray-50"
              : ""
              }`}
          >
            <td className="p-3">
              <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => handleRowSelection(item.id)}
                className="h-4 w-4 accent-black"
              />
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
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.active ? "bg-black" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.active
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