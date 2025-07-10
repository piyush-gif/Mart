import { useEffect, useState } from 'react';
import { authFetch } from '../../utils/authFetch';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await authFetch('http://localhost:5000/user-data');
        const data = await res.json();
        setUser(data);
        console.log(data);
      } catch (err) {
        console.error('Failed to load user info', err.message);
      }
    };

    getUserData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {/* Optional: Add edit form here */}
    </div>
  );
};

export default UserProfile;
