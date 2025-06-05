import { Link } from "react-router-dom";

const SideBar = () => {
  return ( 
    <div className="side-bar">
      <div className="bar-contents">
        <Link to="/level1">level 1 - groceries</Link>
        <Link to="/level2">level 2 - utensils / toys</Link>
        <Link to="/level3">level 3 - luga shop</Link>
        <Link to="/level4">level 4 - electronic</Link>
        <Link to="/level5">level 5 - household</Link>
      </div>
    </div>
   );
}
 export default SideBar;