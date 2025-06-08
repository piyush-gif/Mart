import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css'
import './styles/homepage.css'
import './styles/navbar.css'
import './styles/sidebar.css'
import './styles/productlist.css'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
