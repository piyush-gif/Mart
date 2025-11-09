import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { authFetch } from '../utils/authFetch';
import { useTheme } from '../contexts/ThemeContext';
import { Tag, ShoppingCart, ToyBrick, Shirt, Monitor, Home as HomeIcon } from "lucide-react";
import API_URL from "../config";
const HomePage = () => {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data: productData, error } = useFetch(`${API_URL}/get-data`);
  const { fetchCartItems } = useContext(CartContext);
  const { isDark } = useTheme();

  const categories = [
    { name: "Groceries", path: "/level1", icon: ShoppingCart },
    { name: "Utensils & Toys", path: "/level2", icon: ToyBrick },
    { name: "Clothes & Fashion", path: "/level3", icon: Shirt },
    { name: "Electronics", path: "/level4", icon: Monitor },
    { name: "Household", path: "/level5", icon: HomeIcon }
  ];

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

  // Pick one product per category for "Explore One Product Per Category"
  const oneProductPerCategory = [];
  if (productData) {
    categories.forEach(cat => {
      const prod = productData.find(p => p.category === cat.name);
      if (prod) oneProductPerCategory.push(prod);
    });
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} py-20`}>
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
                className={`w-full px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-lg transition-all duration-300 ${isDark ? 'bg-black text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'}`}
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
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-black'}`}>
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className={`p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center group ${isDark ? 'bg-black hover:bg-gray-900 border border-gray-700' : 'bg-white hover:bg-gray-100 border border-gray-200'}`}
            >
              {/* Minimal professional icon: vertical bar */}
              <div className="flex items-center justify-center mb-4">
                {category.icon && (
                  <category.icon size={24} className={`${isDark ? 'text-gray-400' : 'text-gray-700'}`} />
                )}
              </div>
              <h3 className={`text-lg font-semibold transition-colors ${isDark ? 'text-white group-hover:text-gray-400' : 'text-black group-hover:text-gray-700'}`}>
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore One Product From Each Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-black'}`}>
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
            <div
              key={product._id}
              className={`rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}`}
            >
              <Link
                to={`/products/${product._id}`}
                className="block mb-4"
                tabIndex={-1}
              >
                <img
                  src={`${API_URL}/images/${product.image}`}
                  alt={product.name}
                  className="w-full h-56 object-cover mb-6 rounded-lg"
                />
                <div className="mb-4">
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category: {product.category}
                  </p>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Expires: {new Date(product.expirationDate).toLocaleDateString()}
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>${product.price}</p>
                </div>
              </Link>
              <button
                onClick={() => addToCartHandle(product)}
                className={`mt-auto w-full text-base font-semibold rounded-lg px-4 py-2 border transition-all duration-200 shadow-sm
                  ${isDark
                    ? 'bg-white text-black border-white hover:bg-black hover:text-white hover:border-white active:bg-gray-900'
                    : 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black active:bg-gray-200'}
                `}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {search && filteredProducts.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <p className="text-lg font-medium">No products found matching "{search}"</p>
            <button
              onClick={() => setSearch('')}
              className={`mt-4 font-medium underline transition-colors ${isDark ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-700'}`}
            >
              Clear search
            </button>
          </div>
        )}

        {!search && oneProductPerCategory.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/all-products"
              className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Ready to Start Shopping?
          </h2>
          <p className={`text-lg sm:text-xl mb-10 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Discover our premium range of products tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/level1"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              Browse Products
            </Link>
            <Link
              to="/cart"
              className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg border border-gray-300"
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