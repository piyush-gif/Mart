import { useEffect, useState } from 'react';
import { authFetch } from '../../utils/authFetch';
import { useTheme } from '../../contexts/ThemeContext';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const res = await authFetch('http://localhost:5000/user-data');
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await res.json();
        setUser(data); 
      } catch (err) {
        console.error('Failed to load user info', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return (
      <div className={`text-center py-8 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Loading user profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${
        isDark ? 'text-red-400' : 'text-red-600'
      }`}>
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`text-center py-8 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        No user data found.
      </div>
    );
  }

  return (
    <div className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        User Profile
      </h2>
      
      <div className="space-y-4">
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center mb-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
              isDark ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="ml-4">
              <h3 className={`text-lg font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {user.username || 'User'}
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {user.role ? user.role.join(', ') : 'User'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className={`p-3 rounded border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Username
            </label>
            <p className={`${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {user.username || 'Not set'}
            </p>
          </div>

          <div className={`p-3 rounded border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email
            </label>
            <p className={`${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {user.email || 'Not set'}
            </p>
          </div>

          <div className={`p-3 rounded border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          }`}>
            <label className={`block text-sm font-medium mb-1 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Account Type
            </label>
            <p className={`${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {user.role ? user.role.join(', ') : 'User'}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
