import React, { useState } from 'react';
import AccountSidebar from '../components/account/AccountSidebar';
import UserProfile from '../components/account/UserProfile';
import OrderHistory from '../components/account/OrderHistory';
// Import other components like AddressBook, PaymentMethods etc. as you create them

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'orders':
        return <OrderHistory />;
      // Add cases for 'addresses', 'payment', 'wishlist' etc.
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="w-full md:w-3/4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;