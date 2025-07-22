import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  return (
   <nav className={`sticky top-0 z-50 shadow-lg border-b flex items-center justify-between px-6 py-3 ${
     isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
   }`}>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSideBar}
          className={`p-2 rounded transition-colors ${
            isDark 
              ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
          }`}
          aria-label="Open sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.005 11.995v.01m0-4.01v.01m0 7.99v.01"/>
          </svg>
        </button>
        <span className={`text-xl font-bold ${
          isDark ? 'text-blue-400' : 'text-blue-600'
        }`}>MART</span>
        <Link to="/" className={`transition-colors ${
          isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
        }`}>
          Home
        </Link>
      </div>
      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <>
            <Link
              to="/Cart"
              className={`relative transition-colors ${
                isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Cart
              <span className="ml-1 inline-block bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            </Link>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <div className="relative">
              <button
                onClick={toggleProfile}
                className={`px-3 py-1 rounded transition-colors ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Profile
              </button>
              {showProfile && (
                <div className={`absolute right-0 mt-2 w-48 border rounded shadow-xl z-10 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="flex flex-col p-2">
                    <Link
                      to="/Account"
                      className={`px-4 py-2 rounded transition-colors ${
                        isDark 
                          ? 'text-gray-200 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Your account
                    </Link>
                    <Link
                      to="/Settings"
                      className={`px-4 py-2 rounded transition-colors ${
                        isDark 
                          ? 'text-gray-200 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
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
          </>
        ) : (
          <>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <Link
              to="/login"
              className={`transition-colors ${
                isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;