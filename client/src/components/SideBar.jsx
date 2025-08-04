import { Link } from "react-router-dom";
import { useTheme } from '../contexts/ThemeContext';

const SideBar = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-10 transition-opacity duration-300 ${
          isOpen ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"
        } ${isDark ? 'bg-black' : 'bg-white'}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full shadow-lg p-6 flex flex-col gap-4 z-20 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      >
        <button
          className={`self-end mb-4 hover:text-gray-700 transition-colors ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
          }`}
          onClick={onClose}
        >
          &times;
        </button>
        <nav className="flex flex-col gap-2">
          <Link 
            to="/level1" 
            className={`px-4 py-2 rounded transition-colors font-medium ${
              isDark 
                ? 'text-gray-200 hover:bg-gray-800 hover:text-white' 
                : 'text-gray-800 hover:bg-gray-200 hover:text-black'
            }`}
          >
             Groceries
          </Link>
          <Link 
            to="/level2" 
            className={`px-4 py-2 rounded transition-colors font-medium ${
              isDark 
                ? 'text-gray-200 hover:bg-gray-800 hover:text-white' 
                : 'text-gray-800 hover:bg-gray-200 hover:text-black'
            }`}
          >
             Utensils / Toys
          </Link>
          <Link 
            to="/level3" 
            className={`px-4 py-2 rounded transition-colors font-medium ${
              isDark 
                ? 'text-gray-200 hover:bg-gray-800 hover:text-white' 
                : 'text-gray-800 hover:bg-gray-200 hover:text-black'
            }`}
          >
             Clothes & Fashion
          </Link>
          <Link 
            to="/level4" 
            className={`px-4 py-2 rounded transition-colors font-medium ${
              isDark 
                ? 'text-gray-200 hover:bg-gray-800 hover:text-white' 
                : 'text-gray-800 hover:bg-gray-200 hover:text-black'
            }`}
          >
             Electronic
          </Link>
          <Link 
            to="/level5" 
            className={`px-4 py-2 rounded transition-colors font-medium ${
              isDark 
                ? 'text-gray-200 hover:bg-gray-800 hover:text-white' 
                : 'text-gray-800 hover:bg-gray-200 hover:text-black'
            }`}
          >
            Household
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;