
const AccountSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { key: 'profile', label: 'My Profile' },
    { key: 'orders', label: 'Order History' },
    { key: 'payment', label: 'Payment Methods' },

  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <ul>
        {navItems.map((item) => (
          <li key={item.key} className="mb-2">
            <button onClick={() => setActiveTab(item.key)} className={`w-full text-left p-2 rounded ${activeTab === item.key ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSidebar;