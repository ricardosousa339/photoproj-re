import React, { useState } from 'react';
import uploadImage from '../Function/uploadImage.jsx';
import { API_BASE_URL } from '../Function/apiConfig.js';
import Cookies from 'js-cookie';

const UploadForm  = (user) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {

    const url = API_BASE_URL+'/api/photo/'; // Substitua isso pela URL correta
    const token = Cookies.get('access_token'); // Substitua isso pelo token real do usuário
    console.log('token do usuário check:'+token)
    const id = Cookies.get('id');
    const email = Cookies.get('email')
    const sessionid = Request.session_key;
    console.log(user.email)
    const data = new FormData();
    data.append('imagem', selectedFile); // Substitua isso pela imagem real
    data.append('titulo', "Titulo da foto")
    data.append('user',id);
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
