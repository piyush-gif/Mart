import { useState } from "react";
import { authFetch } from "../utils/authFetch";

const ProductForm = ({ products, setProducts, setError }) => {
  const defaultProduct = {
    name: "", price: "", category: "", description: "",
    stock: "", rating: "", reviewCount: "", isActive: true, image: ""
  };

  const [product, setProduct] = useState(defaultProduct);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState(defaultProduct);

  const categories = [
    "Groceries", "Utensils / Toys", "Clothes & Fashion", "Electronics", "Household"
  ];

  const handleChange = (objSetter, field, value) => {
    objSetter(prev => ({ ...prev, [field]: value }));
  };

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
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      };

      const res = await authFetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const newProduct = await res.json();
      setProducts(prev => [...prev, newProduct]);
      setProduct(defaultProduct);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (p) => {
    setEditingId(p._id);
    setEditedProduct({
      name: p.name, price: p.price.toString(), category: p.category || "",
      description: p.description || "", stock: p.stock.toString(),
      rating: p.rating.toString(), reviewCount: p.reviewCount.toString(),
      isActive: p.isActive, image: p.image || ""
    });
  };

  const handleSave = async () => {
    try {
      const productData = {
        ...editedProduct,
        price: parseFloat(editedProduct.price),
        stock: parseInt(editedProduct.stock),
        rating: parseFloat(editedProduct.rating),
        reviewCount: parseInt(editedProduct.reviewCount),
      };

      const res = await authFetch(`http://localhost:5000/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to update product");

      setProducts(prev =>
        prev.map(p => (p._id === editingId ? { ...p, ...productData } : p))
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

      setProducts(prev => prev.filter(p => p._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleCreate} className="bg-gray-800 p-4 shadow rounded mb-6">
      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input type="text" required placeholder="Product Name"
          value={product.name} onChange={(e) => handleChange(setProduct, 'name', e.target.value)}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <input type="number" required placeholder="Price"
          value={product.price} onChange={(e) => handleChange(setProduct, 'price', e.target.value)}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <select required
          value={product.category} onChange={(e) => handleChange(setProduct, 'category', e.target.value)}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" required placeholder="Stock"
          value={product.stock} onChange={(e) => handleChange(setProduct, 'stock', e.target.value)}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <input type="text" required placeholder="Image filename (e.g. apple.jpg)"
          value={product.image} onChange={(e) => handleChange(setProduct, 'image', e.target.value)}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
      </div>

      {/* Second Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <input type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)"
          value={product.rating} onChange={(e) => handleChange(setProduct, 'rating', e.target.value)}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <input type="number" placeholder="Review Count"
          value={product.reviewCount} onChange={(e) => handleChange(setProduct, 'reviewCount', e.target.value)}
          className="p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
        <label className="flex items-center text-gray-200">
          <input type="checkbox" checked={product.isActive}
            onChange={(e) => handleChange(setProduct, 'isActive', e.target.checked)}
            className="mr-2"
          />
          Active
        </label>
      </div>

      <div className="mt-4">
        <textarea placeholder="Product Description" rows="3"
          value={product.description} onChange={(e) => handleChange(setProduct, 'description', e.target.value)}
          className="w-full p-2 border rounded bg-gray-700 text-gray-200 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        />
      </div>

      <button type="submit" disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>

      {/* Product Display */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-200">Existing Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-400">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => {
              const catProducts = products.filter(p => p.category === category);
              return (
                <div key={category} className="bg-gray-700 rounded p-4">
                  <h3 className="text-lg font-semibold mb-3 text-blue-400 border-b border-gray-600 pb-2">
                    {category} ({catProducts.length})
                  </h3>
                  <div className="space-y-2">
                    {catProducts.map(p => (
                      <div key={p._id} className="p-3 border border-gray-600 rounded bg-gray-800">
                        <img src={`http://localhost:5000/images/${p.image}`} alt={p.name} className="w-full h-32 object-cover mb-2 rounded" />
                        {editingId === p._id ? (
                          <div className="space-y-2 text-sm">
                            <input type="text" value={editedProduct.name} onChange={(e) => handleChange(setEditedProduct, 'name', e.target.value)} className="w-full p-1 border rounded bg-gray-600 text-gray-200" placeholder="Product name" />
                            <div className="grid grid-cols-2 gap-2">
                              <input type="number" value={editedProduct.price} onChange={(e) => handleChange(setEditedProduct, 'price', e.target.value)} className="p-1 border rounded bg-gray-600 text-gray-200" placeholder="Price" />
                              <input type="number" value={editedProduct.stock} onChange={(e) => handleChange(setEditedProduct, 'stock', e.target.value)} className="p-1 border rounded bg-gray-600 text-gray-200" placeholder="Stock" />
                            </div>
                            <select value={editedProduct.category} onChange={(e) => handleChange(setEditedProduct, 'category', e.target.value)} className="w-full p-1 border rounded bg-gray-600 text-gray-200">
                              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <input type="text" value={editedProduct.image} onChange={(e) => handleChange(setEditedProduct, 'image', e.target.value)} className="w-full p-1 border rounded bg-gray-600 text-gray-200" placeholder="Image filename" />
                            <div className="grid grid-cols-2 gap-2">
                              <input type="number" step="0.1" value={editedProduct.rating} onChange={(e) => handleChange(setEditedProduct, 'rating', e.target.value)} className="p-1 border rounded bg-gray-600 text-gray-200" placeholder="Rating" />
                              <input type="number" value={editedProduct.reviewCount} onChange={(e) => handleChange(setEditedProduct, 'reviewCount', e.target.value)} className="p-1 border rounded bg-gray-600 text-gray-200" placeholder="Reviews" />
                            </div>
                            <textarea value={editedProduct.description} onChange={(e) => handleChange(setEditedProduct, 'description', e.target.value)} rows="2" className="w-full p-1 border rounded bg-gray-600 text-gray-200" placeholder="Description" />
                            <label className="flex items-center text-gray-200">
                              <input type="checkbox" checked={editedProduct.isActive} onChange={(e) => handleChange(setEditedProduct, 'isActive', e.target.checked)} className="mr-2" />
                              Active
                            </label>
                            <div className="flex gap-2">
                              <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs">Save</button>
                              <button onClick={() => setEditingId(null)} className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-300">
                            <p className="font-semibold">{p.name}</p>
                            <p>${p.price}</p>
                            <p className="text-xs">Stock: {p.stock}</p>
                            <p className="text-xs">Rating: {p.rating}/5 ({p.reviewCount})</p>
                            <p className="text-xs">Status: {p.isActive ? 'Active' : 'Inactive'}</p>
                            {p.description && <p className="text-xs text-gray-400 mt-1">{p.description}</p>}
                            <div className="flex gap-2 mt-2">
                              <button onClick={() => handleEditClick(p)} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs">Edit</button>
                              <button onClick={() => handleDelete(p._id)} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs">Delete</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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
