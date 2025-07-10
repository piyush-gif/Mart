import { useState } from "react";

const UserTable = ({ users, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({ email: "", role: "" });

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setEditedUser({ email: user.email, role: user.role?.join(", ") });
  };

  const handleSave = async () => {
    await onUpdate(editingId, {
      email: editedUser.email,
      role: editedUser.role.split(",").map(r => r.trim()),
    });
    setEditingId(null);
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <table className="min-w-full table-auto border-collapse border">
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
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
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
                    onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    className="w-full p-1 border rounded"
                    placeholder="admin, user"
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
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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