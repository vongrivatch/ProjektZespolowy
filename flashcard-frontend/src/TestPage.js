
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function TestPage({ flashcards }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(getRandomIndex(flashcards.length));
  const [showAnswer, setShowAnswer] = useState(false);

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === flashcards[currentCardIndex].answer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const revealAnswer = () => {
    setShowAnswer(true);
  };

  const drawNextCard = () => {
    setUserAnswer('');
    setIsCorrect(null);
    setShowAnswer(false);
    setCurrentCardIndex(getRandomIndex(flashcards.length));
  };

  if (!flashcards || !flashcards.length) {
    return <div>Loading...</div>;
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="test-page">
      <h1>Test Your Knowledge</h1>
      <Link to="/">Home</Link>
      <div className="card">
        <p>Question: {currentCard.question}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your Answer"
        />
        <button onClick={checkAnswer}>Check Answer</button>
        {isCorrect && <p>Correct!</p>}
        {isCorrect === false && <p>Incorrect. Try again.</p>}
        {showAnswer && <p>Answer: {currentCard.answer}</p>}
        <button onClick={revealAnswer}>Reveal Answer</button>
        <button onClick={drawNextCard}>Draw Next Flashcard</button>
      </div>
    </div>
  );
}

export default TestPage;
