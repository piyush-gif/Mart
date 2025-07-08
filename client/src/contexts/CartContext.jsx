import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authFetch } from '../utils/authFetch';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }
    try {
      const res = await authFetch('http://localhost:5000/get-cart-data');
      if (!res.ok) throw new Error('Failed to fetch cart items');
      const data = await res.json();
      setCartItems(data);
      setCartCount(data.reduce((acc, item) => acc + item.quantity, 0));
    } catch (error) {
      setCartItems([]);
      setCartCount(0);
      console.error(error);
    }
  }, []); // useCallback with empty dependency array

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <CartContext.Provider value={{
      cartCount,
      setCartCount,
      cartItems,
      setCartItems,
      fetchCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
};