import React from 'react';
import { Link } from 'react-router-dom';
import './TestPage.css'; // Zaimportuj nowy plik CSS

function TestPage() {
  return (
    <div className="test-page">
      <h1>Test Your Knowledge</h1>
      <div className="test-links">
        <h2>Choose a Category:</h2>
        <div className="test-buttons">
          <Link to="/animals-test"><button>Animals Test</button></Link>
          <Link to="/food-test"><button>Food Test</button></Link>
          <Link to="/everyday-items-test"><button>Everyday Items Test</button></Link>
          <Link to="/home-furnishings-test"><button>Home Furnishings Test</button></Link>
          <Link to="/ultimate-quiz"><button>Ultimate Quiz</button></Link>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
