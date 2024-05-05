import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, updateDoc } from 'firebase/firestore';
import './FamilyManagementPage.css';

function FamilyManagementPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [familyId, setFamilyId] = useState('');
  const [error, setError] = useState('');

  const createFamily = async () => {
    if (!auth.currentUser) return;
    try {
      const newFamilyRef = doc(collection(db, "Families"));
      const newFamilyId = newFamilyRef.id;
  
      await setDoc(newFamilyRef, {
        admin: auth.currentUser.uid,
        members: [auth.currentUser.uid]
      });
  
      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        groupId: newFamilyId
      });
  
      setFamilyId(newFamilyId);
      alert(`This is your FamilyID: ${newFamilyId}, share it with other users to cooperate with your tasks.`);
    } catch (error) {
      console.error("Error creating family: ", error);
      setError(`Failed to create a family. Error: ${error.message}`);
    }
  };

  const joinFamily = () => {
    navigate('/account-details');
  };

  return (
    <div className="family-management">
      <h1>Family Management</h1>
      {familyId ? (
        <p>Your Family ID: {familyId}</p>
      ) : (
        <button onClick={createFamily}>Create a Family</button>
      )}
      <button onClick={joinFamily}>Join a Family</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FamilyManagementPage;
