import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, updateDoc, getDoc, runTransaction } from 'firebase/firestore';
import './FamilyManagementPage.css';

function FamilyManagementPage() {
  const auth = getAuth();
  const db = getFirestore();
  const [familyId, setFamilyId] = useState('');
  const [inputFamilyId, setInputFamilyId] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      getDoc(userRef).then(docSnap => {
        if (docSnap.exists() && docSnap.data().familyId) {
          setFamilyId(docSnap.data().familyId);
          fetchFamilyDetails(docSnap.data().familyId);
        }
      }).catch(error => {
        console.error("Error fetching user family info: ", error);
      });
    }
  }, [auth.currentUser, db]);

  const fetchFamilyDetails = async (familyId) => {
    const familyRef = doc(db, "Families", familyId);
    const familyDoc = await getDoc(familyRef);
    if (familyDoc.exists()) {
      setIsAdmin(familyDoc.data().admin === auth.currentUser.uid);
      fetchFamilyMembers(familyId, familyDoc.data().admin);
    }
  };

  const fetchFamilyMembers = async (familyId, adminId) => {
    const familyRef = doc(db, "Families", familyId);
    const familyDoc = await getDoc(familyRef);
    if (familyDoc.exists()) {
      const membersIds = familyDoc.data().members;
      const membersDetails = await Promise.all(membersIds.map(id => getDoc(doc(db, "Users", id))));
      const membersEmails = membersDetails.map(docSnap => ({
        id: docSnap.id,
        email: docSnap.data().email,
        isAdmin: docSnap.id === adminId
      }));
      setFamilyMembers(membersEmails);
    }
  };

  const removeMember = async (memberId) => {
    if (window.confirm("Are you sure you want to remove this family member?")) {
      try {
        await runTransaction(db, async (transaction) => {
          const familyRef = doc(db, "Families", familyId);
          const memberRef = doc(db, "Users", memberId);
  
          const familyDoc = await transaction.get(familyRef);
          if (!familyDoc.exists()) {
            throw new Error("Family does not exist!");
          }
  
          const newMembers = familyDoc.data().members.filter(id => id !== memberId);
          transaction.update(familyRef, { members: newMembers });
  
          transaction.update(memberRef, { familyId: "" });
        });
  
        setFamilyMembers(familyMembers.filter(member => member.id !== memberId));
      } catch (error) {
        console.error("Failed to remove family member", error);
        alert("Failed to remove family member");
      }
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
        fetchFamilyDetails(inputFamilyId);
        setError('');
      } else {
        setError("No family found with this ID.");
      }
    } else {
      setError("You are already assigned to a family.");
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
      fetchFamilyDetails(newFamilyId);
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
            {familyMembers.map(member => (
              <div key={member.id} className="member-item">
                <p className="member-email">{member.email}</p>
                {isAdmin && member.id !== auth.currentUser.uid && (
                  <button onClick={() => removeMember(member.id)} className="remove-member-btn">❌</button>
                )}
              </div>
            ))}
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
