import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from './apiConfig';

export const getAccessToken = () => {
console.log(Cookies.get('access_token'));
  // try{
  //   const response = await axios.post(`${API_BASE_URL}`+'api/auth/login/', formLogin);
  //   console.log(response);
  // }
  return Cookies.get('access_token');
}

export const refreshAccessToken = async () => {
  const refresh_token = Cookies.get('refresh_token');
  try {
    const response = await axios.post(`${API_BASE_URL}api/auth/refresh/`, { refresh: refresh_token });
    Cookies.set('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error(error);
    // Redirecionar para a página de login se a atualização do token falhar
    window.location.href = '/login/';
  }
}

export const logout = () => {
  // Limpar os cookies
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('id');

  // Redirecionar para a página de login
  window.location.href = '/login';
}
