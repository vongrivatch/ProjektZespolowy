import React from 'react';
import Slider from 'react-slick'; 
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
      <h1>Welcome to PurrfectPlanner</h1>
      <p className="intro-text">
        Discover the power of organized planning with PurrfectPlanner, your go-to solution for managing tasks and schedules effortlessly.
      </p>
      </div>
  );
}

export default HomePage;
