import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { API_BASE_URL } from '../apiConfig';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post(`${API_BASE_URL}`+'api/auth/login/', form);
      console.log(response.data);
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

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post(`${API_BASE_URL}`+'api/auth/register/', form);
      console.log(response.data);
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

const App = () => {
  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <RegisterForm />
      <LoginForm />
    </div>
  );
};

export default App;
