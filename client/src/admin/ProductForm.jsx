import { useState } from "react";
import { authFetch } from "../utils/authFetch";

const ProductForm = ({ products, setProducts, setError }) => {
  const [product, setProduct] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: "", price: "" });

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authFetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setProduct({ name: "", price: "" });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditedProduct({ name: product.name, price: product.price.toString() });
  };

  const handleSave = async () => {
    try {
      const res = await authFetch(`http://localhost:5000/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editedProduct.name,
          price: parseFloat(editedProduct.price),
        }),
      });

      if (!res.ok) throw new Error("Failed to update product");

      setProducts((prev) =>
        prev.map((product) =>
          product._id === editingId
            ? { ...product, name: editedProduct.name, price: parseFloat(editedProduct.price) }
            : product
        )
      );
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await authFetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((product) => product._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleCreate} className="bg-gray-800 p-4 shadow rounded mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          required
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="p-2 border rounded w-full bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
        <input
          type="number"
          required
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="p-2 border rounded w-full bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-200">Existing Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-400">No products available.</p>
        ) : (
          <ul className="space-y-2">
            {products.map((product) => (
              <li
                key={product._id}
                className="flex justify-between p-4 border border-gray-600 rounded shadow bg-gray-700"
              >
                <div className="flex-1">
                  {editingId === product._id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editedProduct.name}
                        onChange={(e) =>
                          setEditedProduct({ ...editedProduct, name: e.target.value })
                        }
                        className="flex-1 p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        value={editedProduct.price}
                        onChange={(e) =>
                          setEditedProduct({ ...editedProduct, price: e.target.value })
                        }
                        className="w-24 p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-200">{product.name}</p>
                      <p className="text-sm text-gray-400">${product.price}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  {editingId === product._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
