
import { useTheme } from '../../contexts/ThemeContext';

const AccountSidebar = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();
  
  const navItems = [
    { key: 'profile', label: 'My Profile' },
    { key: 'orders', label: 'Order History' },
    { key: 'payment', label: 'Payment Methods' },
  ];

  return (
    <div className={`p-4 rounded-lg ${
      isDark ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <ul>
        {navItems.map((item) => (
          <li key={item.key} className="mb-2">
            <button 
              onClick={() => setActiveTab(item.key)} 
              className={`w-full text-left p-2 rounded transition-colors ${
                activeTab === item.key 
                  ? 'bg-black text-white' 
                  : isDark 
                    ? 'hover:bg-gray-800 text-gray-200' 
                    : 'hover:bg-gray-200 text-gray-800'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSidebar;