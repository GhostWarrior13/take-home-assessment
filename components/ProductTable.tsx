"use client";

import { useEffect, useState } from "react";
import { products, Product } from "../data/productData";
import { Trash } from "lucide-react";
import NewProductModal from "./NewProductModal";
import ProductDetailsModal from "./ProductDetailsModal";

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredStatus, setFilteredStatus] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const filteredAndSortedProducts = productList
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filteredStatus === "all" ||
        product.status.toLowerCase() === filteredStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const key = sortConfig.key;
      const direction = sortConfig.direction === "asc" ? 1 : -1;

      const valA = (a as Record<string, any>)[key];
      const valB = (b as Record<string, any>)[key];

      if (typeof valA === "number") {
        return (valA - valB) * direction;
      }

      if (typeof valA === "string") {
        return valA.localeCompare(valB) * direction;
      }

      return 0;
    });
  const requestSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Simulate loading state and error handling when fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate a random failure with a 10% chance to demonstrate error handling
        const shouldFail = Math.random() < 0.1;
        if (shouldFail) {
          throw new Error("Failed to load products");
        }

        // Simulate fetching data with a 2 second delay, it just fakes loading state for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };
    fetchProducts();

    // Cleanup function to reset loading state if component unmounts
    return () => {
      setLoading(true);
    };
  }, []);

  // Load products from localStorage on component mount, or use default products if none are saved
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProductList(JSON.parse(savedProducts));
    } else {
      setProductList(products);
    }
  }, []);

  // Save products to localStorage whenever they change, but only if there are products to save (prevents overwriting with empty array on initial load)
  useEffect(() => {
    if (productList.length > 0) {
      localStorage.setItem("products", JSON.stringify(productList));
    }
  }, [productList]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <div className="flex row-auto gap-5 justify-between w-full max-w-5xl ">
        <input
          className="w-full bg-white text-black border border-gray-300 p-3 rounded-xl max-w-md mb-8 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Search our products..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <select
          className="bg-white text-black border border-gray-300 p-3 rounded-xl w-full max-w-md mb-8 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={filteredStatus}
          onChange={(e) => setFilteredStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="sold out">Sold Out</option>
        </select>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap max-h-[50px]"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          Add Product
        </button>
      </div>

      {loading || error ? (
        <div className="text-gray-500 italic">
          {error ? error : "Loading products..."}
        </div>
      ) : (
        <div className="w-full max-w-5xl rounded-xl border border-gray-200 shadow-lg bg-white h-145 overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-500 border-collapse ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th
                  onClick={() => requestSort("title")}
                  className="px-6 py-4 font-bold"
                >
                  {" "}
                  Product{" "}
                  {sortConfig.key === "title" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-4 font-bold">Description</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
                <th className="px-6 py-4 font-bold text-center">Delete</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 tabular-nums">
                      {product.price.toLocaleString("en-ZA", {
                        style: "currency",
                        currency: "ZAR",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          product.status.toLowerCase() === "available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (
                            window.confirm(
                              `Are you sure you want to delete "${product.title}"? This action cannot be undone.`,
                            )
                          ) {
                            setProductList(
                              productList.filter((p) => p.id !== product.id),
                            );
                          }
                        }}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Show Selected Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <ProductDetailsModal
              product={selectedProduct}
              isOpen={true}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}

      {/* Show New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <NewProductModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              onSubmit={(product) => {
                setProductList([...productList, product]);
                setIsAddModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
