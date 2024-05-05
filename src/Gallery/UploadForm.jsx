import React, { useState } from 'react';
import { API_BASE_URL } from '../Function/apiConfig.js';
import Cookies from 'js-cookie';

const UploadForm  = () => { // Recebe o ID do usuário como prop
  const [selectedFile, setSelectedFile] = useState(null);

  const userId = Cookies.get('id')

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {

    const url = `${API_BASE_URL}api/photo/`;
    const token = Cookies.get('access_token');
    console.log('token do usuário check:'+token)
    console.log('ID do usuário:', Number(userId)); // Mostra o ID do usuário nos logs
    const data = new FormData();
    data.append('imagem', selectedFile);
    data.append('titulo', "Titulo da foto")
    data.append('user', userId);
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
