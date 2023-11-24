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
        {user ? (
          // Jeśli użytkownik jest zalogowany, wyświetl jego email jako link
          <li>
            <Link to="/account-details">{user.email}</Link> {/* Link do szczegółów konta */}
          </li>
        ) : (
          // Jeśli nie jest zalogowany, wyświetl opcje logowania/rejestracji
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
