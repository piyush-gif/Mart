import {useState} from 'react';
import Profile from './Profile';

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
          {showProfile && <Profile/>}
        </div>
      </div>
    </div>
   );
}
 
export default NavBar;