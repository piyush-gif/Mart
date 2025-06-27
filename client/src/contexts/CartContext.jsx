import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);


  const fetchCartCount = async () => {
    try {
      const res = await fetch('http://localhost:5000/cart-count');
      if (!res.ok) throw new Error('Failed to fetch cart count');
      const data = await res.json();
      setCartCount(data.total);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchCartCount();
  }, []);

  const refreshCartCount = () => {
    fetchCartCount();
  };

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
