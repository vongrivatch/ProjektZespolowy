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
        <p>Welcome to <strong>FlashLearn</strong>, your ultimate online platform for learning Polish vocabulary through engaging and interactive flashcards. At <strong>FlashLearn</strong>, we are dedicated to making language learning accessible, fun, and effective for young learners aged 15-20. Our mission is to bridge language barriers and open up a world of opportunities for you.</p>

        <h3>Why FlashLearn?</h3>
        <p><strong>FlashLearn</strong> is designed with your learning needs in mind. We understand the challenges of learning a new language, especially for young individuals who are constantly juggling between studies and personal commitments. That's why we've created a solution that is not only <strong>efficient</strong> but also <strong>flexible</strong> and <strong>engaging</strong>.</p>

        <h3>Our Approach</h3>
        <p>Our learning methodology is based on proven techniques that enhance memory retention and make learning a new language a breeze. The <strong>spaced repetition</strong> system ensures that you review words at optimal intervals, solidifying your understanding and recall. The interactive flashcards are designed to keep you engaged and motivated throughout your learning journey.</p>

        <h3>Features That Make Learning Exciting</h3>
        <ul>
          <li><strong>Interactive Flashcards:</strong> Learn Polish vocabulary with visually appealing and interactive flashcards that make memorization easy and fun.</li>
          <li><strong>Customizable Learning Experience:</strong> Tailor your learning path according to your level and pace. Choose the topics that interest you the most.</li>
          <li><strong>Progress Tracking:</strong> Keep track of your learning journey with our progress tracker and stay motivated by witnessing your growth.</li>
          <li><strong>Community Support:</strong> Join our community of learners, share your experiences, and get support from peers and language experts.</li>
        </ul>

        <h3>Join Us Today!</h3>
        <p>Embark on your language learning journey with <strong>FlashLearn</strong> and unlock the door to a new culture and opportunities. Whether you are a beginner or looking to advance your Polish vocabulary, <strong>FlashLearn</strong> is here to guide you every step of the way. Sign up today and discover the joy of learning Polish with ease and fun!</p>
      </div>
    </div>
  );
}

export default AboutUsPage;
