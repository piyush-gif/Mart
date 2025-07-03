import useFetch from "../hooks/useFetch";
const Admin = () => {
  
  const handleProduct = () =>{
    
  }

  return ( 
    <div>
      <div>
        <h1>Mart Dashboard</h1>
          <button onClick={handleProduct}>Users</button>
          <button>Products</button>
      </div>
      {data && data.map((item, index) => <p key={index}>{item.name}</p>)}
      {error && <p>{error}</p>}
    </div>
   );
}
 
export default Admin;