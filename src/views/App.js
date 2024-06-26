import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AboutUsPage from './AboutUsPage';
import ContactUsPage from './ContactUsPage';
import AccountDetailsPage from './AccountDetailsPage';
import FamilyManagementPage from './FamilyManagementPage'
import CalendarPage from './CalendarPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/account-details" element={<AccountDetailsPage />} />
          <Route path="/family-management" element={<FamilyManagementPage />} />
          <Route path="/account-details" element={<AccountDetailsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
