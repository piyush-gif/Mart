import { Link } from "react-router-dom";

const SideBar = () => {
  return ( 
    <aside className="w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4">
      <nav className="flex flex-col gap-2">
        <Link
          to="/level1"
          className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition"
        >
          Level 1 - Groceries
        </Link>
        <Link
          to="/level2"
          className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition"
        >
          Level 2 - Utensils / Toys
        </Link>
        <Link
          to="/level3"
          className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition"
        >
          Level 3 - Luga Shop
        </Link>
        <Link
          to="/level4"
          className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition"
        >
          Level 4 - Electronic
        </Link>
        <Link
          to="/level5"
          className="px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition"
        >
          Level 5 - Household
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;