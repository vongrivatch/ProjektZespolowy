import React from 'react';
import Slider from 'react-slick'; // Import Slider z react-slick
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  // Ustawienia dla Slidera
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-page">
      <Slider {...settings}>
        <div>
          <img src="/slider_home_1.jpg" alt="First Slide" />
        </div>
        <div>
          <img src="/slider_home_2.jpg" alt="Second Slide" />
        </div>
      </Slider>
      <h1>Welcome to the Flashcard App</h1>
      <p className="intro-text">
        Explore and enhance your English language skills with our interactive flashcards.
      </p>
      <div className="action-buttons">
        <Link to="/flashcards" className="btn primary-btn">Start Learning</Link>
        <Link to="/about-us" className="btn secondary-btn">Learn More</Link>

  <section className="content-section">
      <h2>App Features</h2>
      <p><strong>Customizable Flashcard Sets:</strong> Create and manage your own sets of vocabulary words.</p>
      <p><strong>Varied Learning Modes:</strong> Learn through games, quizzes, and testing.</p>
      <p><strong>Track Your Progress:</strong> Keep track of your learning journey and stay motivated.</p>
  </section>

  <section className="content-section">
      <h2>Start Your English Learning Journey Today!</h2>
      <p>Join thousands of users and begin building your English vocabulary efficiently. Register now and discover the easy path to learning English words!</p>
  </section>

      </div>
    </div>
  );
}

export default HomePage;
