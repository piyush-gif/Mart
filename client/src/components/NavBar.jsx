import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const NavBar = ({ toggleSideBar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { cartCount, setCartItems, setCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCartItems([]);
    setCartCount(0);
    navigate('/login');
  };

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  return (
    <nav className="bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSideBar}
          className="text-xl font-bold text-blue-600 hover:text-blue-800 transition"
        >
          MART
        </button>
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/Cart"
          className="relative text-gray-700 hover:text-blue-600 transition"
        >
          Cart
          <span className="ml-1 inline-block bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
            {cartCount}
          </span>
        </Link>
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition"
          >
            Profile
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
              <div className="flex flex-col p-2">
                <Link
                  to="/Account"
                  className="px-4 py-2 hover:bg-gray-100 rounded transition"
                >
                  Your account
                </Link>
                <Link
                  to="/Orders"
                  className="px-4 py-2 hover:bg-gray-100 rounded transition"
                >
                  Your orders
                </Link>
                <Link
                  to="/Settings"
                  className="px-4 py-2 hover:bg-gray-100 rounded transition"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;