import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function HomeFurnishingPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch('homeFurnishingFlashcards.json')
      .then((response) => response.json())
      .then((data) => {
        const shuffledFlashcards = shuffleArray(data);
        setFlashcards(shuffledFlashcards);
      })
      .catch((error) => console.error('Error fetching flashcards:', error));
  }, []);

  const revealAnswer = () => {
    setShowAnswer(true);
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const previousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  return (
    <div className="App">
      <h1>Flashcard App</h1>
      <Link to="/">Home</Link>  {}
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
          <button onClick={previousCard}>Previous Flashcard</button>
          <button onClick={nextCard}>Next Flashcard</button>
        </div>
      )}
    </div>
  );
}

export default HomeFurnishingPage;
