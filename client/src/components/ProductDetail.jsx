import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-700'}`}>
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center text-center px-4 ${isDark ? 'bg-gray-900 text-red-400' : 'bg-gray-100 text-red-600'}`}>
        {error.message}
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
        Product not found.
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-10 px-4 md:px-8 ${isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
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
              <span className="font-semibold">Price:</span>{' '}
              <span className="text-blue-500">${product.price}</span>
            </p>
            <p>
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p>
              <span className="font-semibold">Expiration Date:</span>{' '}
              {new Date(product.expirationDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {product.rating} / 5
            </p>
            <p className="pt-2">
              <span className="font-semibold block">Description:</span>
              {product.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
