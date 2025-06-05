import {useState} from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({toggleSideBar}) => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  }
  return ( 
    <div className="nav-container">
      <button onClick={toggleSideBar}>MART</button>
      <Link to='/'>Home</Link>
      <div className="nav-objects">
        <input/>
        <Link to='/Cart'>Cart</Link>
        <div className='profile-wrapper'>
          <button onClick={toggleProfile}>profile</button>
          {showProfile && 
           <div className='profile-container'>
            <div className="profile-contents">
              <Link to='/Account'>Your account</Link>
              <Link to='/Orders'>Your orders</Link>
              <Link to='/Settings'>Settings</Link>
              <Link to='#'>Log out</Link>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
   );
}
 
export default NavBar;