"use client";

import { use, useEffect, useState } from "react";
import { Product, ProductModalProps } from "../data/productData";
import { products as initialProducts } from "../data/productData";
import { X } from "lucide-react";

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!isOpen || !product) return null;
  const [formData, setFormData] = useState(product);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const localData = localStorage.getItem("products");

    let allProducts: Product[] = localData
      ? JSON.parse(localData)
      : initialProducts;

    const index = allProducts.findIndex(
      (p) => String(p.id) === String(formData.id),
    );

    if (index !== -1) {
      allProducts[index] = formData;
    } else {
      allProducts.push(formData);
    }

    localStorage.setItem("products", JSON.stringify(allProducts));

    alert("Product updated in LocalStorage!");
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
          <button
            onClick={onClose}
            className="p-1  hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">
                ID (Read Only)
              </h3>
              <input
                type="text"
                value={formData.id}
                disabled
                className="px-3 py-1 w-full text-xs font-bold border text-gray-400"
              />
            </div>
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">
                Brand
              </h3>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="px-3 py-1 w-full text-xs font-bold border focus:ring-2 focus:ring-blue-500 outline-none text-gray-400"
              />
            </div>
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">
                Price
              </h3>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="px-3 py-1 w-full text-xs font-bold border focus:ring-2 focus:ring-blue-500 outline-none text-gray-400"
              />
            </div>
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">
                Category
              </h3>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-3 py-1 w-full text-xs font-bold border focus:ring-2 focus:ring-blue-500 outline-none text-gray-400"
              />
            </div>
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">
                Stock Level
              </h3>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="px-3 py-1 w-full text-xs font-bold border focus:ring-2 focus:ring-blue-500 outline-none text-gray-400"
              />
            </div>
            <div>
              <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">
                Warranty
              </h3>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="px-3 py-1 w-full text-xs font-bold border focus:ring-2 focus:ring-blue-500 outline-none text-gray-400"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-bold mb-1">
              Description
            </h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="px-3 py-2 text-xs font-medium border focus:ring-2 focus:ring-blue-500 outline-none w-full h-24 resize-none text-gray-400"
            />
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-2"
          >
            Save Edits
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
