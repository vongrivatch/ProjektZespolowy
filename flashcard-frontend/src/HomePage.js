import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './HomePage.css';

function HomePage() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="home-page">
      <div className="auth-links">
        {user ? (
          <div className="user-info">
            <span>{user.email}</span>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
      <h1>Welcome to the Flashcard App</h1>
      <Link to="/flashcards">Flashcards</Link>
      <br />
      <Link to="/test">Test</Link>
    </div>
  );
}

export default HomePage;
