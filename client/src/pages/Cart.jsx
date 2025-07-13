import { useEffect, useContext, useState } from "react";
import { CartContext } from '../contexts/CartContext';
import { authFetch } from '../utils/authFetch';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Cart = () => {
  const { cartItems, fetchCartItems } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const { isDark } = useTheme();

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

  useEffect(() => {
    if (cartItems) {
      const calculatedTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotal(calculatedTotal);
    }
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={`min-h-screen py-8 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className={`max-w-2xl mx-auto rounded-lg shadow p-6 text-center ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>Your cart is empty</h2>
          <p className={`mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>Add some items to your cart before checkout.</p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className={`text-3xl font-bold text-center mb-8 ${
          isDark ? 'text-gray-200' : 'text-gray-800'
        }`}>Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Summary - Left Side */}
          <div className={`rounded-lg shadow p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>Order Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Subtotal:</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Shipping:</span>
                <span className="font-medium">$5.99</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Tax:</span>
                <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
              </div>
              <hr className={isDark ? 'border-gray-600' : 'border-gray-200'} />
              <div className="flex justify-between text-lg font-bold">
                <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>Total:</span>
                <span className="text-blue-600">${(total + 5.99 + (total * 0.08)).toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>

          {/* Cart Items - Right Side */}
          <div className={`rounded-lg shadow p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>Cart Items</h2>
            <div className="space-y-4">
              {cartItems.map((item, id) => (
                <div
                  key={id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-4 last:border-b-0 last:mb-0 ${
                    isDark ? 'border-gray-600' : 'border-gray-200'
                  }`}
                >
                  <div className="flex-1">
                    <p className={`font-semibold text-lg ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>{item.name}</p>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Category: {item.category}</p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      Exp: {new Date(item.expirationDate).toLocaleDateString()}
                    </p>
                    <p className="text-blue-600 font-medium">Price: ${item.price}</p>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>Qty: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => itemDeleteHandle(item.productId)}
                    className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 active:bg-blue-300 text-white px-4 py-2 rounded transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;