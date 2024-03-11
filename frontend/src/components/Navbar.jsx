import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import "../styles/materialize.css";
import "../styles/icons.css";
import wavelogo from '../assets/wave-wealthlogo.png'; 

// Define Navbar component
const Navbar = () => {
    // State to manage whether the mobile nav is open or closed
    const [isOpen, setIsOpen] = useState(false);
    // Reference to the nav element
    const navRef = useRef(null);

    // Function to toggle the mobile nav
    const toggleNav = () => setIsOpen(!isOpen);
    // Function to handle link clicks in mobile nav
    const handleLinkClick = () => setIsOpen(false);

    // Function to handle clicks outside of the mobile nav
    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    const accountClick = () => {
        setIsOpen(false);
        if(!localStorage.getItem('userToken')){ 
            window.location.href = '/login';
        }}   

    // Effect to add event listener for clicks outside of the mobile nav
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // JSX for the Navbar component
    return (
        <div id = "navBar">
            <nav className="gradient-nav-foot" role="navigation">
                <div className="nav-wrapper container" ref={navRef}>
                    {/* Logo */}
                    <a id="logo-container" href="/" className="brand-logo">
                        <img src={wavelogo} alt="Wealthwave Logo" className="responsive-img" />
                    WEALTHWAVE 
                    </a>
                    {/* Links for desktop */}
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/budget" onClick={handleLinkClick}>Budget</Link></li>
                        <li><Link to="/financialarticles" onClick={handleLinkClick}>Articles</Link></li>
                        <li><Link to="/chatbot" onClick={handleLinkClick}>Chatbot</Link></li>
                        <li><Link to="/account" onClick={accountClick}>Account</Link></li>
                    </ul>

                    {/* Links for mobile */}
                    <ul id="nav-mobile" className={`sidenav ${isOpen ? "open" : ""}`} style={{ transform: isOpen ? "translateX(0%)" : "translateX(-105%)" }}>
                        <li><Link to="/budget" onClick={handleLinkClick}>Budget</Link></li>
                        <li><Link to="/financialarticles" onClick={handleLinkClick}>Articles</Link></li>
                        <li><Link to="/chatbot" onClick={handleLinkClick}>Chatbot</Link></li>
                        <li><Link to="/account" onClick={accountClick}>Account</Link></li>
                    </ul>

                    {/* Mobile nav trigger */}
                    <a href="#" data-target="nav-mobile" className="sidenav-trigger" onClick={toggleNav}><i className="material-icons">menu</i></a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
