import { useState } from "react";
import useFetch from "../hooks/useFetch";
const HomePage = () => {
  
  const [search, setSearch] = useState('');
  
  return ( 
    <div className="home">
        <input className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ></input>

        <div>
          
        </div>
    </div>
   );
}
 
export default HomePage;