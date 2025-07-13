
import { useTheme } from '../../contexts/ThemeContext';

const OrderHistory = () => {
  const { isDark } = useTheme();

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Order History
      </h2>
      
      <div className={`text-center py-12 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          No Orders Yet
        </h3>
        <p className="mb-4">
          You haven't placed any orders yet. Start shopping to see your order history here!
        </p>
        <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          isDark 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}>
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;