import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        {/* Formularz */}
        {/* ... */}
      </form>
    </div>
  );
}

export default ContactUs;
