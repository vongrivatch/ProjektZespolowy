import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/flashcards') // Replace with the correct URL of your Node.js server
      .then((response) => response.json())
      .then((data) => setFlashcards(data))
      .catch((error) => console.error('Error fetching flashcards:', error));
  }, []);

  const revealAnswer = () => {
    setShowAnswer(true);
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false);
  };

  return (
    <div className="App">
      <h1>Flashcard App</h1>
      {flashcards.length > 0 && (
        <div className="flashcard">
          <p className="question">
            <strong>Question:</strong> {flashcards[currentCardIndex].question}
          </p>
          {showAnswer && (
            <p className="answer">
              <strong>Answer:</strong> {flashcards[currentCardIndex].answer}
            </p>
          )}
          <button onClick={revealAnswer}>Reveal Answer</button>
          <button onClick={nextCard}>Next Flashcard</button>
        </div>
      )}
    </div>
  );
}

export default App;
