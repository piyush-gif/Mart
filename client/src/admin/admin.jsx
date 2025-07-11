import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import UserTable from "./UserTable"
import ProductForm from "./ProductForm";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true); // Assume authorized until a 401/403 is received
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, productRes] = await Promise.all([
          authFetch("http://localhost:5000/user-data"),
          authFetch("http://localhost:5000/products"),
        ]);

        if (userRes.status === 401 || userRes.status === 403) {
          setAuthorized(false);
          // Use the error message from the response if available
          const errData = await userRes.json();
          throw new Error(errData.message || "You are not authorized to view this page.");
        }

        if (!userRes.ok || !productRes.ok) {
          throw new Error("Failed to fetch data from the server.");
        }

        const userData = await userRes.json();
        const productData = await productRes.json();

        setUsers(userData);
        setProducts(productData);
        setError(null); // Clear previous errors on success
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductCreate = async (productData) => {
    try {
      const res = await authFetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Failed to create product.");
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProductUpdate = async (id, productData) => {
    try {
      const res = await authFetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Failed to update product.");
      const updatedProduct = await res.json();
      setProducts((prev) => prev.map((p) => (p._id === id ? updatedProduct : p)));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleProductDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await authFetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product.");
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleUserDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const res = await authFetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user.");

      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

   const handleUserUpdate = async (userId, updatedData) => {
    try {
      const res = await authFetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update user.");
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, ...updatedData } : user
      ));
    } catch (err) {
      console.error("Update error:", err);
    }
  };
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      
      {error && <p className="text-red-600 text-center bg-red-100 p-2 rounded mb-4">{error}</p>}

      <div className="flex border-b mb-6">
        <button className={`py-2 px-4 font-semibold ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`} onClick={() => setActiveTab('users')}>
          User Management
        </button>
        <button className={`py-2 px-4 font-semibold ${activeTab === 'products' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`} onClick={() => setActiveTab('products')}>
          Product Management
        </button>
      </div>

      {activeTab === "users" && (
        <UserTable 
          users={users} 
          onDelete={handleUserDelete} 
          onUpdate={handleUserUpdate} 
        />
      )}

     {activeTab === 'products' && (
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <ProductForm onCreate={handleProductCreate} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Existing Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
          ) : (
            <ul className="space-y-2">
              {products.map((product) => (
                <li
                  key={product._id}
                  className="bg-white shadow p-4 rounded border flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">Price: ${product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
  )}
    </div>
  );
};

export default Admin;
