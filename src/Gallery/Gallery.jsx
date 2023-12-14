import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../apiConfig';
import {getAccessToken } from '../auth';
import Cookies from 'js-cookie';

const PhotoList = (user) => {
  const [photos, setPhotos] = useState([]);
  const id = Cookies.get('id');

  useEffect(() => {
    fetch(`${API_BASE_URL}`+'/api/photos/user_photos/'+`${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // inclua aqui seu token de autenticação
        'Authorization': `Token ${getAccessToken()}`,
      },
    })
    .then(response => response.json())
    .then(data => setPhotos(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id}>
          <h2>{photo.titulo}</h2>
          <img src={photo.imagem} alt={photo.titulo} />
        </div>
      ))}
    </div>
  );
}

export default PhotoList;
