import React from 'react';
import './AboutUsPage.css'; // Zaimportuj plik CSS

function AboutUsPage() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        {/* Wstaw tutaj 3000 znaków tekstu lorem ipsum */}
      </p>
      <div className="about-us-images">
        <img src="/path-to-image.jpg" alt="Opis obrazu" />
        {/* Dodaj więcej obrazów jeśli potrzebujesz */}
      </div>
    </div>
  );
}

export default AboutUsPage;
