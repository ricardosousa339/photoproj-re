import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../apiConfig';

export const LoginForm = () => {
  const [formLogin, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    console.log(`Campo alterado: ${e.target.name}, Valor: ${e.target.value}`);
    console.log(Cookies.get('access_token'))
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
      console.log(response.data +'resposta  ');
      console.log('resposta')

      // Armazenar o token de acesso e o token de atualização nos cookies
      Cookies.set('access_token', response.data.access);
      Cookies.set('refresh_token', response.data.refresh);
      Cookies.set('id', response.data.user.id);

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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
