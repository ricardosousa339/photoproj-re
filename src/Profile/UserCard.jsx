import React from 'react';
import './Profile.css';

export const UserCard = ({ user, logout }) => {
  return (
    <div className='card'>
        <img className='card-image' src="https://kfo-sh.de/wp-content/uploads/2020/03/platzhalter_Zeichenfl%C3%A4che-1.png" alt='Foto de perfil'></img>
        <p className='card-text'><span className='card-label'>Usuário: </span><span className='card-value'>{user.username}</span></p>
        <p className='card-text'><span className='card-label'>Email: </span><span className='card-value'>{user.email}</span></p>
        <button onClick={logout}>Logout</button>
    </div>
  );
};
