import { useState } from "react";
import { authFetch } from "../utils/authFetch";
import { useTheme } from "../contexts/ThemeContext";
import API_URL from "../config";
const ProductForm = ({ products, setProducts, setError }) => {
  const defaultProduct = {
    name: "", price: "", category: "", description: "",
    stock: "", rating: "", reviewCount: "", isActive: true, image: ""
  };
  const { isDark } = useTheme();

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

  const res = await authFetch(`${API_URL}/products`, {
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

  const res = await authFetch(`${API_URL}/products/${editingId}`, {
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
  const res = await authFetch(`${API_URL}/products/${id}`, {
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
    <form onSubmit={handleCreate} className={`${isDark ? 'bg-black' : 'bg-white'} p-4 shadow rounded mb-6`}>
      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input type="text" required placeholder="Product Name"
          value={product.name} onChange={(e) => handleChange(setProduct, 'name', e.target.value)}
          className={`p-2 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-gray-400 placeholder-gray-400' : 'bg-white text-black border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400'}`}
        />
        <input type="number" required placeholder="Price"
          value={product.price} onChange={(e) => handleChange(setProduct, 'price', e.target.value)}
          className={`p-2 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-gray-400 placeholder-gray-400' : 'bg-white text-black border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400'}`}
        />
        <select required
          value={product.category} onChange={(e) => handleChange(setProduct, 'category', e.target.value)}
          className={`p-2 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-gray-400' : 'bg-white text-black border-gray-300 focus:outline-none focus:border-gray-500'}`}
        >
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" required placeholder="Stock"
          value={product.stock} onChange={(e) => handleChange(setProduct, 'stock', e.target.value)}
          className={`p-2 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-gray-400 placeholder-gray-400' : 'bg-white text-black border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400'}`}
        />
        <input type="text" required placeholder="Image filename (e.g. apple.jpg)"
          value={product.image} onChange={(e) => handleChange(setProduct, 'image', e.target.value)}
          className={`p-2 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-gray-400 placeholder-gray-400' : 'bg-white text-black border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400'}`}
        />
      </div>

      {/* Second Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <input type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)"
          value={product.rating} onChange={(e) => handleChange(setProduct, 'rating', e.target.value)}
          className={`p-2 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-gray-400 placeholder-gray-400' : 'bg-white text-black border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400'}`}
        />
        <input type="number" placeholder="Review Count"
          value={product.reviewCount} onChange={(e) => handleChange(setProduct, 'reviewCount', e.target.value)}
          className={`p-2 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-gray-400 placeholder-gray-400' : 'bg-white text-black border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400'}`}
        />
        <label className={`${isDark ? 'text-white' : 'text-black'} flex items-center`}>
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
          className={`w-full p-2 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700 focus:outline-none focus:border-gray-400 placeholder-gray-400' : 'bg-white text-black border-gray-300 focus:outline-none focus:border-gray-500 placeholder-gray-400'}`}
        />
      </div>

      <button type="submit" disabled={loading}
        className={`mt-4 ${isDark ? 'bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white' : 'bg-black hover:bg-gray-200 disabled:bg-gray-400 text-white'} px-4 py-2 rounded transition-colors`}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>

      {/* Product Display */}
      <div className="mt-6">
        <h2 className={`${isDark ? 'text-white' : 'text-black'} text-xl font-semibold mb-2`}>Existing Products</h2>
        {products.length === 0 ? (
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => {
              const catProducts = products.filter(p => p.category === category);
              return (
                <div key={category} className={`${isDark ? 'bg-gray-900' : 'bg-gray-100'} rounded p-4`}>
                  <h3 className={`${isDark ? 'text-white' : 'text-black'} text-lg font-semibold mb-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-2`}>
                    {category} ({catProducts.length})
                  </h3>
                  <div className="space-y-2">
                    {catProducts.map(p => (
                      <div key={p._id} className={`p-3 border rounded ${isDark ? 'border-gray-700 bg-black' : 'border-gray-300 bg-white'}`}>
                        <img src={`${API_URL}/images/${p.image}`} alt={p.name} className="w-full h-32 object-cover mb-2 rounded" />
                        {editingId === p._id ? (
                          <div className="space-y-2 text-sm">
                            <input type="text" value={editedProduct.name} onChange={(e) => handleChange(setEditedProduct, 'name', e.target.value)} className={`w-full p-1 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`} placeholder="Product name" />
                            <div className="grid grid-cols-2 gap-2">
                              <input type="number" value={editedProduct.price} onChange={(e) => handleChange(setEditedProduct, 'price', e.target.value)} className={`p-1 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`} placeholder="Price" />
                              <input type="number" value={editedProduct.stock} onChange={(e) => handleChange(setEditedProduct, 'stock', e.target.value)} className={`p-1 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`} placeholder="Stock" />
                            </div>
                            <select value={editedProduct.category} onChange={(e) => handleChange(setEditedProduct, 'category', e.target.value)} className={`w-full p-1 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}>
                              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <input type="text" value={editedProduct.image} onChange={(e) => handleChange(setEditedProduct, 'image', e.target.value)} className={`w-full p-1 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`} placeholder="Image filename" />
                            <div className="grid grid-cols-2 gap-2">
                              <input type="number" step="0.1" value={editedProduct.rating} onChange={(e) => handleChange(setEditedProduct, 'rating', e.target.value)} className={`p-1 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`} placeholder="Rating" />
                              <input type="number" value={editedProduct.reviewCount} onChange={(e) => handleChange(setEditedProduct, 'reviewCount', e.target.value)} className={`p-1 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`} placeholder="Reviews" />
                            </div>
                            <textarea value={editedProduct.description} onChange={(e) => handleChange(setEditedProduct, 'description', e.target.value)} rows="2" className={`w-full p-1 border rounded ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`} placeholder="Description" />
                            <label className={`${isDark ? 'text-white' : 'text-black'} flex items-center`}>
                              <input type="checkbox" checked={editedProduct.isActive} onChange={(e) => handleChange(setEditedProduct, 'isActive', e.target.checked)} className="mr-2" />
                              Active
                            </label>
                            <div className="flex gap-2">
                              <button onClick={handleSave} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-black hover:bg-gray-800 text-white' : 'bg-black hover:bg-gray-200 text-white'}`}>Save</button>
                              <button onClick={() => setEditingId(null)} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                            <p className="font-semibold">{p.name}</p>
                            <p>${p.price}</p>
                            <p className="text-xs">Stock: {p.stock}</p>
                            <p className="text-xs">Rating: {p.rating}/5 ({p.reviewCount})</p>
                            <p className="text-xs">Status: {p.isActive ? 'Active' : 'Inactive'}</p>
                            {p.description && <p className="text-xs text-gray-400 mt-1">{p.description}</p>}
                            <div className="flex gap-2 mt-2">
                              <button onClick={() => handleEditClick(p)} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-black hover:bg-gray-800 text-white' : 'bg-black hover:bg-gray-200 text-white'}`}>Edit</button>
                              <button onClick={() => handleDelete(p._id)} className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}>Delete</button>
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
