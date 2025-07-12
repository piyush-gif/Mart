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
    <form onSubmit={handleCreate} className="bg-white p-4 shadow rounded mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          required
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          required
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Existing Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <ul className="space-y-2">
            {products.map((product) => (
              <li
                key={product._id}
                className="flex justify-between p-4 border rounded shadow bg-white"
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
                        className="flex-1 p-1 border rounded"
                      />
                      <input
                        type="number"
                        value={editedProduct.price}
                        onChange={(e) =>
                          setEditedProduct({ ...editedProduct, price: e.target.value })
                        }
                        className="w-24 p-1 border rounded"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  {editingId === product._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
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
