import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './HomePage';
import FlashcardsPage from './FlashcardsPage';
import TestPage from './TestPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import AboutUsPage from './AboutUsPage';
import ContactUsPage from './ContactUsPage';
import AnimalsPage from './animalPage';
import FoodPage from './foodPage';
import EverydayItemsPage from './everydayItemPage';
import HomeFurnishingsPage from './homeFurnishingPage';
import UltimateQuiz from './ultimateQuiz';
import AnimalsTestPage from './animalTestPage';
import FoodTestPage from './foodTestPage';
import EverydayItemsTestPage from './everydayItemTestPage';
import HomeFurnishingsTestPage from './homeFurnishingTestPage';
import AccountDetailsPage from './accountDetailsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/everyday-items" element={<EverydayItemsPage />} />
          <Route path="/home-furnishings" element={<HomeFurnishingsPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/animals-test" element={<AnimalsTestPage />} />
          <Route path="/food-test" element={<FoodTestPage />} />
          <Route path="/everyday-items-test" element={<EverydayItemsTestPage />} />
          <Route path="/home-furnishings-test" element={<HomeFurnishingsTestPage />} />
          <Route path="/ultimate-quiz" element={<UltimateQuiz />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/account-details" element={<AccountDetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
