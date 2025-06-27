import useFetch from "../hooks/useFetch";
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';


const ProductList = ({category}) => {
  const {data: productData, error}= useFetch('http://localhost:5000/get-data');
  const {refreshCartCount} = useContext(CartContext);

  const addToCartHandle = (product) => {
    fetch('http://localhost:5000/add_to_cart',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(product)
    })
    .then(res => {
      if(!res.ok){
        throw new Error('network problem');
      }
      return res.json();
    })
    .then(() => {
      refreshCartCount();
    })
    .catch(err => {
      console.log('ERROR', err)
    })
  }


  return (
    <div className='page-container'>
      <div className='page'>
        {error && <h1>{error.message}</h1>}
        {productData && productData
        .filter(product => product.category === category)
        .map(product => (
          <div key={product._id} className="products">
            <p>{product.name}</p>
            <p>price: {product.price}</p>
            <p>{product.category}</p>
            <p>{new Date(product.expirationDate).toLocaleDateString()}</p>
            <button onClick={() => addToCartHandle(product)}>add to cart</button>
          </div>
          ))}
      </div>
    </div>


    );
}
 
export default ProductList;