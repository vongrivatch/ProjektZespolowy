import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './services/firebase';
import './AccountDetailsPage.css';

function AccountDetailsPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [members, setMembers] = useState([]);
  const [inputFamilyId, setInputFamilyId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    } else {
      fetchFamilyDetails();
    }
  }, [auth, navigate, db]);

  const fetchFamilyDetails = async () => {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists() && userDoc.data().familyId) {
      const familyRef = doc(db, "Families", userDoc.data().familyId);
      const familyDoc = await getDoc(familyRef);
      if (familyDoc.exists()) {
        setFamilyName(familyDoc.data().name);
        setFamilyId(familyDoc.id);
        fetchFamilyMembers(familyDoc.id);
      } else {
        setFamilyName("No family assigned");
      }
    }
  };

  const fetchFamilyMembers = async (familyId) => {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("familyId", "==", familyId));
    const querySnapshot = await getDocs(q);
    const membersData = querySnapshot.docs.map(doc => doc.data().email);
    setMembers(membersData);
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

  const joinFamily = async () => {
    if (inputFamilyId && !familyId) {
      const familyRef = doc(db, "Families", inputFamilyId);
      const familyDoc = await getDoc(familyRef);
      if (familyDoc.exists()) {
        await updateDoc(doc(db, "Users", auth.currentUser.uid), {
          familyId: inputFamilyId
        });
        setFamilyId(inputFamilyId);
        setFamilyName(familyDoc.data().name);
        fetchFamilyMembers(inputFamilyId);
        setError('');
      } else {
        setError("No family found with this ID.");
      }
    } else {
      setError("You are already assigned to a family.");
    }
  };

  return (
    <div className="account-details">
      <h1>Account Details</h1>
      <p>Username: {auth.currentUser?.email}</p>
      {familyId ? (
        <p>Your Family ID: {familyId}</p>
      ) : (
        <div>
          <input 
            type="text" 
            value={inputFamilyId} 
            onChange={(e) => setInputFamilyId(e.target.value)} 
            placeholder="Enter Family ID" 
          />
          <button onClick={joinFamily}>Join Family</button>
        </div>
      )}
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
