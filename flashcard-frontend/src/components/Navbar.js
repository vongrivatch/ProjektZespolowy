// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Dodaj odpowiedni plik CSS

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                {/* Tutaj umieść logo */}
                <img src="/path-to-logo.jpg" alt="Logo" style={{ width: '150px', height: '100px' }} />
            </Link>
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                {/* Ikona menu hamburger */}
                <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={isOpen ? "nav-links active" : "nav-links"}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/flashcards">Flashcards</Link></li>
                <li><Link to="/test">Test</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;