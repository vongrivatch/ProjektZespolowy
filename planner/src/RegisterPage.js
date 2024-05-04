import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import app from './services/firebase';


function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [familyCode, setFamilyCode] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      await setDoc(doc(db, "Users", userId), {
        email: email,
        name: "",  
        groupId: familyCode || ""
      });

      if (familyCode) {
        const groupRef = doc(db, "Groups", familyCode);
        await updateDoc(groupRef, {
          members: arrayUnion(userId)
        });
      }

      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email address already used. Forgot password?');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && (
        <p style={{ color: 'red' }}>
          {error} {error === 'Email address already used. Forgot password?' && <Link to="/forgot-password">Click here</Link>}
        </p>
      )}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password (6 characters minimum):</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div>
          <label htmlFor="family-code">Family Code (optional):</label>
          <input
            id="family-code"
            type="text"
            value={familyCode}
            onChange={(e) => setFamilyCode(e.target.value)}
            placeholder="Enter family code if you have one"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
