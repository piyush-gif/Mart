import { useState } from 'react';
import AccountSidebar from '../components/account/AccountSidebar';
import UserProfile from '../components/account/UserProfile';
import OrderHistory from '../components/account/OrderHistory';
import PaymentMethod from '../components/account/PaymentMethod';
import { useTheme } from '../contexts/ThemeContext';


const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { isDark } = useTheme();

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'orders':
        return <OrderHistory />;
      case 'payment':
        return <PaymentMethod />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className={`min-h-screen py-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4">
        <h1 className={`text-2xl font-bold mb-4 ${
          isDark ? 'text-gray-200' : 'text-gray-800'
        }`}>My Account</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="w-full md:w-3/4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;