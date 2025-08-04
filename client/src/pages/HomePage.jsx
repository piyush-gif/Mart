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
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Welcome to MART
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-10 opacity-90 leading-relaxed">
              Your premium destination for quality shopping
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <input
                className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90 shadow-lg transition-all duration-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center group ${
                isDark ? 'bg-black hover:bg-gray-900' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className={`text-lg font-semibold transition-colors ${
                isDark 
                  ? 'text-white group-hover:text-gray-400' 
                  : 'text-black group-hover:text-gray-700'
              }`}>
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore One Product From Each Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Explore Our Curated Selection
        </h2>
        
        {error && (
          <div className="text-center text-red-500 font-medium mb-8">
            {error.message}
          </div>
        )}

        {!productData && !error && (
          <div className={`text-center mb-8 font-medium text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Loading products...
          </div>
        )}

        {search && (
          <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-6 ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Search Results ({filteredProducts.length} products)
            </h3>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(search ? filteredProducts : oneProductPerCategory).map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className={`rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 block ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={`http://localhost:5000/images/${product.image}`}
                alt={product.name}
                className="w-full h-56 object-cover mb-6 rounded-lg"
              />
              <div className="mb-4">
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {product.name}
                </h3>
                <p className={`text-sm mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Category: {product.category}
                </p>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
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
          <div className={`text-center py-12 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <p className="text-lg font-medium">No products found matching "{search}"</p>
            <button
              onClick={() => setSearch('')}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
            >
              Clear search
            </button>
          </div>
        )}

        {!search && oneProductPerCategory.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/all-products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className={`py-20 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      } transition-colors duration-300`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Start Shopping?
          </h2>
          <p className={`text-lg sm:text-xl mb-10 ${
            isDark ? 'text-gray-200' : 'text-gray-600'
          }`}>
            Discover our premium range of products tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/level1"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              Browse Products
            </Link>
            <Link
              to="/cart"
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
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