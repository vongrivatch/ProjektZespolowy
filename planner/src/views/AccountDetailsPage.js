import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import './AccountDetailsPage.css';

function AccountDetailsPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    } else {
      fetchFamilyDetails();
    }
  }, [auth, navigate]);

  const fetchFamilyDetails = async () => {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists() && userDoc.data().familyId) {
      setFamilyId(userDoc.data().familyId);
    }
  };

  const changePassword = async () => {
    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        alert("Password has been changed.");
      } catch (error) {
        console.error("Error changing password:", error);
        setError("Failed to change password. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="account-details">
      <h1>Account Details</h1>
      <p>Username: {auth.currentUser?.email}</p>
      {familyId && <p>Your Family ID: {familyId}</p>}
      <div>
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="New Password" 
        />
        <button onClick={changePassword}>Change Password</button>
      </div>
      <button onClick={handleLogout}>Log Out</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AccountDetailsPage;
