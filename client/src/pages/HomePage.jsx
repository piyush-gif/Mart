import { useState } from "react";
import useFetch from "../hooks/useFetch";
const HomePage = () => {
  
  const [search, setSearch] = useState('');
  
  return ( 
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-100">
        <input className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ></input>

        <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
          hello
        </div>
    </div>
   );
}
 
export default HomePage;