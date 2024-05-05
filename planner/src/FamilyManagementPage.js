import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import './FamilyManagementPage.css';

function FamilyManagementPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [error, setError] = useState('');
  const [familyId, setFamilyId] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const createFamily = async () => {
    if (!auth.currentUser) {
      setError('You must be logged in to create a family.');
      return;
    }

    try {
      const newFamilyId = doc(db, "Families").id;

      await setDoc(doc(db, "Families", newFamilyId), {
        name: "New Family",
        admin: auth.currentUser.uid,
        members: [auth.currentUser.uid]
      });

      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        groupId: newFamilyId
      });

      setFamilyId(newFamilyId);
      setError('');
      alert("This is your FamilyID: " + newFamilyId + ", share it with other users to cooperate with your tasks.");
    } catch (error) {
      console.error("Error creating family: ", error);
      setError("Failed to create a family. Please try again.");
    }
  };

  const joinFamily = () => {
    navigate('/account-details');
  };

  return (
    <div className="family-management">
      <h1>Family Management</h1>
      {familyId ? (
        <p>Your FamilyID: {familyId} <button onClick={() => navigator.clipboard.writeText(familyId)}>Copy</button></p>
      ) : (
        <>
          <button onClick={createFamily}>Create a Family</button>
          <button onClick={joinFamily}>Join a Family</button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FamilyManagementPage;
