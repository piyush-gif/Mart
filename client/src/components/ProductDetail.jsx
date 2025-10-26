import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { CartContext } from '../contexts/CartContext';
import { authFetch } from '../utils/authFetch';

const ProductDetail = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { fetchCartItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      const res = await authFetch('https://mart-070j.onrender.com/add_to_cart', {
        method: 'POST',
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error('Failed to add product to cart');
      await res.json();
      fetchCartItems();
    } catch (err) {
      // Optionally show error to user
      console.error('Add to cart error:', err);
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product details');
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-gray-300' : 'bg-white text-gray-800'}`}>
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center text-center px-4 ${isDark ? 'bg-black text-gray-400' : 'bg-white text-gray-600'}`}>
        {error.message}
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-gray-500' : 'bg-white text-gray-600'}`}>
        Product not found.
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-10 px-4 md:px-8 ${isDark ? 'bg-black text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={`http://localhost:5000/images/${product.image}`}
            alt={product.name || 'Product Image'}
            className="rounded-xl shadow-xl object-cover w-full max-h-[500px] transition hover:scale-[1.02]"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="text-lg space-y-2">
            <p>
              <span className="text-gray-900 font-semibold">Price:</span>{' '}
              <span className="text-black">${product.price}</span>
            </p>
            <p>
              <span className="text-gray-900 font-semibold">Category:</span> {product.category}
            </p>
            <p>
              <span className="text-gray-900 font-semibold">Expiration Date:</span>{' '}
              {new Date(product.expirationDate).toLocaleDateString()}
            </p>
            <p>
              <span className="text-gray-900 font-semibold">Rating:</span> {product.rating} / 5
            </p>
            <p className="pt-2">
              <span className="font-semibold block">Description:</span>
              {product.description || 'No description available.'}
            </p>
          </div>
          {/* Add to Cart Button */}
          <div>
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`mt-6 w-full text-base font-semibold rounded-lg px-4 py-2 border transition-all duration-200 shadow-sm
                ${isDark
                  ? 'bg-white text-black border-white hover:bg-black hover:text-white hover:border-white active:bg-gray-900'
                  : 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black active:bg-gray-200'}
                ${adding ? 'opacity-60 cursor-not-allowed' : ''}
              `}
              aria-label={`Add ${product.name} to cart`}
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
