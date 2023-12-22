import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../Function/apiConfig';
import {getAccessToken } from '../Function/auth';
import Cookies from 'js-cookie';
import UploadForm from './UploadForm';
import { useLocation } from "react-router-dom";


const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const id = Cookies.get('id');
  const { state } = useLocation();

  useEffect(() => {
    fetch(`${API_BASE_URL}`+'/api/photo/user_photos/'+`${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
     
      <UploadForm user = {useLocation.user}/>
    </div>
  );
}

export default Gallery;
