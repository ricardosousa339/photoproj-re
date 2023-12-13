import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../apiConfig';

export const RegisterForm = () => {
    const [formReg, setForm] = useState({
      username: '',
      password: '',
      password2: '',
      email: '',
    });
  
    const handleChange = (e) => {
      setForm({
        ...formReg,
        [e.target.name]: e.target.value
      });
    };
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        console.log(formReg);
        const response = await axios.post(`${API_BASE_URL}`+'api/auth/register/', formReg);
        console.log(response.data);
    
        // Armazenar o token de acesso e o token de atualização nos cookies
        Cookies.set('access_token', response.data.access);
        Cookies.set('refresh_token', response.data.refresh);
        Cookies.set('id', response.data.user.id);

      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="signup">
        <form onSubmit={handleRegister}>
          <label htmlFor="chk" aria-hidden="true">Cadastro</label>
          <input type="text" name="username" placeholder="Usuário" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Senha" required onChange={handleChange} />
          <input type="password" name="password2" placeholder="Confirme a senha" required onChange={handleChange} />
          <button type="submit">Cadastro</button>
        </form>
      </div>
    );
  };

  export default RegisterForm;