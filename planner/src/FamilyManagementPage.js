import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, updateDoc, getDoc } from 'firebase/firestore';
import './FamilyManagementPage.css';

function FamilyManagementPage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [familyId, setFamilyId] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      getDoc(userRef).then(docSnap => {
        if (docSnap.exists() && docSnap.data().familyId) {
          setFamilyId(docSnap.data().familyId);
          fetchFamilyMembers(docSnap.data().familyId);
        }
      }).catch(error => {
        console.error("Error fetching user family info: ", error);
      });
    }
  }, [auth.currentUser]);

  const fetchFamilyMembers = async (familyId) => {
    const familyRef = doc(db, "Families", familyId);
    const familySnap = await getDoc(familyRef);
    if (familySnap.exists()) {
      const membersIds = familySnap.data().members;
      const membersDetails = await Promise.all(membersIds.map(id => getDoc(doc(db, "Users", id))));
      const membersEmails = membersDetails.map(docSnap => docSnap.data().email);
      setFamilyMembers(membersEmails);
    }
  };

  const createFamily = async () => {
    if (!auth.currentUser || familyId) return; // Prevent creating/joining another family if already in one
    try {
      const newFamilyRef = doc(collection(db, "Families"));
      const newFamilyId = newFamilyRef.id;
  
      await setDoc(newFamilyRef, {
        admin: auth.currentUser.uid,
        members: [auth.currentUser.uid]
      });
  
      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        familyId: newFamilyId
      });
  
      setFamilyId(newFamilyId);
      setFamilyMembers([auth.currentUser.email]); // Immediately show current user as a member
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
        <>
          <p>Your Family ID: {familyId}</p>
          <div>
            <h2>Family Members:</h2>
            {familyMembers.map((email, index) => <p key={index}>{email}</p>)}
          </div>
        </>
      ) : (
        <button onClick={createFamily}>Create a Family</button>
      )}
      <button onClick={joinFamily}>Join a Family</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FamilyManagementPage;
