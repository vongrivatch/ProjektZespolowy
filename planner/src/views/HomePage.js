import React from 'react';
import Slider from 'react-slick'; 
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
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
      <h1>Welcome to Perfect Planner</h1>
      <p className="intro-text">
        Discover the power of organized planning with Perfect Planner, your go-to solution for managing tasks and schedules effortlessly.
      </p>

      <section className="content-section">
        <h2>App Features</h2>
        <p><strong>Comprehensive Task Management:</strong> Create, edit, and manage tasks with ease. Set deadlines, priorities, and reminders.</p>
        <p><strong>Interactive Calendar:</strong> View your tasks in a daily, weekly, or monthly format. Sync with external calendars for holistic schedule management.</p>
        <p><strong>Collaborative Tools:</strong> Share your tasks and calendars with others, making it perfect for team projects or family planning.</p>
      </section>

      <section className="content-section">
        <h2>Start Your Organized Life Today!</h2>
        <p>Join thousands of users who are optimizing their daily routines. Register now and take the first step towards a more organized and productive life with Perfect Planner!</p>
      </section>
    </div>
  );
}

export default HomePage;
