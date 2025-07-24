import { useState } from "react";
import { authFetch } from "../utils/authFetch";

const UserTable = ({ users, setUsers, setError }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({ email: "", role: "" });

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
      const res = await authFetch(`http://localhost:5000/users/${editingId}`, {
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
      const res = await authFetch(`http://localhost:5000/users/${id}`, {
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
    <div className="overflow-x-auto bg-gray-800 shadow rounded-md p-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-700 text-gray-200">
            <th className="p-3 border border-gray-600 text-left">Email</th>
            <th className="p-3 border border-gray-600 text-left">Role</th>
            <th className="p-3 border border-gray-600 text-left">Cart</th>
            <th className="p-3 border border-gray-600 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700 text-gray-100">
              <td className="p-2 align-top">
                {editingId === user._id ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full p-1 rounded bg-gray-700 border border-gray-500 focus:outline-none focus:border-blue-500"
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
                    className="w-full p-1 rounded bg-gray-700 border border-gray-500 focus:outline-none focus:border-blue-500"
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
                  <span className="text-gray-500">Empty</span>
                )}
              </td>

              <td className="p-2 align-top">
                {editingId === user._id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
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
