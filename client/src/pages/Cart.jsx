import { useEffect, useContext } from "react";
import { CartContext } from '../contexts/CartContext';
import {authFetch} from '../utils/authFetch';
const Cart = () => {
  const { cartItems, fetchCartItems } = useContext(CartContext);

  const itemDeleteHandle = (itemid) => {
    authFetch(`http://localhost:5000/cart/${itemid}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) throw new Error('Delete failed');
      return res.json();
    })
    .then(() => {
      fetchCartItems();
    })
    .catch(err => {
      console.error(err);
    });
  };

  useEffect(() => {
    fetchCartItems(); 
  }, [fetchCartItems]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, id) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0"
              >
                <div>
                  <p className="font-semibold text-lg text-gray-700">{item.name}</p>
                  <p className="text-gray-500">Category: {item.category}</p>
                  <p className="text-gray-400 text-sm">
                    Exp: {new Date(item.expirationDate).toLocaleDateString()}
                  </p>
                  <p className="text-blue-600 font-medium">Price: ${item.price}</p>
                  <p className="text-gray-700">Qty: {item.quantity}</p>
                </div>
                <button
                  onClick={() => itemDeleteHandle(item.productId)}
                  className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 active:bg-blue-300 text-white px-4 py-2 rounded transition cursor-pointer"
                >
                  Remove from cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;