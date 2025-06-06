import ProductList from "../components/ProductList";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
const HomePage = () => {
  
  const [search, setSearch] = useState('');
  const {productData, error} = useFetch();
  
  return ( 
    <div className="home">
        <input className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ></input>
        <ProductList category={'Fruit'}/>
    </div>
   );
}
 
export default HomePage;