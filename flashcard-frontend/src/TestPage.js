import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function TestPage() {
  return (
    <div className="test-page">
      <h1>Test Your Knowledge</h1>
      <Link to="/">Home</Link>

      <div className="category-tests">
        <h2>Choose a Category:</h2>
        <Link to="/animals-test"><button>Animals Test</button></Link>
        <Link to="/food-test"><button>Food Test</button></Link>
        <Link to="/everyday-items-test"><button>Everyday Items Test</button></Link>
        <Link to="/home-furnishings-test"><button>Home Furnishings Test</button></Link>
        <Link to="/ultimate-quiz"><button>Ultimate Quiz</button></Link>
      </div>
    </div>
  );
}

export default TestPage;
