import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function FlashcardsPage() {
  return (
    <div className="App">
      <h1>Flashcard App</h1>
      <Link to="/">Home</Link>

      <div className="category-buttons">
        <Link to="/animals"><button>Animals</button></Link>
        <Link to="/food"><button>Food</button></Link>
        <Link to="/everyday-items"><button>Everyday Items</button></Link>
        <Link to="/home-furnishings"><button>Home Furnishings</button></Link>
      </div>
    </div>
  );
}

export default FlashcardsPage;
