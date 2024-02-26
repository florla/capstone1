import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import "../styles/materialize.css";
import "../styles/icons.css";

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

    // Effect to add event listener for clicks outside of the mobile nav
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // JSX for the Navbar component
    return (
        <div>
            <nav className="blue " role="navigation">
                <div className="nav-wrapper container" ref={navRef}>
                    {/* Logo */}
                    <a id="logo-container" href="/" className="brand-logo">lrnr</a>
                    {/* Links for desktop */}
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/account" onClick={handleLinkClick}>Account</Link></li>
                        <li><Link to="/categories" onClick={handleLinkClick}>Quiz Generation</Link></li>
                    </ul>
                    {/* Links for mobile */}
                    <ul id="nav-mobile" className={`sidenav ${isOpen ? "open" : ""}`} style={{ transform: isOpen ? "translateX(0%)" : "translateX(-105%)" }}>
                        <li><Link to="/account" onClick={handleLinkClick}>Account</Link></li>
                        <li><Link to="/categories" onClick={handleLinkClick}>Quiz Generation</Link></li>
                    </ul>
                    {/* Mobile nav trigger */}
                    <a href="#" data-target="nav-mobile" className="sidenav-trigger" onClick={toggleNav}><i className="material-icons">menu</i></a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
