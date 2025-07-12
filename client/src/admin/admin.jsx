import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import UserTable from "./UserTable";
import ProductForm from "./ProductForm";


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
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
          const errData = await userRes.json();
          throw new Error(errData.message || "You are not authorized.");
        }

        if (!userRes.ok || !productRes.ok) throw new Error("Failed to fetch data.");

        const userData = await userRes.json();
        const productData = await productRes.json();

        setUsers(userData);
        setProducts(productData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!authorized) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="flex border-b mb-6">
        {["users", "products"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-semibold ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab === "users" ? "User Management" : "Product Management"}
          </button>
        ))}
      </div>

      {activeTab === "users" && (
        <UserTable users={users} setUsers={setUsers} setError={setError} />
      )}

      {activeTab === "products" && (
        <ProductForm
          products={products}
          setProducts={setProducts}
          setError={setError}
        />
      )}
    </div>
  );
};

export default Admin;
