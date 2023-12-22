import React from 'react';
import './Profile.css';
import imageGallery from '../Assets/image-gallery.png';
import imageLogout from '../Assets/logout.png'
import PhotoList from '../Gallery/Gallery';
import { useNavigate } from "react-router-dom";

export const UserCard = ({ user, logout }) => {

  const navigate = useNavigate();

  return (
    <div className='card'>
        <img className='card-image' src="https://kfo-sh.de/wp-content/uploads/2020/03/platzhalter_Zeichenfl%C3%A4che-1.png" alt='Foto de perfil'></img>
        <p className='card-text'><span className='card-label'>Usuário: </span><span className='card-value'>{user.username}</span></p>
        <p className='card-text'><span className='card-label'>Email: </span><span className='card-value'>{user.email}</span></p>
    
        <button className='button-user-photos' onClick={() => navigate('/gallery', {state:{user:user}})}>Galeria</button>
        <button className='button-user-logout' onClick={logout}><img src={imageLogout} className='icone-logout'/>Logout</button>
    </div>
  );
};
