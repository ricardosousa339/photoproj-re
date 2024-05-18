import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css';
import { API_BASE_URL } from '../Function/apiConfig';
import { getAccessToken, refreshAccessToken } from '../Function/auth';

export const LoginForm = () => {
  const [formLogin, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    console.log(`Campo alterado: ${e.target.name}, Valor: ${e.target.value}`);
    console.log(getAccessToken())
    setForm({
      ...formLogin,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(formLogin);
      const response = await axios.post(`${API_BASE_URL}`+'api/auth/login/', formLogin);
      console.log(response +'resposta  ');
      console.log('resposta')

      // Armazenar o token de acesso e o token de atualização nos cookies
      Cookies.set('access_token', response.data.access);
      Cookies.set('refresh_token', response.data.refresh);
      Cookies.set('id', response.data.user.id);
      Cookies.set('email', response.data.user.email)

      console.log(response.data.access)
      console.log(response.data.id)
      Cookies.get('access_token');
      

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <label htmlFor="chk" aria-hidden="true">Login</label>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Senha" required onChange={handleChange} />
        <button className= 'button' type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
