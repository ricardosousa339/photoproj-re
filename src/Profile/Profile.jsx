import React, { useState, useEffect } from 'react';
import { UserCard } from './UserCard';
import { getAccessToken, refreshAccessToken, logout } from '../auth';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';
import Cookies from 'js-cookie';

export const ProfilePage = () => {
  const access_token = getAccessToken();
  const id = Cookies.get('id');

  if (!access_token) {
    // Redirecionar para a página de login se o token de acesso não estiver definido
    window.location.href = '/login';
  }

  // Obter informações do usuário usando o token de acesso
  const [user, setUser] = useState({});
  const getUserInfo = async (accessToken = access_token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
      if(error.response.data && error.response.data.code == 'token_not_valid'){
        const new_access_token = await refreshAccessToken();
        getUserInfo(new_access_token);
      }
    }
  };


  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <UserCard user={user} logout={logout} />
      <footer>
        <p><a href="https://www.flaticon.com/free-icons/picture" title="picture icons">Picture icons created by Pixel perfect - Flaticon</a></p>
      </footer>
    </div>
  );
};

export default ProfilePage;
