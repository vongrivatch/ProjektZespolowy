import React from 'react';
import { Link } from 'react-router-dom';
import './FlashcardsPage.css';

function FlashcardsPage() {
  return (
    <div className="App">
      <h1>Flashcard App</h1>

      <div className="category-buttons">
        <Link to="/animals"><button>Animals</button></Link>
        <Link to="/food"><button>Food</button></Link>
        <Link to="/everyday-items"><button>Everyday Items</button></Link>
        <Link to="/home-furnishings"><button>Home Furnishings</button></Link>
      </div>

      {/* Tutaj możesz dodać logikę do wyświetlania i obsługi flashcards, jeśli jest to potrzebne */}
      {/* Przyciski do przewijania kart powinny znaleźć się tutaj */}
    </div>
  );
}

export default FlashcardsPage;
