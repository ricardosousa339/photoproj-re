import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import imageGallery from '../Assets/image-gallery.png';
import imageLogout from '../Assets/logout.png'
import PhotoList from '../Gallery/Gallery';

export const UserCard = ({ user, logout }) => {
  return (
    <div className='card'>
        <img className='card-image' src="https://kfo-sh.de/wp-content/uploads/2020/03/platzhalter_Zeichenfl%C3%A4che-1.png" alt='Foto de perfil'></img>
        <p className='card-text'><span className='card-label'>Usuário: </span><span className='card-value'>{user.username}</span></p>
        <p className='card-text'><span className='card-label'>Email: </span><span className='card-value'>{user.email}</span></p>
        <Link to={`/gallery/${user}`}>
          <button className='button-user-photos'><img src={imageGallery} className='icone-galeria'/><span className='text-button-galeria'>Fotos</span></button>
        </Link>
        <button className='button-user-logout' onClick={logout}><img src={imageLogout} className='icone-logout'/>Logout</button>
    </div>
  );
};
