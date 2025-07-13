import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";
import UserTable from "./UserTable";
import ProductForm from "./ProductForm";
import { useTheme } from "../contexts/ThemeContext";


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // First, check if user is logged in and get their data
        const userRes = await authFetch("http://localhost:5000/user-data");
        
        if (userRes.status === 401 || userRes.status === 403) {
          setAuthorized(false);
          setError("You are not authorized to access this page.");
          return;
        }

        if (!userRes.ok) {
          setAuthorized(false);
          setError("Failed to verify your permissions.");
          return;
        }

        const userData = await userRes.json();
        
        // Check if user is an admin
        if (!userData.role || !userData.role.includes("admin")) {
          setAuthorized(false);
          setError("You need admin privileges to access this page.");
          return;
        }

        // If user is admin, fetch admin data
        const [adminUsersRes, productRes] = await Promise.all([
          authFetch("http://localhost:5000/users"), // Get all users for admin
          authFetch("http://localhost:5000/products"),
        ]);

        if (!adminUsersRes.ok || !productRes.ok) {
          throw new Error("Failed to fetch admin data.");
        }

        const adminUsersData = await adminUsersRes.json();
        const productData = await productRes.json();

        setUsers(adminUsersData);
        setProducts(productData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className={`text-center ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className={`max-w-md mx-auto text-center p-8 rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isDark ? 'bg-red-600' : 'bg-red-500'
          }`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h1 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Access Denied
          </h1>
          
          <p className={`mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            You don't have permission to access the admin dashboard. 
            Only administrators can view this page.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/'}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Go to Homepage
            </button>
            
            <button
              onClick={() => window.location.href = '/Account'}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors border ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              View My Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Admin Dashboard</h1>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <div className="flex border-b border-gray-700 mb-6">
        {["users", "products"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-semibold transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-blue-400"
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
