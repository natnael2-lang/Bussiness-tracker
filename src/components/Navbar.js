import "../CSS/Navbar.css";
import { Link } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import { BussinessContext } from "./BussinessContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {setMenuSlide}=useContext(BussinessContext)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    useEffect(()=>{
   
     setMenuSlide(isOpen)
    },[isOpen])

    return (
        <header className="nav-header">
            <div className={`hamburger-div ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle navigation">
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
            </div>
            <div style={{ fontWeight: "600" }}>Logo</div>
            <ul className="nav-links" >
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/">Dashboard</Link></li>
            </ul>
        </header>
    );
};

export default Navbar;