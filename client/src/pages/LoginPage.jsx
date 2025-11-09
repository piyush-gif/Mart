import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import API_URL from "../config";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { fetchCartItems } = useContext(CartContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
  const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      if (data.accessToken && data.refreshToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        fetchCartItems();
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-100`}>
      <div className={`max-w-md w-full p-8 rounded-lg shadow-lg bg-white`}>
        <div className={`mb-6 text-center`}>
          <h2 className={`text-2xl font-bold mb-6 text-black`}>Sign In</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className={`block text-sm font-medium mb-1 text-gray-700`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white border-gray-300 text-gray-800 placeholder-gray-400`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 text-gray-700`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white border-gray-300 text-gray-800 placeholder-gray-400`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/create-account" className="text-blue-600 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;