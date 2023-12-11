import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../apiConfig';
import { UserCard } from './UserCard';

export const ProfilePage = () => {
  // Verificar se o token de acesso está armazenado nos cookies
  const access_token = Cookies.get('access_token');
  const refresh_token = Cookies.get('refresh_token');
  const id = Cookies.get('id');

  if (!access_token) {
    // Redirecionar para a página de login se o token de acesso não estiver definido
    window.location.href = '/login';
  }

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}api/auth/refresh/`, { refresh: refresh_token });
      Cookies.set('access_token', response.data.access);
      return response.data.access;
    } catch (error) {
      console.error(error);
      // Redirecionar para a página de login se a atualização do token falhar
      window.location.href = '/login/';
    }
  };

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

  const logout = () => {
    // Limpar os cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('id');

    // Redirecionar para a página de login
    window.location.href = '/login';
  };
  

  // Chamar a função getUserInfo() quando o componente for montado
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <UserCard user={user} logout={logout} />
    </div>
  );
};

export default ProfilePage;
