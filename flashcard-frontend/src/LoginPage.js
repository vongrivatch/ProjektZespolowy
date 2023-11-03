import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Login or password is not correct. Try again');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
