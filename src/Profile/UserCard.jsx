import React from 'react';
import './Profile.css';
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export const UserCard = ({ user, logout }) => {

  const navigate = useNavigate();

  return (
    <div className='card'>
      <img className='card-image' src="https://kfo-sh.de/wp-content/uploads/2020/03/platzhalter_Zeichenfl%C3%A4che-1.png" alt='Foto de perfil'></img>
   <div className='textos'>
      <p className='card-text'><span className='card-label'>Usuário: </span><span className='card-value'>{user.username}</span></p>
     
      <p className='card-text'><span className='card-label'>Email: </span><span className='card-value'>{user.email}</span></p>
   </div>
   

      <div className='botoes'>
        <button className='  button-user-photos botao' onClick={() => navigate('/gallery', { state: { user: user } })}>
        <i className="bi bi-image"></i>  Galeria</button>
        <button className='button-user-logout botao' onClick={logout}>
        <i className="bi bi-box-arrow-right"></i>Logout</button>
      </div>
    </div>
  );
};
