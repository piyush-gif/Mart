import { useState } from 'react'
import { Route,Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import SideBar from './components/SideBar.jsx';
import Level1 from './pages/Level1.jsx'
import Level2 from './pages/Level2.jsx'
import Level3 from './pages/Level3.jsx'
import Level4 from './pages/Level4.jsx'
import Level5 from './pages/Level5.jsx'
import Admin from './admin/Admin.jsx'
import Settings from './pages/Settings.jsx';
import AccountPage from './pages/AccountPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import Cart from './pages/Cart.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CreateAccountPage from './pages/CreateAccount.jsx';

function App() {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(prev => !prev);
  };
  const closeSideBar = () => setShowSideBar(false);
  
  return (
    <ThemeProvider>
      <CartProvider>
        <NavBar toggleSideBar={toggleSideBar} />
        <SideBar isOpen={showSideBar} onClose={closeSideBar} />
      
        <Routes>
          <Route path="/" element ={<HomePage/>} />
          <Route path="/level1" element ={<Level1/>}/>
          <Route path="/level2" element ={<Level2/>}/>
          <Route path="/level3" element ={<Level3/>}/>
          <Route path="/level4" element ={<Level4/>}/>
          <Route path="/level5" element ={<Level5/>}/>
          <Route path="/Settings" element={<Settings/>}/>
          <Route path="/Account" element={<AccountPage/>}/>
          <Route path="/Orders" element={<OrdersPage/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/create-account" element={<CreateAccountPage/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
