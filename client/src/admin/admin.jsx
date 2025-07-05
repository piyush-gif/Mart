import useFetch from "../hooks/useFetch";
import {useState, useEffect, use} from 'react';
const Admin = () => {
  
  const {data, error} = useFetch('http://localhost:5000/get-cart-data');
  return ( 
    <div>
      <div>
        <h1>Mart Dashboard</h1>
          <button>Products</button>
      </div>
      {data && data.map((item, index) => <p key={index}>{item}</p>)}
      {error && <p>{error}</p>}
    </div>
   );
}
 
export default Admin;