import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './services/firebase';
import './AccountDetailsPage.css';

function AccountDetailsPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    } else {
      const getUserGroup = async () => {
        const userRef = doc(db, "Users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().groupId) {
          const groupRef = doc(db, "Groups", userDoc.data().groupId);
          const groupDoc = await getDoc(groupRef);
          if (groupDoc.exists()) {
            setGroupName(groupDoc.data().groupName);
          } else {
            setGroupName("No group assigned");
          }
        }
      };

      getUserGroup();
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

  const joinGroup = async () => {
    if (groupId) {
      const groupRef = doc(db, "Groups", groupId);
      const groupDoc = await getDoc(groupRef);
      if (groupDoc.exists()) {
        const userRef = doc(db, "Users", auth.currentUser.uid);
        await updateDoc(userRef, {
          groupId: groupId
        });
        setGroupName(groupDoc.data().groupName);
        setError('');
      } else {
        setError("No group found with this ID");
      }
    }
  };

  return (
    <div className="account-details">
      <h1>Account Details</h1>
      <p>Username: {auth.currentUser?.email}</p>
      <p>Group Name: {groupName}</p>
      {!groupName && (
        <div>
          <input 
            type="text" 
            value={groupId} 
            onChange={(e) => setGroupId(e.target.value)} 
            placeholder="Enter your FamilyID" 
          />
          <button onClick={joinGroup}>Join Group</button>
          <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
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
    </div>
  );
}

export default AccountDetailsPage;
