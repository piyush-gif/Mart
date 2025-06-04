import NavBar from './navBar.jsx'
import HomePage from './HomePage.jsx'
import './App.css'
import { useState } from 'react'
import SideBar from './SideBar.jsx';

function App() {
  const [showSideBar, setShowSideBar] = useState(false);


  const toggleSideBar = () => {
    setShowSideBar(prev => !prev);
  };


  return (
    <>
      <NavBar toggleSideBar={toggleSideBar}/>
      {showSideBar && <SideBar/>}
      <HomePage/>
    </>
  )
}

export default App
