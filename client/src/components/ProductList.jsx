import useFetch from "../hooks/useFetch";
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import {authFetch} from '../utils/authFetch';

const ProductList = ({category}) => {
  const {data: productData, error}= useFetch('http://localhost:5000/get-data');
  const { fetchCartItems} = useContext(CartContext);

  const addToCartHandle = (product) => {
    authFetch('http://localhost:5000/add_to_cart', {
      method: 'POST',
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network error while adding to cart');
        }
        return res.json();
      })
      .then(() => {
        fetchCartItems();
      })
      .catch((err) => {
        console.error('Add to cart error:', err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {error && <h1 className="col-span-full text-red-600 text-center">{error.message}</h1>}
        {productData && productData
          .filter(product => product.category === category)
          .map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow p-6 flex flex-col items-start">
              <p className="text-lg font-semibold mb-1">{product.name}</p>
              <p className="text-gray-700 mb-1">Price: <span className="font-medium">${product.price}</span></p>
              <p className="text-gray-500 mb-1">{product.category}</p>
              <p className="text-gray-400 mb-2">{new Date(product.expirationDate).toLocaleDateString()}</p>
              <button
                onClick={() => addToCartHandle(product)}
                className="mt-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-300 text-white px-4 py-2 rounded transition cursor-pointer"
              >
                Add to cart
              </button>
            </div>
          ))}
      </div>
    </div>
    );
}
 
export default ProductList;