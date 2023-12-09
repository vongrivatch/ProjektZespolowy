import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        {/* Logo powinno być bardziej kolorowe i przyciągające uwagę */}
        <img src="/logo.jpg" alt="Logo" style={{ width: '150px', height: '100px' }} />
      </Link>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {/* Ikona menu hamburger może być bardziej stylizowana */}
        <i className={`icon ${isOpen ? "icon-close" : "icon-hamburger"}`}></i>
      </div>
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        {/* Linki powinny mieć większą czcionkę i więcej miejsca dla lepszej czytelności */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flashcards">Flashcards</Link></li>
        <li><Link to="/test">Test</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        {user ? (
          <li className="user-info">
            <Link to="/account-details" className="user-name">{user.email}</Link>
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
