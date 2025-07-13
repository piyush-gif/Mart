
import { useTheme } from '../../contexts/ThemeContext';

const PaymentMethod = () => {
  const { isDark } = useTheme();

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Payment Methods
      </h2>
      
      <div className={`text-center py-12 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          No Payment Methods
        </h3>
        <p className="mb-4">
          You haven't added any payment methods yet. Add a card to make checkout faster!
        </p>
        <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
          isDark 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}>
          Add Payment Method
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;