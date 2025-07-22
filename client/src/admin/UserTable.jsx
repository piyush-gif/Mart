import { useState } from "react";
import { authFetch } from "../utils/authFetch";

const UserTable = ({ users, setUsers, setError }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({ email: "", role: "" });

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setEditedUser({ email: user.email, role: user.role?.join(", ") });
  };

  const handleSave = async () => {
    try {
      const res = await authFetch(`http://localhost:5000/users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: editedUser.email,
          role: editedUser.role.split(",").map((r) => r.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      setUsers((prev) =>
        prev.map((user) =>
          user._id === editingId
            ? { ...user, ...editedUser, role: editedUser.role.split(",").map((r) => r.trim()) }
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

      setUsers((prev) => prev.filter((user) => user._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-800 shadow rounded p-4">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-600 text-gray-200">Email</th>
            <th className="p-2 border border-gray-600 text-gray-200">Role</th>
            <th className="p-2 border border-gray-600 text-gray-200">Cart</th>
            <th className="p-2 border border-gray-600 text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-700 text-gray-200">
              <td className="p-2 border border-gray-600">
                {editingId === user._id ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="w-full p-1 border rounded bg-gray-700 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-2 border border-gray-600">
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={editedUser.role}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, role: e.target.value })
                    }
                    className="w-full p-1 border rounded bg-gray-700 text-gray-200 border-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  user.role?.join(", ")
                )}
              </td>
              <td className="p-2 border border-gray-600 text-xs">
                {user.cart && user.cart.length > 0 ? (
                  <ul>
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
              <td className="p-2 border border-gray-600 flex gap-2">
                {editingId === user._id ? (
                  <>
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
                  </>
                ) : (
                  <>
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
                  </>
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
