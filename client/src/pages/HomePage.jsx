import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { authFetch } from '../utils/authFetch';
import { useTheme } from '../contexts/ThemeContext';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data: productData, error } = useFetch('http://localhost:5000/get-data');
  const { fetchCartItems } = useContext(CartContext);
  const { isDark } = useTheme();

  const categories = [
    { name: "Groceries", path: "/level1", icon: "🛒" },
    { name: "Utensils & Toys", path: "/level2", icon: "🧸" },
    { name: "Clothes & Fashion", path: "/level3", icon: "👗" },
    { name: "Electronics", path: "/level4", icon: "📱" },
    { name: "Household", path: "/level5", icon: "🏠" }
  ];

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

  useEffect(() => {
    if (productData) {
      const filtered = productData.filter(product =>
        (product.name && product.name.toLowerCase().includes(search.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [search, productData]);

  // Pick one product per category for "Explore One Product Per Category"
  const oneProductPerCategory = [];
  if (productData) {
    categories.forEach(cat => {
      const prod = productData.find(p => p.category === cat.name);
      if (prod) oneProductPerCategory.push(prod);
    });
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to MART
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your one-stop shop for everything you need
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <input
                className="w-full px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className={`text-3xl font-bold text-center mb-8 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group ${
                isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className={`font-semibold transition-colors ${
                isDark 
                  ? 'text-gray-200 group-hover:text-blue-400' 
                  : 'text-gray-800 group-hover:text-blue-600'
              }`}>
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore One Product From Each Category */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className={`text-3xl font-bold text-center mb-8 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          Explore One Product From Each Category
        </h2>
        
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
          {(search ? filteredProducts : oneProductPerCategory).map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className={`rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 block ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={`http://localhost:5000/images/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <div className="mb-4">
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
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
                <p className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>
            </Link>
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

        {!search && oneProductPerCategory.length > 0 && (
          <div className="text-center mt-8">
            <Link
              to="/all-products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className={`py-16 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className={`text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Ready to Start Shopping?
          </h2>
          <p className={`text-lg mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Explore our wide range of products and find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/level1"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/cart"
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
