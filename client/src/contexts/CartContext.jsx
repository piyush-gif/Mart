import  { createContext, useState, useEffect, useCallback } from 'react';
import { authFetch } from '../utils/authFetch';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = useCallback(async () => {
    try {
      const res = await authFetch('http://localhost:5000/get-cart-data');
      if (!res.ok) throw new Error('Failed to fetch cart items');
      const data = await res.json();
      setCartItems(data);
      setCartCount(data.reduce((acc, item) => acc + item.quantity, 0));
    } catch (error) {
      console.error('Cart fetch error:', error.message);
      setCartItems([]);
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartItems,
        setCartItems,
        fetchCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
