import { useState } from 'react'
import { Route,Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import SideBar from './components/SideBar.jsx';
import Groceries from './pages/Groceries.jsx';

function App() {
  const [showSideBar, setShowSideBar] = useState(false);
  const toggleSideBar = () => {
    setShowSideBar(prev => !prev);
  };
  return (
    <>
      <NavBar toggleSideBar={toggleSideBar} />
      {showSideBar && <SideBar/>}

      <Routes>
        <Route path="/" element ={<HomePage/>} />
        <Route path="/level1" element ={<Groceries/>} />
      </Routes>
    </>
  )
}

export default App
