import { useState } from "react";

const ProductForm = ({ onCreate }) => {
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      const newProduct = await res.json();
      onCreate(newProduct);
      setProduct({ name: "", price: "", stock: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-white p-4 shadow rounded">
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
        <input
          type="number"
          required
          placeholder="Stock"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
