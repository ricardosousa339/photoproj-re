import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../Function/apiConfig';
import { getAccessToken } from '../Function/auth';
import UploadForm from './UploadForm';
import axios from 'axios';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  const access_token = getAccessToken();


  if (!access_token) {
    // Redirecionar para a página de login se o token de acesso não estiver definido
    window.location.href = 'login';
  }

  //axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
  const fetchPhotos = async (accessToken = access_token) => {

    try {
      const response = await axios.get(`${API_BASE_URL}api/photo/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPhotos(response.data)
      console.log(response.data, "Responseeee-----------")
    }
    catch(error){
      console.error(error, "://///////");
  }
    
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  /*
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/photo/user_photos/`,{
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });


        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPhotos();
  }, []);
*/
  return (
    <div>
      {photos.map(photo => (
        <div key={photo.id}>
          <img src={photo.imagem} alt={photo.titulo} />
        </div>
      ))}
      <UploadForm />
    </div>
  );
}

export default Gallery;
