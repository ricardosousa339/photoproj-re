import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../Function/apiConfig';
import { getAccessToken } from '../Function/auth';
import UploadForm from './UploadForm';
import axios from 'axios';
import './Gallery.css';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [temFotoNova, setTemFotoNova] = useState(false);

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

    }
    catch (error) {
      console.error(error, "://///////");
    }

  }

  useEffect(() => {
    fetchPhotos();
    setTemFotoNova(false)
  }, [temFotoNova]);


  return (
    <div className='pagina'>
      <div className='photo-grid'>
        {photos.map((photo, index) => (
          <div key={index} className='photo-item' >
            <div className='imagem' src={photo.imagem}>

              <img className='miniatura' src={photo.imagem} alt={photo.titulo} />
            </div>
            <div className='containerBotaoDeletar'>
              <button className='botao button-deletar'><FontAwesomeIcon icon={faTrash} /></button>
            </div>

          </div>
        ))}
      </div>
      <UploadForm temFotoNova={temFotoNova} setTemFotoNova={setTemFotoNova}/>
    </div>
  );

}

export default Gallery;
