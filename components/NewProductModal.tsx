"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: any) => void;
}

const NewProductModal = ({
  isOpen,
  onClose,
  onSubmit,
}: NewProductModalProps) => {
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("newProduct");
      return savedData
        ? JSON.parse(savedData)
        : {
            title: "",
            price: "",
            description: "",
            status: "available",
            category: "",
            brand: "",
            stock: "",
            rating: 5.0,
            warranty: "12 Months",
          };
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,

      id: Math.floor(Math.random() * 10000),
      price: Number(formData.price),
      stock: Number(formData.stock),
    });

    localStorage.removeItem("newProduct");
    setFormData({
      title: "",
      price: "",
      description: "",
      status: "available",
      category: "",
      brand: "",
      stock: "",
      rating: 5.0,
      warranty: "12 Months",
    });
    onClose();
  };

  useEffect(() => {
    localStorage.setItem("newProduct", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Product Title
              </label>
              <input
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Price (ZAR)
              </label>
              <input
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full p-2 border rounded-lg bg-white focus:ring-2  focus:ring-blue-500 outline-none text-gray-700"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="available">Available</option>
                <option value="sold out">Sold Out</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Category
              </label>
              <input
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Stock Level
              </label>
              <input
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Brand
              </label>
              <input
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                type="text"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Warranty
              </label>
              <input
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                type="text"
                value={formData.warranty}
                onChange={(e) =>
                  setFormData({ ...formData, warranty: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Rating
            </label>
            <input
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              type="number"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-gray-700"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 rounded-lg font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;
