import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AccountDetailsPage.css'; // Dodaj odpowiedni plik CSS

function AccountDetailsPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const changePassword = () => {
    if (auth.currentUser) {
      updatePassword(auth.currentUser, newPassword).then(() => {
        alert("Password has been changed.");
      }).catch((error) => {
        console.error("Error changing password:", error);
      });
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <div className="account-details">
      <h1>Account Details</h1>
      <p>Username: {auth.currentUser?.email}</p>
      <p>Registration Date: {auth.currentUser?.metadata.creationTime}</p>
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
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default AccountDetailsPage;
