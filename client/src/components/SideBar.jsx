import { Link } from "react-router-dom";

const SideBar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-white bg-opacity-50 z-10 transition-opacity duration-300 ${isOpen ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4 z-20 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="self-end mb-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <nav className="flex flex-col gap-2">
          <Link to="/level1" className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition">Level 1 - Groceries</Link>
          <Link to="/level2" className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition">Level 2 - Utensils / Toys</Link>
          <Link to="/level3" className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition">Level 3 - Luga Shop</Link>
          <Link to="/level4" className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition">Level 4 - Electronic</Link>
          <Link to="/level5" className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition">Level 5 - Household</Link>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;