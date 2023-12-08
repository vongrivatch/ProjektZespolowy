import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        alert("Hasło zostało zmienione.");
      }).catch((error) => {
        console.error("Błąd przy zmianie hasła:", error);
      });
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Błąd podczas wylogowywania:', error);
    });
  };

  return (
    <div className="account-details">
      <h1>Szczegóły konta</h1>
      <p>Nazwa użytkownika: {auth.currentUser?.email}</p>
      <p>Data rejestracji: {auth.currentUser?.metadata.creationTime}</p>
      <div>
        <input 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="Nowe hasło" 
        />
        <button onClick={changePassword}>Zmień hasło</button>
      </div>
      <button onClick={handleLogout}>Wyloguj się</button>
      <Link to="/">Powrót do strony głównej</Link>
    </div>
  );
}

export default AccountDetailsPage;
