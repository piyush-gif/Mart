import { useState } from "react";
import { authFetch } from "../utils/authFetch";
import { useTheme } from "../contexts/ThemeContext";
import API_URL from "../config";
const UserTable = ({ users, setUsers, setError }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({ email: "", role: "" });
  const { isDark } = useTheme();

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setEditedUser({ email: user.email, role: user.role?.join(", ") || "" });
  };

  const handleChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const { email, role } = editedUser;
    if (!email || !role) return alert("Email and role are required");

    try {
      const res = await authFetch(`${API_URL}/users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: role.split(",").map(r => r.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      setUsers(prev =>
        prev.map(user =>
          user._id === editingId
            ? { ...user, email, role: role.split(",").map(r => r.trim()) }
            : user
        )
      );
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
  const res = await authFetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers(prev => prev.filter(user => user._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`overflow-x-auto shadow rounded-md p-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <table className="min-w-full text-sm">
        <thead>
          <tr className={`${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <th className={`p-3 border ${isDark ? 'border-gray-800 text-left' : 'border-gray-300 text-left'}`}>Email</th>
            <th className={`p-3 border ${isDark ? 'border-gray-800 text-left' : 'border-gray-300 text-left'}`}>Role</th>
            <th className={`p-3 border ${isDark ? 'border-gray-800 text-left' : 'border-gray-300 text-left'}`}>Cart</th>
            <th className={`p-3 border ${isDark ? 'border-gray-800 text-left' : 'border-gray-300 text-left'}`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className={`${isDark ? 'border-t border-gray-800 hover:bg-gray-800 text-white' : 'border-t border-gray-200 hover:bg-gray-100 text-black'}`}>
              <td className="p-2 align-top">
                {editingId === user._id ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full p-1 rounded ${isDark ? 'bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 text-white' : 'bg-white border border-gray-300 focus:outline-none focus:border-gray-500 text-black'}`}
                  />
                ) : (
                  user.email
                )}
              </td>

              <td className="p-2 align-top">
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={editedUser.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    className={`w-full p-1 rounded ${isDark ? 'bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 text-white' : 'bg-white border border-gray-300 focus:outline-none focus:border-gray-500 text-black'}`}
                    placeholder="e.g. admin, user"
                  />
                ) : (
                  user.role?.join(", ") || "-"
                )}
              </td>

              <td className="p-2 align-top text-xs text-gray-300">
                {user.cart?.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {user.cart.map((item, idx) => (
                      <li key={idx}>
                        {item.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Empty</span>
                )}
              </td>

              <td className="p-2 align-top">
                {editingId === user._id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className={`px-3 py-1 rounded transition-colors ${isDark ? 'bg-black hover:bg-gray-800 text-white' : 'bg-black hover:bg-gray-200 text-white'}`}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className={`px-3 py-1 rounded transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className={`px-3 py-1 rounded transition-colors ${isDark ? 'bg-black hover:bg-gray-800 text-white' : 'bg-black hover:bg-gray-200 text-white'}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className={`px-3 py-1 rounded transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
