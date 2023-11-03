
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from './firebase';

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth(app);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
