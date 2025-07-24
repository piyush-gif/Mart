import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { CartContext } from '../contexts/CartContext';
import { authFetch } from '../utils/authFetch';
import { useTheme } from '../contexts/ThemeContext';

const ProductList = ({ category }) => {
  const { data: productData, error, loading } = useFetch('http://localhost:5000/get-data');
  const { fetchCartItems } = useContext(CartContext);
  const { isDark } = useTheme();

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    try {
      const res = await authFetch('http://localhost:5000/add_to_cart', {
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
    <div className={`min-h-screen py-8 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {error && (
          <div className="col-span-full text-center text-red-500 font-medium">
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
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
            }`}>
              <img
                src={`http://localhost:5000/images/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-[1.02] transition-transform"
              />
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-sm mb-1 text-blue-500 font-medium">${product.price}</p>
              <p className="text-sm mb-1">{product.category}</p>
              <p className="text-sm mb-1">{new Date(product.expirationDate).toLocaleDateString()}</p>
              <p className="text-sm mb-4 text-yellow-500">Rating: {product.rating} / 5</p>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="mt-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-400 text-white px-4 py-2 rounded-md transition w-full text-sm font-medium"
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
