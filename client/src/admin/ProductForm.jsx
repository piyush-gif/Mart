import { useState } from "react";
import { authFetch } from "../utils/authFetch";

const ProductForm = ({ products, setProducts, setError }) => {
  const [product, setProduct] = useState({ 
    name: "", 
    price: "", 
    category: "", 
    description: "",
    stock: "",
    rating: "",
    reviewCount: "",
    isActive: true,
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ 
    name: "", 
    price: "", 
    category: "", 
    description: "",
    stock: "",
    rating: "",
    reviewCount: "",
    isActive: true
  });

  const categories = [
    "Groceries",
    "Utensils / Toys", 
    "Clothes & Fashion",
    "Electronics",
    "Household"
  ];

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock),
        rating: parseFloat(product.rating),
        reviewCount: parseInt(product.reviewCount),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      };

      const res = await authFetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setProduct({ 
        name: "", 
        price: "", 
        category: "", 
        description: "",
        stock: "",
        rating: "",
        reviewCount: "",
        isActive: true,
        image: ""
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditedProduct({ 
      name: product.name, 
      price: product.price.toString(),
      category: product.category || "",
      description: product.description || "",
      stock: product.stock.toString(),
      rating: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
      isActive: product.isActive
    });
  };

  const handleSave = async () => {
    try {
      const productData = {
        name: editedProduct.name,
        price: parseFloat(editedProduct.price),
        category: editedProduct.category,
        description: editedProduct.description,
        stock: parseInt(editedProduct.stock),
        rating: parseFloat(editedProduct.rating),
        reviewCount: parseInt(editedProduct.reviewCount),
        isActive: editedProduct.isActive
      };

      const res = await authFetch(`http://localhost:5000/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to update product");

      setProducts((prev) =>
        prev.map((product) =>
          product._id === editingId
            ? { ...product, ...productData }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          required
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
        <input
          type="number"
          required
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
        <select
          required
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Stock"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
        <input
          type="text"
          required
          placeholder="Image filename (e.g. apple.jpg)"
          value={product.image}
          onChange={e => setProduct({ ...product, image: e.target.value })}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating (0-5)"
          value={product.rating}
          onChange={(e) => setProduct({ ...product, rating: e.target.value })}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
        <input
          type="number"
          placeholder="Review Count"
          value={product.reviewCount}
          onChange={(e) => setProduct({ ...product, reviewCount: e.target.value })}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
        <div className="flex items-center">
          <label className="flex items-center text-gray-200">
            <input
              type="checkbox"
              checked={product.isActive}
              onChange={(e) => setProduct({ ...product, isActive: e.target.checked })}
              className="mr-2"
            />
            Active
          </label>
        </div>
      </div>

      <div className="mt-4">
        <textarea
          placeholder="Product Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          rows="3"
          className="w-full p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-200">Existing Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-400">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const categoryProducts = products.filter(product => product.category === category);
              
              return (
                <div key={category} className="bg-gray-700 rounded p-4">
                  <h3 className="text-lg font-semibold mb-3 text-blue-400 border-b border-gray-600 pb-2">
                    {category} ({categoryProducts.length})
                  </h3>
                  <div className="space-y-2">
                    {categoryProducts.length === 0 ? (
                      <p className="text-gray-400 text-sm">No products in this category</p>
                    ) : (
                      categoryProducts.map((product) => (
                        <div
                          key={product._id}
                          className="p-3 border border-gray-600 rounded shadow bg-gray-800"
                        >
                          {editingId === product._id ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={editedProduct.name}
                                onChange={(e) =>
                                  setEditedProduct({ ...editedProduct, name: e.target.value })
                                }
                                className="w-full p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                                placeholder="Product name"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="number"
                                  value={editedProduct.price}
                                  onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, price: e.target.value })
                                  }
                                  className="p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                                  placeholder="Price"
                                />
                                <input
                                  type="number"
                                  value={editedProduct.stock}
                                  onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, stock: e.target.value })
                                  }
                                  className="p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                                  placeholder="Stock"
                                />
                              </div>
                              <select
                                value={editedProduct.category}
                                onChange={(e) =>
                                  setEditedProduct({ ...editedProduct, category: e.target.value })
                                }
                                className="w-full p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                              >
                                {categories.map((cat) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="number"
                                  step="0.1"
                                  value={editedProduct.rating}
                                  onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, rating: e.target.value })
                                  }
                                  className="p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                                  placeholder="Rating"
                                />
                                <input
                                  type="number"
                                  value={editedProduct.reviewCount}
                                  onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, reviewCount: e.target.value })
                                  }
                                  className="p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                                  placeholder="Reviews"
                                />
                              </div>
                              <div className="flex items-center">
                                <label className="flex items-center text-gray-200 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={editedProduct.isActive}
                                    onChange={(e) =>
                                      setEditedProduct({ ...editedProduct, isActive: e.target.checked })
                                    }
                                    className="mr-2"
                                  />
                                  Active
                                </label>
                              </div>
                              <textarea
                                value={editedProduct.description}
                                onChange={(e) =>
                                  setEditedProduct({ ...editedProduct, description: e.target.value })
                                }
                                className="w-full p-1 border rounded bg-gray-600 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                                placeholder="Description"
                                rows="2"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={handleSave}
                                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className="font-semibold text-gray-200 text-sm">{product.name}</p>
                              <p className="text-sm text-gray-400">${product.price}</p>
                              <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                              <p className="text-xs text-gray-500">Rating: {product.rating}/5 ({product.reviewCount} reviews)</p>
                              <p className="text-xs text-gray-500">Status: {product.isActive ? 'Active' : 'Inactive'}</p>
                              {product.description && (
                                <p className="text-xs text-gray-400 mt-1">{product.description}</p>
                              )}
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleEditClick(product)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(product._id)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
