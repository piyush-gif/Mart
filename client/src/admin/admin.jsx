import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch";

const Admin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false); // 👈 new state

  useEffect(() => {
    authFetch("http://localhost:5000/user-data")
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized or error fetching data");
        return res.json();
      })
      .then((resData) => {
        if (Array.isArray(resData)) {
          setData(resData);
          setAuthorized(true); 
        } else {
          setAuthorized(false); 
        }
      })
      .catch((err) => {
        setError(err);
        setAuthorized(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-600 text-center">{error.message}</p>;

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 font-semibold">You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">User Data</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Password</th>
                <th className="py-2 px-4 border">Cart Items</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">
                    {user.role && user.role.join(", ")}
                  </td>
                  <td className="py-2 px-4 border break-all text-xs text-gray-500">
                    {user.password}
                  </td>
                  <td className="py-2 px-4 border">
                    <ul className="list-disc pl-4">
                      {user.cart && user.cart.length > 0 ? (
                        user.cart.map((item, idx) => (
                          <li key={idx}>
                            <span className="font-medium">{item.name}</span> (x{item.quantity}) - ${item.price}
                          </li>
                        ))
                      ) : (
                        <span className="text-gray-400">No items</span>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
