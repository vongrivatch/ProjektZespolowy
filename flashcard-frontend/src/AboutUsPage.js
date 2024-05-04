import React from 'react';
import Slider from 'react-slick'; 
import './AboutUsPage.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function AboutUsPage() {
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
    <div className="about-us">
      <h1>About Us</h1>
      <Slider {...settings}>
        <div>
          <img src="/slider_1.jpg" alt="Infografika 1" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div>
          <img src="/slider_2.jpg" alt="Infografika 2" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div>
          <img src="/slider_3.jpg" alt="Infografika 3" style={{ width: '100%', height: 'auto' }} />
        </div>
      </Slider>
      <div className="about-us-text">
      <h2>Why Us?</h2>
      <p>Welcome to <strong>PurrfectPlanner</strong>, your ultimate online platform for planning and sharing tasks with your family. At <strong>PurrfectPlanner</strong>, we focus on simplicity, collaboration, and efficiency, helping families manage their daily duties with ease. Our goal is to facilitate time and task management in a way that strengthens family bonds and allows every family member to actively participate in home life. Join us and discover how easy it can be to plan and share tasks, creating a harmonious home full of cooperation and support.</p>
      <h3>Why PurrfectPlanner?</h3>
      <p><strong>PurrfectPlanner</strong> is designed with your family's needs in mind. We understand the challenges of managing a busy household and coordinating everyone's schedules. That's why we've created a solution that is not only <strong>user-friendly</strong> but also <strong>versatile</strong> and <strong>inclusive</strong>.</p>

      <h3>Our Approach</h3>
      <p>We believe in making task management as intuitive and straightforward as possible. Our platform uses cutting-edge technology to ensure that you can share responsibilities and update each other in real-time. Family members of all ages can easily access their tasks, contributing to a well-organized home.</p>

      <h3>Features That Make Managing Tasks Exciting</h3>
      <ul>
        <li><strong>Shared Task Lists:</strong> Create and manage tasks collectively. Everyone can add, complete, and review tasks, ensuring nothing is overlooked.</li>
        <li><strong>Customizable Alerts:</strong> Set reminders for individual tasks or events, so every family member stays informed and prepared.</li>
        <li><strong>Family Calendar:</strong> View all family events and tasks in one place. Plan ahead with a calendar designed to support the whole family's schedule.</li>
        <li><strong>Real-Time Notifications:</strong> Get instant updates when tasks are added or completed, and when changes are made to the schedule.</li>
      </ul>

      <h3>Join Us Today!</h3>
      <p>Start organizing your family life with <strong>PurrfectPlanner</strong> and experience the peace of mind that comes with a well-coordinated home. Whether you're trying to manage daily chores or planning for special events, <strong>PurrfectPlanner</strong> is here to help you every step of the way. Sign up today and transform the way your family collaborates!</p>
    </div>
    </div>
  );
}

export default AboutUsPage;
