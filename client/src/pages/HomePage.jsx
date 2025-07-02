import { useState } from "react";
import useFetch from "../hooks/useFetch";
const HomePage = () => {
  
  const [search, setSearch] = useState('');
  
  return ( 
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-20">
      <input
        className="w-full max-w-md mb-8 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        hello
      </div>
    </div>
   );
}
 
export default HomePage;