import React from 'react';
import Slider from 'react-slick'; 
import { Link } from 'react-router-dom';
import './TestPage.css'; // Zaimportuj nowy plik CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function TestPage() {
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
    <div className="test-page">
      <h1>Test Your Knowledge</h1>
      <Slider {...settings}>
        <div>
          <img src="/banner1.jpg" alt="Infografika 1" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div>
          <Link to="/TestPage.js" >
            <img src="/banner2.jpg" alt="Infografika 2" style={{ width: '100%', height: 'auto' }} />
          </Link>
        </div>
      </Slider>
      <div className="test-links">
        <h2>Choose a Category:</h2>
        <div className="test-buttons">
          <Link to="/animals-test"><button>Animals Test</button></Link>
          <Link to="/food-test"><button>Food Test</button></Link>
          <Link to="/everyday-items-test"><button>Everyday Items Test</button></Link>
          <Link to="/home-furnishings-test"><button>Home Furnishings Test</button></Link>
          <Link to="/ultimate-quiz"><button>Ultimate Quiz</button></Link>
        </div>
        <div>
          <section className='learning-section'>
            <h2>Master Your Learning Step by Step</h2>
            <p>Embark on your learning journey one step at a time. With our diverse flashcard categories, you can focus on specific areas at your own pace. Whether it's language, science, or any other field, our tailored categories cater to your unique learning needs.</p>
            <p>Start with a category that interests you the most. Dive deep into the subject, learn new terms, and reinforce your knowledge. Each category is designed to offer a comprehensive learning experience, ensuring you grasp each concept thoroughly.</p>
            <h2>Ready to Test Your Knowledge?</h2>
            <p>Once you feel confident, challenge yourself with our quizzes! Quizzes are a great way to check your understanding and consolidate what you've learned. They provide instant feedback and help you identify areas where you might need more practice.</p>
            <p>Remember, consistent practice is key to mastery. So, take your time, choose your categories, and when you're ready, put your knowledge to the test!</p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default TestPage;

