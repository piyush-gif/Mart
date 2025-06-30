import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {CartContext} from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const NavBar = ({toggleSideBar}) => {
  const [showProfile, setShowProfile] = useState(false);
  const {cartCount} = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };
  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  }

  return ( 
    <div className="nav-container">
      <button onClick={toggleSideBar}>MART</button>
      <Link to='/'>Home</Link>
      <div className="nav-objects">
        <Link to='/Cart'>{`Cart:${cartCount}`}</Link>
        <div className='profile-wrapper'>
          <button onClick={toggleProfile}>Profile</button>
          {showProfile && 
           <div className='profile-container'>
            <div className="profile-contents">
              <Link to='/Account'>Your account</Link>
              <Link to='/Orders'>Your orders</Link>
              <Link to='/Settings'>Settings</Link>
              <button onClick={handleLogout} className="logout-btn">Log out</button>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
   );
}
 
export default NavBar;