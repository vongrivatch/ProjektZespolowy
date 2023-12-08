import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import animalsFlashcards from './animalFlashcards.json';
import foodFlashcards from './foodFlashcards.json';
import everydayItemsFlashcards from './everydayItemFlashcards.json';
import homeFurnishingsFlashcards from './homeFurnishingFlashcards.json';

function UltimateQuiz() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const selectedFlashcards = [...animalsFlashcards.slice(0, 5), ...foodFlashcards.slice(0, 5), ...everydayItemsFlashcards.slice(0, 5), ...homeFurnishingsFlashcards.slice(0, 5)];
    
    const shuffledFlashcards = shuffleArray(selectedFlashcards);

    setFlashcards(shuffledFlashcards);
  }, []);

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
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="ultimate-quiz">
      <h1>Ultimate Quiz</h1>
      <Link to="/">Home</Link>
      {flashcards.length > 0 && (
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
      )}
    </div>
  );
}

export default UltimateQuiz;
