import "../CSS/Navbar.css";
import { Link } from "react-router-dom";
const Navbar=()=>{
return(<header className="nav-header">
          <div style={{fontWeight:"600"}}>Logo</div>
           <ul>
               
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/">Dashboard</Link></li>
           </ul>
</header>)
}
export default Navbar;