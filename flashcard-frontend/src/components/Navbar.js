import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/logo.png" alt="Logo" style={{ width: '150px', height: '100px' }} />
      </Link>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className={`icon ${isOpen ? "icon-close" : "icon-hamburger"}`}></i>
      </div>
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
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
