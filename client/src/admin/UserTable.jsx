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
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="p-2 border">
                {editingId === user._id ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="p-2 border">
                {editingId === user._id ? (
                  <input
                    type="text"
                    value={editedUser.role}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, role: e.target.value })
                    }
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  user.role?.join(", ")
                )}
              </td>
              <td className="p-2 border flex gap-2">
                {editingId === user._id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
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
