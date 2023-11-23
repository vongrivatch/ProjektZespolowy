import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar'; // Zaimportuj Navbar
import Footer from './components/Footer'; // Zaimportuj Footer
import HomePage from './HomePage';
import FlashcardsPage from './FlashcardsPage';
import TestPage from './TestPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import AboutUsPage from './AboutUsPage';
import ContactUsPage from './ContactUsPage'; // Importuj nową stronę ContactUsPage
import flashcardsData from './flashcardsData';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Umieść Navbar na górze */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/test" element={<TestPage flashcards={flashcardsData} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} /> {/* Dodaj ścieżkę do ContactUsPage */}
        </Routes>
        <Footer /> {/* Umieść Footer na dole */}
      </div>
    </Router>
  );
}

export default App;
