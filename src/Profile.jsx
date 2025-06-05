import {Link} from 'react-router-dom';

const Profile = () => {

  return ( 
    <div className='profile-container'>
      <div className="profile-contents">
        <Link to='#'>Your account</Link>
        <Link to='#'>Your orders</Link>
        <Link to='##'>Settings</Link>
        <Link to='#'>Log out</Link>
      </div>
    </div>
   );
}
 
export default Profile;