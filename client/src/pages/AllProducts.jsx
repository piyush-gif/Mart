import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { authFetch } from '../utils/authFetch';
import { useTheme } from '../contexts/ThemeContext';
import API_URL from "../config";
const AllProducts = () => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data: productData, error } = useFetch(`${API_URL}/get-data`);
  const { fetchCartItems } = useContext(CartContext);
  const { isDark } = useTheme();

  const addToCartHandle = (product) => {
  authFetch(`${API_URL}/add_to_cart`, {
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

  useEffect(() => {
    if (productData) {
      const filtered = productData.filter(product =>
        (product.name && product.name.toLowerCase().includes(search.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [search, productData]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className={`text-3xl font-bold text-center mb-8 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          All Products
        </h2>
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            className="w-full px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
        </div>
        {error && (
          <div className="text-center text-red-600 mb-8">
            {error.message}
          </div>
        )}
        {!productData && !error && (
          <div className={`text-center mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Loading products...
          </div>
        )}
        {search && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Search Results ({filteredProducts.length} products)
            </h3>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(search ? filteredProducts : productData || []).map((product) => (
            <div key={product._id} className={`rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 ${
              isDark ? 'bg-black' : 'bg-white'
            }`}>
               <img src={`http://localhost:5000/images/${product.image}`} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
              <div className="mb-4">
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  {product.name}
                </h3>
                <p className={`text-sm mb-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Category: {product.category}
                </p>
                <p className={`text-sm mb-3 ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Expires: {new Date(product.expirationDate).toLocaleDateString()}
                </p>
                <p className="text-2xl font-bold text-black">
                  ${product.price}
                </p>
              </div>
              <button
                onClick={() => addToCartHandle(product)}
                className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        {search && filteredProducts.length === 0 && (
          <div className={`text-center py-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p className="text-lg">No products found matching "{search}"</p>
            <button
              onClick={() => setSearch('')}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts; 