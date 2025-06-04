import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './homepage.css'
import App from './App.jsx'
import NavBar from './NavBar.jsx'
import HomePage from './HomePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar/>
    <HomePage/>
    <App />
  </StrictMode>,
)
