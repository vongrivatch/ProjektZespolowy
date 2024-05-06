import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, updateDoc, getDoc } from 'firebase/firestore';
import './FamilyManagementPage.css';

function FamilyManagementPage() {
  const auth = getAuth();
  const db = getFirestore();
  const [familyId, setFamilyId] = useState('');
  const [inputFamilyId, setInputFamilyId] = useState('');
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
  }, [auth.currentUser, db]);

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

  const joinFamily = async () => {
    if (inputFamilyId && !familyId) {
        const familyRef = doc(db, "Families", inputFamilyId);
        const familyDoc = await getDoc(familyRef);
        if (familyDoc.exists()) {
            await updateDoc(doc(db, "Users", auth.currentUser.uid), {
                familyId: inputFamilyId
            });

            await updateDoc(familyRef, {
                members: [...familyDoc.data().members, auth.currentUser.uid]
            });

            setFamilyId(inputFamilyId);
            fetchFamilyMembers(inputFamilyId);
            setError('');
        } else {
            setError("No family found with this ID.");
        }
    }
  };

  const createFamily = async () => {
    if (!familyId) {
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
      setFamilyMembers([auth.currentUser.email]);
      setError('');
    } else {
      setError("You are already assigned to a family.");
    }
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
        <>
          <input
            type="text"
            value={inputFamilyId}
            onChange={(e) => setInputFamilyId(e.target.value)}
            placeholder="Enter Family ID"
          />
          <button onClick={joinFamily}>Join Family</button>
          <button onClick={createFamily}>Create a Family</button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FamilyManagementPage;
