import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch product details');
        }
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(err => setError(err));
  }, [id]);

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-red-500' : 'bg-gray-100 text-red-600'}`}>
        {error.message}
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-10 px-4 md:px-8 ${isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <img
            src={`http://localhost:5000/images/${product.image}`}
            alt={product.name}
            className="rounded-xl shadow-lg object-cover w-full max-h-[500px]"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-lg mb-2">
            <span className="font-semibold">Price:</span> ${product.price}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Expiration Date:</span>{' '}
            {new Date(product.expirationDate).toLocaleDateString()}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Rating:</span> {product.rating} / 5
          </p>

          <p className="text-lg mt-4">
            <span className="font-semibold">Description:</span><br />
            {product.description || 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
