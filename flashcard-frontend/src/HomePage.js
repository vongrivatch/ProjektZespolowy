// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Flashcard App</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/flashcards">Flashcards</Link>
      <br />
      <Link to="/test">Test</Link>
    </div>
  );
}

export default HomePage;
