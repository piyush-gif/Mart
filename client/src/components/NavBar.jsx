import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Sun, Moon, Menu, LogOut, Settings } from 'lucide-react';
import { CartContext } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

const NavBar = ({ toggleSideBar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { cartCount, setCartItems, setCartCount } = useContext(CartContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setCartItems([]);
    setCartCount(0);
    navigate('/login');
  };

  const toggleProfile = () => setShowProfile(prev => !prev);

  return (
    <nav className={`sticky top-0 z-50 border-b shadow-sm px-6 py-3 flex items-center justify-between ${
      isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
    }`}>
      {/* Left: Brand + Sidebar + Home */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSideBar}
          className={`p-2 rounded transition-colors ${
            isDark ? 'text-white hover:text-gray-200 hover:bg-gray-800' : 'text-black hover:text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className={`text-xl font-bold tracking-wide ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          MART
        </Link>
        <Link
          to="/"
          className={`text-sm font-medium transition-colors ${
            isDark ? 'text-white hover:text-gray-200' : 'text-black hover:text-gray-700'
          }`}
        >
          Home
        </Link>
      </div>

      {/* Right: Nav Actions */}
      <div className="flex items-center gap-4 relative">
        {/* Cart */}
        {isLoggedIn && (
          <Link
            to="/Cart"
            className={`relative ${isDark ? 'text-white hover:text-gray-200' : 'text-black hover:text-gray-700'}`}
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded transition-colors ${isDark ? 'text-white hover:text-gray-200' : 'text-black hover:text-gray-700'}`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Profile Dropdown */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={toggleProfile}
              className={`flex items-center gap-1 px-3 py-1 rounded ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
            >
              <User size={18} />
              <svg
                className={`transform transition-transform ${showProfile ? 'rotate-180' : 'rotate-0'}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
            {showProfile && (
              <div className={`absolute right-0 mt-2 w-48 border rounded shadow-xl z-10 ${
                isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
              }`}>
                <Link
                  to="/Account"
                  className={`flex items-center gap-2 px-4 py-2 text-sm ${isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-black'}`}
                >
                  <User size={16} />
                  Your Account
                </Link>
                <Link
                  to="/Settings"
                  className={`flex items-center gap-2 px-4 py-2 text-sm ${isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-200 text-black'}`}
                >
                  <Settings size={16} />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm ${isDark ? 'text-gray-400 hover:bg-gray-900' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className={`transition-colors font-medium ${
              isDark ? 'text-white hover:text-gray-200' : 'text-black hover:text-gray-700'
            }`}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
