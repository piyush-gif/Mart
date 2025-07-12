import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const NavBar = ({ toggleSideBar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { cartCount, setCartItems, setCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setCartItems([]);
    setCartCount(0);
    navigate('/login');
  };

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  return (
   <nav className="bg-gray-900 shadow-lg border-b border-gray-700 flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSideBar}
          className="p-2 rounded hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          aria-label="Open sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.005 11.995v.01m0-4.01v.01m0 7.99v.01"/>
          </svg>
        </button>
        <span className="text-xl font-bold text-blue-400">MART</span>
        <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
          Home
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/Cart"
          className="relative text-gray-300 hover:text-blue-400 transition-colors"
        >
          Cart
          <span className="ml-1 inline-block bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
            {cartCount}
          </span>
        </Link>
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded transition-colors"
          >
            Profile
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10">
              <div className="flex flex-col p-2">
                <Link
                  to="/Account"
                  className="px-4 py-2 hover:bg-gray-700 rounded transition-colors text-gray-200 hover:text-white"
                >
                  Your account
                </Link>
                <Link
                  to="/Orders"
                  className="px-4 py-2 hover:bg-gray-700 rounded transition-colors text-gray-200 hover:text-white"
                >
                  Your orders
                </Link>
                <Link
                  to="/Settings"
                  className="px-4 py-2 hover:bg-gray-700 rounded transition-colors text-gray-200 hover:text-white"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
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