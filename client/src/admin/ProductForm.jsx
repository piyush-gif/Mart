import { useState } from "react";
import { authFetch } from "../utils/authFetch";

const ProductForm = ({ products, setProducts, setError }) => {
  const [product, setProduct] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);

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
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
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
