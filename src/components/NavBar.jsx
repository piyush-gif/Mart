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
      <div className="nav-objects">
        <input/>
        <button>cart</button>
        <div className='profile-wrapper'>
          <button onClick={toggleProfile}>profile</button>
          {showProfile && 
           <div className='profile-container'>
            <div className="profile-contents">
              <Link to='#'>Your account</Link>
              <Link to='#'>Your orders</Link>
              <Link to='##'>Settings</Link>
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