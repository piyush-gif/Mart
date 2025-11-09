import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { CartContext } from '../contexts/CartContext';
import { authFetch } from '../utils/authFetch';
import { useTheme } from '../contexts/ThemeContext';
import API_URL from "../config";
const ProductList = ({ category }) => {
  const { data: productData, error, loading } = useFetch(`${API_URL}/get-data`);
  const { fetchCartItems } = useContext(CartContext);
  const { isDark } = useTheme();

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    try {
  const res = await authFetch(`${API_URL}/add_to_cart`, {
        method: 'POST',
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error('Failed to add product to cart');

      await res.json();
      fetchCartItems();
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  const filteredProducts = productData?.filter(p => p.category === category) || [];

  return (
    <div className={`min-h-screen py-8 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {error && (
          <div className="col-span-full text-center text-gray-500 font-medium">
            {error.message}
          </div>
        )}

        {loading && (
          <div className="col-span-full text-center text-gray-500 animate-pulse">
            Loading products...
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No products found in this category.
          </div>
        )}

        {filteredProducts.map(product => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="no-underline group"
          >
            <div className={`rounded-xl p-4 shadow-md hover:shadow-xl transition duration-200 flex flex-col ${
              isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
            }`}>
              <img
                src={`http://localhost:5000/images/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-[1.02] transition-transform"
              />
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-sm mb-1 text-black font-medium">${product.price}</p>
              <p className="text-sm mb-1">{product.category}</p>
              <p className="text-sm mb-1">{new Date(product.expirationDate).toLocaleDateString()}</p>
              <p className="text-sm mb-4 text-gray-500">Rating: {product.rating} / 5</p>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className={`mt-auto w-full text-sm font-semibold rounded-lg px-4 py-2 border transition-all duration-200 shadow-sm
                  ${isDark
                    ? 'bg-white text-black border-white hover:bg-black hover:text-white hover:border-white active:bg-gray-900'
                    : 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black active:bg-gray-200'}
                `}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
