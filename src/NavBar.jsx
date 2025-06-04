const NavBar = ({toggleSideBar}) => {

  return ( 
    <div className="nav-container">
      <button onClick={toggleSideBar}>MART</button>
      <div className="nav-objects">
        <input></input>
        <button>cart</button>
        <button>profile</button>
      </div>
    </div>
   );
}
 
export default NavBar;